// backend/src/middleware/sessionMiddleware.js
import { v4 as uuidv4 } from "uuid";
import { upsertSession } from "../store/sessionStore.js";

const SESSION_COOKIE_NAME = "hre_session_id";

export function sessionMiddleware(req, res, next) {
  let sessionId = req.cookies?.[SESSION_COOKIE_NAME];

  if (!sessionId) {
    sessionId = uuidv4();
    // temp session cookie
    res.cookie(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  }

  const session = upsertSession(sessionId);

  req.sessionId = sessionId;
  req.session = session;

  next();
}
