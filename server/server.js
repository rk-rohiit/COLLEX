// src/server.js

import app from "./app.js";
import connectDB from "./config/db.js";
import config from "./config/index.js";
import { logger } from "./utils/logger.js";

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start server
    app.listen(config.port, () => {
      logger.info(
        `🚀 Server running in ${config.env} mode on port ${config.port}`
      );
    });

  } catch (error) {
    logger.error("❌ Failed to start server: " + error.message);
    process.exit(1);
  }
};

startServer();