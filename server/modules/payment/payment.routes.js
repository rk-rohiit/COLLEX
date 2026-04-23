import express from "express";
import {
  createOrder,
  verifyPayment,
  fakeSuccess,
} from "./payment.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🔐 Always protect payment routes
router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);

// ⚠️ DEV ONLY (protect + remove in prod)
if (process.env.NODE_ENV !== "production") {
  router.post("/fake-success", protect, fakeSuccess);
}

export default router;