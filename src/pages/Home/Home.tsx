import React from 'react';
import TaskList from '@components/TaskList';

import Chat from '@chat/Chat';
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
