import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Loading from "@/components/Loading/Loading";

const renderComponent = (): RenderResult => render(<Loading />);

describe("Loading", () => {
  describe("rendering", () => {
    it("should render with role status", () => {
      renderComponent();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("should render with the correct aria-label", () => {
      renderComponent();
      expect(screen.getByRole("status", { name: "Loading content" })).toBeInTheDocument();
    });

    it("should render three loader bars", () => {
      const { container } = renderComponent();
      const bars = container.querySelectorAll<HTMLDivElement>(".cocktail-loader__bar");
      expect(bars).toHaveLength(3);
    });
  });
});
