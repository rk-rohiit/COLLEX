// src/modules/listing/listing.routes.js

import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  getMyListings,
  updateListing,
  deleteListing,
} from "./listing.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

/* =========================
   Public Routes
========================= */

router.get("/", getAllListings);
router.get("/:id", getListingById);

/* =========================
   Private Routes
========================= */

router.post("/", protect, createListing);
router.get("/my/listings", protect, getMyListings);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

export default router;