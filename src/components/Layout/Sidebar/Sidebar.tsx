import React, { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={toggleSidebar}>
        ×
      </button>
      <ul>
        <li>Dashboard</li>
        <li>Tasks</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
