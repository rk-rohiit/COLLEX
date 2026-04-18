// src/modules/listing/listing.service.js

import Listing from "../../models/listing.model.js";

/* =========================
   Create Listing
========================= */
// export const createListingService = async (data, user) => {
//   const newListing = await Listing.create({
//     ...data,
//     postedBy: user._id,
//     campusId: user.campusId,
//     status: "available",
//   });

//   return newListing;
// };
export const createListingService = async (data, user) => {
  if (!user) throw new Error("Unauthorized");

  if (!data.images || data.images.length === 0) {
    throw new Error("At least one image is required");
  }

  const newListing = await Listing.create({
    title: data.title.trim(),
    description: data.description.trim(),
    category: data.category.trim(),
    type: data.type,
    condition: data.condition || "good",
    location: data.location.trim(),

    // ✅ FIX TYPES
    price: Number(data.price),
    rentPeriod: data.type === "rent" ? data.rentPeriod : undefined,
    rentDeposit:
      data.type === "rent" && data.rentDeposit
        ? Number(data.rentDeposit)
        : undefined,

    images: data.images,

    // ✅ SYSTEM FIELDS
    postedBy: user._id,
    campusId: user.campusId,
    status: "available",
  });

  return newListing;
};
/* =========================
   Get All Listings (Public)
========================= */
// export const getAllListingsService = async () => {
//   return await Listing.find({ status: "available" })
//     .sort({ createdAt: -1 })
//     .populate("postedBy", "fullName");
// };
export const getAllListingsService = async (
  filters = {},
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;

  const listings = await Listing.find(filters)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("postedBy", "fullName");

  return listings;
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
// export const updateListingService = async (id, user, data) => {
//   const listing = await Listing.findById(id);

//   if (!listing) {
//     throw new Error("Listing not found");
//   }

//   if (listing.postedBy.toString() !== user._id.toString()) {
//     throw new Error("Not authorized to update this listing");
//   }

//   const updated = await Listing.findByIdAndUpdate(id, data, {
//     new: true,
//     runValidators: true,
//   });

//   return updated;
// };
export const updateListingService = async (id, user, data) => {
  const listing = await Listing.findById(id);

  if (!listing) throw new Error("Listing not found");

  if (listing.postedBy.toString() !== user._id.toString()) {
    throw new Error("Not authorized");
  }

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "type",
    "condition",
    "location",
    "images",
    "rentPeriod",
    "rentDeposit",
  ];

  const updateData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] =
        field === "price" || field === "rentDeposit"
          ? Number(data[field])
          : data[field];
    }
  });

  const updated = await Listing.findByIdAndUpdate(id, updateData, {
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