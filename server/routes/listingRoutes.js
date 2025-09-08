import express from "express";
import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
  getMyListings,
  getStudentListingsWithCount,
} from "../controllers/listingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Create a new listing (Only logged-in students)
router.post("/", protect, createListing);

// ✅ Get all listings (Public)
router.get("/", getAllListings);

// ✅ Get logged-in student's listings + count
router.get("/my-listings", protect, getMyListings);

// ✅ Get listings of a specific student by ID (Public)
router.get("/student/:studentId", getStudentListingsWithCount);

// ✅ Get a single listing by ID (Public)
router.get("/:id", getListingById);

// ✅ Update listing (Only owner)
router.put("/:id", protect, updateListing);

// ✅ Delete listing (Only owner)
router.delete("/:id", protect, deleteListing);

export default router;
