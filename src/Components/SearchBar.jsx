import { useRef } from "react";
import useKey from "../hooks/useKey";

const SearchBar = ({ query, setQuery }) => {
  const inputElement = useRef(null);

  useKey("enter", () => {
    if (document.activeElement === inputElement.current) return;

    inputElement.current.focus();
    setQuery("");
  });

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
