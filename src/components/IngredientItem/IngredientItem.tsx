import type { JSX } from "react";
import type { IngredientItemProps } from "@/types/props";

import "@/components/IngredientItem/IngredientItem.css";

const IngredientItem = ({ ingredient }: IngredientItemProps): JSX.Element => {
  return <li className="ingredient-item">{ingredient}</li>;
};

export default IngredientItem;
