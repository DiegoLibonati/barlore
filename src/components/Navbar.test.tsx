import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { Navbar } from "./Navbar";

import { AppProvider } from "../context/AppContext";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <AppProvider>
        <Navbar></Navbar>
      </AppProvider>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

test("It must render the title of the APP.", () => {
  renderComponent();

  const headingApp = screen.getByRole("heading", { name: /TheCocktailDB/i });

  expect(headingApp).toBeInTheDocument();
});

test("It must render the button to handle the navbar state. You must open and close the navbar.", async () => {
  renderComponent();

  const nav = screen.getByRole("navigation");
  const btnManageNav = screen.getByRole("button", {
    name: /manage navbar menu/i,
  });
  // eslint-disable-next-line
  const faBars = btnManageNav.children[0] as HTMLElement;

  expect(nav).toBeInTheDocument();
  expect(nav).not.toHaveClass("nav-open");
  expect(btnManageNav).toBeInTheDocument();
  expect(faBars).toBeInTheDocument();
  expect(faBars).not.toHaveClass("rotate-bars");

  await user.click(btnManageNav);

  expect(nav).toHaveClass("nav-open");
  expect(faBars).toHaveClass("rotate-bars");

  await user.click(btnManageNav);

  expect(nav).not.toHaveClass("nav-open");
  expect(faBars).not.toHaveClass("rotate-bars");
});

test("It must render the navbar, the list of links and the home and about links.", () => {
  renderComponent();

  const nav = screen.getByRole("navigation");
  const navList = screen.getByRole("list");
  const linkHome = screen.getByRole("link", { name: /go to home page/i });
  const linkAbout = screen.getByRole("link", { name: /go to about page/i });

  expect(nav).toBeInTheDocument();
  expect(navList).toBeInTheDocument();
  // eslint-disable-next-line
  expect(navList.children).toHaveLength(2);
  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
});
