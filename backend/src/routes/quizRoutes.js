import { Router } from "express";
import {
  getFullQuiz,
  getTopicQuiz,
  submitQuiz,
} from "../controllers/quizController.js";

const router = Router();

router.get("/full", getFullQuiz);
router.get("/topic/:topicId", getTopicQuiz);
router.post("/submit", submitQuiz);

export default router;
