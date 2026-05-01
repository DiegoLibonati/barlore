import type {
  ResponseDirect,
  ResponseDrinkNull,
  ResponseDrinks,
  ResponseDrinksNull,
} from "@/types/responses";

const cocktailService = {
  getAll: async (search: string): Promise<ResponseDirect<ResponseDrinks["drinks"]>> => {
    const response = await fetch(`/api/json/v1/1/search.php?f=${search}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = (await response.json()) as ResponseDirect<ResponseDrinks>;
    const cocktails: ResponseDrinks["drinks"] = data.drinks;

    return cocktails;
  },

  getById: async (id: string): Promise<ResponseDirect<ResponseDrinkNull>> => {
    const response = await fetch(`/api/json/v1/1/lookup.php?i=${id}`, {
      method: "GET",
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = (await response.json()) as ResponseDirect<ResponseDrinksNull>;
    const cocktail: ResponseDrinksNull["drinks"] = data.drinks;

    if (!cocktail || typeof cocktail === "string") return cocktail;

    return cocktail[0]!;
  },
};

export default cocktailService;
