import { screen, render } from "@testing-library/react";

import { IngredientItem } from "./IngredientItem";

type RenderComponent = {
  props: {
    ingredient: string;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    ingredient: "Fernet",
  };

  const { container } = render(
    <IngredientItem ingredient={props.ingredient}></IngredientItem>
  );

  return {
    props: props,
    container: container,
  };
};

test("It should render the list item with the ingredient name entered by props.", () => {
  renderComponent();

  const ingredient = screen.getByRole("listitem");

  expect(ingredient).toBeInTheDocument();
});
