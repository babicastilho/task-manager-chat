// Layout.tsx
import React from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Task Manager Chat</h1>
      </header>

      {/* Main Section */}
      <div className={styles.mainContainer}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/tasks">Tasks</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={styles.content}>{children}</main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        © 2024 Task Manager Chat. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
