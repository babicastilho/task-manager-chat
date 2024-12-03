import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import styles from "./Header.module.css";

import { FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { HiMenu } from "react-icons/hi"; // Ícone do menu

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header} data-testid="header">
      <h1 data-cy="header-title" data-testid="header-title">Task Manager Chat</h1>
      <div className={styles.actions}>
        {/* Botão de alternância de tema */}
        <button
          onClick={toggleTheme}
          className={`${styles.actionButton} ${styles.themeButton}`}
          data-cy="toggle-theme"
          data-testid="toggle-theme"
        >
          {theme === "light" ? <FaSun className={styles.icon} /> : <BsFillMoonStarsFill className={styles.icon} />}
        </button>

        {/* Botão de menu */}
        <button
          onClick={toggleSidebar}
          className={`${styles.actionButton} ${styles.menuButton}`}
          data-cy="toggle-sidebar"
          data-testid="toggle-sidebar"
        >
          <HiMenu className={styles.icon} />
        </button>
      </div>
    </header>
  );
};

export default Header;
