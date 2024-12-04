import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./TaskList.module.css";

/**
 * Task Interface
 * Represents the structure of a single task.
 * 
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - The title of the task.
 * @property {string} [description] - Optional description of the task.
 * @property {boolean} completed - Indicates whether the task is completed.
 */
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

/**
 * TaskListProps Interface
 * Defines the properties passed to the TaskList component.
 * 
 * @property {Task[]} tasks - Array of tasks to display.
 * @property {(id: string) => void} onComplete - Callback function for marking a task as completed.
 * @property {(task: Task) => void} onDelete - Callback function for deleting a task.
 * @property {(task: Task) => void} onEdit - Callback function for editing a task.
 */
interface TaskListProps {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
}

/**
 * TaskList Component
 * Displays a list of tasks with options to mark as complete, edit, or delete.
 * 
 * @param {TaskListProps} props - Component properties.
 * @returns {JSX.Element} The rendered task list.
 */
const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete, onEdit }) => {
  return (
    <ul className={styles.taskList} data-cy="task-list" data-testid="task-list">
      {/* Display a message if no tasks are available */}
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
              {/* Checkbox for marking task as completed */}
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
              {/* Edit button for editing the task */}
              <button
                className={styles.editButton}
                onClick={() => onEdit(task)}
                data-cy={`task-edit-button-${task.id}`}
                data-testid={`task-edit-button-${task.id}`}
              >
                <FaEdit />
              </button>
              {/* Delete button for deleting the task */}
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
