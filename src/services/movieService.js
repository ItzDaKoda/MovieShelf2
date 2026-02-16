// src/services/movieService.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

if (!API_KEY) {
  console.warn("Missing VITE_TMDB_API_KEY in .env");
}
if (!BASE_URL) {
  console.warn("Missing VITE_TMDB_BASE_URL in .env");
}

async function request(endpoint) {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url);
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data?.status_message || message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  return res.json();
}

export async function getPopularMovies() {
  const data = await request(`/movie/popular?api_key=${API_KEY}`);
  return data.results || [];
}

export async function searchMovies(query) {
  const q = query?.trim();
  if (!q) return [];
  const data = await request(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(q)}`
  );
  return data.results || [];
}
