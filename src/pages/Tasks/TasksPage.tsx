import React, { useState, useEffect } from "react";
import Modal from "../../components/Common/Modal/Modal";
import TaskList from "../../components/Tasks/TaskList/TaskList";
import TaskForm from "../../components/Tasks/TaskForm/TaskForm";
import { fetchTasks, saveTask, deleteTask, Task } from "../../services/api";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "add" | "delete" | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Carregar tarefas da API ao inicializar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        setError("Failed to load tasks. Please try again later.");
      }
    };
    loadTasks();
  }, []);

  const handleCompleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      closeModal();
    } catch (err) {
      setError("Failed to delete the task.");
    }
  };

  const handleSaveTask = async (task: Task) => {
    try {
      if (task.id) {
        // Atualizar uma tarefa existente
        const updatedTask = await saveTask(task);
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)) // Substitui a tarefa existente
        );
      } else {
        // Adicionar uma nova tarefa
        const newTask = await saveTask({
          ...task,
          id: "new-task-id", // Certifique-se de que o ID é consistente
          completed: false,
        });
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
      closeModal();
    } catch (err) {
      setError("Failed to save the task.");
    }
  };        

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setModalType(null);
  };

  return (
    <div>
      <h1>Task List</h1>
      {/* Exibir erros, se houver */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={() => {
          setModalType("add");
          setShowModal(true);
        }}
        data-cy="add-task-button"
        data-testid="add-task-button"
      >
        Add Task
      </button>
      <TaskList
        tasks={tasks}
        onComplete={handleCompleteTask}
        onDelete={(task) => {
          setSelectedTask(task);
          setModalType("delete");
          setShowModal(true);
        }}
        onEdit={(task) => {
          setSelectedTask(task);
          setModalType("edit");
          setShowModal(true);
        }}
      />
      {showModal && modalType === "edit" && (
        <Modal
          isOpen={showModal}
          title="Edit Task"
          onClose={closeModal}
          data-cy="edit-task-modal"
          data-testid="edit-task-modal"
        >
          <TaskForm task={selectedTask} onSave={handleSaveTask} />
        </Modal>
      )}
      {showModal && modalType === "add" && (
        <Modal
          isOpen={showModal}
          title="Add Task"
          onClose={closeModal}
          data-cy="add-task-modal"
          data-testid="add-task-modal"
        >
          <TaskForm onSave={handleSaveTask} />
        </Modal>
      )}
      {showModal && modalType === "delete" && (
        <Modal
          isOpen={showModal}
          title="Confirm Deletion"
          onClose={closeModal}
          data-cy="delete-task-modal"
          data-testid="delete-task-modal"
        >
          <p>Are you sure you want to delete this task?</p>
          <button
            onClick={() => selectedTask && handleDeleteTask(selectedTask.id)}
            data-cy="confirm-delete-button"
            data-testid="confirm-delete-button"
          >
            Yes, Delete
          </button>
          <button onClick={closeModal}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default TasksPage;
