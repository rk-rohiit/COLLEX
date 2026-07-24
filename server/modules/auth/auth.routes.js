import express from "express";
import {
  sendOtp,
  verifyOtpAndRegister,
  loginUser,
  resendOtp,
  refreshToken,
  forgotPassword,
  resetPassword,
} from "./auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndRegister);
router.post("/login", loginUser);
router.post("/resend-otp", resendOtp);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;