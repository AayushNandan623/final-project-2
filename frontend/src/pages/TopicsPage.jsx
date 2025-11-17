import { useEffect, useState } from "react";
import TopicCard from "../components/TopicCard";

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/topics")
      .then((r) => r.json())
      .then((d) => setTopics(d.topics));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Human Rights Topics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
    </div>
  );
}
