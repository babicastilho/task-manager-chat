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
        // Verifica se a tarefa já existe na lista
        const taskExists = prevTasks.some((t) => t.id === savedTask.id);
        if (taskExists) {
          // Atualiza a tarefa existente
          return prevTasks.map((t) => (t.id === savedTask.id ? savedTask : t));
        }
        // Adiciona como nova tarefa
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Task List</h1>
        <button
          className={styles.addTaskButton}
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
      />
      {modalType === "add" && (
        <AddTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveTask}
        />
      )}
      {modalType === "edit" && selectedTask && (
        <EditTaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          task={selectedTask}
          onSave={handleSaveTask}
        />
      )}
      {modalType === "delete" && selectedTask && (
        <ConfirmDeleteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleDeleteTask(selectedTask.id)}
        />
      )}
    </div>
  );
};

export default TasksPage;
