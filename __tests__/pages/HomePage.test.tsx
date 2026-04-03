import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import HomePage from "@/pages/HomePage/HomePage";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";

type RenderPage = {
  container: HTMLElement;
};

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

const renderPage = (): RenderPage => {
  const { container } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  return { container };
};

describe("HomePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the search section", async () => {
    const mockFetchJson = jest.fn();
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: mockFetchJson.mockResolvedValue({ drinks: mockCocktails }),
    } as unknown as Response);

    renderPage();

    await screen.findByText(mockCocktails[0]!.strDrink);

    expect(screen.getByRole("region", { name: "Cocktail search" })).toBeInTheDocument();
  });

  it("should render the search input", async () => {
    const mockFetchJson = jest.fn();
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: mockFetchJson.mockResolvedValue({ drinks: mockCocktails }),
    } as unknown as Response);

    renderPage();

    await screen.findByText(mockCocktails[0]!.strDrink);

    expect(screen.getByPlaceholderText("Cocktail name")).toBeInTheDocument();
  });

  it("should fetch cocktails with 'a' on mount", async () => {
    const mockFetchJson = jest.fn();
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: mockFetchJson.mockResolvedValue({ drinks: mockCocktails }),
    } as unknown as Response);

    renderPage();

    await screen.findByText(mockCocktails[0]!.strDrink);

    expect(fetch).toHaveBeenCalledWith("/api/json/v1/1/search.php?f=a", { method: "GET" });
  });

  it("should display all fetched cocktails", async () => {
    const mockFetchJson = jest.fn();
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: mockFetchJson.mockResolvedValue({ drinks: mockCocktails }),
    } as unknown as Response);

    renderPage();

    expect(await screen.findByText(mockCocktails[0]!.strDrink)).toBeInTheDocument();
    expect(await screen.findByText(mockCocktails[1]!.strDrink)).toBeInTheDocument();
    expect(await screen.findByText(mockCocktails[2]!.strDrink)).toBeInTheDocument();
  });

  it("should display the not-found message when the API returns no results", async () => {
    const mockFetchJson = jest.fn();
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: mockFetchJson.mockResolvedValue({ drinks: "None Found" }),
    } as unknown as Response);

    renderPage();

    expect(await screen.findByText(/There is not exists a cocktail/i)).toBeInTheDocument();
  });

  it("should fetch cocktails with the typed search term on form submit", async () => {
    const mockFetchJson = jest.fn();
    const user = userEvent.setup();

    mockedFetch
      .mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: mockCocktails }),
      } as unknown as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: [mockCocktails[0]] }),
      } as unknown as Response);

    renderPage();

    await screen.findByText(mockCocktails[0]!.strDrink);

    await user.clear(screen.getByPlaceholderText("Cocktail name"));
    await user.type(screen.getByPlaceholderText("Cocktail name"), "b");
    await user.keyboard("{Enter}");

    await screen.findByText(mockCocktails[0]!.strDrink);

    expect(fetch).toHaveBeenLastCalledWith("/api/json/v1/1/search.php?f=b", { method: "GET" });
  });
});
