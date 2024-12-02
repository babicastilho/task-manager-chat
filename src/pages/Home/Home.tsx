import React from 'react';
import TaskList from '@components/Tasks/TaskList/TaskList';

import Chat from '@components/Chat/Chat/Chat';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <TaskList />
      <Chat />
    </div>
  );
};

export default Home;
