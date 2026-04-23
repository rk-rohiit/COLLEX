import crypto from "crypto";
import Payment from "../../models/payment.model.js";
import Order from "../../models/order.model.js";
import { createPaymentOrder } from "./payment.service.js";

/* =========================
   Create Payment Order
========================= */
export const createOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: "amount and orderId are required",
      });
    }

    // 🔎 ensure order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // 🔁 prevent creating multiple active payments
    const existing = await Payment.findOne({
      orderId,
      status: "created",
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Payment already created",
        order: { id: existing.razorpayOrderId },
        paymentId: existing._id,
      });
    }

    const razorpayOrder = await createPaymentOrder(amount);

    const payment = await Payment.create({
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount,
    });

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      paymentId: payment._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   Verify Payment
========================= */
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment fields",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    const payment = await Payment.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) throw new Error("Payment not found");

    // 🔁 idempotent update
    if (payment.status !== "paid") {
      payment.status = "paid";
      payment.razorpayPaymentId = razorpay_payment_id;
      payment.razorpaySignature = razorpay_signature;
      await payment.save();

      // 🔗 update order as paid (add field in Order model if needed)
      await Order.findByIdAndUpdate(payment.orderId, {
        isPaid: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DEV ONLY: Fake Success
========================= */
export const fakeSuccess = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "orderId required",
      });
    }

    const payment = await Payment.findOne({ orderId });
    if (!payment) throw new Error("Payment not found");

    payment.status = "paid";
    await payment.save();

    await Order.findByIdAndUpdate(orderId, { isPaid: true });

    res.json({
      success: true,
      message: "Fake payment success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};