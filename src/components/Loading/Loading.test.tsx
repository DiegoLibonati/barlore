import { render } from "@testing-library/react";

import { Loading } from "@src/components/Loading/Loading";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loading></Loading>);

  return {
    container: container,
  };
};

describe("Loading.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the loader.", () => {
      const { container } = renderComponent();

      const containerRoot =
        container.querySelector<HTMLElement>(".cocktail-loader");
      const loaderRoot = container.querySelector<HTMLDivElement>(
        ".cocktail-loader__root"
      );

      expect(containerRoot).toBeInTheDocument();
      expect(loaderRoot).toBeInTheDocument();
      expect(loaderRoot?.children).toHaveLength(3);
    });
  });
});
