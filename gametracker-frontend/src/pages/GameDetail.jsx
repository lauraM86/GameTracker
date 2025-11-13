import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./GameDetail.css";

function GameDetail({ darkMode }) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/games/${id}`);
        setGame(res.data || null);
      } catch (err) {
        console.error(err);
        setError("Error cargando el juego.");
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) return <p className="loading">Cargando juego...</p>;
  if (error) return <p className="loading">{error}</p>;
  if (!game) return <p className="loading">Juego no encontrado 😢</p>;

  return (
    <div className={`detail-container ${darkMode ? "dark" : "light"}`}>
      <div className="detail-card">
        <img className="detail-image" src={game.image} alt={game.title} />
        <div className="detail-info">
          <h2>{game.title}</h2>
          <p className="genre">{game.genre}</p>
          <p className="description">{game.description}</p>
          <p className="rating">⭐ {game.rating}</p>
          <Link to="/games" className="back-btn">← Volver</Link>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
