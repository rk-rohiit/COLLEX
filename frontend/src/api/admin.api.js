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

export const getAllListingsAdminAPI = (page = 1, limit = 10, status = "") =>
  api.get(`/admin/listings?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`);

export const updateUserAdminAPI = (id, data) =>
  api.put(`/admin/users/${id}`, data);

export const updateListingAdminAPI = (id, data) =>
  api.put(`/admin/listings/${id}`, data);

export const deleteListingAdminAPI = (id) =>
  api.delete(`/admin/listings/${id}`);

export const getContactMessagesAPI = () =>
  api.get("/contact");

export const deleteContactMessageAPI = (id) =>
  api.delete(`/contact/${id}`);

export const getTransactionsAPI = (range = "") =>
  api.get(`/admin/transactions?range=${range}`);

export const detectFailuresAPI = () =>
  api.post("/admin/payments/detect-failures");

export const getRefundLogsAPI = () =>
  api.get("/admin/payments/refund-logs");