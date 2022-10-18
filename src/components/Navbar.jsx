import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AppContext } from "../context";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const Navbar = () => {
  const { toggleTheme, theme, setFilterOpen } = useContext(AppContext);

  return (
    <>
      <nav className="navbar" onClick={() => setFilterOpen(false)}>
        <NavLink to="/" className="nav-link">
          <h3>where in the world?</h3>
        </NavLink>

        <div className="toggle-theme" onClick={toggleTheme}>
          {theme === "dark-theme" ? (
            <>
              <BsMoonFill />
              <span>dark mode</span>
            </>
          ) : (
            <>
              <BsSunFill />
              <span>light mode</span>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
