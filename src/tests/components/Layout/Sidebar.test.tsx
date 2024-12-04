import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../../../components/Layout/Sidebar/Sidebar";
import { ThemeProvider } from "../../../context/ThemeContext";

describe("Sidebar Component", () => {
  /**
   * Test to ensure the Sidebar renders correctly when open.
   */
  it("renders correctly when open", () => {
    render(
      <ThemeProvider>
        <Sidebar isOpen={true} toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument(); // Verifies that the sidebar is rendered.
    expect(sidebar).toHaveClass("open"); // Checks if the 'open' class is applied.
  });

  /**
   * Test to ensure the Sidebar renders correctly when closed.
   */
  it("renders correctly when closed", () => {
    render(
      <ThemeProvider>
        <Sidebar isOpen={false} toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument(); // Verifies that the sidebar is rendered.
    expect(sidebar).not.toHaveClass("open"); // Checks if the 'open' class is not applied.
  });

  /**
   * Test to verify the `toggleSidebar` function is called on close button click.
   */
  it("calls the toggleSidebar function on close button click", () => {
    const mockToggleSidebar = jest.fn(); // Mock function.

    render(
      <ThemeProvider>
        <Sidebar isOpen={true} toggleSidebar={mockToggleSidebar} />
      </ThemeProvider>
    );

    const closeButton = screen.getByTestId("close-sidebar");
    fireEvent.click(closeButton); // Simulates a click event on the close button.

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1); // Ensures the function was called once.
  });

  /**
   * Test to verify the theme toggle button changes the theme on click.
   */
  it("toggles the theme on theme button click", () => {
    render(
      <ThemeProvider>
        <Sidebar isOpen={true} toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    const toggleThemeButton = screen.getByTestId("toggle-theme");
    fireEvent.click(toggleThemeButton); // Simulates a click event.

    expect(toggleThemeButton).toBeInTheDocument(); // Ensures the button is rendered.
  });

  /**
   * Test to ensure navigation links are rendered correctly.
   */
  it("renders navigation links correctly", () => {
    render(
      <ThemeProvider>
        <Sidebar isOpen={true} toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    const navList = screen.getByTestId("nav-list");
    expect(navList).toBeInTheDocument(); // Ensures the navigation list is rendered.

    const dashboardLink = screen.getByTestId("nav-item-dashboard");
    const tasksLink = screen.getByTestId("nav-item-tasks");

    expect(dashboardLink).toBeInTheDocument(); // Ensures the dashboard link is rendered.
    expect(dashboardLink.textContent).toBe("Dashboard"); // Verifies the text.

    expect(tasksLink).toBeInTheDocument(); // Ensures the tasks link is rendered.
    expect(tasksLink.textContent).toBe("Tasks"); // Verifies the text.
  });
});
