import React, { useState, useEffect } from "react";
import styles from "./TaskForm.module.css"; // Certifique-se de criar e usar este arquivo CSS

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskFormProps {
  task?: Task | null;
  onSave: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !error) {
      setError("Title is required");
      return;
    }
    onSave({
      id: task?.id || "",
      title,
      description,
      completed: task?.completed || false,
    });
    setError(null);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      data-testid="task-form"
    >
      <div className={styles.field}>
        <label htmlFor="task-title" className={styles.label}>
          Title:
        </label>
        <input
          id="task-title"
          className={styles.input}
          data-cy="task-title"
          data-testid="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="task-description" className={styles.label}>
          Description:
        </label>
        <textarea
          id="task-description"
          className={styles.textarea}
          data-cy="task-description"
          data-testid="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
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
          onClick={() => setError(null)} 
        >
          Cancel
        </button>
      </div>
      {error && (
        <p className={styles.error} data-cy="error-message" data-testid="error-message">
          {error}
        </p>
      )}
    </form>
  );
};

export default TaskForm;
