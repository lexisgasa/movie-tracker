import { useEffect, useState } from "react";

const KEY = "a2137f99";

const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!query) return;
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await response.json();

        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
    })();
  }, [query]);

  return { movies, error, isLoading };
};

export default useMovies;
