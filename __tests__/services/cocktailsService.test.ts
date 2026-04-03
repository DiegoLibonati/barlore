import { cocktailsService } from "@/services/cocktailsService";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("cocktailsService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return cocktails on success", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: mockCocktails }),
      } as unknown as Response);

      const result = await cocktailsService.getAll("a");

      expect(fetch).toHaveBeenCalledWith("/api/json/v1/1/search.php?f=a", { method: "GET" });
      expect(result).toEqual(mockCocktails);
    });

    it("should return the drinks value when it is a string", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: "None Found" }),
      } as unknown as Response);

      const result = await cocktailsService.getAll("z");

      expect(result).toBe("None Found");
    });

    it("should throw on HTTP error 404", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(cocktailsService.getAll("a")).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw on HTTP error 500", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(cocktailsService.getAll("a")).rejects.toThrow("HTTP error! status: 500");
    });

    it("should call fetch exactly once", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: mockCocktails }),
      } as unknown as Response);

      await cocktailsService.getAll("a");

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("getById", () => {
    it("should return the first cocktail on success", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: [mockCocktails[0]] }),
      } as unknown as Response);

      const result = await cocktailsService.getById("17222");

      expect(fetch).toHaveBeenCalledWith("/api/json/v1/1/lookup.php?i=17222", { method: "GET" });
      expect(result).toEqual(mockCocktails[0]);
    });

    it("should return null when drinks is null", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: null }),
      } as unknown as Response);

      const result = await cocktailsService.getById("99999");

      expect(result).toBeNull();
    });

    it("should return the string when drinks is a string", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: "None Found" }),
      } as unknown as Response);

      const result = await cocktailsService.getById("99999");

      expect(result).toBe("None Found");
    });

    it("should throw on HTTP error 404", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(cocktailsService.getById("17222")).rejects.toThrow("HTTP error! status: 404");
    });

    it("should throw on HTTP error 500", async () => {
      mockedFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response);

      await expect(cocktailsService.getById("17222")).rejects.toThrow("HTTP error! status: 500");
    });

    it("should call fetch with the correct id in the url", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: [mockCocktails[0]] }),
      } as unknown as Response);

      await cocktailsService.getById("42");

      expect(fetch).toHaveBeenCalledWith("/api/json/v1/1/lookup.php?i=42", { method: "GET" });
    });

    it("should call fetch exactly once", async () => {
      const mockFetchJson = jest.fn();
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: mockFetchJson.mockResolvedValue({ drinks: [mockCocktails[0]] }),
      } as unknown as Response);

      await cocktailsService.getById("17222");

      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
