import Listing from "../../models/listing.model.js";
import Order from "../../models/order.model.js";
import User from "../../models/user.model.js";

/* =========================
   DASHBOARD STATS
========================= */
export const getDashboardStatsService = async (user) => {
  const campusFilter = { campusId: user.campusId };

  const [
    totalProducts,
    totalStudents,
    pendingOrders,
    successOrders,
  ] = await Promise.all([
    Listing.countDocuments(campusFilter),
    User.countDocuments({ role: "student", campusId: user.campusId }),
    Order.countDocuments({ ...campusFilter, status: "pending" }),
    Order.countDocuments({ ...campusFilter, status: "completed" }),
  ]);

  return {
    totalProducts,
    totalStudents,
    pendingOrders,
    successOrders,
  };
};

/* =========================
   RECENT ORDERS
========================= */
export const getRecentOrdersService = async (user) => {
  return await Order.find({ campusId: user.campusId })
    .populate("buyer", "fullName")
    .populate("listing", "title price")
    .sort({ createdAt: -1 })
    .limit(5);
};

/* =========================
   ALL ORDERS (ADMIN VIEW)
========================= */
export const getAllOrdersService = async (user) => {
  return await Order.find({ campusId: user.campusId })
    .populate("buyer", "fullName email")
    .populate("seller", "fullName")
    .populate("listing", "title price")
    .sort({ createdAt: -1 });
};

/* =========================
   UPDATE ORDER (ADMIN)
========================= */

export const updateOrderStatusAdminService = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  // ✅ VALIDATION (MISSING BEFORE)
  const validStatuses = ["pending", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  order.status = status;

  const listing = await Listing.findById(order.listing);
  if (!listing) throw new Error("Listing not found");

  // 🔥 SYNC LISTING
  if (status === "completed") {
    listing.status =
      listing.type === "sell" ? "sold" : "available";

    listing.soldAt = new Date(); // optional
  }

  if (status === "cancelled") {
    listing.status = "available";
    listing.reservedBy = null;
  }

  await listing.save();
  await order.save();

  return order;
};

/* =========================
   TOP CATEGORIES
========================= */
export const getTopCategoriesService = async (user) => {
  const data = await Listing.aggregate([
    { $match: { campusId: user.campusId } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return data.map((item) => ({
    category: item._id,
    count: item.count,
    percentage: ((item.count / total) * 100).toFixed(1),
  }));
};

/* =========================
   USERS
========================= */
export const getAllUsersService = async (user) => {
  return await User.find({ campusId: user.campusId })
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });
};

export const deleteUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  await user.deleteOne();

  return { message: "User deleted successfully" };
};

/* =========================
   ALL LISTINGS (ADMIN)
========================= */
export const getAllListingsAdminService = async (
  user,
  page,
  limit,
  status
) => {
  const skip = (page - 1) * limit;

  let filter = {
    campusId: user.campusId, // 🔥 important
  };

  // optional status filter
  if (status) {
    const statuses = status.split(",");
    filter.status = { $in: statuses };
  }

  const listings = await Listing.find(filter)
    .populate("postedBy", "fullName email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Listing.countDocuments(filter);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    data: listings,
  };
};