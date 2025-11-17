import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ChatBotWidget from "../components/ChatBotWidget";

export default function TopicDetailPage() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/topics/${id}`)
      .then((r) => r.json())
      .then((d) => setTopic(d.topic));
  }, [id]);

  if (!topic) return <p>Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{topic.title}</h1>

      <div className="bg-white p-8 rounded-xl shadow mb-8">
        <p className="text-gray-700 text-lg mb-4">{topic.fullExplanation}</p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Examples:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {topic.examples.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">
          Real-life Scenarios:
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {topic.scenarios.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <Link
          to={`/quiz/${id}`}
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Take Topic Quiz
        </Link>
      </div>

      <ChatBotWidget topicId={id} />
    </div>
  );
}
