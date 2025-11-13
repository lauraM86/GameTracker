import React from "react";
import "./GameCard.css";

function GameCard({ game, darkMode }) {
  return (
    <div className={`game-card ${darkMode ? "dark" : "light"}`}>
      <img src={game.image} alt={game.title} className="game-image" />
      <div className="game-info">
        <h3>{game.title}</h3>
        <p>{game.genre}</p>
        <p>⭐ {game.rating}</p>
      </div>
    </div>
  );
}

export default GameCard;
