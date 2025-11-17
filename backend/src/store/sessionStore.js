// backend/src/store/sessionStore.js
import { config } from "../config/env.js";

const sessions = new Map(); // sessionId -> { createdAt, lastSeen, history: [...] }

const TTL_MS = config.sessionTtlMinutes * 60 * 1000;

export function getSession(sessionId) {
  if (!sessionId) return null;
  const session = sessions.get(sessionId);
  if (!session) return null;

  const now = Date.now();
  if (now - session.createdAt > TTL_MS) {
    sessions.delete(sessionId);
    return null;
  }

  session.lastSeen = now;
  return session;
}

export function createSession(sessionId) {
  const now = Date.now();
  const session = {
    id: sessionId,
    createdAt: now,
    lastSeen: now,
    history: [], // { role: 'user' | 'model' | 'system', content: string }
  };
  sessions.set(sessionId, session);
  return session;
}

export function upsertSession(sessionId) {
  const existing = getSession(sessionId);
  if (existing) return existing;
  return createSession(sessionId);
}

/**
 * Store limited conversation history per session.
 * This helps with context for Gemini.
 */
export function appendToSessionHistory(sessionId, newMessages) {
  const session = upsertSession(sessionId);
  session.history.push(...newMessages);
  // Keep only last N messages to avoid unbounded growth
  const MAX_MESSAGES = 20;
  if (session.history.length > MAX_MESSAGES) {
    session.history = session.history.slice(-MAX_MESSAGES);
  }
  return session;
}
