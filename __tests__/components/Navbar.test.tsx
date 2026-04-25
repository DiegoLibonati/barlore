import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import Navbar from "@/components/Navbar/Navbar";

const renderComponent = (): RenderResult =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

describe("Navbar", () => {
  describe("rendering", () => {
    it("should render the site title", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "Barlore" })).toBeInTheDocument();
    });

    it("should render the toggle button in closed state initially", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Open navigation menu" })).toBeInTheDocument();
    });

    it("should render the toggle button with aria-expanded false initially", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    });

    it("should render the main navigation landmark", () => {
      renderComponent();
      expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeInTheDocument();
    });

    it("should render the home navigation link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "Home page" })).toBeInTheDocument();
    });

    it("should render the about navigation link", () => {
      renderComponent();
      expect(screen.getByRole("link", { name: "About page" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should change button label to close when navigation is opened", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      expect(screen.getByRole("button", { name: "Close navigation menu" })).toBeInTheDocument();
    });

    it("should set aria-expanded to true when navigation is opened", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute(
        "aria-expanded",
        "true"
      );
    });

    it("should revert button label when navigation is closed again", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      await user.click(screen.getByRole("button", { name: "Close navigation menu" }));
      expect(screen.getByRole("button", { name: "Open navigation menu" })).toBeInTheDocument();
    });

    it("should add the open class to the navigation when opened", async () => {
      const user = userEvent.setup();
      renderComponent();
      const nav = screen.getByRole("navigation", { name: "Main navigation" });
      await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
      expect(nav).toHaveClass("header-wrapper__nav--open");
    });
  });
});
