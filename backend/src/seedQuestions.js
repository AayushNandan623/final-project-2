import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { QuizQuestion } from "../src/models/QuizQuestion.js";

const questions = [];

// Utility to add multiple questions easily
function add(topicId, question, options, answerIndex) {
  questions.push({
    topicId,
    question,
    options: options.map((o) => ({ text: o })),
    answerIndex,
  });
}

// Add 5 questions per topic
add(
  "right-to-equality",
  "Which is a violation of equality?",
  ["Equal pay", "Caste-based denial", "Equal rights", "Equal voting"],
  1
);
add(
  "right-to-equality",
  "Equality ensures:",
  ["Discrimination", "Fair treatment", "Bias", "Segregation"],
  1
);
add(
  "right-to-equality",
  "Which law ensures equality?",
  ["Article 14", "Article 30", "Article 25", "Article 19"],
  0
);
add(
  "right-to-equality",
  "Unequal wages based on gender is:",
  ["Normal", "Violation", "Encouraged", "Ignored"],
  1
);
add(
  "right-to-equality",
  "Equal voting rights show:",
  ["Inequality", "Exploitation", "Fairness", "Debt"],
  2
);

add(
  "freedom-of-expression",
  "Freedom of expression protects:",
  ["Violence", "Peaceful criticism", "Hate speech", "Threats"],
  1
);
add(
  "freedom-of-expression",
  "Which is NOT allowed?",
  [
    "Peaceful protest",
    "Artistic expression",
    "Inciting violence",
    "Publishing opinions",
  ],
  2
);
add(
  "freedom-of-expression",
  "Freedom of speech is under:",
  ["Article 19", "Article 25", "Article 14", "Article 32"],
  0
);
add(
  "freedom-of-expression",
  "Censoring peaceful posts is:",
  ["Legal", "Violation", "Required", "Fair"],
  1
);
add(
  "freedom-of-expression",
  "Free press ensures:",
  ["Blind obedience", "Accountability", "Violence", "Propaganda"],
  1
);

add(
  "right-to-education",
  "Which is a violation?",
  ["Scholarships", "Schools denying girls", "Free schooling", "Books"],
  1
);
add(
  "right-to-education",
  "Education promotes:",
  ["Ignorance", "Rights", "Inequality", "Segregation"],
  1
);
add(
  "right-to-education",
  "Education is under:",
  ["Article 30", "Article 21A", "Article 25", "Article 14"],
  1
);
add(
  "right-to-education",
  "Child labor impacts:",
  ["Learning", "Freedom", "Growth", "All of these"],
  3
);
add(
  "right-to-education",
  "RTE Act started in:",
  ["2009", "2014", "1950", "2017"],
  0
);

add(
  "right-to-privacy",
  "Privacy protects:",
  ["Data", "Personal space", "Communication", "All of these"],
  3
);
add(
  "right-to-privacy",
  "Unauthorized CCTV is:",
  ["Safe", "A violation", "Allowed", "Ignored"],
  1
);
add(
  "right-to-privacy",
  "India recognized privacy in:",
  ["2017", "2001", "1950", "2020"],
  0
);
add(
  "right-to-privacy",
  "Leaking medical records is:",
  ["Legal", "Harmless", "Violation", "Normal"],
  2
);
add(
  "right-to-privacy",
  "Which is private?",
  ["Aadhar details", "Personal chats", "Passwords", "All"],
  3
);

add(
  "right-to-life",
  "Right to life ensures:",
  ["Violence", "Dignity", "Harm", "Discrimination"],
  1
);
add(
  "right-to-life",
  "Police brutality is:",
  ["Protection", "Violation", "Normal", "Policy"],
  1
);
add(
  "right-to-life",
  "Clean water ensures:",
  ["Life", "Death", "Harm", "Crime"],
  0
);
add(
  "right-to-life",
  "Right to life is under:",
  ["Article 21", "Article 25", "Article 14", "Article 19"],
  0
);
add(
  "right-to-life",
  "Unsafe workplaces violate:",
  ["Dignity", "Right to life", "Equality", "Privacy"],
  1
);

add(
  "freedom-of-religion",
  "Freedom of religion allows:",
  ["Forcing others", "Practicing faith", "Violence", "Threats"],
  1
);
add(
  "freedom-of-religion",
  "Which is a violation?",
  ["Celebrating festivals", "Forced conversion", "Wearing symbols", "Worship"],
  1
);
add(
  "freedom-of-religion",
  "Freedom of religion is under:",
  ["Article 14", "Article 19", "Article 25–28", "Article 32"],
  2
);
add(
  "freedom-of-religion",
  "Denying entry due to religion is:",
  ["Normal", "Violation", "Fun", "Legal"],
  1
);
add(
  "freedom-of-religion",
  "Secularism means:",
  ["No equality", "All religions equal", "One religion rule", "No worship"],
  1
);

add(
  "right-against-exploitation",
  "Child labor is:",
  ["Legal", "Crime", "Encouraged", "Fair"],
  1
);
add(
  "right-against-exploitation",
  "Exploitation includes:",
  ["Trafficking", "Forced labor", "Bonded labor", "All"],
  3
);
add(
  "right-against-exploitation",
  "Article 23–24 deal with:",
  ["Education", "Privacy", "Exploitation", "Religion"],
  2
);
add(
  "right-against-exploitation",
  "Forced labor is:",
  ["Violation", "Encouraged", "Normal", "Legal"],
  0
);
add(
  "right-against-exploitation",
  "Human trafficking violates:",
  ["Life", "Privacy", "Equality", "All"],
  3
);

add(
  "right-to-constitutional-remedies",
  "This right allows:",
  ["Violence", "Writ petitions", "Threats", "Discrimination"],
  1
);
add(
  "right-to-constitutional-remedies",
  "Called heart of Constitution by:",
  ["Gandhi", "Ambedkar", "Nehru", "Tagore"],
  1
);
add(
  "right-to-constitutional-remedies",
  "Illegal detention is resolved using:",
  ["Habeas corpus", "GIF", "Article 19", "Protest"],
  0
);
add(
  "right-to-constitutional-remedies",
  "Writs protect:",
  ["Rights", "Crime", "Bias", "Oppression"],
  0
);
add(
  "right-to-constitutional-remedies",
  "Courts safeguard:",
  ["Rights", "Violence", "Propaganda", "Hate"],
  0
);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await QuizQuestion.deleteMany({});
    await QuizQuestion.insertMany(questions);
    console.log("🌱 Questions seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
