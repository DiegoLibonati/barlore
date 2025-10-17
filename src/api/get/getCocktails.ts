import { Cocktail } from "@src/entities/app";

export const getCocktails = async (search: string): Promise<Cocktail[]> => {
  try {
    const response = await fetch(`/api/json/v1/1/search.php?f=${search}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching cocktails.");
    }

    const data = await response.json();
    

    if (typeof data["drinks"] === "string") return [];

    return data["drinks"] || [];
  } catch (e) {
    throw new Error(`Error fetching cocktails: ${e}.`);
  }
};
