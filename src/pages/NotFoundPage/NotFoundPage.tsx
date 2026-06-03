import { Link } from "react-router";

import type { JSX } from "react";

import "@/pages/NotFoundPage/NotFoundPage.css";

const NotFoundPage = (): JSX.Element => {
  return (
    <main className="main-not-found-page">
      <section className="not-found">
        <h1 className="not-found__title">Page not found</h1>
        <Link to="/" aria-label="Go back to home page" className="not-found__link-go-home">
          Go Home
        </Link>
        <img
          src="https://images.squarespace-cdn.com/content/v1/5cc0568c93a632690941e6aa/1559238179719-6DM64NLN6W8T6JPLYVP8/tenor.gif?format=300w"
          alt="sad person gif"
          className="not-found__img"
        ></img>
      </section>
    </main>
  );
};

export default NotFoundPage;
