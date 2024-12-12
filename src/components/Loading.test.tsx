import { screen, render } from "@testing-library/react";

import { Loading } from "./Loading";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loading></Loading>);

  return {
    container: container,
  };
};

test("It must render the loader.", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line
  const containerRoot = container.querySelector(
    ".cocktail_container_load"
  ) as HTMLElement;
  // eslint-disable-next-line
  const loaderRoot = container.querySelector(".loader_root") as HTMLDivElement;

  expect(containerRoot).toBeInTheDocument();
  expect(loaderRoot).toBeInTheDocument();
  // eslint-disable-next-line
  expect(loaderRoot?.children).toHaveLength(3);
});
