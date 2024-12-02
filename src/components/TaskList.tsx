import { fetchTasks, saveTask, deleteTask } from '../../services/api';
import { useEffect, useState } from 'react';
import styles from './TaskList.module.css';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const addTask = async (title: string) => {
    const newTask = { id: Date.now().toString(), title, completed: false };
    await saveTask(newTask);
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="New Task"
        onKeyDown={(e) => {
          if (e.key === 'Enter') addTask((e.target as HTMLInputElement).value);
        }}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span className={task.completed ? styles.completed : ''}>{task.title}</span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
