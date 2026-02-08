import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/users.js";
import contactRoutes from "./routes/contactRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =======================
// DATABASE
// =======================
connectDB();

// =======================
// SECURITY MIDDLEWARES
// =======================
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// =======================
// RATE LIMITING
// =======================

// Global limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(globalLimiter);

// Auth-specific limiter (login/register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many authentication attempts, please try again later.",
});

// =======================
// BODY PARSING
// =======================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =======================
// ROUTES
// =======================
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/listings", listingRoutes);

// =======================
// HEALTH CHECK
// =======================
app.get("/", (req, res) => {
  res.send("🚀 Collex API is running");
});

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
