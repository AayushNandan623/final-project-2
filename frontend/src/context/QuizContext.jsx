import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { API_BASE } from "../config/api";

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const [mode, setMode] = useState(null); // "full" | "topic"
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showImmediateFeedback, setShowImmediateFeedback] = useState(true);

  // Load full quiz from backend
  const startFullQuiz = useCallback(async () => {
    setMode("full");
    setCurrentTopicId(null);
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);

    const res = await fetch(`${API_BASE}/quiz/full`, {
      credentials: "include",
    });
    const data = await res.json();
    setActiveQuestions(data.questions || []);
  }, []);

  // Load topic quiz from backend
  const startTopicQuiz = useCallback(async (topicId) => {
    setMode("topic");
    setCurrentTopicId(topicId);
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);

    const res = await fetch(`${API_BASE}/quiz/topic/${topicId}`, {
      credentials: "include",
    });
    const data = await res.json();
    setActiveQuestions(data.questions || []);
  }, []);

  const selectAnswerForCurrent = useCallback(
    (selectedIndex) => {
      const q = activeQuestions[currentIndex];
      if (!q) return;
      setAnswers((prev) => ({
        ...prev,
        [q.id]: selectedIndex,
      }));
    },
    [activeQuestions, currentIndex]
  );

  const goNext = useCallback(() => {
    setCurrentIndex((idx) => Math.min(idx + 1, activeQuestions.length - 1));
  }, [activeQuestions.length]);

  const resetQuiz = useCallback(() => {
    setMode(null);
    setCurrentTopicId(null);
    setActiveQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  }, []);

  const finishQuiz = useCallback(async () => {
    const payloadAnswers = {};
    Object.entries(answers).forEach(([qid, idx]) => {
      payloadAnswers[qid] = { selectedIndex: idx };
    });

    const res = await fetch(`${API_BASE}/quiz/submit`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: payloadAnswers,
        topicId: currentTopicId,
        sessionId: "temp-session", // backend ignores or stores
      }),
    });

    const data = await res.json();
    setResult(data);
    localStorage.setItem("hre_lastScore", JSON.stringify(data));
  }, [answers, currentTopicId]);

  return (
    <QuizContext.Provider
      value={{
        mode,
        currentTopicId,
        activeQuestions,
        currentIndex,
        answers,
        result,
        showImmediateFeedback,
        setShowImmediateFeedback,
        startFullQuiz,
        startTopicQuiz,
        selectAnswerForCurrent,
        goNext,
        finishQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => useContext(QuizContext);
