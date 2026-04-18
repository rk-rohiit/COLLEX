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
import { upload } from "../../middlewares/upload.middleware.js"; // ✅ ADD THIS

const router = express.Router();

/* =========================
   Private Routes (specific first)
========================= */
router.get("/my/listings", protect, getMyListings);

/* =========================
   Public Routes
========================= */
router.get("/", getAllListings);
router.get("/:id", getListingById);

/* =========================
   Private Routes
========================= */
router.post(
  "/",
  protect,
  upload.array("images", 5), // ✅ FILE HANDLING ENABLED
  createListing
);

router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);

export default router;