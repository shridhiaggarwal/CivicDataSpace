import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { placeholder = "Search...", onSearch } = props;
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex-1 max-w-4xl">
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1f5f8d] text-white px-3 py-1 rounded cursor-pointer"
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
