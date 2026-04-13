import api from "./axios";

/* =========================
   AUTH APIs
========================= */

// 🔐 LOGIN
export const loginAPI = (data) => 
  api.post("/auth/login", data);

// 📝 REGISTER (SEND OTP)
export const registerAPI = (data) => 
  api.post("/auth/register", data);

// ✅ VERIFY OTP (REGISTER + LOGIN)
export const verifyOtpAPI = (data) => 
  api.post("/auth/verify-otp", data);

// 🔁 RESEND OTP
export const resendOtpAPI = (data) => 
  api.post("/auth/resend-otp", data);

// 👤 GET CURRENT USER
export const getMeAPI = () => 
  api.get("/auth/me");