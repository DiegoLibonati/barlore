import { IngredientItemProps } from "@src/entities/props";

import "@src/components/IngredientItem/IngredientItem.css";

export const IngredientItem = ({
  ingredient,
}: IngredientItemProps): JSX.Element => {
  return <li className="ingredient-item">{ingredient}</li>;
};
