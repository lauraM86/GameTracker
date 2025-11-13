import { Review } from "../models/Review.js";
import { Game } from "../models/Game.js";


export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("game");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reseñas" });
  }
};


export const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();


    const game = await Game.findById(review.game);
    const reviews = await Review.find({ game: game._id });
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    game.averageRating = avg;
    await game.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: "Error al crear la reseña" });
  }
};
