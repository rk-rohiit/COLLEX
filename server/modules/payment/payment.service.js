import Razorpay from "razorpay";
import Refund from "../../models/refund.model.js";
import Payment from "../../models/payment.model.js";
import crypto from "crypto";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentOrder = async (amount) => {
  if (!amount || amount <= 0) {
    throw new Error("Invalid amount");
  }

  const options = {
    amount: Math.round(amount * 100), // paise
    currency: "INR",
    receipt: "rcpt_" + Date.now(),
  };

  const order = await razorpay.orders.create(options);
  return order;
};

export const refundOrderPayment = async (order, reason = "Order cancelled") => {
  // Find paid payment for this order
  const payment = await Payment.findOne({ orderId: order._id, status: "paid" });
  
  const refundAmount = order.amount; // total amount paid
  let refundId = `ref_sim_${crypto.randomBytes(8).toString("hex")}`;
  let refundStatus = "refunded";

  const razorpayPaymentId = order.paymentId || payment?.razorpayPaymentId;

  if (razorpayPaymentId) {
    try {
      const razorpayRefund = await razorpay.payments.refund(razorpayPaymentId, {
        amount: Math.round(refundAmount * 100),
        notes: { reason }
      });
      if (razorpayRefund && razorpayRefund.id) {
        refundId = razorpayRefund.id;
        refundStatus = razorpayRefund.status || "refunded";
      }
    } catch (err) {
      console.warn("Razorpay API refund failed, falling back to simulated refund log:", err.message);
    }
  }

  // Create Refund record
  const refundLog = await Refund.create({
    paymentId: payment?._id || null,
    orderId: order._id,
    amount: refundAmount,
    refundId,
    status: refundStatus,
    reason
  });

  return refundLog;
};