import "@src/components/IngredientItem.css";

interface IngredientItemProps {
  ingredient: string;
}

export const IngredientItem = ({
  ingredient,
}: IngredientItemProps): JSX.Element => {
  return <li className="ingredient-item">{ingredient}</li>;
};
