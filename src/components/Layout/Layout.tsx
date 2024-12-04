import React, { useState } from "react";
import Header from "@components/Layout/Header/Header";
import Sidebar from "@components/Layout/Sidebar/Sidebar";
import Footer from "@components/Layout/Footer/Footer";
import { ThemeProvider } from "@context/ThemeContext";
import styles from "./Layout.module.css";

/**
 * Layout Component
 * Provides a consistent layout structure for the application, including a header, footer, sidebar, and a main content area.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The content to be displayed within the layout.
 *
 * @returns {JSX.Element} The rendered layout component.
 */
interface LayoutProps {
  children: React.ReactNode; // The child components to render within the layout
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // State to manage the visibility of the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * Toggles the visibility of the sidebar.
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <div className={styles.layout} data-testid="layout" data-cy="layout">
        {/* Header Component */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className={styles.mainContainer} data-testid="main-container" data-cy="main-container">
          {/* Sidebar Component */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <main className={styles.content} data-testid="main-content" data-cy="main-content">
            {children}
          </main>
        </div>

        {/* Footer Component */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
