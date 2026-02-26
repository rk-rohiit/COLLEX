// src/modules/user/user.routes.js

import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} from "./user.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

/* =========================
   Student Routes
========================= */

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

/* =========================
   Admin Routes
========================= */

router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;