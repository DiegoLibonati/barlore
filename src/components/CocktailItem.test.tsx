import { screen, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";

import { CockTail } from "../entities/entities";

import { CocktailItem } from "./CocktailItem";

import { mockCocktail } from "../tests/jest.constants";

type RenderComponent = {
  props: {
    cocktail: CockTail;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    cocktail: mockCocktail,
  };

  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <CocktailItem cocktail={props.cocktail}></CocktailItem>
    </MemoryRouter>
  );

  return {
    props: props,
    container: container,
  };
};

describe("CocktailItem.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the card containing the cocktail.", () => {
      renderComponent();

      const cocktailContainer = screen.getByRole("article");

      expect(cocktailContainer).toBeInTheDocument();
      expect(cocktailContainer).toHaveClass("cocktail");
    });

    test("It must render the image of the cocktail.", () => {
      const { props } = renderComponent();

      const imgCocktail = screen.getByRole("img");

      expect(imgCocktail).toBeInTheDocument();
      expect(imgCocktail).toHaveAttribute("src", props.cocktail.strDrinkThumb);
      expect(imgCocktail).toHaveAttribute("alt", props.cocktail.strDrink);
    });

    test("It must render the title, the type of glass, if it is alcoholic and the link to know more details.", () => {
      const { props } = renderComponent();

      const drinkName = screen.getByRole("heading", {
        name: props.cocktail.strDrink,
      });
      const typeOfGlass = screen.getByText(props.cocktail.strGlass);
      const alcoholic = screen.getByText(props.cocktail.strAlcoholic);
      const linkDetailCocktail = screen.getByRole("link", {
        name: /details cocktail/i,
      });

      expect(drinkName).toBeInTheDocument();
      expect(typeOfGlass).toBeInTheDocument();
      expect(alcoholic).toBeInTheDocument();
      expect(linkDetailCocktail).toBeInTheDocument();
    });
  });
});
