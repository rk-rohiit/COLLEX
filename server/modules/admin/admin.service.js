import Listing from "../../models/listing.model.js";
import Order from "../../models/order.model.js";
import User from "../../models/user.model.js";
import Payment from "../../models/payment.model.js";
import Refund from "../../models/refund.model.js";
import crypto from "crypto";
import { razorpay, refundOrderPayment } from "../payment/payment.service.js";

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

    // 🔥 Trigger refund if payment was paid
    if (order.paymentStatus === "paid") {
      await refundOrderPayment(order, "Cancelled by Administrator");
      order.paymentStatus = "refunded";
    }
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

/* =========================
   UPDATE USER (ADMIN)
========================= */
export const updateUserAdminService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const allowedFields = [
    "fullName",
    "email",
    "phone",
    "course",
    "year",
    "hostelBlock",
    "role",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      if (field === "course" && typeof data[field] === "string") {
        user[field] = data[field].toLowerCase().replace(/\./g, "");
      } else {
        user[field] = data[field];
      }
    }
  });

  await user.save();

  const updatedUser = await User.findById(userId).select("-password -refreshToken");
  return updatedUser;
};

/* =========================
   UPDATE LISTING (ADMIN)
========================= */
export const updateListingAdminService = async (listingId, data) => {
  const listing = await Listing.findById(listingId);
  if (!listing) throw new Error("Listing not found");

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "type",
    "condition",
    "location",
    "status",
    "rentPeriod",
    "rentDeposit",
  ];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      listing[field] =
        field === "price" || field === "rentDeposit"
          ? Number(data[field])
          : data[field];
    }
  });

  await listing.save();

  const updatedListing = await Listing.findById(listingId).populate("postedBy", "fullName email");
  return updatedListing;
};

/* =========================
   DELETE LISTING (ADMIN)
========================= */
export const deleteListingAdminService = async (listingId) => {
  const listing = await Listing.findById(listingId);
  if (!listing) throw new Error("Listing not found");

  await listing.deleteOne();
  return { message: "Listing deleted successfully" };
};

/* =========================
   GET ALL TRANSACTIONS (ADMIN)
========================= */
export const getAllTransactionsAdminService = async (user, range) => {
  let dateFilter = {};
  const now = new Date();

  if (range === "daily") {
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    dateFilter.createdAt = { $gte: startOfDay };
  } else if (range === "weekly") {
    const startOfWeek = new Date(now.setDate(now.getDate() - 7));
    dateFilter.createdAt = { $gte: startOfWeek };
  } else if (range === "monthly") {
    const startOfMonth = new Date(now.setDate(now.getDate() - 30));
    dateFilter.createdAt = { $gte: startOfMonth };
  }

  // Find paid payments or all payments (since status index is on orderId, status)
  const payments = await Payment.find(dateFilter)
    .populate({
      path: "orderId",
      populate: [
        { path: "buyer", select: "fullName email" },
        { path: "seller", select: "fullName email" },
        { path: "listing", select: "title price category" },
      ],
    })
    .sort({ createdAt: -1 });

  // Filter payments by admin's campusId
  const campusPayments = payments.filter(
    (payment) => payment.orderId && payment.orderId.campusId === user.campusId
  );

  return campusPayments;
};

/* =========================
   DETECT FAILURES & AUTO-REFUND (ADMIN)
========================= */
export const detectFailuresAdminService = async (user) => {
  // Threshold: in development, look for any created payment. In production, 2 minutes old.
  const threshold = process.env.NODE_ENV === "development" 
    ? new Date() 
    : new Date(Date.now() - 2 * 60 * 1000);

  // Find payments that are initiated ("created") but not paid, older than threshold
  const payments = await Payment.find({
    status: "created",
    createdAt: { $lt: threshold }
  }).populate("orderId");

  // Filter payments by admin's campusId
  const campusPayments = payments.filter(
    (p) => p.orderId && p.orderId.campusId === user.campusId
  );

  const processedRefunds = [];

  for (const payment of campusPayments) {
    // 1. Mark payment as failed
    payment.status = "failed";
    await payment.save();

    // 2. Determine refund parameters
    const refundReason = "Auto-refunded: Interrupted Checkout or Captured Failure";
    let refundId = `ref_sim_${crypto.randomBytes(8).toString("hex")}`;
    let refundStatus = "refunded";

    // Attempt real Razorpay API refund if razorpayPaymentId is available
    if (payment.razorpayPaymentId) {
      try {
        const razorpayRefund = await razorpay.payments.refund(payment.razorpayPaymentId, {
          amount: Math.round(payment.amount * 100),
          notes: { reason: refundReason }
        });
        if (razorpayRefund && razorpayRefund.id) {
          refundId = razorpayRefund.id;
          refundStatus = razorpayRefund.status || "refunded";
        }
      } catch (err) {
        console.warn("Razorpay API refund failed, falling back to simulated refund log:", err.message);
      }
    }

    // 3. Create Refund record
    const refundLog = await Refund.create({
      paymentId: payment._id,
      orderId: payment.orderId._id,
      amount: payment.amount,
      refundId,
      status: refundStatus,
      reason: refundReason
    });

    // 4. Cancel the related order if it was pending
    if (payment.orderId.status === "pending") {
      await Order.findByIdAndUpdate(payment.orderId._id, {
        status: "cancelled",
        paymentStatus: "failed"
      });
    }

    // Populate the newly created refund for the response
    const populated = await Refund.findById(refundLog._id).populate({
      path: "orderId",
      populate: [
        { path: "buyer", select: "fullName email" },
        { path: "seller", select: "fullName email" },
        { path: "listing", select: "title price" }
      ]
    }).populate("paymentId");

    processedRefunds.push(populated);
  }

  return processedRefunds;
};

/* =========================
   GET REFUND LOGS (ADMIN)
========================= */
export const getRefundLogsAdminService = async (user) => {
  const refunds = await Refund.find()
    .populate({
      path: "orderId",
      populate: [
        { path: "buyer", select: "fullName email" },
        { path: "seller", select: "fullName email" },
        { path: "listing", select: "title price" }
      ]
    })
    .populate("paymentId")
    .sort({ createdAt: -1 });

  // Filter refunds by campusId
  const campusRefunds = refunds.filter(
    (r) => r.orderId && r.orderId.campusId === user.campusId
  );

  return campusRefunds;
};