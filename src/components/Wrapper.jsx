import React, { useContext } from "react";
import { AppContext } from "../context";

const Wrapper = ({ children }) => {
  const { setFilterOpen } = useContext(AppContext);

  const closeFilter = (e) => {
    if (!e.target.classList.contains("filter")) {
      setFilterOpen(false);
    }
  };

  return (
    <div className="wrapper" onClick={closeFilter}>
      {children}
    </div>
  );
};

export default Wrapper;
