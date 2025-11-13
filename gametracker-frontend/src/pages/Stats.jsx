import { useEffect, useState } from "react";
import { getGames } from "../services/Api.js"; 
import "./Stats.css";

function Stats() {
  const [stats, setStats] = useState({
    completedGames: 0,
    hoursPlayed: 0,
    averageRating: 0,
    genres: [],
  });

  useEffect(() => {
    getGames().then((games) => {
      const completedGames = games.filter(g => g.completed).length;
      const hoursPlayed = games.reduce((acc, g) => acc + (g.hoursPlayed || 0), 0);
      const averageRating =
        games.reduce((acc, g) => acc + (g.rating || 0), 0) /
        (games.length || 1);


      const genreCount = {};
      games.forEach(g => {
        g.genre?.forEach(gen => {
          genreCount[gen] = (genreCount[gen] || 0) + 1;
        });
      });
      const totalGenres = Object.values(genreCount).reduce((a,b)=>a+b,0);
      const genres = Object.entries(genreCount).map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalGenres) * 100)
      }));

      setStats({ completedGames, hoursPlayed, averageRating, genres });
    });
  }, []);

  return (
    <div className="stats-container">
      <h1>📊 Estadísticas de la Biblioteca</h1>

      <div className="stats-cards">
        <div className="stat-card">
          <h2>{stats.completedGames}</h2>
          <p>Juegos Completados</p>
        </div>
        <div className="stat-card">
          <h2>{stats.hoursPlayed}</h2>
          <p>Horas Jugadas</p>
        </div>
        <div className="stat-card">
          <h2>{stats.averageRating.toFixed(1)} ⭐</h2>
          <p>Calificación Promedio</p>
        </div>
      </div>

      <h2>Distribución por Género</h2>
      <div className="genre-stats">
        {stats.genres.map((g) => (
          <div key={g.name} className="genre-bar">
            <span className="genre-name">{g.name}</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${g.percentage}%` }}
              ></div>
            </div>
            <span className="genre-percent">{g.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;
