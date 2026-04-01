import { render, screen } from "@testing-library/react";

import AboutPage from "@/pages/AboutPage/AboutPage";

type RenderPage = {
  container: HTMLElement;
};

const renderPage = (): RenderPage => {
  const { container } = render(<AboutPage />);
  return { container };
};

describe("AboutPage", () => {
  it("should render the main element", () => {
    const { container } = renderPage();
    expect(container.querySelector<HTMLElement>("main.main-about-page")).toBeInTheDocument();
  });

  it("should render the About us heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "About us" })).toBeInTheDocument();
  });

  it("should render the description paragraph", () => {
    const { container } = renderPage();
    expect(container.querySelector<HTMLElement>(".about__description")).toBeInTheDocument();
  });
});
