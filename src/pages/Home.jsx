import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { getPopularMovies } from "../services/movieService";

function Home({ searchQuery, searchResults, searchLoading, searchError }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularLoading, setPopularLoading] = useState(false);
  const [popularError, setPopularError] = useState("");

  useEffect(() => {
    const loadPopular = async () => {
      try {
        setPopularLoading(true);
        setPopularError("");
        const movies = await getPopularMovies();
        setPopularMovies(movies);
      } catch (err) {
        setPopularError(err?.message || "Failed to load popular movies.");
      } finally {
        setPopularLoading(false);
      }
    };

    loadPopular();
  }, []);

  const inSearchMode = (searchQuery || "").trim().length > 0;

  const moviesToShow = inSearchMode ? searchResults : popularMovies;
  const loadingToShow = inSearchMode ? searchLoading : popularLoading;
  const errorToShow = inSearchMode ? searchError : popularError;

    return (
      <main className="main-content">
        <div className="content-header">
          <h1>Popular Movies</h1>
        </div>
        <MovieGrid
          movies={moviesToShow}
          loading={loadingToShow}
          error={errorToShow}
        />
      </main>
    );
  }
  
  export default Home;
