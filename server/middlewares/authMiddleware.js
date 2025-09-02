import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { JWT_SECRET } from "../utils/constants.js";

export const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};
