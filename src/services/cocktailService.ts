import type { Cocktail } from "@/types/app";

const cocktailService = {
  getAll: async (search: string): Promise<Cocktail[] | string> => {
    const response = await fetch(`/api/json/v1/1/search.php?f=${search}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = (await response.json()) as { drinks: Cocktail[] | string };
    const cocktails: Cocktail[] | string = data.drinks;

    return cocktails;
  },

  getById: async (id: string): Promise<Cocktail | null | string> => {
    const response = await fetch(`/api/json/v1/1/lookup.php?i=${id}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = (await response.json()) as { drinks: Cocktail[] | string | null };
    const cocktail: Cocktail[] | string | null = data.drinks;

    if (!cocktail || typeof cocktail === "string") return cocktail;

    return cocktail[0]!;
  },
};

export default cocktailService;
