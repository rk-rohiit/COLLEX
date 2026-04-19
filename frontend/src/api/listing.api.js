import api from "./axios";

export const fetchListingsAPI = async ({ page = 1, limit = 10 }) => {
  const res = await api.get("/listings",{
    params:{page,limit},
  }); // ✅ FIXED
  // return res.data.data;
  return res.data;
};

// 🔥 Get listing by ID
export const fetchListingByIdAPI = async (id) => {
  const res = await api.get(`/listings/${id}`);
  return res.data.data;
};

// ✅ CREATE LISTING
// export const createListingAPI = async (data) => {
//   const res = await api.post("/listings", data);
//   return res.data.data;
// };

export const createListingAPI = async (formData) => {
  const res = await api.post("/listings", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};