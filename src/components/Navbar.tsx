import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useAppContext } from "../context/AppContext";

import "../styles/Navbar.css";

export const Navbar = (): JSX.Element => {
  const { mobileNavbar, manageNavbar } = useAppContext();

  return (
    <header className="header_container">
      <div className="header_container_logo">
        <h2>TheCocktailDB</h2>
        <button
          type="button"
          onClick={manageNavbar}
          className="button"
          aria-label="manage navbar menu"
        >
          <FaBars
            className={mobileNavbar ? "bars rotate-bars" : "bars"}
          ></FaBars>
        </button>
      </div>

      <nav
        className={
          mobileNavbar
            ? "header_container_nav nav-open"
            : "header_container_nav"
        }
      >
        <ul className="header_container_nav_list">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
              to="/"
              aria-label="go to home page"
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
              to="/about"
              aria-label="go to about page"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
