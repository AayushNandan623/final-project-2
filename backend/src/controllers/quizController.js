import { QuizQuestion } from "../models/QuizQuestion.js";
import { QuizResult } from "../models/QuizResult.js";

/* GET full quiz */
export async function getFullQuiz(req, res) {
  const questions = await QuizQuestion.find().lean();

  const formatted = questions.map((q) => ({
    id: q._id.toString(),
    topicId: q.topicId,
    question: q.question,
    options: q.options.map((o) => o.text),
    answerIndex: q.answerIndex,
  }));

  res.json({ questions: formatted });
}


/* GET topic quiz */
export async function getTopicQuiz(req, res) {
  const { topicId } = req.params;

  const questions = await QuizQuestion.find({ topicId }).lean();

  const formatted = questions.map((q) => ({
    id: q._id.toString(),
    topicId: q.topicId,
    question: q.question,
    options: q.options.map((o) => o.text),
    answerIndex: q.answerIndex,
  }));

  res.json({ questions: formatted });
}


/* POST quiz submit */
/* POST quiz submit */
export async function submitQuiz(req, res) {
  const { answers, topicId, sessionId } = req.body;

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ error: "Missing answers" });
  }

  // Convert to ObjectId safely
  const questionIds = Object.keys(answers);

  const dbQuestions = await QuizQuestion.find({
    _id: { $in: questionIds }
  }).lean();

  let correct = 0;
  const detailed = [];

  dbQuestions.forEach((q) => {
    const user = answers[q._id.toString()];

    if (!user) return;

    const isCorrect = user.selectedIndex === q.answerIndex;

    if (isCorrect) correct++;

    detailed.push({
      questionId: q._id.toString(),
      selectedIndex: user.selectedIndex,
      correctAnswerIndex: q.answerIndex,
      isCorrect,
      questionText: q.question,
      userAnswerText: q.options[user.selectedIndex]?.text,
      correctAnswerText: q.options[q.answerIndex]?.text
    });
  });

  await QuizResult.create({
    sessionId,
    topicId,
    totalQuestions: dbQuestions.length,
    correctAnswers: correct,
    answers: detailed
  });

  return res.json({
    score: correct,
    total: dbQuestions.length,
    details: detailed
  });
}

