import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  platform: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  description: String,
  averageRating: { type: Number, default: 0 },
});

export const Game = mongoose.model("Game", gameSchema);

