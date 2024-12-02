import React from 'react';
import styles from './Main.module.css';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
