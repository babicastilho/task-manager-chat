import React from "react";
import styles from "@components/Layout/Sidebar/Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeButton} onClick={toggleSidebar}>
        ×
      </button>
      <nav>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="/settings">Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
