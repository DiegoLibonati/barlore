import { Cocktail } from "@src/entities/app";

export const mockCocktail: Cocktail = {
  idDrink: "17222",
  strDrink: "A1",
  strCategory: "Cocktail",
  strAlcoholic: "Alcoholic",
  strGlass: "Cocktail glass",
  strInstructions:
    "Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.",
  strInstructionsES:
    "Verter todos los ingredientes en una coctelera, mezclar y servir con hielo en una copa fría.",
  strInstructionsDE:
    "Alle Zutaten in einen Cocktailshaker geben, mischen und über Eis in ein gekühltes Glas servieren.",
  strInstructionsFR:
    "Verser tous les ingrédients dans un shaker, mélanger et servir avec des glaçons dans un verre réfrigéré.",
  strInstructionsIT:
    "Versare tutti gli ingredienti in uno shaker, mescolare e servire con ghiaccio in un bicchiere freddo.",
  strDrinkThumb:
    "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
  strIngredient1: "Gin",
  strIngredient2: "Grand Marnier",
  strIngredient3: "Lemon Juice",
  strIngredient4: "Grenadine",
  strMeasure1: "1 3/4 shot ",
  strMeasure2: "1 Shot ",
  strMeasure3: "1/4 Shot",
  strMeasure4: "1/8 Shot",
  strCreativeCommonsConfirmed: "No",
  dateModified: "2017-09-07 21:42:09",
};

export const mockCocktailTwo: Cocktail = {
  idDrink: "13501",
  strDrink: "ABC",
  strCategory: "Shot",
  strAlcoholic: "Alcoholic",
  strGlass: "Shot glass",
  strInstructions: "Layered in a shot glass.",
  strInstructionsES: "Coloque todos los ingredientes en un vaso de chupito.",
  strInstructionsDE: "Schichtaufbau in einem Schnapsglas.",
  strInstructionsIT:
    "Versa in ordine di lettera i vari ingredienti. 1/3 del bicchiere va riempito con l'Amaretto, 1/3 di Baileys e il restante di Cognac.",
  strDrinkThumb:
    "https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg",
  strIngredient1: "Amaretto",
  strIngredient2: "Baileys irish cream",
  strIngredient3: "Cognac",
  strMeasure1: "1/3 ",
  strMeasure2: "1/3 ",
  strMeasure3: "1/3 ",
  strCreativeCommonsConfirmed: "No",
  dateModified: "2016-08-31 19:32:08",
};

export const mockCocktailThree: Cocktail = {
  idDrink: "11023",
  strDrink: "Almeria",
  strCategory: "Ordinary Drink",
  strAlcoholic: "Alcoholic",
  strGlass: "Cocktail glass",
  strInstructions:
    "In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.",
  strInstructionsES:
    "En una coctelera llena hasta la mitad con cubitos de hielo, mezcle todos los ingredientes. Agitar bien. Colar en una copa de cóctel.",
  strInstructionsDE:
    "In einem Shaker, der halb mit Eiswürfeln gefüllt ist, alle Zutaten vermengen. Gut schütteln. In ein Cocktailglas abseihen.",
  strInstructionsFR:
    "Dans un shaker à moitié rempli de glaçons, mélanger tous les ingrédients. Bien agiter. Filtrer dans un verre à cocktail.",
  strInstructionsIT:
    "In uno shaker riempito a metà con cubetti di ghiaccio, unire tutti gli ingredienti.Agitare bene.Filtrare in un bicchiere da cocktail.",
  strDrinkThumb:
    "https://www.thecocktaildb.com/images/media/drink/rwsyyu1483388181.jpg",
  strIngredient1: "Dark rum",
  strIngredient2: "Kahlua",
  strIngredient3: "Egg white",
  strMeasure1: "2 oz ",
  strMeasure2: "1 oz ",
  strMeasure3: "1 ",
  strCreativeCommonsConfirmed: "No",
  dateModified: "2017-01-02 20:16:21",
};

export const mockCocktails: Cocktail[] = [mockCocktail, mockCocktailTwo];
export const mockCocktailsTwo: Cocktail[] = [mockCocktailThree];

export const mockRequestSearchF = { drinks: mockCocktails };
export const mockRequestSearchS = { drinks: mockCocktailsTwo };
export const mockRequestSearchI = { drinks: mockCocktailsTwo };
