import { useEffect, useState } from 'react';
import { fetchTasks, saveTask, deleteTask } from '../../../services/api';
import styles from './TaskList.module.css';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const TaskList = () => {
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
    <div className={styles.container} data-testid="task-list">
      <input
        type="text"
        placeholder="New Task"
        onKeyDown={(e) => {
          if (e.key === 'Enter') addTask((e.target as HTMLInputElement).value);
        }}
        data-testid="task-input"
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.id} data-testid={`task-item-${task.id}`}>
            <span
              className={task.completed ? styles.completed : ''}
              data-testid={`task-title-${task.id}`}
            >
              {task.title}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              data-testid={`remove-task-${task.id}`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default TaskList;
