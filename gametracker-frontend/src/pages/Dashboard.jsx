import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard.jsx";
import "../styles/Dashboard.css";

function Dashboard({ darkMode }) {
  const [stats, setStats] = useState(null);
  const [completedGamesList, setCompletedGamesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsRes = await axios.get("/api/users/stats");
        const libraryRes = await axios.get("/api/users/library");

        setStats(statsRes.data || {});
        setCompletedGamesList(Array.isArray(libraryRes.data) ? libraryRes.data.slice(0, 3) : []);
      } catch (err) {
        console.error(err);
        setError("Error cargando datos. Intenta recargar.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="loading">Cargando datos...</p>;
  if (error) return <p className="loading">{error}</p>;

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <h1>📊 Inicio</h1>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Juegos Completados</h3>
          <p className="stat-number">{stats?.completedGames ?? 0}</p>
        </div>
        <div className="stat-card">
          <h3>Horas Jugadas</h3>
          <p className="stat-number">{stats?.hoursPlayed ?? 0}</p>
        </div>
        <div className="stat-card">
          <h3>Calificación Promedio</h3>
          <p className="stat-number">{(stats?.averageRating ?? 0).toFixed(1)} ⭐</p>
        </div>
      </div>

      <h2>🎮 Juegos Completados</h2>
      <div className="completed-games-grid">
        {completedGamesList.length > 0 ? (
          completedGamesList.map((game) =>
            game ? <GameCard key={game._id || game.id} game={game} darkMode={darkMode} /> : null
          )
        ) : (
          <p>No hay juegos completados.</p>
        )}
      </div>

      <h3>Categorías de Juegos</h3>
      <div className="categories-bar">
        {(stats?.categories ?? []).map((cat) => (
          <div key={cat.name} className="category">
            <span>{cat.name}</span>
            <div className="bar-background">
              <div className="bar-fill" style={{ width: `${cat.percentage ?? 0}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
