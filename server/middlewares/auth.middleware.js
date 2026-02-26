// src/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/index.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error = new Error("Not authorized, token missing");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (err) {
    err.statusCode = err.statusCode || 401;
    next(err);
  }
};