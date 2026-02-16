
import { useContext, useEffect, useMemo, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";

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

    // 
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useContext(MovieContext);

  const inWatchlist = isInWatchlist(movie.id);

  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };


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
    <div className="movie-info">
  <h3 className="movie-title">{movie.title}</h3>

  <div className="movie-details">
    <span className="movie-rating">⭐ {movie.vote_average}</span>
    <span className="movie-year">{year}</span>
  </div>

  <button className="favorite-button" onClick={toggleFavorite}>
    {isFavorite ? "♥ Remove Favorite" : "♡ Add to Favorites"}
  </button>

  <button className="watchlist-button" onClick={toggleWatchlist}>
    {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
  </button>
</div>
  );
}

export default MovieCard;
