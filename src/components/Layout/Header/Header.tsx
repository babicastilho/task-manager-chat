import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./Header.module.css";

import { FaSun } from "react-icons/fa"; // Sun icon for light mode
import { BsFillMoonStarsFill } from "react-icons/bs"; // Moon icon for dark mode
import { HiMenu } from "react-icons/hi"; // Menu icon for toggling the sidebar

/**
 * Header Component
 * Displays the application's header with a title, theme toggle button, and sidebar toggle button.
 *
 * @param {Object} props - Component properties.
 * @param {() => void} props.toggleSidebar - Callback function to toggle the sidebar visibility.
 *
 * @returns {JSX.Element} The rendered header component.
 */
interface HeaderProps {
  toggleSidebar: () => void; // Function to toggle the sidebar visibility
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  // Access the current theme and toggleTheme function from the ThemeContext
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header} data-testid="header">
      {/* Application Title */}
      <h1 className={styles.title} data-cy="header-title" data-testid="header-title">
        Task Manager Chat
      </h1>

      {/* Header Actions */}
      <div className={styles.actions}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme} // Toggle the theme between light and dark modes
          className={`${styles.actionButton} ${styles.themeButton}`} // Apply styles for the theme button
          data-cy="toggle-theme" // Cypress test identifier
          data-testid="toggle-theme" // Testing-library test identifier
        >
          {/* Display the appropriate icon based on the current theme */}
          {theme === "light" ? (
            <FaSun className={styles.icon} /> // Sun icon for light mode
          ) : (
            <BsFillMoonStarsFill className={styles.icon} /> // Moon icon for dark mode
          )}
        </button>

        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar} // Trigger the sidebar toggle function
          className={`${styles.actionButton} ${styles.menuButton}`} // Apply styles for the menu button
          data-cy="toggle-sidebar" // Cypress test identifier
          data-testid="toggle-sidebar" // Testing-library test identifier
        >
          <HiMenu className={styles.icon} /> {/* Menu icon */}
        </button>
      </div>
    </header>
  );
};

export default Header;
