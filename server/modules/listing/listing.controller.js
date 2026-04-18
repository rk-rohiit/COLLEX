// src/modules/listing/listing.controller.js

import {
  createListingService,
  getAllListingsService,
  getListingByIdService,
  getMyListingsService,
  updateListingService,
  deleteListingService,
} from "./listing.service.js";

import {
  validateCreateListing,
  validateUpdateListing,
} from "./listing.validation.js";
import cloudinary from "../../utils/cloudinary.js";

/* =========================
   Create Listing
========================= */
// export const createListing = async (req, res, next) => {
//   try {
//     validateCreateListing(req.body);

//     const listing = await createListingService(
//       req.body,
//       req.user
//     );

//     res.status(201).json({
//       success: true,
//       message: "Listing created successfully",
//       data: listing,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const createListing = async (req, res, next) => {
  try {
    let imageUrls = [];

    // ✅ Upload files to Cloudinary
    if (req.files && req.files.length > 0) {
      const uploads = await Promise.all(
        req.files.map((file) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "collex" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            stream.end(file.buffer);
          });
        })
      );

      imageUrls = uploads.map((img) => img.secure_url);
    }

    // ❌ REMOVE THIS BLOCK (VERY IMPORTANT)
    // if (req.body.images) { ... } ❌

    if (imageUrls.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image required",
      });
    }

    const listing = await createListingService(
      {
        ...req.body,
        images: imageUrls, // ✅ ONLY URLS
      },
      req.user
    );

    res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (err) {
    next(err);
  }
};
/* =========================
   Get All Listings
========================= */
// export const getAllListings = async (req, res, next) => {
//   try {
//     const listings = await getAllListingsService();

//     res.status(200).json({
//       success: true,
//       count: listings.length,
//       data: listings,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const getAllListings = async (req, res, next) => {
  try {
    const { search, category, type } = req.query;

    let filter = { status: "available" };

    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    const listings = await getAllListingsService(filter);

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};
/* =========================
   Get Single Listing
========================= */
export const getListingById = async (req, res, next) => {
  try {
    const listing = await getListingByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Get My Listings
========================= */
export const getMyListings = async (req, res, next) => {
  try {
    const listings = await getMyListingsService(req.user._id);

    res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Update Listing
========================= */
export const updateListing = async (req, res, next) => {
  try {
    validateUpdateListing(req.body);

    const updated = await updateListingService(
      req.params.id,
      req.user,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Delete Listing
========================= */
export const deleteListing = async (req, res, next) => {
  try {
    const result = await deleteListingService(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};