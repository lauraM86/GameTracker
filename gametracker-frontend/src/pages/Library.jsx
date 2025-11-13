import { useEffect, useState } from "react";
import axios from "axios";
import GameCard from "../components/GameCard.jsx";
import "./Library.css";

function Library({ darkMode }) {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/library"); // endpoint real
        const data = Array.isArray(res.data) ? res.data : [];
        setLibrary(data);
      } catch (err) {
        console.error(err);
        setError("Error cargando biblioteca.");
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  if (loading) return <p className="loading">Cargando biblioteca...</p>;
  if (error) return <p className="loading">{error}</p>;

  return (
    <div className={`library-container ${darkMode ? "dark" : "light"}`}>
      <header className="library-header">
        <h1>📚 Mi Biblioteca</h1>
      </header>

      <div className="library-grid">
        {library.length > 0 ? (
          library.map((game) =>
            game ? <GameCard key={game._id || game.id} game={game} darkMode={darkMode} /> : null
          )
        ) : (
          <p className="no-results">No tienes juegos en tu biblioteca 😢</p>
        )}
      </div>
    </div>
  );
}

export default Library;
