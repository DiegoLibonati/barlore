import { Cocktail } from "@src/entities/app";

interface DefaultProps {
  children?: React.ReactNode;
  className?: string;
}

export interface IngredientItemProps {
  ingredient: string;
}

export interface CockTailItemProps {
  cocktail: Cocktail;
}
