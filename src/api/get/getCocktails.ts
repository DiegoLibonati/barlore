import { GetCocktailsResponse } from "@src/entities/responses";

export const getCocktails = async (
  search: string
): Promise<GetCocktailsResponse> => {
  try {
    const response = await fetch(`/api/json/v1/1/search.php?f=${search}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching cocktails.");
    }

    const data: GetCocktailsResponse = await response.json();

    return data;
  } catch (e) {
    throw new Error(`Error fetching cocktails: ${e}.`);
  }
};
