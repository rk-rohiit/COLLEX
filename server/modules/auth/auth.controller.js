// src/modules/auth/auth.controller.js

import {
  registerUserService,
  loginUserService,
  resendOtpService,
} from "./auth.service.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "./auth.validation.js";
import User from "../../models/user.model.js";

export const registerUser = async (req, res, next) => {
  try {
    validateRegisterInput(req.body);

    const result = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    validateLoginInput(req.body);

    const result = await loginUserService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// controller
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      throw new Error("Invalid or expired OTP");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    const result = await resendOtpService(req.body);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};