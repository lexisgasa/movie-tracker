const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Type a movie title here.."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;
