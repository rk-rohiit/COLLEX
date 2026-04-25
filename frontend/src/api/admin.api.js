import api from "./axios";

/* =========================
   DASHBOARD
========================= */
export const getDashboardStatsAPI = () =>
  api.get("/admin/dashboard/stats");

export const getRecentOrdersAPI = () =>
  api.get("/admin/dashboard/orders");

export const getTopCategoriesAPI = () =>
  api.get("/admin/dashboard/categories");

/* =========================
   USERS
========================= */
export const getAllUsersAPI = () =>
  api.get("/admin/users");

export const deleteUserAPI = (id) =>
  api.delete(`/admin/users/${id}`);

/* =========================
   ORDERS
========================= */
export const getAllOrdersAPI = () =>
  api.get("/admin/orders");

export const updateOrderStatusAPI = (id, status) =>
  api.put(`/admin/orders/${id}`, { status });

export const getAllListingAPI = () =>{
  api.get("listings");
}