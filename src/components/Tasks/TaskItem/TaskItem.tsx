import React from "react";
import { FaEdit } from "react-icons/fa";

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onEdit: () => void;
  onComplete: () => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  completed,
  onEdit,
  onComplete,
  onDelete,
}) => {
  return (
    <div data-cy={`task-item-${id}`} data-testid={`task-item-${id}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={onComplete}
        data-cy={`task-checkbox-${id}`}
        data-testid={`task-checkbox-${id}`}
      />
      <span
        style={{ textDecoration: completed ? "line-through" : "none" }}
        data-cy={`task-title-${id}`}
        data-testid={`task-title-${id}`}
      >
        {title}
      </span>
      <button
        onClick={onComplete}
        data-cy={`task-complete-button-${id}`}
        data-testid={`task-complete-button-${id}`}
      >
        Mark as Completed
      </button>
      <button
        onClick={onDelete}
        data-cy={`task-delete-button-${id}`}
        data-testid={`task-delete-button-${id}`}
      >
        Delete
      </button>
      <button
        onClick={onEdit}
        data-cy={`task-edit-button-${id}`}
        data-testid={`task-edit-button-${id}`}
      >
        <FaEdit /> Edit
      </button>
    </div>
  );
};

export default TaskItem;
