import Listing from "../models/Listing.js";

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Private (Student only)
export const createListing = async (req, res) => {
  try {
    const { title, description, price, images, category, type, location } =
      req.body;

    // ✅ Check required fields
    if (
      !title ||
      !description ||
      !price ||
      !images ||
      images.length === 0 ||
      !category ||
      !type ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ✅ Create new listing
    const newListing = new Listing({
      ...req.body,
      postedBy: req.user._id, // Automatically assign logged-in student ID
    });

    await newListing.save();

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: newListing,
    });
  } catch (error) {
    console.error("Create Listing Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged-in student's listings
// @route   GET /api/listings/my
// @access  Private
export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ postedBy: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      totalListings: listings.length,
      listings,
    });
  } catch (error) {
    console.error("Get My Listings Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get listings by student ID (public)
// @route   GET /api/listings/student/:studentId
// @access  Public
export const getStudentListingsWithCount = async (req, res) => {
  try {
    const { studentId } = req.params;

    const listings = await Listing.find({ postedBy: studentId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      studentId,
      totalListings: listings.length,
      listings,
    });
  } catch (error) {
    console.error("Get Student Listings Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching student listings",
      error: error.message,
    });
  }
};

// @desc    Get single listing by ID
// @route   GET /api/listings/:id
// @access  Public
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    res.status(200).json({ success: true, data: listing });
  } catch (error) {
    console.error("Get Listing Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private (Only Owner)
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    // ✅ Check if the logged-in student owns the listing
    if (listing.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this listing",
      });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedListing });
  } catch (error) {
    console.error("Update Listing Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private (Only Owner)
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    // ✅ Check if the logged-in student owns the listing
    if (listing.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this listing",
      });
    }

    await listing.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Delete Listing Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, count: listings.length, data: listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
