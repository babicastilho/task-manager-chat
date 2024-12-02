import React from "react";
import styles from "@components/Layout/Footer/Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      © 2024 Task Manager Chat. All rights reserved.
    </footer>
  );
};

export default Footer;
