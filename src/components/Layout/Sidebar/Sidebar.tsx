import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./Sidebar.module.css";
import { FaSun, FaHome, FaTasks } from "react-icons/fa"; // Icons for navigation and theme toggle
import { BsFillMoonStarsFill } from "react-icons/bs"; // Icon for dark mode theme

/**
 * Sidebar Component
 * Provides navigation links and a theme toggle button within a collapsible sidebar.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Determines if the sidebar is open or closed.
 * @param {() => void} props.toggleSidebar - Callback function to toggle the sidebar's visibility.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
interface SidebarProps {
  isOpen: boolean; // Indicates if the sidebar is open
  toggleSidebar: () => void; // Function to toggle the sidebar visibility
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  // Access the current theme and toggleTheme function from the ThemeContext
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`} // Conditionally apply the 'open' style if the sidebar is open
      data-cy="sidebar" // Cypress test identifier
      data-testid="sidebar" // Testing-library test identifier
    >
      {/* Close Sidebar Button */}
      <button
        className={styles.closeButton} // Style for the close button
        onClick={toggleSidebar} // Callback to toggle sidebar visibility
        data-cy="close-sidebar" // Cypress test identifier
        data-testid="close-sidebar" // Testing-library test identifier
      >
        ×
      </button>

      {/* Navigation Links */}
      <nav data-testid="nav-list" data-cy="nav-list" className={styles.nav}>
        <ul>
          {/* Dashboard Navigation Link */}
          <li>
            <a
              href="/" // Link to the Dashboard page
              className={styles.navItem} // Style for navigation items
              data-testid="nav-item-dashboard" // Testing-library test identifier
              data-cy="nav-item-dashboard" // Cypress test identifier
            >
              <FaHome className={styles.icon} />Dashboard
            </a>
          </li>
          {/* Tasks Navigation Link */}
          <li>
            <a
              href="/tasks" // Link to the Tasks page
              className={styles.navItem} // Style for navigation items
              data-testid="nav-item-tasks" // Testing-library test identifier
              data-cy="nav-item-tasks" // Cypress test identifier
            >
              <FaTasks className={styles.icon} />Tasks
            </a>
          </li>
        </ul>
      </nav>

      <hr /> {/* Horizontal separator */}

      {/* Theme Toggle Button */}
      <button
        className={styles.themeButton} // Style for the theme toggle button
        onClick={toggleTheme} // Callback to toggle the theme
        data-cy="toggle-theme" // Cypress test identifier
        data-testid="toggle-theme" // Testing-library test identifier
      >
        {/* Display the appropriate icon and label based on the current theme */}
        {theme === "light" ? (
          <FaSun className={styles.icon} /> // Sun icon for light mode
        ) : (
          <BsFillMoonStarsFill className={styles.icon} /> // Moon icon for dark mode
        )}
        <span
          className={styles.text} // Style for the text label
          data-cy="theme-label" // Cypress test identifier
          data-testid="theme-label" // Testing-library test identifier
        >
          {theme === "light" ? "Light Mode" : "Dark Mode"} {/* Label for the theme */}
        </span>
      </button>
    </aside>
  );
};

export default Sidebar;
