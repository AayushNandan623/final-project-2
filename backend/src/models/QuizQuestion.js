import mongoose from "mongoose";

const quizQuestionSchema = new mongoose.Schema({
  question: String,
  options: [{ text: String }],
  answerIndex: Number,
  topicId: String,
});

export const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);
