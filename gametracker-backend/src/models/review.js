import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  user: { type: String, required: true },
  comment: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now },
});

export const Review = mongoose.model("Review", reviewSchema);
