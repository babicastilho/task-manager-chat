import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../../components/Layout/Header/Header";
import { ThemeProvider } from "../../../context/ThemeContext";

/**
 * Tests for the Header component.
 * Includes functionality for rendering, theme toggling, and menu button interactions.
 */
describe("Header Component", () => {
  /**
   * Test: Verifies that the header title renders correctly.
   * Ensures that the title element is present and displays the correct text content.
   */
  it("renders the title correctly", () => {
    render(
      <ThemeProvider>
        <Header toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    // Locate the header title element by its test ID
    const title = screen.getByTestId("header-title");

    // Assert that the title is in the document and has the correct content
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe("Task Manager Chat");
  });

  /**
   * Test: Simulates a click on the theme toggle button.
   * Ensures that the button is present and can be interacted with.
   * Note: A mock of `useTheme` should be used if testing logic for theme toggling.
   */
  it("toggles the theme on button click", () => {
    render(
      <ThemeProvider>
        <Header toggleSidebar={() => {}} />
      </ThemeProvider>
    );

    // Locate the theme toggle button by its test ID
    const toggleButton = screen.getByTestId("toggle-theme");

    // Simulate a button click
    fireEvent.click(toggleButton);

    // Verify that the button is rendered and clickable
    expect(toggleButton).toBeInTheDocument();
    // Additional logic for testing theme changes can be added here
  });

  /**
   * Test: Simulates a click on the menu toggle button.
   * Ensures that the toggleSidebar function is called when the button is clicked.
   */
  it("handles menu toggle button click", () => {
    // Mock function to test menu toggle
    const mockToggleSidebar = jest.fn();

    render(
      <ThemeProvider>
        <Header toggleSidebar={mockToggleSidebar} />
      </ThemeProvider>
    );

    // Locate the menu toggle button by its test ID
    const menuButton = screen.getByTestId("toggle-sidebar");

    // Simulate a button click
    fireEvent.click(menuButton);

    // Verify that the toggleSidebar function was called exactly once
    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
