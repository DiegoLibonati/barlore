import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import type { JSX } from "react";

import "@/components/Navbar/Navbar.css";

const Navbar = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleManageNavbar = (): void => {
    setOpen((state) => {
      return !state;
    });
  };

  return (
    <header className="header-wrapper">
      <div className="header-wrapper__content">
        <h2 className="header-wrapper__title">TheCocktailDB</h2>
        <button
          type="button"
          onClick={handleManageNavbar}
          className="header-wrapper__btn-manage"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
        >
          <FaBars
            className={
              open
                ? "header-wrapper__btn-manage-icon header-wrapper__btn-manage-icon--rotate-bars"
                : "header-wrapper__btn-manage-icon"
            }
            aria-hidden="true"
          ></FaBars>
        </button>
      </div>

      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={open ? "header-wrapper__nav header-wrapper__nav--open" : "header-wrapper__nav"}
      >
        <ul className="header-wrapper__list">
          <li className="header-wrapper__list-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "header-wrapper__nav-link header-wrapper__nav-link--active"
                  : "header-wrapper__nav-link"
              }
              to="/"
              aria-label="Home page"
            >
              Home
            </NavLink>
          </li>

          <li className="header-wrapper__list-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "header-wrapper__nav-link header-wrapper__nav-link--active"
                  : "header-wrapper__nav-link"
              }
              to="/about"
              aria-label="About page"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
