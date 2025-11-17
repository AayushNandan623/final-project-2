import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatBotWidget({ topicId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      from: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          topicId,
        }),
      });

      const data = await res.json();

      const botMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: data.reply || "Sorry, I couldn't understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);

      const botErrorMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: "⚠️ Something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, botErrorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Ask AI Tutor</h2>

      {/* Chat messages box */}
      <div className="h-72 overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">
            Ask a question about this topic. Example:{" "}
            <span className="italic">
              “Explain this right in simple words.”
            </span>
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "user" ? (
              <div className="max-w-xs bg-blue-600 text-white px-4 py-2 rounded-2xl shadow">
                {msg.text}
              </div>
            ) : (
              <div className="max-w-xl bg-white px-4 py-3 rounded-2xl shadow border border-gray-200">
                {/* Markdown wrapper (ReactMarkdown cannot receive className) */}
                <div className="prose prose-slate max-w-none text-sm">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && <div className="text-gray-500 text-xs mt-1">Thinking…</div>}
      </div>

      {/* Input + send button */}
      <div className="flex gap-3 mt-4">
        <textarea
          rows={2}
          className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-semibold
                     hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed self-end"
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
