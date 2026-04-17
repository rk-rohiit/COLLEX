// src/modules/order/order.service.js

import Order from "../../models/order.model.js";
import Listing from "../../models/listing.model.js";

/* =========================
   Create Order
========================= */
export const createOrderService = async (listingId, user, meetType) => {
  const listing = await Listing.findById(listingId);

  if (!listing) throw new Error("Listing not found");

  if (listing.status !== "available") {
    throw new Error(`Listing is ${listing.status}`);
  }

  if (listing.postedBy.toString() === user._id.toString()) {
    throw new Error("You cannot order your own listing");
  }

  // ✅ Prevent duplicate order
  const existingOrder = await Order.findOne({
    listing: listing._id,
    buyer: user._id,
  });

  if (existingOrder) {
    throw new Error("You already placed an order");
  }

  const extraFee = meetType === "protected" ? 10 : 0;

  const order = await Order.create({
    listing: listing._id,
    buyer: user._id,
    seller: listing.postedBy,
    type: listing.type,
    meetType,
    extraFee,
    campusId: user.campusId || "lpu", // 🔥 FIX
  });

  listing.status = listing.type === "sell" ? "reserved" : "rented";
  await listing.save();

  return order;
};

/* =========================
   Get My Orders (Buyer)
========================= */
// export const getMyOrdersService = async (userId) => {
//   return await Order.find({ buyer: userId })
//     .populate("listing")
//     .sort({ createdAt: -1 });
// };
export const getMyOrdersService = async (userId) => {
  return await Order.find({ buyer: userId })
    .populate("listing")
    .populate("seller", "fullName campusId") // ✅ FIX
    .sort({ createdAt: -1 });
};
/* =========================
   Get Received Orders (Seller)
========================= */
export const getReceivedOrdersService = async (userId) => {
  return await Order.find({ seller: userId })
    .populate("listing")
    .sort({ createdAt: -1 });
};

/* =========================
   Update Order Status
========================= */
export const updateOrderStatusService = async (orderId, user, status) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  if (order.seller.toString() !== user._id.toString()) {
    throw new Error("Not authorized");
  }

  order.status = status;

  if (status === "completed") {
    const listing = await Listing.findById(order.listing);

    listing.status =
      listing.type === "sell" ? "sold" : "available";

    await listing.save();
  }

  await order.save();

  return order;
};