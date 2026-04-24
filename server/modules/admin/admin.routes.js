import express from "express";
import {
  getDashboardStats,
  getRecentOrders,
  getTopCategories,
  getAllUsers,
  deleteUser,
  getAllOrders,
  updateOrderStatusAdmin,
  getAllListingsAdmin,
} from "./admin.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

/* =========================
   DASHBOARD
========================= */
router.get("/dashboard/stats", protect, authorizeRoles("admin"), getDashboardStats);
router.get("/dashboard/orders", protect, authorizeRoles("admin"), getRecentOrders);
router.get("/dashboard/categories", protect, authorizeRoles("admin"), getTopCategories);

/* =========================
   USERS
========================= */
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);

/* =========================
   ORDERS
========================= */
router.get("/orders", protect, authorizeRoles("admin"), getAllOrders);
router.put("/orders/:id", protect, authorizeRoles("admin"), updateOrderStatusAdmin);

// listing
/* =========================
   LISTINGS
========================= */
router.get(
  "/listings",
  protect,
  authorizeRoles("admin"),
  getAllListingsAdmin
);

export default router;