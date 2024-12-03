import React from "react";
import styles from "./TaskList.module.css";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete }) => {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? styles.completed : ""}>
          <span>{task.title}</span>
          <button onClick={() => onComplete(task.id)}>Mark as Completed</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
