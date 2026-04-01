import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { CockTailItemProps } from "@/types/props";

import CocktailItem from "@/components/CocktailItem/CocktailItem";

import { mockCocktails } from "@tests/__mocks__/cocktails.mock";

type RenderComponent = {
  container: HTMLElement;
  props: CockTailItemProps;
};

const renderComponent = (overrides?: Partial<CockTailItemProps>): RenderComponent => {
  const [first] = mockCocktails;

  const props: CockTailItemProps = {
    idDrink: first!.idDrink,
    strDrink: first!.strDrink,
    strDrinkThumb: first!.strDrinkThumb,
    strGlass: first!.strGlass,
    strAlcoholic: first!.strAlcoholic,
    ...overrides,
  };

  const { container } = render(
    <MemoryRouter>
      <CocktailItem {...props} />
    </MemoryRouter>
  );

  return { container, props };
};

describe("CocktailItem", () => {
  it("should render the cocktail image with the drink name as alt text", () => {
    const { props } = renderComponent();
    expect(screen.getByRole("img", { name: props.strDrink })).toBeInTheDocument();
  });

  it("should render the cocktail name", () => {
    const { props } = renderComponent();
    expect(screen.getByText(props.strDrink)).toBeInTheDocument();
  });

  it("should render the glass name", () => {
    const { props } = renderComponent();
    expect(screen.getByText(props.strGlass)).toBeInTheDocument();
  });

  it("should render the alcoholic info", () => {
    const { props } = renderComponent();
    expect(screen.getByText(props.strAlcoholic)).toBeInTheDocument();
  });

  it("should render the details link with a descriptive aria-label", () => {
    const { props } = renderComponent();
    expect(
      screen.getByRole("link", { name: `View details for ${props.strDrink}` })
    ).toBeInTheDocument();
  });

  it("should render the details link pointing to the correct cocktail route", () => {
    const { props } = renderComponent();
    expect(
      screen.getByRole("link", { name: `View details for ${props.strDrink}` })
    ).toHaveAttribute("href", `/cocktail/${props.idDrink}`);
  });
});
