// backend/src/controllers/chatController.js
import { appendToSessionHistory } from "../store/sessionStore.js";
import { generateGeminiReply } from "../services/geminiService.js";

export async function chatWithBot(req, res, next) {
  try {
    const { message, topicId } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: true,
        message: "Field 'message' (string) is required.",
      });
    }

    // Add user message to session history
    appendToSessionHistory(req.sessionId, [{ role: "user", content: message }]);

    const reply = await generateGeminiReply({
      session: req.session,
      userMessage: message,
      topicId,
    });

    // Add model reply to session history
    appendToSessionHistory(req.sessionId, [{ role: "model", content: reply }]);

    res.json({
      error: false,
      sessionId: req.sessionId,
      reply,
    });
  } catch (err) {
    next(err);
  }
}
