// src/modules/order/order.service.js

import Order from "../../models/order.model.js";
import Listing from "../../models/listing.model.js";

/* =========================
   Create Order
========================= */

// export const createOrderService = async (listingId, user, meetType) => {
//   const listing = await Listing.findById(listingId);

//   if (!listing) throw new Error("Listing not found");

//   if (listing.postedBy.toString() === user._id.toString()) {
//     throw new Error("You cannot order your own listing");
//   }

//   // ✅ ONLY CHECK (DO NOT RESERVE HERE)
//   if (listing.status !== "available") {
//     throw new Error("Item already reserved or sold");
//   }

//   const extraFee = meetType === "protected" ? 10 : 0;
//   const amount = listing.price + extraFee;

//   const order = await Order.create({
//     listing: listing._id,
//     buyer: user._id,
//     seller: listing.postedBy,
//     type: listing.type,
//     meetType,
//     extraFee,
//     amount,
//     campusId: user.campusId,
//     paymentStatus: "pending",
//     deliveryCode: Math.floor(100000 + Math.random() * 900000).toString(),
//   });

//   return order;
// };
export const createOrderService = async (listingId, user, meetType) => {
  const listing = await Listing.findById(listingId);

  if (!listing) throw new Error("Listing not found");

  if (listing.postedBy.toString() === user._id.toString()) {
    throw new Error("You cannot order your own listing");
  }

  if (listing.status !== "available") {
    throw new Error("Item already reserved or sold");
  }

  // 🔥 FIX: prevent duplicate pending order
  const existingOrder = await Order.findOne({
    listing: listing._id,
    buyer: user._id,
    status: "pending",
  });

  if (existingOrder) {
    throw new Error("You already have a pending order for this item");
    // OR: return existingOrder;
  }

  const extraFee = meetType === "protected" ? 10 : 0;
  const amount = listing.price + extraFee;

  const order = await Order.create({
    listing: listing._id,
    buyer: user._id,
    seller: listing.postedBy,
    type: listing.type,
    meetType,
    extraFee,
    amount,
    campusId: user.campusId,
    paymentStatus: "pending",
    deliveryCode: Math.floor(100000 + Math.random() * 900000).toString(),
  });

  return order;
};

/* =========================
   Get My Orders (Buyer)
========================= */
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

//   // ❌ Prevent updating finalized orders
//   if (order.status === "completed") {
//     throw new Error("Order already completed");
//   }

//   if (order.status === "cancelled") {
//     throw new Error("Cannot update cancelled order");
//   }

//   // 🔥 ONLY allow cancel
//   if (status !== "cancelled") {
//     throw new Error("Only cancellation allowed");
//   }

//   const listing = await Listing.findById(order.listing);
//   if (!listing) throw new Error("Listing not found");

//   // ✅ restore listing
//   listing.status = "available";
//   listing.reservedBy = null;

//   order.status = "cancelled";

//   await listing.save();
//   await order.save();

//   return order;
// };

export const updateOrderStatusService = async (orderId, user, status) => {
  const order = await Order.findById(orderId);

  if (!order) throw new Error("Order not found");

  // 🔥 FIX: allow buyer OR seller
  if (
    order.seller.toString() !== user._id.toString() &&
    order.buyer.toString() !== user._id.toString()
  ) {
    throw new Error("Not authorized");
  }

  // ❌ Prevent updating finalized orders
  if (order.status === "completed") {
    throw new Error("Order already completed");
  }

  if (order.status === "cancelled") {
    throw new Error("Cannot update cancelled order");
  }

  // 🔥 Only cancellation allowed
  if (status !== "cancelled") {
    throw new Error("Only cancellation allowed");
  }

  const listing = await Listing.findById(order.listing);
  if (!listing) throw new Error("Listing not found");

  // ✅ restore listing ONLY if it was reserved
  if (listing.status === "reserved") {
    listing.status = "available";
    listing.reservedBy = null;
    await listing.save();
  }

  order.status = "cancelled";
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
  if (order.paymentStatus !== "paid") {
  throw new Error("Payment not completed");
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

export const verifyPaymentService = async (orderId, paymentId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  if (order.paymentStatus === "paid") {
    throw new Error("Payment already processed");
  }

  const listing = await Listing.findById(order.listing);
  if (!listing) throw new Error("Listing not found");

  // 🔥 update listing FIRST
  listing.status = "reserved";
  listing.reservedBy = order.buyer;
  await listing.save();

  // ✅ update order
  order.paymentStatus = "paid";
  order.paymentId = paymentId;
  order.paidAt = new Date();
  order.paidAmount = order.amount;

  await order.save();

  return order;
};

// export const verifyPaymentService = async (orderId, paymentId) => {
//   const order = await Order.findById(orderId);
//   if (!order) throw new Error("Order not found");

//   // ❗ prevent double payment
//   if (order.paymentStatus === "paid") {
//     throw new Error("Payment already processed");
//   }

//   // ✅ update order
//   order.paymentStatus = "paid";
//   order.paymentId = paymentId;
//   order.paidAt = new Date();
//   order.paidAmount = order.amount;

//   await order.save();

//   // ✅ atomic reserve
//   const listing = await Listing.findOneAndUpdate(
//     { _id: order.listing, status: "available" },
//     {
//       status: "reserved",
//       reservedBy: order.buyer,
//     },
//     { new: true }
//   );

//   if (!listing) {
//     throw new Error("Item already reserved or sold");
//   }

//   return order;
// };