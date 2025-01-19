import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { useAppContext } from "../context/AppContext";

import "../styles/Navbar.css";

export const Navbar = (): JSX.Element => {
  const { mobileNavbar, manageNavbar } = useAppContext();

  return (
    <header className="header__wrapper">
      <div className="header__logo">
        <h2>TheCocktailDB</h2>
        <button
          type="button"
          onClick={manageNavbar}
          className="button"
          aria-label="manage navbar menu"
        >
          <FaBars
            className={mobileNavbar ? "bars rotate__bars" : "bars"}
          ></FaBars>
        </button>
      </div>

      <nav
        className={
          mobileNavbar
            ? "header__nav header__nav--open"
            : "header__nav"
        }
      >
        <ul className="header__list">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "header__list-item active" : "header__list-item"
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
                isActive ? "header__list-item active" : "header__list-item"
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
