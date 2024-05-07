import React from "react";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search"
        className="bg-gray-200 px-2 py-1 rounded-lg"
      />
      <button className="bg-blue-500 text-white px-2 py-1 rounded-lg">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
