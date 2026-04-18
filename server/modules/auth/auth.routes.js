import express from "express";
import {
  sendOtp,
  verifyOtpAndRegister,
  loginUser,
  resendOtp,
  refreshToken
} from "./auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpAndRegister);
router.post("/login", loginUser);
router.post("/resend-otp", resendOtp);
router.post("/refresh-token", refreshToken);

export default router;