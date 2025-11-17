import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import QuizPage from "./pages/QuizPage";
import TopicQuizPage from "./pages/TopicQuizPage";
import ResultsPage from "./pages/ResultsPage";
import { QuizProvider } from "./context/QuizContext";

export default function App() {
  return (
    <QuizProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topic/:id" element={<TopicDetailPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/quiz/:topicId" element={<TopicQuizPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </QuizProvider>
  );
}
