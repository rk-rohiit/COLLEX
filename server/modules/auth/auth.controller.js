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

import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import config from "../../config/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

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
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    // ❌ No token
    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // 🔐 Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(token, config.refreshSecret);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Refresh token expired" });
      }
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // 👤 Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔒 Validate token match (IMPORTANT)
    if (user.refreshToken !== token) {
      return res.status(401).json({ message: "Refresh token mismatch" });
    }

    // 🔁 Generate new tokens (rotation)
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // 💾 Save new refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    // ✅ Send response
    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

  } catch (err) {
    console.error("REFRESH ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};