interface IngredientItemProps {
  ingredient: string;
}

export const IngredientItem = ({
  ingredient,
}: IngredientItemProps): JSX.Element => {
  return <li>{ingredient}</li>;
};
