// src/config/db.js
import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    console.log("✅ MongoDB Connected Successfully");

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠ MongoDB Disconnected");
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;