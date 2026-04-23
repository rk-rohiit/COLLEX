import Razorpay from "razorpay";

const razorpay = new Razorpay({
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