import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { Navbar } from "@src/components/Navbar/Navbar";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar></Navbar>
    </MemoryRouter>
  );

  return {
    container: container,
  };
};

describe("Navbar.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the title of the APP.", () => {
      renderComponent();

      const headingApp = screen.getByRole("heading", {
        name: /TheCocktailDB/i,
      });

      expect(headingApp).toBeInTheDocument();
    });

    test("It must render the button to handle the navbar state. You must open and close the navbar.", async () => {
      renderComponent();

      const nav = screen.getByRole("navigation");
      const btnManageNav = screen.getByRole("button", {
        name: /manage navbar menu/i,
      });
      const faBars = btnManageNav.children[0] as HTMLElement;

      expect(nav).toBeInTheDocument();
      expect(nav).not.toHaveClass(
        "header-wrapper__nav header-wrapper__nav--open"
      );
      expect(btnManageNav).toBeInTheDocument();
      expect(faBars).toBeInTheDocument();
      expect(faBars).not.toHaveClass(
        "header-wrapper__btn-manage-icon header-wrapper__btn-manage-icon--rotate-bars"
      );

      await user.click(btnManageNav);

      expect(nav).toHaveClass("header-wrapper__nav header-wrapper__nav--open");
      expect(faBars).toHaveClass(
        "header-wrapper__btn-manage-icon header-wrapper__btn-manage-icon--rotate-bars"
      );

      await user.click(btnManageNav);

      expect(nav).not.toHaveClass(
        "header-wrapper__nav header-wrapper__nav--open"
      );
      expect(faBars).not.toHaveClass(
        "header-wrapper__btn-manage-icon header-wrapper__btn-manage-icon--rotate-bars"
      );
    });

    test("It must render the navbar, the list of links and the home and about links.", () => {
      renderComponent();

      const nav = screen.getByRole("navigation");
      const navList = screen.getByRole("list");
      const linkHome = screen.getByRole("link", { name: /go to home page/i });
      const linkAbout = screen.getByRole("link", { name: /go to about page/i });

      expect(nav).toBeInTheDocument();
      expect(navList).toBeInTheDocument();
      expect(navList.children).toHaveLength(2);
      expect(linkHome).toBeInTheDocument();
      expect(linkAbout).toBeInTheDocument();
    });
  });
});
