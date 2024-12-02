import React from "react";
import styles from "@components/Layout/Header/Header.module.css";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={toggleSidebar}>
        ☰
      </button>
      <h1>Task Manager Chat</h1>
    </header>
  );
};

export default Header;
