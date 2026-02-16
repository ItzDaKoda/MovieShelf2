import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

const FAVORITES_KEY = "movieshelf_favorites";

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const loadFavorites = () => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setFavoriteMovies(Array.isArray(parsed) ? parsed : []);
    } catch {
      setFavoriteMovies([]);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>

      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} onFavoriteChange={loadFavorites} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
}

export default Favorites;
