import api from './axios'

export const createOrderAPI = async (listingId, meetType) => {
  const res = await api.post("/orders", {
    listingId,
    meetType,
  });
  return res.data.data;
};