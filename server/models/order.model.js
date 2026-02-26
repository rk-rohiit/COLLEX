// src/models/order.model.js

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["sell", "rent"],
      required: true,
    },

    meetType: {
      type: String,
      enum: ["campus", "protected"],
      default: "campus",
    },

    extraFee: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },

    campusId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.index({ buyer: 1 });
orderSchema.index({ seller: 1 });

export default mongoose.model("Order", orderSchema);