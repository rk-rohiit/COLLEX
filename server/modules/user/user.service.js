// src/modules/user/user.service.js

import User from "../../models/user.model.js";

/* =========================
   Get Logged-in User
========================= */
export const getProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/* =========================
   Update Profile
========================= */
export const updateProfileService = async (userId, updateData) => {
  const allowedFields = [
    "fullName",
    "phone",
    "hostelBlock",
  ];

  const filteredData = {};

  Object.keys(updateData).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredData[key] = updateData[key];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    filteredData,
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

/* =========================
   Admin: Get All Users
========================= */
export const getAllUsersService = async () => {
  return await User.find().select("-password");
};

/* =========================
   Admin: Delete User
========================= */
export const deleteUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await user.deleteOne();

  return { message: "User deleted successfully" };
};