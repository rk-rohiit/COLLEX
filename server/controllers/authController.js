import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // ✅ Correct import
import crypto from "crypto";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../utils/emailService.js";

// =============================
// Helper: Generate JWT Token
// =============================
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in .env file");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// =============================
// REGISTER USER
// =============================
export const registerUser = async (req, res) => {
  try {
    const { email, fullName, phone, course, year, hostelBlock, password } =
      req.body;

    // ✅ Validate required fields
    if (!email || !fullName || !phone || !course || !year || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // ✅ Create new user
    const newUser = await User.create({
      email,
      fullName,
      phone,
      course,
      year,
      hostelBlock,
      password, // Will be hashed by pre-save hook
    });

    // ✅ Generate tokens
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    // ✅ Send response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        phone: newUser.phone,
        course: newUser.course,
        year: newUser.year,
        hostelBlock: newUser.hostelBlock,
        role: newUser.role,
        isVerified: newUser.isVerified,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// =============================
// LOGIN USER
// =============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// =============================
// LOGOUT USER
// =============================
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 0,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// =============================
// SEND OTP
// =============================
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Store hashed OTP for security
    user.verificationToken = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    user.verificationTokenExpires = Date.now() + 5 * 60 * 1000; // 5 min expiry
    await user.save();

    // Send OTP via email
    await sendVerificationEmail(email, otp);

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Sending Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// =============================
// VERIFY OTP
// =============================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    if (!user.verificationToken || !user.verificationTokenExpires) {
      return res
        .status(400)
        .json({ success: false, message: "Please request OTP first" });
    }

    if (Date.now() > user.verificationTokenExpires) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired. Request a new one." });
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    if (user.verificationToken !== hashedOtp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Mark user verified
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};
