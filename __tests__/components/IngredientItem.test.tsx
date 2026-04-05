import { render, screen } from "@testing-library/react";

import type { IngredientItemProps } from "@/types/props";

import IngredientItem from "@/components/IngredientItem/IngredientItem";

interface RenderComponent {
  container: HTMLElement;
  props: IngredientItemProps;
}

const renderComponent = (overrides?: Partial<IngredientItemProps>): RenderComponent => {
  const props: IngredientItemProps = {
    ingredient: "Gin",
    ...overrides,
  };

  const { container } = render(<IngredientItem {...props} />);

  return { container, props };
};

describe("IngredientItem", () => {
  it("should render a list item element", () => {
    renderComponent();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("should display the ingredient text", () => {
    renderComponent({ ingredient: "Vodka" });
    expect(screen.getByRole("listitem")).toHaveTextContent("Vodka");
  });

  it("should apply the ingredient-item class", () => {
    renderComponent();
    expect(screen.getByRole("listitem")).toHaveClass("ingredient-item");
  });
});
