// backend/src/config/env.js
import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || "gemini-1.5-pro",
  sessionTtlMinutes: Number(process.env.SESSION_TTL_MINUTES || "60"),
};

if (!config.geminiApiKey) {
  console.warn(
    "[WARN] GEMINI_API_KEY is not set. Chatbot endpoint will not work."
  );
}
