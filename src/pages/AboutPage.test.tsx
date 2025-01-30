import { screen, render } from "@testing-library/react";

import { AboutPage } from "./AboutPage";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<AboutPage></AboutPage>);

  return {
    container: container,
  };
};

describe("AboutPage.tsx", () => {
  describe("General Tests.", () => {
    test("It should render the page title and about us description.", () => {
      renderComponent();

      const mainContainer = screen.getByRole("main");
      const headingPage = screen.getByRole("heading", { name: /about us/i });
      const description = screen.getByText(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae repudiandae architecto qui adipisci in officiis, aperiam sequi atque perferendis eos, autem maiores nisi saepe quisquam hic odio consectetur nobis veritatis quasi explicabo obcaecati doloremque? Placeat ratione hic aspernatur error blanditiis?"
      );

      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass("main-about-page");
      expect(headingPage).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });
});
