import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import HomePage from "@/pages/HomePage/HomePage";

import cocktailService from "@/services/cocktailService";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";

const mockGetAll = cocktailService.getAll as jest.Mock;

jest.mock("@/services/cocktailService", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
  },
}));

const renderPage = (): RenderResult =>
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

describe("HomePage", () => {
  describe("rendering", () => {
    it("should render the search input", () => {
      mockGetAll.mockImplementation(
        () =>
          new Promise(() => {
            // Empty fn
          })
      );
      renderPage();
      expect(screen.getByPlaceholderText("Cocktail name")).toBeInTheDocument();
    });

    it("should render the search form label", () => {
      mockGetAll.mockImplementation(
        () =>
          new Promise(() => {
            // Empty fn
          })
      );
      renderPage();
      expect(screen.getByLabelText(/Search your favorite cocktail/i)).toBeInTheDocument();
    });

    it("should render cocktails after a successful fetch", async () => {
      mockGetAll.mockResolvedValue(mockCocktails);
      renderPage();
      expect(await screen.findByText("A1")).toBeInTheDocument();
      expect(screen.getByText("ABC")).toBeInTheDocument();
      expect(screen.getByText("Almeria")).toBeInTheDocument();
    });

    it("should show the loading indicator while fetching", async () => {
      mockGetAll.mockImplementation(
        () =>
          new Promise(() => {
            // Empty fn
          })
      );
      renderPage();
      expect(await screen.findByRole("status", { name: "Loading content" })).toBeInTheDocument();
    });

    it("should call getAll with 'a' on initial mount", async () => {
      mockGetAll.mockResolvedValue(mockCocktails);
      renderPage();
      await screen.findByText("A1");
      expect(mockGetAll).toHaveBeenCalledWith("a");
    });
  });

  describe("empty state", () => {
    it("should show a not found message when service returns an empty array", async () => {
      const user = userEvent.setup();
      mockGetAll.mockResolvedValue(mockCocktails);
      renderPage();
      await screen.findByText("A1");

      const input = screen.getByPlaceholderText("Cocktail name");
      mockGetAll.mockResolvedValue([]);
      await user.clear(input);
      await user.type(input, "zzz");
      await user.keyboard("{Enter}");

      expect(
        await screen.findByText(/There is not exists a cocktail with the name of zzz/i)
      ).toBeInTheDocument();
    });

    it("should show a not found message when service returns a string", async () => {
      mockGetAll.mockResolvedValue("null");
      renderPage();
      const loader = await screen.findByRole("status", { name: "Loading content" });
      await waitFor(() => {
        expect(loader).not.toBeInTheDocument();
      });
      expect(screen.getByText(/There is not exists a cocktail/i)).toBeInTheDocument();
    });
  });

  describe("search behavior", () => {
    it("should update the input value when the user types", async () => {
      const user = userEvent.setup();
      mockGetAll.mockResolvedValue(mockCocktails);
      renderPage();
      const input = screen.getByPlaceholderText("Cocktail name");
      await user.type(input, "margarita");
      expect(input).toHaveValue("margarita");
    });

    it("should call getAll with the typed value when the form is submitted", async () => {
      const user = userEvent.setup();
      mockGetAll.mockResolvedValue(mockCocktails);
      renderPage();
      await screen.findByText("A1");

      const input = screen.getByPlaceholderText("Cocktail name");
      await user.clear(input);
      await user.type(input, "b");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalledWith("b");
      });
    });

    it("should call getAll with 'a' when the form is submitted with empty input", async () => {
      const user = userEvent.setup();
      mockGetAll.mockResolvedValue(mockCocktails);
      renderPage();
      await screen.findByText("A1");

      mockGetAll.mockClear();
      const input = screen.getByPlaceholderText("Cocktail name");
      await user.click(input);
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(mockGetAll).toHaveBeenCalledTimes(1);
        expect(mockGetAll).toHaveBeenCalledWith("a");
      });
    });
  });
});
