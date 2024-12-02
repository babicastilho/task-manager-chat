import React, { forwardRef } from "react";
import styles from "./Footer.module.css";

const Footer = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <footer ref={ref} className={styles.footer}>
      <p>© 2024 Task Manager Chat. All rights reserved.</p>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
