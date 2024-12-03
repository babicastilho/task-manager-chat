import React from "react";
import { useTheme } from "@context/ThemeContext";
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
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      {/* Botão de fechar a sidebar */}
      <button
        className={styles.closeButton}
        onClick={toggleSidebar}
        data-cy="close-sidebar"
        data-testid="close-sidebar"
      >
        ×
      </button>

      {/* Botão de alternância de tema */}
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
        <span className={styles.text}>
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </span>
      </button>

      {/* Navegação */}
      <nav>
        <ul>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/tasks">Tasks</a>
          </li>
          <li>
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
