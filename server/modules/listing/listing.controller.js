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
    let images = [];

    // ✅ Handle uploaded files
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        images.push({
          data: file.buffer.toString("base64"),
          contentType: file.mimetype,
        });
      }
    }

    // ❗ Optional: handle URL images
    if (req.body.images) {
      const urls = [].concat(req.body.images);

      urls.forEach((url) => {
        images.push({
          data: url, // store URL as string
          contentType: "url",
        });
      });
    }

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image required",
      });
    }

    const listing = await createListingService(
      {
        ...req.body,
        images,
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