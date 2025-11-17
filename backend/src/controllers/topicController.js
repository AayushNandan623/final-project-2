import { Topic } from "../models/Topic.js";

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find({});
    res.json({ topics });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch topics" });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findOne({ id: req.params.id });
    if (!topic) return res.status(404).json({ error: "Topic not found" });
    res.json({ topic });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch topic" });
  }
};
