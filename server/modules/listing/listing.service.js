// src/modules/listing/listing.service.js

import Listing from "../../models/listing.model.js";

/* =========================
   Create Listing
========================= */
export const createListingService = async (data, user) => {
  const newListing = await Listing.create({
    ...data,
    postedBy: user._id,
    campusId: user.campusId,
    status: "available",
  });

  return newListing;
};

/* =========================
   Get All Listings (Public)
========================= */
export const getAllListingsService = async () => {
  return await Listing.find({ status: "available" })
    .sort({ createdAt: -1 })
    .populate("postedBy", "fullName");
};

/* =========================
   Get Single Listing
========================= */
export const getListingByIdService = async (id) => {
  const listing = await Listing.findById(id).populate(
    "postedBy",
    "fullName email"
  );

  if (!listing) {
    throw new Error("Listing not found");
  }

  return listing;
};

/* =========================
   Get My Listings
========================= */
export const getMyListingsService = async (userId) => {
  return await Listing.find({ postedBy: userId }).sort({
    createdAt: -1,
  });
};

/* =========================
   Update Listing
========================= */
export const updateListingService = async (id, user, data) => {
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new Error("Listing not found");
  }

  if (listing.postedBy.toString() !== user._id.toString()) {
    throw new Error("Not authorized to update this listing");
  }

  const updated = await Listing.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updated;
};

/* =========================
   Delete Listing
========================= */
export const deleteListingService = async (id, user) => {
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new Error("Listing not found");
  }

  if (listing.postedBy.toString() !== user._id.toString()) {
    throw new Error("Not authorized to delete this listing");
  }

  await listing.deleteOne();

  return { message: "Listing deleted successfully" };
};