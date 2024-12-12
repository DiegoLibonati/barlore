import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { CocktailDetailPage } from "./CocktailDetailPage";

import { AppProvider } from "../context/AppContext";

import { createServer } from "../tests/msw/server";
import { REQUEST_MOCK_SEARCH_I } from "../tests/jest.setup";

type RenderComponent = {
  container: HTMLElement;
};

createServer([
  {
    path: "/api/json/v1/1/lookup.php",
    method: "get",
    res: ({ request }) => {
      const url = new URL(request.url);
      const i = url.searchParams.get("i");

      console.log(i);

      return REQUEST_MOCK_SEARCH_I;
    },
  },
]);

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppProvider>
        <CocktailDetailPage></CocktailDetailPage>
      </AppProvider>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

const asyncRenderComponent = async (): Promise<RenderComponent> => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppProvider>
        <CocktailDetailPage></CocktailDetailPage>
      </AppProvider>
    </MemoryRouter>
  );

  await screen.findByRole("img");

  return {
    container: container,
  };
};

test("It must render the loader when the drink is loading.", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const loaderRoot = container.querySelector(".loader_root") as HTMLDivElement;

  expect(loaderRoot).toBeInTheDocument();
});

test("It must render the desired drink with the return home link.", async () => {
  const cocktail = REQUEST_MOCK_SEARCH_I.drinks[0];

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
