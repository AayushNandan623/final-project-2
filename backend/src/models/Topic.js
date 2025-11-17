import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  summary: String,
  fullExplanation: String,
  examples: [String],
  scenarios: [String],
  didYouKnow: String,
});

export const Topic = mongoose.model("Topic", topicSchema);
