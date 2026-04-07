import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import CocktailDetailPage from "@/pages/CocktailDetailPage/CocktailDetailPage";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";

interface RenderPage {
  container: HTMLElement;
}

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

const renderPage = (id = mockCocktails[0]!.idDrink): RenderPage => {
  const { container } = render(
    <MemoryRouter initialEntries={[`/cocktail/${id}`]}>
      <Routes>
        <Route path="/cocktail/:id" element={<CocktailDetailPage />} />
        <Route path="/error" element={<div>Error Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  return { container };
};

describe("CocktailDetailPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the cocktail name after loading", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ drinks: [mockCocktails[0]] }),
    } as unknown as Response);

    renderPage();

    expect(await screen.findByText(mockCocktails[0]!.strDrink)).toBeInTheDocument();
  });

  it("should render the cocktail image with the drink name as alt text", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ drinks: [mockCocktails[0]] }),
    } as unknown as Response);

    renderPage();

    expect(
      await screen.findByRole("img", { name: mockCocktails[0]!.strDrink })
    ).toBeInTheDocument();
  });

  it("should render the Go Home link", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ drinks: [mockCocktails[0]] }),
    } as unknown as Response);

    renderPage();

    expect(await screen.findByRole("link", { name: "Go back to home page" })).toBeInTheDocument();
  });

  it("should call fetch with the correct cocktail id", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ drinks: [mockCocktails[0]] }),
    } as unknown as Response);

    renderPage("17222");

    await screen.findByText(mockCocktails[0]!.strDrink);

    expect(fetch).toHaveBeenCalledWith("/api/json/v1/1/lookup.php?i=17222", { method: "GET" });
  });

  it("should navigate to the error page when the cocktail is not found", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ drinks: null }),
    } as unknown as Response);

    renderPage();

    expect(await screen.findByText("Error Page")).toBeInTheDocument();
  });

  it("should navigate to the error page when the service returns a string", async () => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ drinks: "None Found" }),
    } as unknown as Response);

    renderPage();

    expect(await screen.findByText("Error Page")).toBeInTheDocument();
  });
});
