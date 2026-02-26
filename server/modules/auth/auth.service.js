// src/modules/auth/auth.service.js

import User from "../../models/user.model.js";
import { generateToken } from "../../utils/generateToken.js";

export const registerUserService = async (data) => {
  const { email } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create(data);

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  };
};

export const loginUserService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  };
};