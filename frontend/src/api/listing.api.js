import api from "./axios";

export const fetchListingsAPI = async () => {
  const res = await api.get("/listings"); // ✅ FIXED
  return res.data.data;
};