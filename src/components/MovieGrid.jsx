import MovieCard from "./MovieCard";

function MovieGrid({ movies, onFavoriteChange }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onFavoriteChange={onFavoriteChange} />
      ))}
    </div>
  );
}

export default MovieGrid;
