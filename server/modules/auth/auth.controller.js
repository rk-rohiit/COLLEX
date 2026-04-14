import {
  sendOtpService,
  verifyOtpAndRegisterService,
  loginUserService,
  resendOtpService,
} from "./auth.service.js";

import {
  validateRegisterInput,
  validateOtpInput,
  validateLoginInput,
} from "./auth.validation.js";

/* =========================
   SEND OTP
========================= */
export const sendOtp = async (req, res, next) => {
  try {
    // 🔥 DEBUG (REMOVE LATER)
    console.log("📩 SEND OTP BODY:", req.body);

    // ❌ Prevent undefined crash
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Request body is missing");
    }

    validateRegisterInput(req.body);

    const result = await sendOtpService(req.body);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/* =========================
   VERIFY OTP + REGISTER
========================= */
export const verifyOtpAndRegister = async (req, res, next) => {
  try {
    console.log("🔐 VERIFY OTP BODY:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Request body is missing");
    }

    validateOtpInput(req.body);

    const result = await verifyOtpAndRegisterService(req.body);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

/* =========================
   LOGIN
========================= */
export const loginUser = async (req, res, next) => {
  try {
    console.log("🔑 LOGIN BODY:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Request body is missing");
    }

    validateLoginInput(req.body);

    const result = await loginUserService(req.body);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

/* =========================
   RESEND OTP
========================= */
export const resendOtp = async (req, res, next) => {
  try {
    console.log("🔁 RESEND OTP BODY:", req.body);

    const result = await resendOtpService(req.body);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};