import api from "./axios";

export const fetchListingsAPI = async () => {
  const res = await api.get("/listings"); // ✅ FIXED
  return res.data.data;
};

// 🔥 Get listing by ID
export const fetchListingByIdAPI = async (id) => {
  const res = await api.get(`/listings/${id}`);
  return res.data.data;
};

// ✅ CREATE LISTING
export const createListingAPI = async (data) => {
  const res = await api.post("/listings", data);
  return res.data.data;
};