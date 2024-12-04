import React, { useState, useEffect } from "react";
import TaskList from "../../components/Tasks/TaskList/TaskList";
import {
  AddTaskModal,
  EditTaskModal,
  ConfirmDeleteModal,
} from "../Tasks/Modals";
import { fetchTasks, saveTask, deleteTask, Task } from "../../services/api";
import styles from "./TasksPage.module.css";

/**
 * TasksPage Component
 * This component serves as the main page for managing tasks, 
 * including listing tasks, adding new tasks, editing existing ones, 
 * and deleting tasks.
 */
const TasksPage = () => {
  // State for storing the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // State for controlling the visibility of modals
  const [showModal, setShowModal] = useState(false);

  // State for determining the type of modal to display
  const [modalType, setModalType] = useState<"edit" | "add" | "delete" | null>(
    null
  );

  // State for storing the currently selected task for editing or deletion
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  /**
   * Fetches tasks when the component mounts.
   * Uses the fetchTasks function from the mock API to retrieve tasks.
   */
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, []);

  /**
   * Saves a new or updated task.
   * If the task exists, updates it; otherwise, adds it as a new task.
   * 
   * @param {Task} task - The task to save.
   */
  const handleSaveTask = async (task: Task) => {
    try {
      const savedTask = await saveTask(task);
      setTasks((prevTasks) => {
        const taskExists = prevTasks.some((t) => t.id === savedTask.id);
        if (taskExists) {
          return prevTasks.map((t) => (t.id === savedTask.id ? savedTask : t));
        }
        return [...prevTasks, savedTask];
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  /**
   * Deletes a task by its ID.
   * Removes the task from the list after deletion.
   * 
   * @param {string} id - The ID of the task to delete.
   */
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  /**
   * Toggles the completion status of a task.
   * 
   * @param {string} id - The ID of the task to mark as completed or incomplete.
   */
  const handleCompleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div
      className={styles.container}
      data-cy="tasks-page"
      data-testid="tasks-page"
    >
      {/* Header Section */}
      <div
        className={styles.header}
        data-cy="tasks-header"
        data-testid="tasks-header"
      >
        <h1
          className={styles.title}
          data-cy="tasks-title"
          data-testid="tasks-title"
        >
          Task List
        </h1>
        <button
          className={styles.addTaskButton}
          data-cy="add-task-button"
          data-testid="add-task-button"
          onClick={() => {
            setModalType("add");
            setShowModal(true);
          }}
        >
          Add Task
        </button>
      </div>

      {/* Task List Section */}
      <TaskList
        tasks={tasks}
        onComplete={handleCompleteTask}
        onEdit={(task) => {
          setSelectedTask(task);
          setModalType("edit");
          setShowModal(true);
        }}
        onDelete={(task) => {
          setSelectedTask(task);
          setModalType("delete");
          setShowModal(true);
        }}
        data-cy="task-list"
        data-testid="task-list"
      />

      {/* Modals */}
      {modalType === "add" && (
        <AddTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveTask}
          data-cy="add-task-modal"
          data-testid="add-task-modal"
        />
      )}
      {modalType === "edit" && selectedTask && (
        <EditTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          task={selectedTask}
          onSave={handleSaveTask}
          data-cy="edit-task-modal"
          data-testid="edit-task-modal"
        />
      )}
      {modalType === "delete" && selectedTask && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDeleteTask(selectedTask.id)}
          data-cy="delete-task-modal"
          data-testid="delete-task-modal"
        />
      )}
    </div>
  );
};

export default TasksPage;
