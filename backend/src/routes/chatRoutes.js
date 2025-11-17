// backend/src/routes/chatRoutes.js
import { Router } from "express";
import { chatWithBot } from "../controllers/chatController.js";

const router = Router();

// POST /api/chat
router.post("/", chatWithBot);

export default router;
