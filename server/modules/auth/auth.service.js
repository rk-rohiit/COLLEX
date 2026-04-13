import User from "../../models/user.model.js";
import { generateToken } from "../../utils/generateToken.js";
import { generateOtp } from "../../utils/generateOtp.js";
import { sendEmail } from "../../utils/sendEmail.js";

/* =========================
   REGISTER USER (WITH OTP)
========================= */
export const registerUserService = async (data) => {
  const { email } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const otp = generateOtp();

  const user = await User.create({
    ...data,
    otp,
    otpExpiry: Date.now() + 10 * 60 * 1000, // 10 min
    isVerified: false,
  });

  await sendEmail(email, otp);

  return {
    success: true,
    requiresOtp: true,
    message: "OTP sent to email. Please verify your account",
    email: user.email, // useful for frontend
  };
};

/* =========================
   LOGIN USER
========================= */
export const loginUserService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 🔥 IF NOT VERIFIED → SEND OTP AGAIN
  if (!user.isVerified) {
    const otp = generateOtp();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();
    await sendEmail(email, otp);

    return {
      success: false,
      requiresOtp: true,
      message: "Account not verified. OTP sent again",
      email: user.email,
    };
  }

  // ✅ VERIFIED USER → LOGIN SUCCESS
  const token = generateToken(user._id);

  return {
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      campusId: user.campusId,
    },
  };
};

/* =========================
   VERIFY OTP (REGISTER / LOGIN)
========================= */
export const verifyOtpService = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.otp || !user.otpExpiry) {
    throw new Error("No OTP found. Please request again");
  }

  if (user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpiry < Date.now()) {
    throw new Error("OTP expired");
  }

  // ✅ VERIFY USER
  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  const token = generateToken(user._id);

  return {
    success: true,
    message: "Account verified successfully",
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      campusId: user.campusId,
    },
  };
};

/* =========================
   RESEND OTP (OPTIONAL BUT IMPORTANT)
========================= */
export const resendOtpService = async ({ email }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("User already verified");
  }

  const otp = generateOtp();

  user.otp = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000;

  await user.save();
  await sendEmail(email, otp);

  return {
    success: true,
    message: "OTP resent successfully",
  };
};