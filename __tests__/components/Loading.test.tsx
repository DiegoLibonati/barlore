import { render, screen } from "@testing-library/react";

import Loading from "@/components/Loading/Loading";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loading />);
  return { container };
};

describe("Loading", () => {
  it("should render with role status", () => {
    renderComponent();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should render with the correct aria-label", () => {
    renderComponent();
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading content");
  });

  it("should render three bar elements", () => {
    const { container } = renderComponent();
    const bars = container.querySelectorAll<HTMLDivElement>(".cocktail-loader__bar");
    expect(bars).toHaveLength(3);
  });

  it("should render the inner root with aria-hidden", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLDivElement>(".cocktail-loader__root")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });
});
