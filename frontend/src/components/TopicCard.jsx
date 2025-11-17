import { Link } from "react-router-dom";

export default function TopicCard({ topic }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
      <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
      <p className="text-gray-600 mb-4">{topic.summary}</p>

      <Link
        to={`/topic/${topic.id}`}
        className="text-blue-600 hover:underline font-semibold"
      >
        Learn more →
      </Link>

      <Link
        to={`/quiz/${topic.id}`}
        className="block mt-3 text-blue-600 hover:underline font-semibold"
      >
        Take topic quiz →
      </Link>
    </div>
  );
}
