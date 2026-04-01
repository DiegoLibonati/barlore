import { IngredientItemProps } from "@/types/props";

import "@/components/IngredientItem/IngredientItem.css";

const IngredientItem = ({ ingredient }: IngredientItemProps) => {
  return <li className="ingredient-item">{ingredient}</li>;
};

export default IngredientItem;
