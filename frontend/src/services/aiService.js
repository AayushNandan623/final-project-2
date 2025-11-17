import { API_BASE } from "../config/api";

export async function askAI(message, topicId) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, topicId }),
  });
  return res.json();
}
