import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    sessionId: String,
    topicId: String,
    totalQuestions: Number,
    correctAnswers: Number,
    answers: [
      {
        questionId: String,
        selectedIndex: Number,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export const QuizResult = mongoose.model("QuizResult", quizResultSchema);
