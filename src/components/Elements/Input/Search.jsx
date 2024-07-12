import { useState } from "react";

function Search({ onSearchChange }) {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearchChange(search);
    setSearch("");
  }

  return (
    <form onSubmit={handleSubmit} className="join ">
      <div>
        <div>
          <input
            className="input input-bordered join-item lg:w-[500px]"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="indicator">
        <button
          type="submit"
          className="btn join-item"
          onClick={onSearchChange}
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
