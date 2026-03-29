import api from "./axios";

// LOGIN
export const loginAPI = (data) => api.post("/auth/login", data);

// REGISTER
export const registerAPI = (data) => api.post("/auth/register", data);