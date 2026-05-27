import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import CocktailDetailPage from "@/pages/CocktailDetailPage/CocktailDetailPage";

import cocktailService from "@/services/cocktailService";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";

const mockGetById = cocktailService.getById as jest.Mock;

const mockCocktail = mockCocktails[0]!;

jest.mock("@/services/cocktailService", () => ({
  __esModule: true,
  default: {
    getById: jest.fn(),
  },
}));

const renderPage = (id = "17222"): RenderResult =>
  render(
    <MemoryRouter initialEntries={[`/cocktail/${id}`]}>
      <Routes>
        <Route path="/cocktail/:id" element={<CocktailDetailPage />} />
        <Route path="/not-found" element={<div>Not Found Page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe("CocktailDetailPage", () => {
  describe("loading state", () => {
    it("should show the loading indicator while fetching", async () => {
      mockGetById.mockImplementation(
        () =>
          new Promise(() => {
            // Empty fn
          })
      );
      renderPage();
      expect(await screen.findByRole("status", { name: "Loading content" })).toBeInTheDocument();
    });
  });

  describe("rendering", () => {
    it("should render the cocktail name after loading", async () => {
      mockGetById.mockResolvedValue(mockCocktail);
      renderPage();
      expect(await screen.findByText(mockCocktail.strDrink)).toBeInTheDocument();
    });

    it("should render the cocktail image with the correct src", async () => {
      mockGetById.mockResolvedValue(mockCocktail);
      renderPage();
      const img = await screen.findByRole("img", { name: mockCocktail.strDrink });
      expect(img).toHaveAttribute("src", mockCocktail.strDrinkThumb);
    });

    it("should render the cocktail glass", async () => {
      mockGetById.mockResolvedValue(mockCocktail);
      renderPage();
      expect(await screen.findByText(mockCocktail.strGlass)).toBeInTheDocument();
    });

    it("should render the cocktail alcoholic info", async () => {
      mockGetById.mockResolvedValue(mockCocktail);
      renderPage();
      expect(await screen.findByText(mockCocktail.strAlcoholic)).toBeInTheDocument();
    });

    it("should render the ingredients list", async () => {
      mockGetById.mockResolvedValue(mockCocktail);
      renderPage();
      expect(await screen.findByRole("list", { name: "Ingredients" })).toBeInTheDocument();
    });

    it("should render each ingredient", async () => {
      mockGetById.mockResolvedValue(mockCocktail);
      renderPage();
      expect(await screen.findByText("Gin")).toBeInTheDocument();
      expect(screen.getByText("Grand Marnier")).toBeInTheDocument();
      expect(screen.getByText("Lemon Juice")).toBeInTheDocument();
      expect(screen.getByText("Grenadine")).toBeInTheDocument();
    });

    it("should render the go home link", async () => {
      mockGetById.mockResolvedValue(mockCocktail);
      renderPage();
      expect(await screen.findByRole("link", { name: "Go back to home page" })).toBeInTheDocument();
    });

    it("should call getById with the id from the route param", async () => {
      mockGetById.mockResolvedValue(mockCocktail);
      renderPage("17222");
      await screen.findByText(mockCocktail.strDrink);
      expect(mockGetById).toHaveBeenCalledWith("17222");
    });
  });

  describe("error handling", () => {
    it("should navigate to the not found page when the service returns null", async () => {
      mockGetById.mockResolvedValue(null);
      renderPage();
      expect(await screen.findByText("Not Found Page")).toBeInTheDocument();
    });

    it("should navigate to the not found page when the service returns a string", async () => {
      mockGetById.mockResolvedValue("not found");
      renderPage();
      expect(await screen.findByText("Not Found Page")).toBeInTheDocument();
    });
  });
});
