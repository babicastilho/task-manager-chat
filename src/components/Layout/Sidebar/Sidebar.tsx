import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./Sidebar.module.css";
import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      data-cy="sidebar"
      data-testid="sidebar"
    >
      {/* Close Sidebar Button */}
      <button
        className={styles.closeButton}
        onClick={toggleSidebar}
        data-cy="close-sidebar"
        data-testid="close-sidebar"
      >
        ×
      </button>

      {/* Theme Toggle Button */}
      <button
        className={`${styles.actionButton} ${styles.themeButton}`}
        onClick={toggleTheme}
        data-cy="toggle-theme"
        data-testid="toggle-theme"
      >
        {theme === "light" ? (
          <FaSun className={styles.icon} />
        ) : (
          <BsFillMoonStarsFill className={styles.icon} />
        )}
        <span
          className={styles.text}
          data-cy="theme-label"
          data-testid="theme-label"
        >
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </span>
      </button>

      {/* Navigation */}
      <nav>
        <ul data-cy="nav-list" data-testid="nav-list">
          <li data-cy="nav-item-dashboard" data-testid="nav-item-dashboard">
            <a href="/">Dashboard</a>
          </li>
          <li data-cy="nav-item-tasks" data-testid="nav-item-tasks">
            <a href="/tasks">Tasks</a>
          </li>
          <li data-cy="nav-item-settings" data-testid="nav-item-settings">
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
