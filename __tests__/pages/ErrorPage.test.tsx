import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

const renderPage = (): RenderResult =>
  render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );

describe("ErrorPage", () => {
  describe("rendering", () => {
    it("should render the page not found heading", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    });

    it("should render the go home link", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go back to home page" })).toBeInTheDocument();
    });

    it("should render the go home link pointing to the home route", () => {
      renderPage();
      expect(screen.getByRole("link", { name: "Go back to home page" })).toHaveAttribute(
        "href",
        "/"
      );
    });

    it("should render the error image", () => {
      renderPage();
      expect(screen.getByRole("img", { name: "sad person gif" })).toBeInTheDocument();
    });
  });
});
