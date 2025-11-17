import { useNavigate } from "react-router-dom";

export const useSubmitQuiz = (sessionId) => {
  const navigate = useNavigate();

  const submitQuiz = async ({ topicId, answers, setResult }) => {
    try {
      const res = await fetch("http://localhost:5000/api/quiz/submit", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          topicId,
          answers, // { questionId: selectedIndex }
        }),
      });

      const data = await res.json();
      setResult(data);

      navigate("/results");
    } catch (err) {
      console.error("Quiz submission failed:", err);
    }
  };

  return submitQuiz;
};
