import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import AboutPage from "@/pages/AboutPage/AboutPage";

const renderPage = (): RenderResult => render(<AboutPage />);

describe("AboutPage", () => {
  describe("rendering", () => {
    it("should render the about us heading", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "About us" })).toBeInTheDocument();
    });

    it("should render the description paragraph", () => {
      renderPage();
      expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument();
    });
  });
});
