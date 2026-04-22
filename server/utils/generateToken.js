import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn || "15m" } // 🔥 short life
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    config.refreshSecret,
    { expiresIn: "7d" } // 🔥 long life
  );
};