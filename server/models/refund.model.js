// src/models/refund.model.js

import mongoose from "mongoose";

const refundSchema = new mongoose.Schema(
  {
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
      index: true,
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    refundId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      default: "refunded",
    },

    reason: {
      type: String,
      default: "Auto-refunded on failure detection",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Refund", refundSchema);
