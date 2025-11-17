import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { useEffect } from "react";

export default function QuizPage() {
  const navigate = useNavigate();
  const {
    activeQuestions,
    currentIndex,
    startFullQuiz,
    selectAnswerForCurrent,
    answers,
    goNext,
    finishQuiz,
    showImmediateFeedback,
    setShowImmediateFeedback,
  } = useQuiz();

  useEffect(() => startFullQuiz(), []);

  if (!activeQuestions.length) return <p>Loading quiz…</p>;

  const q = activeQuestions[currentIndex];
  const selected = answers[q.id];

  const handleNext = async () => {
    if (currentIndex + 1 === activeQuestions.length) {
      await finishQuiz();
      navigate("/results");
    } else goNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Full Quiz</h1>

      {/* Progress Header */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <p className="font-semibold">
          Question {currentIndex + 1} / {activeQuestions.length}
        </p>
      </div>

      <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
        <div
          className="h-full bg-green-500 rounded-full transition-all"
          style={{
            width: `${((currentIndex + 1) / activeQuestions.length) * 100}%`,
          }}
        />
      </div>

      {/* Toggle */}
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={showImmediateFeedback}
          onChange={(e) => setShowImmediateFeedback(e.target.checked)}
        />
        <span>Show correct/incorrect feedback</span>
      </label>

      <QuizQuestion
        question={q}
        selectedIndex={selected}
        onSelect={selectAnswerForCurrent}
        showFeedback={showImmediateFeedback}
      />

      <button
        disabled={selected == null}
        onClick={handleNext}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {currentIndex + 1 === activeQuestions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
