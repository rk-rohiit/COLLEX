import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";

const router = express.Router();

// ✅ Create a new listing
router.post("/", createListing);

// ✅ Get all listings
router.get("/", getAllListings);

// ✅ Get single listing by ID
router.get("/:id", getListingById);

// ✅ Update listing
router.put("/:id", updateListing);

// ✅ Delete listing
router.delete("/:id", deleteListing);

export default router;
