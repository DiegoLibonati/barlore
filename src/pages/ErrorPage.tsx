import { Link } from "react-router-dom";

import "./ErrorPage.css";

export const ErrorPage = (): JSX.Element => {
  return (
    <main className="main-error-page">
      <section className="error">
        <h1 className="error__title">Page not found</h1>
        <Link to="/" aria-label="go to home" className="error__link-go-home">
          Go Home
        </Link>
        <img
          src="https://images.squarespace-cdn.com/content/v1/5cc0568c93a632690941e6aa/1559238179719-6DM64NLN6W8T6JPLYVP8/tenor.gif?format=300w"
          alt="sad person gif"
          className="error__img"
        ></img>
      </section>
    </main>
  );
};
