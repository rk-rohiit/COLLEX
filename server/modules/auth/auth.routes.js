// src/modules/auth/auth.routes.js

import express from "express";
import {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
} from "./auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔥 OTP ROUTES
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

export default router;