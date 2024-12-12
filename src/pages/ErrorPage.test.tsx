import { screen, render } from "@testing-library/react";

import { ErrorPage } from "./ErrorPage";
import { MemoryRouter } from "react-router-dom";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ErrorPage></ErrorPage>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

test("It must render the title of the page, the link to go home and the decorative image.", () => {
  renderComponent();

  const mainContainer = screen.getByRole("main");
  const headingPage = screen.getByRole("heading", { name: /page not found/i });
  const linkHome = screen.getByRole("link", { name: /go to home/i });
  const img = screen.getByRole("img");

  expect(mainContainer).toBeInTheDocument();
  expect(mainContainer).toHaveClass("main_container");
  expect(headingPage).toBeInTheDocument();
  expect(linkHome).toBeInTheDocument();
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute(
    "src",
    "https://images.squarespace-cdn.com/content/v1/5cc0568c93a632690941e6aa/1559238179719-6DM64NLN6W8T6JPLYVP8/tenor.gif?format=300w"
  );
  expect(img).toHaveAttribute("alt", "sad person gif");
});
