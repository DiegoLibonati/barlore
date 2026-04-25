import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";
import type { CockTailItemProps } from "@/types/props";

import CocktailItem from "@/components/CocktailItem/CocktailItem";

const defaultProps: CockTailItemProps = {
  idDrink: "17222",
  strDrink: "A1",
  strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
  strGlass: "Cocktail glass",
  strAlcoholic: "Alcoholic",
};

const renderComponent = (props: Partial<CockTailItemProps> = {}): RenderResult =>
  render(
    <MemoryRouter>
      <CocktailItem {...defaultProps} {...props} />
    </MemoryRouter>
  );

describe("CocktailItem", () => {
  describe("rendering", () => {
    it("should render the cocktail image with the correct src", () => {
      renderComponent();
      expect(screen.getByRole("img", { name: defaultProps.strDrink })).toHaveAttribute(
        "src",
        defaultProps.strDrinkThumb
      );
    });

    it("should render the cocktail name as a heading", () => {
      renderComponent({ strDrink: "Margarita" });
      expect(screen.getByRole("heading", { name: "Margarita" })).toBeInTheDocument();
    });

    it("should render the glass type", () => {
      renderComponent({ strGlass: "Shot glass" });
      expect(screen.getByText("Shot glass")).toBeInTheDocument();
    });

    it("should render the alcoholic information", () => {
      renderComponent({ strAlcoholic: "Non alcoholic" });
      expect(screen.getByText("Non alcoholic")).toBeInTheDocument();
    });

    it("should render a details link with the correct accessible label", () => {
      renderComponent({ strDrink: "A1", idDrink: "17222" });
      expect(screen.getByRole("link", { name: "View details for A1" })).toBeInTheDocument();
    });

    it("should render the details link pointing to the correct route", () => {
      renderComponent({ idDrink: "17222", strDrink: "A1" });
      expect(screen.getByRole("link", { name: /View details/ })).toHaveAttribute(
        "href",
        "/cocktail/17222"
      );
    });
  });
});
