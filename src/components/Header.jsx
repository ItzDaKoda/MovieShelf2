import { Link } from "react-router-dom";

function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">
          MovieShelf
        </Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/watchlist" className="nav-link">
            Watchlist
          </Link>

          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => setSearchQuery(searchQuery)}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
