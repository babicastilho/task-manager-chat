import React, { useState } from "react";
import Header from "@components/Layout/Header/Header";
import Sidebar from "@components/Layout/Sidebar/Sidebar";
import Footer from "@components/Layout/Footer/Footer";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <Header toggleSidebar={toggleSidebar} />
      <div className={styles.mainContainer}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={styles.content}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
