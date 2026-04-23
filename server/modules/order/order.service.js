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
    status: "pending",
  });

  if (existingOrder) {
    throw new Error("You already placed an order");
  }

  const extraFee = meetType === "protected" ? 10 : 0;

  // 🔥 FIX: ADD AMOUNT
  const amount = listing.price + extraFee;

  const order = await Order.create({
    listing: listing._id,
    buyer: user._id,
    seller: listing.postedBy,
    type: listing.type,
    meetType,
    extraFee,
    amount, // ✅ FIXED
    campusId: user.campusId,
  });

  // 🔥 UPDATE LISTING
  // listing.status = listing.type === "sell" ? "reserved" : "rented";
  // listing.reservedBy = user._id; // if added in schema

  // await listing.save();

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
// export const updateOrderStatusService = async (orderId, user, status) => {
//   const order = await Order.findById(orderId);

//   if (!order) throw new Error("Order not found");

//   if (order.seller.toString() !== user._id.toString()) {
//     throw new Error("Not authorized");
//   }

//   order.status = status;

//   if (status === "completed") {
//     const listing = await Listing.findById(order.listing);

//     listing.status =
//       listing.type === "sell" ? "sold" : "available";

//     await listing.save();
//   }

//   await order.save();

//   return order;
// };

export const updateOrderStatusService = async (orderId, user, status) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  if (order.seller.toString() !== user._id.toString()) {
    throw new Error("Not authorized");
  }

  // ❌ Prevent updating finalized orders
  if (order.status === "completed") {
    throw new Error("Order already completed");
  }

  if (order.status === "cancelled") {
    throw new Error("Cannot update cancelled order");
  }

  // 🔥 ONLY allow cancel
  if (status !== "cancelled") {
    throw new Error("Only cancellation allowed");
  }

  const listing = await Listing.findById(order.listing);
  if (!listing) throw new Error("Listing not found");

  // ✅ restore listing
  listing.status = "available";
  listing.reservedBy = null;

  order.status = "cancelled";

  await listing.save();
  await order.save();

  return order;
};

export const confirmDeliveryService = async (orderId, code, user) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  if (order.buyer.toString() !== user._id.toString()) {
    throw new Error("Only buyer can confirm delivery");
  }

  if (order.status !== "pending") {
    throw new Error("Order already processed");
  }

  if (order.deliveryCode !== code) {
    throw new Error("Invalid delivery code");
  }

  const listing = await Listing.findById(order.listing);
  if (!listing) throw new Error("Listing not found");

  // ✅ COMPLETE ORDER
  order.status = "completed";
  order.isDelivered = true;
  order.deliveredAt = new Date();

  // ✅ UPDATE LISTING HERE ONLY
  listing.status = listing.type === "sell" ? "sold" : "available";
  listing.reservedBy = null;
  listing.soldAt = new Date();

  await listing.save();
  await order.save();

  return order;
};

export const cancelOrderService = async (orderId, user) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  if (order.buyer.toString() !== user._id.toString()) {
    throw new Error("Only buyer can cancel");
  }

  if (order.status !== "pending") {
    throw new Error("Cannot cancel processed order");
  }

  order.status = "cancelled";

  // ❌ listing untouched (correct, since we didn’t reserve)

  await order.save();

  return order;
};