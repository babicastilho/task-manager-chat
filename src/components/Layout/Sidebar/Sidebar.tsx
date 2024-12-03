import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./Sidebar.module.css";
import { FaSun, FaHome, FaTasks } from "react-icons/fa";
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

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/" className={styles.navItem}>
              <FaHome className={styles.icon} /> Dashboard
            </a>
          </li>
          <li>
            <a href="/tasks" className={styles.navItem}>
              <FaTasks className={styles.icon} /> Tasks
            </a>
          </li>
        </ul>
      </nav>

      <hr />

      {/* Theme Toggle Button */}
      <button
        className={styles.themeButton}
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
    </aside>
  );
};

export default Sidebar;
