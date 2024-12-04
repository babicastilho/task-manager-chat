import React, { useState, useEffect } from "react";
import TaskList from "../../components/Tasks/TaskList/TaskList";
import {
  AddTaskModal,
  EditTaskModal,
  ConfirmDeleteModal,
} from "../Tasks/Modals";
import { fetchTasks, saveTask, deleteTask, Task } from "../../services/api";
import styles from "./TasksPage.module.css";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "add" | "delete" | null>(
    null
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Fetch tasks when the component mounts
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

  // Save a new or updated task
  const handleSaveTask = async (task: Task) => {
    try {
      const savedTask = await saveTask(task);
      setTasks((prevTasks) => {
        // Check if the task already exists in the list
        const taskExists = prevTasks.some((t) => t.id === savedTask.id);
        if (taskExists) {
          // Update the existing task
          return prevTasks.map((t) => (t.id === savedTask.id ? savedTask : t));
        }
        // Add as a new task
        return [...prevTasks, savedTask];
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Mark a task as complete/incomplete
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
