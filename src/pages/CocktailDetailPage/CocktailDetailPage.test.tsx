import { screen, render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { CocktailDetailPage } from "@src/pages/CocktailDetailPage/CocktailDetailPage";

import { createServer } from "@tests/msw/server";
import { mockRequestSearchI } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const cocktailId = mockRequestSearchI.drinks[0].idDrink;

  const { container } = render(
    <MemoryRouter
      initialEntries={[`/cocktail/${cocktailId}`]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/cocktail/:id" element={<CocktailDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const cocktailId = mockRequestSearchI.drinks[0].idDrink;

  const { container } = render(
    <MemoryRouter
      initialEntries={[`/cocktail/${cocktailId}`]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/cocktail/:id" element={<CocktailDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  await screen.findByRole("img");

  return {
    container: container,
  };
};

describe("CocktailDetailPage.tsx", () => {
  describe("General Tests.", () => {
    createServer([
      {
        path: "/api/json/v1/1/lookup.php",
        method: "get",
        res: ({ request }) => {
          const url = new URL(request.url);
          const i = url.searchParams.get("i");

          console.log("Requested cocktail ID:", i);

          return mockRequestSearchI;
        },
      },
    ]);

    test("It must render the loader when the drink is loading.", () => {
      const { container } = renderComponent();

      const loaderRoot = container.querySelector(
        ".cocktail-loader__root"
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
    });

    test("It must render the desired drink with the return home link.", async () => {
      const cocktail = mockRequestSearchI.drinks[0];

      await asyncRenderComponent();

      const img = screen.getByAltText(cocktail.strDrink);
      const name = screen.getByRole("heading", {
        name: `Name: ${cocktail.strDrink}`,
      });
      const glass = screen.getByText(cocktail.strGlass);
      const alcoholic = screen.getByText(cocktail.strAlcoholic);
      const ingredientList = screen.getByRole("list");
      const ingredients = screen.getAllByRole("listitem");
      const linkHome = screen.getByRole("link", { name: /go to home/i });

      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", cocktail.strDrinkThumb);
      expect(img).toHaveAttribute("alt", cocktail.strDrink);
      expect(name).toBeInTheDocument();
      expect(glass).toBeInTheDocument();
      expect(alcoholic).toBeInTheDocument();
      expect(ingredientList).toBeInTheDocument();
      expect(ingredients).toHaveLength(5);
      expect(linkHome).toBeInTheDocument();
    });
  });
});