import api from "./axios";

/* =========================
   AUTH APIs
========================= */

// 🔐 LOGIN
export const loginAPI = (data) =>
  api.post("/auth/login", data);

// 📝 SEND OTP (REGISTER STEP 1)
export const sendOtpAPI = (data) =>
  api.post("/auth/send-otp", data);

// ✅ VERIFY OTP + REGISTER (STEP 2)
export const verifyOtpAPI = (data) =>
  api.post("/auth/verify-otp", data);

// 🔁 RESEND OTP
export const resendOtpAPI = (data) =>
  api.post("/auth/resend-otp", data);

// 👤 GET CURRENT USER
export const getMeAPI = () =>
  api.get("/auth/me");

export const refreshTokenAPI = (refreshToken) =>
  api.post("/auth/refresh-token", { refreshToken });

// 📩 FORGOT PASSWORD
export const forgotPasswordAPI = (data) =>
  api.post("/auth/forgot-password", data);

// 🔐 RESET PASSWORD
export const resetPasswordAPI = (data) =>
  api.post("/auth/reset-password", data);