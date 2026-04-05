import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Navbar from "@/components/Navbar/Navbar";

interface RenderComponent {
  container: HTMLElement;
}

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  return { container };
};

describe("Navbar", () => {
  it("should render the site title", () => {
    renderComponent();
    expect(screen.getByText("TheCocktailDB")).toBeInTheDocument();
  });

  it("should render the main navigation landmark", () => {
    renderComponent();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
  });

  it("should render the menu toggle button with the open aria-label when closed", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toBeInTheDocument();
  });

  it("should have aria-expanded=false on the toggle button when closed", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("should update aria-label and aria-expanded when the menu is opened", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));

    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("should restore aria-label and aria-expanded when the menu is closed again", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    await user.click(screen.getByRole("button", { name: "Close navigation menu" }));

    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("should render the Home navigation link", () => {
    renderComponent();
    expect(screen.getByRole("link", { name: "Home page" })).toBeInTheDocument();
  });

  it("should render the About navigation link", () => {
    renderComponent();
    expect(screen.getByRole("link", { name: "About page" })).toBeInTheDocument();
  });
});
