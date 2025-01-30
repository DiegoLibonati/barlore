import { screen, render, within } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { HomePage } from "./HomePage";

import { AppProvider } from "../context/AppContext";

import { createServer } from "../tests/msw/server";
import {
  mockRequestSearchF,
  mockRequestSearchS,
} from "../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppProvider>
        <HomePage></HomePage>
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
        <HomePage></HomePage>
      </AppProvider>
    </MemoryRouter>
  );

  await screen.findAllByRole("img");

  return {
    container: container,
  };
};

describe("HomePage.tsx", () => {
  describe("General Tests.", () => {
    createServer([
      {
        path: "/api/json/v1/1/search.php",
        method: "get",
        res: ({ request }) => {
          const url = new URL(request.url);
          const f = url.searchParams.get("f");
          const s = url.searchParams.get("s");

          console.log(f, s);

          return f ? mockRequestSearchF : mockRequestSearchS;
        },
      },
    ]);

    test("It must render drink search input.", () => {
      renderComponent();

      const input = screen.getByRole("textbox", {
        name: /search your favorite cocktail:/i,
      });

      expect(input).toBeInTheDocument();
    });

    test("It must render the loader when the drinks have not yet been loaded.", () => {
      const { container } = renderComponent();

      // eslint-disable-next-line
      const loaderRoot = container.querySelector(
        ".cocktail-loader__root"
      ) as HTMLDivElement;

      expect(loaderRoot).toBeInTheDocument();
    });

    test("It must render all drinks when first loaded", async () => {
      const { container } = await asyncRenderComponent();

      // eslint-disable-next-line
      const cocktailList = container.querySelector(".cocktails") as HTMLElement;
      const cocktails = within(cocktailList).getAllByRole("article");

      expect(cocktailList).toBeInTheDocument();
      expect(cocktails).toHaveLength(mockRequestSearchF.drinks.length);
    });

    test("It should render the drinks obtained when a search is performed.", async () => {
      const cocktail = mockRequestSearchS.drinks[0];
      const inputValue = cocktail.strDrink;

      await asyncRenderComponent();

      const input = screen.getByRole("textbox", {
        name: /search your favorite cocktail:/i,
      });

      expect(input).toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(inputValue);
      await user.type(input, "abc{enter}");

      const headingDrink = await screen.findByRole("heading", {
        name: inputValue,
      });

      expect(headingDrink).toBeInTheDocument();
    });
  });
});
