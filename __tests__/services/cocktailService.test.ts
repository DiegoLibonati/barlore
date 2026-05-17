import { http, HttpResponse } from "msw";

import cocktailService from "@/services/cocktailService";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";
import { mockMswServer } from "@tests/__mocks__/mswServer.mock";

const mockCocktail = mockCocktails[0]!;

describe("cocktailService", () => {
  describe("getAll", () => {
    describe("when the API responds with cocktails", () => {
      it("should return an array of cocktails", async () => {
        const result = await cocktailService.getAll("a");

        expect(result).toEqual(mockCocktails);
      });

      it("should call the search endpoint with the provided letter", async () => {
        let capturedUrl = "";
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", ({ request }) => {
            capturedUrl = request.url;
            return HttpResponse.json({ drinks: mockCocktails });
          })
        );

        await cocktailService.getAll("m");

        expect(capturedUrl).toContain("/api/json/v1/1/search.php?f=m");
      });
    });

    describe("when the API responds with no results", () => {
      it("should return the string when drinks is a string", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", () => {
            return HttpResponse.json({ drinks: "null" });
          })
        );

        const result = await cocktailService.getAll("z");

        expect(result).toBe("null");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the HTTP status when responding 500", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(cocktailService.getAll("a")).rejects.toThrow("HTTP error! status: 500");
      });

      it("should throw an error with the HTTP status when responding 404", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", () => {
            return new HttpResponse(null, { status: 404 });
          })
        );

        await expect(cocktailService.getAll("a")).rejects.toThrow("HTTP error! status: 404");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/search.php", () => {
            return HttpResponse.error();
          })
        );

        await expect(cocktailService.getAll("a")).rejects.toThrow();
      });
    });
  });

  describe("getById", () => {
    describe("when the API responds with a cocktail", () => {
      it("should return the first cocktail from the drinks array", async () => {
        const result = await cocktailService.getById("17222");

        expect(result).toEqual(mockCocktail);
      });

      it("should call the lookup endpoint with the provided id", async () => {
        let capturedUrl = "";
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/lookup.php", ({ request }) => {
            capturedUrl = request.url;
            return HttpResponse.json({ drinks: [mockCocktail] });
          })
        );

        await cocktailService.getById("99999");

        expect(capturedUrl).toContain("/api/json/v1/1/lookup.php?i=99999");
      });
    });

    describe("when the cocktail is not found", () => {
      it("should return null when drinks is null", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/lookup.php", () => {
            return HttpResponse.json({ drinks: null });
          })
        );

        const result = await cocktailService.getById("99999");

        expect(result).toBeNull();
      });

      it("should return the string when drinks is a string", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/lookup.php", () => {
            return HttpResponse.json({ drinks: "not found" });
          })
        );

        const result = await cocktailService.getById("99999");

        expect(result).toBe("not found");
      });
    });

    describe("when the server returns an error", () => {
      it("should throw an error with the HTTP status when responding 404", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/lookup.php", () => {
            return new HttpResponse(null, { status: 404 });
          })
        );

        await expect(cocktailService.getById("99999")).rejects.toThrow("HTTP error! status: 404");
      });

      it("should throw an error with the HTTP status when responding 500", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/lookup.php", () => {
            return new HttpResponse(null, { status: 500 });
          })
        );

        await expect(cocktailService.getById("17222")).rejects.toThrow("HTTP error! status: 500");
      });
    });

    describe("when there is a network error", () => {
      it("should propagate the network error", async () => {
        mockMswServer.use(
          http.get("http://localhost/api/json/v1/1/lookup.php", () => {
            return HttpResponse.error();
          })
        );

        await expect(cocktailService.getById("17222")).rejects.toThrow();
      });
    });
  });
});
