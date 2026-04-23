import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    razorpayOrderId: {
      type: String,
      index: true,
    },

    razorpayPaymentId: String,
    razorpaySignature: String,

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
      index: true,
    },
  },
  { timestamps: true }
);

// 🔥 Prevent multiple payment docs for same order (optional but strong)
paymentSchema.index({ orderId: 1, status: 1 });

export default mongoose.model("Payment", paymentSchema);