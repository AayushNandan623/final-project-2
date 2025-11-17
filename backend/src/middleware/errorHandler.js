// backend/src/middleware/errorHandler.js
import { logger } from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message || err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal server error",
  });
}
