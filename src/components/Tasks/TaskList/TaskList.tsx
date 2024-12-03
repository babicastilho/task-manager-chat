import React from "react";

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
    <ul data-cy="task-list" data-testid="task-list">
    {tasks.length === 0 ? (
      <p data-cy="empty-task-message" data-testid="empty-task-message">
        No tasks available
      </p>
    ) : (
      tasks.map((task) => (
        <li
          key={task.id}
          data-cy={`task-list-item-${task.id}`}
          data-testid={`task-list-item-${task.id}`}
        >
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onComplete(task.id)}
              data-cy={`task-complete-checkbox-${task.id}`}
              data-testid={`task-complete-checkbox-${task.id}`}
            />
            <span data-cy={`task-title-${task.id}`} data-testid={`task-title-${task.id}`}>
              {task.title}
            </span>
          </div>
          <button
            onClick={() => onEdit(task)}
            data-cy={`task-edit-button-${task.id}`}
            data-testid={`task-edit-button-${task.id}`}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            data-cy={`task-delete-button-${task.id}`}
            data-testid={`task-delete-button-${task.id}`}
          >
            Delete
          </button>
        </li>
      ))
    )}
  </ul>  
  );
};

export default TaskList;
