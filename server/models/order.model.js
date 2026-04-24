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

    amount: {
      type: Number,
      required: true,
      min: 0,
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

    deliveryCode: {
      type: String,
      select: false, // 🔐 secure
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: Date,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paidAmount: {
      type: Number,
    },

    paymentId: {
      type: String,
      unique: true,
      sparse: true,
    },

    paidAt: Date,
  },
  { timestamps: true }
);

/* Indexes */
orderSchema.index({ buyer: 1 });
orderSchema.index({ seller: 1 });
orderSchema.index({ listing: 1 });
orderSchema.index({ campusId: 1, status: 1 });
orderSchema.index({ campusId: 1, createdAt: -1 });

// 🔥 Prevent duplicate orders
// orderSchema.index({ buyer: 1, listing: 1 }, { unique: true });
orderSchema.index(
  { buyer: 1, listing: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "pending" } }
);

export default mongoose.model("Order", orderSchema);