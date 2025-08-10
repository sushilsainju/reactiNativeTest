const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  BASE_URL: "https://api.themoviedb.org/3",
  Headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
};

const fetchMovies = async (query?: string) => {
  try {
    console.log("Fetching movies with query:", query);
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, {
      headers: TMDB_CONFIG.Headers,
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${id}?append_to_response=videos,images`,
      {
        headers: TMDB_CONFIG.Headers,
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};

export default fetchMovies;
