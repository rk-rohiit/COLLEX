// src/modules/contact/contact.routes.js

import express from "express";
import {
  submitContact,
  getAllMessages,
  deleteMessage,
} from "./contact.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

const router = express.Router();

/* =========================
   Public Route
========================= */

router.post("/", submitContact);

/* =========================
   Admin Routes
========================= */

router.get("/", protect, authorizeRoles("admin"), getAllMessages);
router.delete("/:id", protect, authorizeRoles("admin"), deleteMessage);

export default router;