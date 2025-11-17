// backend/src/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { sessionMiddleware } from "./middleware/sessionMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";
import chatRoutes from "./routes/chatRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { connectDB } from "./config/db.js";
import quizRoutes from "./routes/quizRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
connectDB(process.env.MONGO_URI);

// Attach temporary session
app.use(sessionMiddleware);

// Routes
app.use("/api/topics", topicRoutes);
app.use("/api", healthRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/quiz", quizRoutes);
// Error handler (must be after routes)
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  logger.info(`Backend server listening on port ${config.port}`);
  logger.info(`CORS origin allowed: ${config.clientOrigin}`);
});
