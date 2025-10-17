import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { HomePage } from "@src/pages/HomePage/HomePage";

import { createServer } from "@tests/msw/server";
import {
  mockRequestSearchF,
  mockRequestSearchS,
  mockCocktails,
  mockCocktailsTwo,
} from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <HomePage />
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
      <HomePage />
    </MemoryRouter>
  );

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

createServer([
  {
    path: "/api/json/v1/1/search.php",
    method: "get",
    res: ({ request }) => {
      const url = new URL(request.url);
      const searchParam = url.searchParams.get("f");

      if (searchParam === "a") {
        return mockRequestSearchF;
      } else if (searchParam === "m") {
        return mockRequestSearchS;
      }
      return mockRequestSearchF;
    },
  },
]);

describe("HomePage.tsx", () => {
  describe("General Tests.", () => {
    test("It must render drink search input.", () => {
      renderComponent();

      const inputSearch = screen.getByPlaceholderText("Cocktail name");
      expect(inputSearch).toBeInTheDocument();
    });

    test("It must render the loader when the drinks have not yet been loaded.", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Cocktail name");
      const user = userEvent.setup();

      await user.type(input, "margarita");
      await user.keyboard("{Enter}");

      const loaderRoot = container.querySelector(
        ".cocktail-loader__root"
      ) as HTMLDivElement;

      await waitFor(() => {
        const images = screen.queryAllByRole("img");
        expect(images.length).toBeGreaterThan(0);
      });
    });

    test("It must render all drinks when first loaded", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Cocktail name");
      const user = userEvent.setup();

      await user.type(input, "a");
      await user.keyboard("{Enter}");

      await screen.findAllByRole("img");

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(mockCocktails.length);

      const firstCocktail = screen.getByText(mockCocktails[0].strDrink);
      expect(firstCocktail).toBeInTheDocument();
    });

    test("It should render the drinks obtained when a search is performed.", async () => {
      const { container } = renderComponent();

      const input = screen.getByPlaceholderText("Cocktail name");
      const user = userEvent.setup();

      await user.type(input, "m");
      await user.keyboard("{Enter}");

      await screen.findAllByRole("img");

      const cocktailCards = screen.getAllByRole("img");
      expect(cocktailCards.length).toBe(mockCocktailsTwo.length);

      expect(
        screen.getByText(mockCocktailsTwo[0].strDrink)
      ).toBeInTheDocument();
    });
  });
});
