import { Cocktail } from "@src/entities/app";

export type GetCocktailsResponse = { drinks: Cocktail[] | string };

export type GetCocktailByIdResponse = { drinks: Cocktail[] | null | string };
