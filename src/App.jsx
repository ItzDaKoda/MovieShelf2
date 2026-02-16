import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { searchMovies } from "./services/movieService";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const q = searchQuery.trim();

    // If empty, clear search mode
    if (!q) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError("");
      return;
    }

    // Debounce so it searches while typing without spamming requests
    const timeout = setTimeout(async () => {
      try {
        setSearchLoading(true);
        setSearchError("");
        const results = await searchMovies(q);
        setSearchResults(results);
      } catch (err) {
        setSearchError(err?.message || "Search failed.");
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return (
    <Router>
      <div className="app">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                searchResults={searchResults}
                searchLoading={searchLoading}
                searchError={searchError}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
