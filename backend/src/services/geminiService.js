// backend/src/services/geminiService.js
import { config } from "../config/env.js";
import { logger } from "../utils/logger.js";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * Build a prompt that guides Gemini to answer
 * within the Human Rights Education domain.
 */
function buildPrompt({ userMessage, topicId }) {
  let topicHint = "";
  if (topicId) {
    topicHint = `\nThe user is currently learning about: ${topicId}. Tailor your explanation to this topic where relevant.`;
  }

  return `
You are a helpful Human Rights Education tutor. 
Explain concepts in simple language and provide concrete examples.
Avoid giving legal advice. Focus on awareness and understanding.

User question: ${userMessage}
${topicHint}

Structure your response as:
1. Short answer
2. Explanation
3. Example or real-life scenario (if possible)
`;
}

/**
 * Call Gemini API (simple text mode).
 * You can later extend this to support multi-turn chat using session history.
 */
export async function generateGeminiReply({ session, userMessage, topicId }) {
  if (!config.geminiApiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Set it in your .env file."
    );
  }

  const prompt = buildPrompt({ userMessage, topicId });

  const url = `${GEMINI_API_URL}/${encodeURIComponent(
    config.geminiModel
  )}:generateContent?key=${encodeURIComponent(config.geminiApiKey)}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    logger.error("Gemini API error:", response.status, errText);
    throw new Error("Failed to get response from Gemini API");
  }

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, I couldn't generate an answer at the moment.";

  return text;
}
