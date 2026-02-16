import { useEffect, useMemo, useState } from "react";

const FAVORITES_KEY = "movieshelf_favorites";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

function readFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeFavorites(favs) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

function MovieCard({ movie, onFavoriteChange }) {
  const posterUrl = movie?.poster_path
    ? `${POSTER_BASE}${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Poster";

  const year = useMemo(() => {
    const d = movie?.release_date;
    return d && d.length >= 4 ? d.substring(0, 4) : "N/A";
  }, [movie]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = readFavorites();
    setIsFavorite(favs.some((m) => m.id === movie.id));
  }, [movie?.id]);

  const toggleFavorite = () => {
    const favs = readFavorites();
    const exists = favs.some((m) => m.id === movie.id);

    let next;
    if (exists) {
      next = favs.filter((m) => m.id !== movie.id);
    } else {
      next = [movie, ...favs];
    }

    writeFavorites(next);
    setIsFavorite(!exists);

    if (typeof onFavoriteChange === "function") {
      onFavoriteChange();
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{year}</span>
        </div>

        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? "♥ Remove Favorite" : "♡ Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
