import React, { useState, useEffect } from "react";

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
  const [error, setError] = useState<string | null>(null); // Adiciona estado para o erro

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !error) {
      // Adicione uma verificação de erro já existente
      setError("Title is required");
      return;
    }
    onSave({
      id: task?.id || "",
      title,
      description,
      completed: task?.completed || false,
    });
    setError(null); // Limpa o erro após salvar com sucesso
  };

  return (
    <form onSubmit={handleSubmit} data-testid="task-form">
      <div>
        <label htmlFor="task-title">Title:</label>
        <input
          id="task-title"
          data-cy="task-title"
          data-testid="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="task-description">Description:</label>
        <textarea
          id="task-description"
          data-cy="task-description"
          data-testid="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        type="submit"
        data-cy="task-save-button"
        data-testid="task-save-button"
      >
        Save
      </button>
      {error && (
        <p data-cy="error-message" data-testid="error-message">
          {error}
        </p>
      )}
    </form>
  );
};

export default TaskForm;
