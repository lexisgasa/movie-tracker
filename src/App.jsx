import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./Components/SearchBar";
import NumResults from "./Components/NumResults";
import Main from "./Main/Main";
import MovieList from "./MovieList/MovieList";
import Summary from "./Summary/Summary";
import WatchedMovieList from "./WatchedMovieList/WatchedMovieList";
import Box from "./Box/Box";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import useLocalStorage from "./hooks/useLocalStorage/useLocalStorage";

const KEY = "a2137f99";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useLocalStorage("watchedMovies", []);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectedId = (id) => {
    setSelectedId((currentSelectedId) =>
      id === currentSelectedId ? null : id
    );
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatchedMovie = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => {
      return watched.filter((movie) => {
        return movie.imdbID !== id;
      });
    });
  };

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
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
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
      handleCloseMovie();
    })();
  }, [query]);

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && query.length > 3 && (
            <MovieList movies={movies} onSelectMovie={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
              handleCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
