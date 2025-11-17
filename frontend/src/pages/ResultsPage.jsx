import React from "react";
import { useQuiz } from "../context/QuizContext.jsx";
import ChatBotWidget from "../components/ChatBotWidget.jsx";
import ScoreCard from "../components/ScoreCard.jsx";

export default function ResultsPage() {
  const { result, currentTopicId } = useQuiz();

  if (!result) return <p>No results yet.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Score Card */}
      <div className="bg-white p-10 rounded-xl shadow mb-8 text-center">
        <h1 className="text-4xl font-extrabold mb-2">
          {result.score}/{result.total}
        </h1>
        <p className="text-gray-600">Keep practicing!</p>
      </div>

      {/* Answer Review */}
      <div className="bg-white p-10 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-6">Answer Review</h2>

        <ol className="list-decimal pl-6 space-y-6">
          {result.details.map((item, idx) => (
            <li key={idx} className="text-lg">
              <strong className="block">{item.questionText}</strong>
              <p>Your answer: {item.userAnswerText || "No answer"}</p>
              <p>Correct answer: {item.correctAnswerText}</p>
              <p className="mt-1">
                Status:{" "}
                {item.isCorrect ? (
                  <span className="text-green-600 font-semibold">
                    ✔ Correct
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    ✘ Incorrect
                  </span>
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* AI Chat */}
      <ChatBotWidget topicId={currentTopicId} />
    </div>
  );
}
