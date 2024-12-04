import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./TaskList.module.css";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete, onEdit }) => {
  return (
    <ul className={styles.taskList} data-cy="task-list" data-testid="task-list">
      {tasks.length === 0 ? (
        <p data-cy="empty-task-message" data-testid="empty-task-message">
          No tasks available
        </p>
      ) : (
        tasks.map((task) => (
          <li
            key={task.id}
            className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
            data-cy={`task-list-item-${task.id}`}
            data-testid={`task-list-item-${task.id}`}
          >
            <div className={styles.taskContent}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.completed}
                onChange={() => onComplete(task.id)}
                data-cy={`task-complete-checkbox-${task.id}`}
                data-testid={`task-complete-checkbox-${task.id}`}
              />
              <span className={styles.taskName}>{task.title}</span>
            </div>
            <div className={styles.taskActions}>
              <button
                className={styles.editButton}
                onClick={() => onEdit(task)}
                data-cy={`task-edit-button-${task.id}`}
                data-testid={`task-edit-button-${task.id}`}
              >
                <FaEdit />
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(task)}
                data-cy={`task-delete-button-${task.id}`}
                data-testid={`task-delete-button-${task.id}`}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default TaskList;
