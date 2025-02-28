import { useState } from "react";
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
import useLocalStorage from "./hooks/useLocalStorage";
import useMovies from "./hooks/useMovies";

export default function App() {
  const [watched, setWatched] = useLocalStorage("watchedMovies", []);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, error, isLoading } = useMovies(query, handleCloseMovie);

  const handleSelectedId = (id) => {
    setSelectedId((currentSelectedId) =>
      id === currentSelectedId ? null : id
    );
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }

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
