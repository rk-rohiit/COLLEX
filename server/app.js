// src/app.js

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import config from "./config/index.js";
import { logger } from "./utils/logger.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// Module Routes
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import listingRoutes from "./modules/listing/listing.routes.js";
import orderRoutes from "./modules/order/order.routes.js";
import contactRoutes from "./modules/contact/contact.routes.js";

const app = express();

/* ========================================
   SECURITY MIDDLEWARES
======================================== */

// Secure HTTP headers
app.use(helmet());

// CORS configuration
const allowedOrigins =
  config.env === "production"
    ? [process.env.FRONTEND_URL]
    : [
        "http://localhost:5173",
        "http://localhost:5174", // 🔥 ADD THIS
      ];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

app.use(globalLimiter);

/* ========================================
   BODY PARSING
======================================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ========================================
   HEALTH CHECK
======================================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Collex API is running",
    environment: config.env,
  });
});

/* ========================================
   API ROUTES
======================================== */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

/* ========================================
   404 HANDLER
======================================== */

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ========================================
   GLOBAL ERROR HANDLER
======================================== */

app.use(errorHandler);

export default app;