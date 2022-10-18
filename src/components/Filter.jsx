import React, { useContext } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { AppContext } from "../context";

const Filter = () => {
  const {
    filterOpen,
    toggleFilter,
    regions,
    region,
    setRegion,
    setItemsPerPage,
  } = useContext(AppContext);

  return (
    <>
      <div className="filter" onClick={toggleFilter}>
        <span>
          Filter By Region {filterOpen ? <HiChevronUp /> : <HiChevronDown />}
        </span>

        <ul className={`list ${filterOpen && "show"}`}>
          {regions.map((item, index) => {
            return (
              <li
                key={index}
                className={`${item === region ? "active" : ""}`}
                onClick={() => {
                  setRegion(item);
                  setItemsPerPage(24);
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Filter;
