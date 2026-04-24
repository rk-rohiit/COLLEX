import express from "express";
import {
  createOrder,
  getMyOrders,
  getReceivedOrders,
  updateOrderStatus,
  confirmDelivery,
  cancelOrder,
  verifyDeliveryController
} from "./order.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* =========================
   Private Routes
========================= */

router.post("/", protect, createOrder);

router.get("/my", protect, getMyOrders);
router.get("/received", protect, getReceivedOrders);

// 🔐 DELIVERY CONFIRMATION
router.patch("/:id/confirm", protect, confirmDelivery);

// ❌ CANCEL ORDER
router.patch("/:id/cancel", protect, cancelOrder);

// 🔄 UPDATE STATUS (seller only)
router.patch("/:id/status", protect, updateOrderStatus);

// verify-delivery
router.post("/verify-delivery",protect,verifyDeliveryController);

export default router;