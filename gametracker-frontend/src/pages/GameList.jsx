import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard.jsx";
import "./GameList.css";

function GameList({ darkMode }) {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/games"); // Conecta a tu backend real
        const data = Array.isArray(res.data) ? res.data : [];
        setGames(data);
        setFilteredGames(data);
      } catch (err) {
        console.error(err);
        setError("Error cargando juegos.");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredGames(
      games.filter((g) => g && g.title && g.title.toLowerCase().includes(query))
    );
  };

  if (loading) return <p className="loading">Cargando juegos...</p>;
  if (error) return <p className="loading">{error}</p>;

  return (
    <div className={`game-list-container ${darkMode ? "dark" : "light"}`}>
      <header className="game-list-header">
        <h1 className="title">🎮 Game Library</h1>
        <input
          type="text"
          placeholder="Buscar juego 🔍..."
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>

      <div className="filters">
        <button className="filter-btn active">Todos</button>
        <button className="filter-btn">Nuevos</button>
        <button className="filter-btn">Populares</button>
        <button className="filter-btn">Favoritos</button>
      </div>

      <section className="games-grid">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) =>
            game ? <GameCard key={game._id || game.id} game={game} darkMode={darkMode} /> : null
          )
        ) : (
          <div className="no-results-container">
            <p className="no-results">No se encontraron juegos ⚙️</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default GameList;
