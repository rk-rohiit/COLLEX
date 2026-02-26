// src/modules/listing/listing.validation.js

export const validateCreateListing = (data) => {
  const {
    title,
    description,
    price,
    category,
    type,
    location,
    images,
  } = data;

  if (
    !title ||
    !description ||
    !price ||
    !category ||
    !type ||
    !location ||
    !images ||
    images.length === 0
  ) {
    throw new Error("All required fields must be provided");
  }

  if (!["sell", "rent"].includes(type)) {
    throw new Error("Invalid listing type");
  }
};

export const validateUpdateListing = (data) => {
  if (Object.keys(data).length === 0) {
    throw new Error("No data provided for update");
  }
};