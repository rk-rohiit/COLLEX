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

    // images: {
    //   type: [String],
    //   required: true,
    //   validate: {
    //     validator: (val) => val.length <= 5,
    //     message: "Maximum 5 images allowed",
    //   },
    // },
    images: {
  type: [String], // ✅ ONLY URLs
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

    rentDeposit: {
      type: Number,
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
  },
  { timestamps: true }
);

/* Index for search */
listingSchema.index({ title: "text", description: "text" });

export default mongoose.model("Listing", listingSchema);