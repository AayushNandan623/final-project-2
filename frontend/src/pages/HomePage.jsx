import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Human Rights Education
      </h1>

      <p className="text-gray-600 text-lg mb-8">
        Learn about fundamental human rights, explore real-world examples, and
        test your knowledge with interactive quizzes.
      </p>

      <div className="flex justify-center gap-6 mt-6">
        <Link
          to="/topics"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Explore Topics
        </Link>

        <Link
          to="/quiz"
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
