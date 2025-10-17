import { Cocktail } from "@src/entities/app";

export const getCocktailById = async (id: string): Promise<Cocktail | null> => {
  try {
    const response = await fetch(`/api/json/v1/1/lookup.php?i=${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching cocktail by id.");
    }

    const data = await response.json();

    if (!data["drinks"] || data["drinks"].length === 0) {
      return null;
    }

    return data["drinks"][0];
  } catch (e) {
    throw new Error(`Error fetching cocktail by id: ${e}.`);
  }
};
