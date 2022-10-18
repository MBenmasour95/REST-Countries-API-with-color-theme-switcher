import React, { useContext, useRef } from "react";
import { AppContext } from "../context";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = () => {
  const { search, setSearch } = useContext(AppContext);
  const searchRef = useRef();

  const handleChange = () => {
    setSearch(searchRef.current.value);
  };

  return (
    <div className="form-control">
      <div className="search-icon">
        <AiOutlineSearch />
      </div>
      <input
        type="search"
        placeholder="Search for a country..."
        name="search"
        value={search}
        ref={searchRef}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
