import React from "react";
import { FaEdit } from "react-icons/fa";

/**
 * TaskItemProps Interface
 * Defines the properties for the TaskItem component.
 * 
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - The title of the task.
 * @property {boolean} completed - Indicates whether the task is completed.
 * @property {() => void} onEdit - Callback function triggered when the edit button is clicked.
 * @property {() => void} onComplete - Callback function triggered when the task is marked as completed.
 * @property {() => void} onDelete - Callback function triggered when the delete button is clicked.
 */
interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onEdit: () => void;
  onComplete: () => void;
  onDelete: () => void;
}

/**
 * TaskItem Component
 * Represents a single task item with options to edit, mark as complete, or delete.
 * 
 * @param {TaskItemProps} props - Component properties.
 * @returns {JSX.Element} The rendered task item component.
 */
const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  completed,
  onEdit,
  onComplete,
  onDelete,
}) => {
  return (
    <div
      data-cy={`task-item-${id}`}
      data-testid={`task-item-${id}`}
    >
      {/* Checkbox to mark task as completed */}
      <input
        type="checkbox"
        checked={completed}
        onChange={onComplete}
        data-cy={`task-checkbox-${id}`}
        data-testid={`task-checkbox-${id}`}
      />
      
      {/* Task title, with strikethrough style if completed */}
      <span
        style={{ textDecoration: completed ? "line-through" : "none" }}
        data-cy={`task-title-${id}`}
        data-testid={`task-title-${id}`}
      >
        {title}
      </span>

      {/* Button to mark task as completed */}
      <button
        onClick={onComplete}
        data-cy={`task-complete-button-${id}`}
        data-testid={`task-complete-button-${id}`}
      >
        Mark as Completed
      </button>

      {/* Button to delete the task */}
      <button
        onClick={onDelete}
        data-cy={`task-delete-button-${id}`}
        data-testid={`task-delete-button-${id}`}
      >
        Delete
      </button>

      {/* Button to edit the task */}
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
