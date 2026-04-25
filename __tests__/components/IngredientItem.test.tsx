import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { IngredientItemProps } from "@/types/props";

import IngredientItem from "@/components/IngredientItem/IngredientItem";

const renderComponent = (props: Partial<IngredientItemProps> = {}): RenderResult => {
  const defaultProps: IngredientItemProps = { ingredient: "Gin", ...props };
  return render(
    <ul>
      <IngredientItem {...defaultProps} />
    </ul>
  );
};

describe("IngredientItem", () => {
  describe("rendering", () => {
    it("should render the ingredient text", () => {
      renderComponent({ ingredient: "Gin" });
      expect(screen.getByText("Gin")).toBeInTheDocument();
    });

    it("should render as a list item", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should apply the ingredient-item class", () => {
      renderComponent();
      expect(screen.getByRole("listitem")).toHaveClass("ingredient-item");
    });

    it("should render a different ingredient when provided", () => {
      renderComponent({ ingredient: "Lemon Juice" });
      expect(screen.getByText("Lemon Juice")).toBeInTheDocument();
    });
  });
});
