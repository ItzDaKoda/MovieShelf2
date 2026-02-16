import { createContext, useEffect, useMemo, useState } from "react";

export const MovieContext = createContext(null);

const WATCHLIST_KEY = "movieshelf_watchlist";

function safeParse(json, fallback) {
  try {
    const parsed = JSON.parse(json);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    const parsed = safeParse(raw, []);
    return Array.isArray(parsed) ? parsed : [];
  });

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [movie, ...prev];
    });
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  // 7) Persist watchlist to localStorage
  useEffect(() => {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const value = useMemo(
    () => ({
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
    }),
    [watchlist]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
