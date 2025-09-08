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

export const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check Authorization header first
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // ✅ Check cookies as fallback
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // ❌ No token → deny access
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Authorization denied.",
      });
    }

    // ✅ Verify token using the SAME secret used in login
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecret");

    // ✅ Use userModel instead of User
    req.user = await userModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
