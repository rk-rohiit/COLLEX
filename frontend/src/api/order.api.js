import api from "./axios";

// ✅ Create Order
export const createOrderAPI = async (listingId, meetType) => {
  const res = await api.post("/orders", {
    listingId,
    meetType,
  });
  return res.data.data;
};

// ✅ My Orders
export const getMyOrdersAPI = async () => {
  const res = await api.get("/orders/my");
  return res.data.data;
};

// ✅ Received Orders
export const getReceivedOrdersAPI = async () => {
  const res = await api.get("/orders/received");
  return res.data.data;
};

const verifyDelivery = async () => {
  try {
    const res = await axios.post("/order/verify-delivery", {
      orderId,
      code,
    });

    toast.success("Delivery completed ✅");
  } catch (err) {
    toast.error(err.response?.data?.message);
  }
};