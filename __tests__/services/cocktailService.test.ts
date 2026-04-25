import cocktailService from "@/services/cocktailService";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";

const mockCocktail = mockCocktails[0]!;

const mockFetchSuccess = (data: unknown): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => await data,
  } as Response);
};

const mockFetchError = (status: number): void => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
  } as Response);
};

const mockFetchNetworkError = (message = "Network error"): void => {
  global.fetch = jest.fn().mockRejectedValue(new Error(message));
};

describe("cocktailService", () => {
  describe("getAll", () => {
    describe("when fetch succeeds with cocktails", () => {
      it("should return an array of cocktails", async () => {
        mockFetchSuccess({ drinks: mockCocktails });
        const result = await cocktailService.getAll("a");
        expect(result).toEqual(mockCocktails);
      });

      it("should call fetch with the correct endpoint", async () => {
        mockFetchSuccess({ drinks: mockCocktails });
        await cocktailService.getAll("a");
        expect(global.fetch).toHaveBeenCalledWith("/api/json/v1/1/search.php?f=a", {
          method: "GET",
        });
      });

      it("should include the search parameter in the url", async () => {
        mockFetchSuccess({ drinks: mockCocktails });
        await cocktailService.getAll("m");
        expect(global.fetch).toHaveBeenCalledWith("/api/json/v1/1/search.php?f=m", {
          method: "GET",
        });
      });
    });

    describe("when fetch succeeds with no results", () => {
      it("should return the string when drinks is a string", async () => {
        mockFetchSuccess({ drinks: "null" });
        const result = await cocktailService.getAll("z");
        expect(result).toBe("null");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the HTTP status", async () => {
        mockFetchError(500);
        await expect(cocktailService.getAll("a")).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error with 404 status", async () => {
        mockFetchError(404);
        await expect(cocktailService.getAll("a")).rejects.toThrow("HTTP error! status: 404");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockFetchNetworkError("Failed to fetch");
        await expect(cocktailService.getAll("a")).rejects.toThrow("Failed to fetch");
      });
    });
  });

  describe("getById", () => {
    describe("when fetch succeeds with a cocktail", () => {
      it("should return the first cocktail from the drinks array", async () => {
        mockFetchSuccess({ drinks: [mockCocktail] });
        const result = await cocktailService.getById("17222");
        expect(result).toEqual(mockCocktail);
      });

      it("should call fetch with the correct endpoint", async () => {
        mockFetchSuccess({ drinks: [mockCocktail] });
        await cocktailService.getById("17222");
        expect(global.fetch).toHaveBeenCalledWith("/api/json/v1/1/lookup.php?i=17222", {
          method: "GET",
        });
      });

      it("should include the id in the url", async () => {
        mockFetchSuccess({ drinks: [mockCocktail] });
        await cocktailService.getById("99999");
        expect(global.fetch).toHaveBeenCalledWith("/api/json/v1/1/lookup.php?i=99999", {
          method: "GET",
        });
      });
    });

    describe("when the cocktail is not found", () => {
      it("should return null when drinks is null", async () => {
        mockFetchSuccess({ drinks: null });
        const result = await cocktailService.getById("99999");
        expect(result).toBeNull();
      });

      it("should return the string when drinks is a string", async () => {
        mockFetchSuccess({ drinks: "not found" });
        const result = await cocktailService.getById("99999");
        expect(result).toBe("not found");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the HTTP status", async () => {
        mockFetchError(404);
        await expect(cocktailService.getById("99999")).rejects.toThrow("HTTP error! status: 404");
      });

      it("should throw an error with 500 status", async () => {
        mockFetchError(500);
        await expect(cocktailService.getById("17222")).rejects.toThrow("HTTP error! status: 500");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockFetchNetworkError();
        await expect(cocktailService.getById("17222")).rejects.toThrow("Network error");
      });
    });
  });
});
