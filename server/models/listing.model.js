// src/models/listing.model.js

import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: (val) => val.length > 0 && val.length <= 5,
        message: "1 to 5 images required",
      },
    },

    category: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      enum: ["new", "like new", "good", "fair", "poor"],
      default: "good",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["sell", "rent"],
      required: true,
    },

    // 🔥 FIX: required only if rent
    rentPeriod: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: function () {
        return this.type === "rent";
      },
    },

    rentDeposit: {
      type: Number,
      min: 0,
      required: function () {
        return this.type === "rent";
      },
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "reserved", "sold", "rented"],
      default: "available",
    },

    campusId: {
      type: String,
      required: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reservedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // ✅ FIX
    },

    views: {
      type: Number,
      default: 0,
    },

    soldAt: Date,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* =========================
   INDEXES
========================= */

// 🔍 Search
listingSchema.index({ title: "text", description: "text" });

// 🚀 Filtering optimization
listingSchema.index({ campusId: 1, status: 1, isDeleted: 1 });

export default mongoose.model("Listing", listingSchema);