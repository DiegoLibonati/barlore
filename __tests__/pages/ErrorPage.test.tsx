import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

interface RenderPage {
  container: HTMLElement;
}

const renderPage = (): RenderPage => {
  const { container } = render(
    <MemoryRouter>
      <ErrorPage />
    </MemoryRouter>
  );

  return { container };
};

describe("ErrorPage", () => {
  it("should render the main element", () => {
    const { container } = renderPage();
    expect(container.querySelector<HTMLElement>("main.main-error-page")).toBeInTheDocument();
  });

  it("should render the Page not found heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
  });

  it("should render the Go Home link with the correct aria-label", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "Go back to home page" })).toBeInTheDocument();
  });

  it("should render the Go Home link pointing to the home route", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "Go back to home page" })).toHaveAttribute("href", "/");
  });

  it("should render the error image", () => {
    renderPage();
    expect(screen.getByRole("img", { name: "sad person gif" })).toBeInTheDocument();
  });
});
