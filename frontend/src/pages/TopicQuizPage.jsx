import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext.jsx";
import QuizQuestion from "../components/QuizQuestion.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

const TopicQuizPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const {
    activeQuestions,
    currentIndex,
    startTopicQuiz,
    selectAnswerForCurrent,
    answers,
    goNext,
    finishQuiz,
    showImmediateFeedback,
    setShowImmediateFeedback,
  } = useQuiz();

  useEffect(() => {
    startTopicQuiz(topicId);
  }, [topicId]);

  if (!activeQuestions.length) return <p>Loading quiz…</p>;

  const q = activeQuestions[currentIndex];
  const selected = answers[q.id];

  const handleNext = async () => {
    if (currentIndex + 1 === activeQuestions.length) {
      await finishQuiz();
      navigate("/results");
    } else {
      goNext();
    }
  };

  return (
    <div className="wide-card">
      <h1 className="section-title">Topic Quiz</h1>

      <div className="card">
        <strong>
          Question {currentIndex + 1} / {activeQuestions.length}
        </strong>
      </div>

      <ProgressBar current={currentIndex + 1} total={activeQuestions.length} />

      <label style={{ marginBottom: "1rem", display: "block" }}>
        <input
          type="checkbox"
          checked={showImmediateFeedback}
          onChange={(e) => setShowImmediateFeedback(e.target.checked)}
        />
        Show correct/incorrect feedback
      </label>

      <QuizQuestion
        question={q}
        selectedIndex={selected}
        onSelect={selectAnswerForCurrent}
        showFeedback={showImmediateFeedback}
      />

      <button
        onClick={handleNext}
        disabled={selected == null}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg
             hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {currentIndex + 1 === activeQuestions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default TopicQuizPage;
