import { render } from "@testing-library/react";

import { Loading } from "@src/components/Loading";

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

      // eslint-disable-next-line
      const containerRoot = container.querySelector(
        ".cocktail-loader"
      ) as HTMLElement;
      // eslint-disable-next-line
      const loaderRoot = container.querySelector(
        ".cocktail-loader__root"
      ) as HTMLDivElement;

      expect(containerRoot).toBeInTheDocument();
      expect(loaderRoot).toBeInTheDocument();
      // eslint-disable-next-line
      expect(loaderRoot?.children).toHaveLength(3);
    });
  });
});
