import { useContext } from "react";
import MovieGrid from "../components/MovieGrid";
import { MovieContext } from "../contexts/MovieContext";

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useContext(MovieContext);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you want to watch later</p>
      </div>

      {watchlist.length > 0 ? (
        <MovieGrid
          movies={watchlist}
          // Optional: lets MovieCard call remove and refresh UI if needed
          onRemoveWatchlist={(id) => removeFromWatchlist(id)}
        />
      ) : (
        <div className="empty-state">
          <p>Your watchlist is empty. Add some movies from Home!</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
