import React, { forwardRef } from "react";
import styles from "./Header.module.css";

const Header = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <header ref={ref} className={styles.header}>
      <h1>Task Manager Chat</h1>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
