import React, { useState, useEffect } from "react";

interface TaskFormProps {
  task?: { id: string; title: string; description?: string; completed?: boolean } | null;
  onSave: (task: { id: string; title: string; description?: string; completed: boolean }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: task?.id || "",
      title,
      description,
      completed: task?.completed || false,
    });
  };

  return (
    <form onSubmit={handleSubmit} data-cy="task-form" data-testid="task-form">
      <div>
        <label htmlFor="task-title">Title:</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          data-cy="task-title"
          data-testid="task-title"
        />
      </div>
      <div>
        <label htmlFor="task-description">Description:</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-cy="task-description"
          data-testid="task-description"
        ></textarea>
      </div>
      <button
        type="submit"
        data-cy="task-save-button"
        data-testid="task-save-button"
      >
        {task ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
