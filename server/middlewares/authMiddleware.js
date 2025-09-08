import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { JWT_SECRET } from "../utils/constants.js";

/**
 * 🔹 authMiddleware:
 * - Basic authentication
 * - Verifies token & attaches user to req.user
 * - Use when you only need to check if user is logged in
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // ✅ Extract token
    const token = req.headers.authorization?.split(" ")[1];

    // ❌ If no token → Unauthorized
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Find user
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

/**
 * 🔹 protect Middleware:
 * - Strict authentication
 * - Ensures token exists, is valid, and user exists
 * - Use when you need **full protection** for sensitive routes
 */
export const protect = async (req, res, next) => {
  try {
    let token = null;

    // ✅ First, get token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // ✅ Fallback: check Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ If still missing, deny access
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token missing" });
    }

    // ✅ Verify token using the SAME JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Get user details
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
