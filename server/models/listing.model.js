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
        validator: (val) => val.length <= 5,
        message: "Maximum 5 images allowed",
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

    rentPeriod: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },

    rentDeposit: Number,

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

    // 🔥 PRO ADDITIONS
    reservedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

/* Indexes */
listingSchema.index({ title: "text", description: "text" });
listingSchema.index({ campusId: 1, status: 1 });

export default mongoose.model("Listing", listingSchema);