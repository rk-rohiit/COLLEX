// src/modules/order/order.routes.js

import express from "express";
import {
  createOrder,
  getMyOrders,
  getReceivedOrders,
  updateOrderStatus,
} from "./order.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* =========================
   Private Routes
========================= */

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/received", protect, getReceivedOrders);
router.put("/:id", protect, updateOrderStatus);

export default router;