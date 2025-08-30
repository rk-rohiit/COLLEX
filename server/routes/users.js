import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import userModel from "../models/userModel.js";

const router = express.Router();

// ✅ Get User Profile
router.get("/me", authMiddleware, async (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
