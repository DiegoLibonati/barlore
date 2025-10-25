import { GetCocktailByIdResponse } from "@src/entities/responses";

export const getCocktailById = async (
  id: string
): Promise<GetCocktailByIdResponse> => {
  try {
    const response = await fetch(`/api/json/v1/1/lookup.php?i=${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching cocktail by id.");
    }

    const data: GetCocktailByIdResponse = await response.json();

    return data;
  } catch (e) {
    throw new Error(`Error fetching cocktail by id: ${e}.`);
  }
};
