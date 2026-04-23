import axiosInstance from "./axios";

/* =========================
   Create Razorpay Order
========================= */
export const createPaymentOrderAPI = async (payload) => {
  try {
    const res = await axiosInstance.post("/payment/create-order", payload);
    return res.data;
  } catch (error) {
    console.error("Create Payment Error:", error);
    throw error;
  }
};

/* =========================
   Verify Payment
========================= */
export const verifyPaymentAPI = async (paymentData) => {
  const res = await axiosInstance.post("/payment/verify", paymentData);
  return res.data;
};