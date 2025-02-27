import { useEffect, useRef } from "react";

const SearchBar = ({ query, setQuery }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    const callback = (event) => {
      if (document.activeElement === inputElement.current) return;

      if (event.code === "Enter") {
        inputElement.current.focus();
        setQuery("");
      }
    };

    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Type a movie title here.."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
};

export default SearchBar;
