import fs from "fs";
import mongoose from "mongoose";
import { Topic } from "./models/Topic.js";
import dotenv from "dotenv";

dotenv.config();

async function seedTopics() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected.");

    const data = JSON.parse(fs.readFileSync("./src/data/topics.json", "utf8"));

    await Topic.deleteMany({});
    await Topic.insertMany(data);

    console.log("Topics inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seedTopics();
