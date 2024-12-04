import React, { useState, useEffect } from "react";
import styles from "./TaskForm.module.css"; // CSS module for styling the form

/**
 * Task Interface
 * Represents the structure of a task object.
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - Title of the task.
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
 * TaskFormProps Interface
 * Defines the props for the TaskForm component.
 * @property {Task | null} [task] - The task to edit (optional).
 * @property {(task: Task) => void} onSave - Callback to save the task.
 */
interface TaskFormProps {
  task?: Task | null;
  onSave: (task: Task) => void;
}

/**
 * TaskForm Component
 * A form for creating or editing tasks, with validation and error handling.
 *
 * @param {TaskFormProps} props - Component properties.
 * @returns {JSX.Element} The rendered TaskForm component.
 */
const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  // State to manage form fields and error messages
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [error, setError] = useState<string | null>(null);

  // Effect to update form fields when the `task` prop changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  /**
   * Handles the form submission.
   * Validates the title field before calling the `onSave` callback.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !error) {
      setError("Title is required"); // Set error if the title is empty
      return;
    }
    onSave({
      id: task?.id || "", // Use existing task ID or generate a new one
      title,
      description,
      completed: task?.completed || false, // Retain existing completion status
    });
    setError(null); // Clear error after successful save
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      data-testid="task-form"
      data-cy="task-form"
    >
      {/* Title Field */}
      <div className={styles.field}>
        <label htmlFor="task-title" className={styles.label}>
          Title:
        </label>
        <input
          id="task-title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-cy="task-title"
          data-testid="task-title"
        />
      </div>

      {/* Description Field */}
      <div className={styles.field}>
        <label htmlFor="task-description" className={styles.label}>
          Description:
        </label>
        <textarea
          id="task-description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-cy="task-description"
          data-testid="task-description"
        />
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={`${styles.button} ${styles.primary}`}
          data-cy="task-save-button"
          data-testid="task-save-button"
        >
          Save
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.secondary}`}
          onClick={() => setError(null)} // Clear error on cancel
          data-cy="task-cancel-button"
          data-testid="task-cancel-button"
        >
          Cancel
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className={styles.error} data-cy="error-message" data-testid="error-message">
          {error}
        </p>
      )}
    </form>
  );
};

export default TaskForm;
