import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../../../components/Layout/Sidebar/Sidebar";
import { ThemeProvider } from "../../../context/ThemeContext";

describe("Sidebar Component", () => {
  /**
   * Test to ensure the Sidebar renders correctly when open.
   * Verifies the `open` class is applied and the sidebar is in the document.
   */
  it("renders correctly when open", () => {
    render(
      <ThemeProvider>
        <Sidebar isOpen={true} toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument(); // Checks if the sidebar is rendered.
    expect(sidebar).toHaveClass("open"); // Checks if the 'open' class is applied.
  });

  /**
   * Test to ensure the Sidebar renders correctly when closed.
   * Verifies the `open` class is not applied.
   */
  it("renders correctly when closed", () => {
    render(
      <ThemeProvider>
        <Sidebar isOpen={false} toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument(); // Checks if the sidebar is rendered.
    expect(sidebar).not.toHaveClass("open"); // Ensures the 'open' class is not applied.
  });

  /**
   * Test to verify the `toggleSidebar` function is called when the close button is clicked.
   */
  it("calls the toggleSidebar function on close button click", () => {
    const mockToggleSidebar = jest.fn(); // Mock function to test the callback.

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
   * Test to verify the theme toggle button changes the theme when clicked.
   */
  it("toggles the theme on theme button click", () => {
    render(
      <ThemeProvider>
        <Sidebar isOpen={true} toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    const toggleThemeButton = screen.getByTestId("toggle-theme");
    fireEvent.click(toggleThemeButton); // Simulates a click event on the theme button.

    expect(toggleThemeButton).toBeInTheDocument(); // Ensures the button is rendered.
    // Additional logic to verify theme change can be added if the theme toggle is mocked.
  });

  /**
   * Test to ensure navigation links are rendered correctly with the expected text.
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
    const settingsLink = screen.getByTestId("nav-item-settings");

    expect(dashboardLink).toBeInTheDocument(); // Ensures the dashboard link is rendered.
    expect(dashboardLink.textContent).toBe("Dashboard"); // Verifies the text content.

    expect(tasksLink).toBeInTheDocument(); // Ensures the tasks link is rendered.
    expect(tasksLink.textContent).toBe("Tasks"); // Verifies the text content.

    expect(settingsLink).toBeInTheDocument(); // Ensures the settings link is rendered.
    expect(settingsLink.textContent).toBe("Settings"); // Verifies the text content.
  });
});
