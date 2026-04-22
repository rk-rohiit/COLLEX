// src/config/index.js
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET","JWT_REFRESH_SECRET",];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
   refreshSecret: process.env.JWT_REFRESH_SECRET,
   jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

export default config;