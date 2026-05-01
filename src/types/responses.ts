import type { Cocktail } from "@/types/app";

export interface DefaultResponse {
  code: string;
  message: string;
}

export interface ResponseWithData<T> extends DefaultResponse {
  data: T;
}

export type ResponseDirect<T> = T;

export interface ResponseDrinks {
  drinks: Cocktail[] | string;
}

export interface ResponseDrinksNull {
  drinks: Cocktail[] | string | null;
}

export type ResponseDrinkNull = Cocktail | string | null;
