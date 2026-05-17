import { http, HttpResponse } from "msw";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";

export const mockMswHandlers = [
  http.get("http://localhost/api/json/v1/1/search.php", () => {
    return HttpResponse.json({ drinks: mockCocktails });
  }),
  http.get("http://localhost/api/json/v1/1/lookup.php", () => {
    return HttpResponse.json({ drinks: [mockCocktails[0]] });
  }),
];
