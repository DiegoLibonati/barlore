import { screen, render } from "@testing-library/react";

import { IngredientItemProps } from "@src/entities/props";

import { IngredientItem } from "@src/components/IngredientItem/IngredientItem";

type RenderComponent = {
  props: IngredientItemProps;
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

describe("IngredientItem.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the list item with the ingredient name entered by props.", () => {
      renderComponent();

      const ingredient = screen.getByRole("listitem");

      expect(ingredient).toBeInTheDocument();
    });
  });
});
