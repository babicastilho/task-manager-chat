import React, { useState } from "react";
import Modal from "../../components/Common/Modal/Modal";
import TaskList from "../../components/Tasks/TaskList/TaskList";
import TaskForm from "../../components/Tasks/TaskForm/TaskForm";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Learn React", description: "Focus on hooks", completed: false },
    { id: "2", title: "Build a project", description: "Use TypeScript", completed: true },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "add" | "delete" | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCompleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    closeModal();
  };

  const handleSaveTask = (task: Task) => {
    if (task.id) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))
      );
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        { ...task, id: Date.now().toString(), completed: false },
      ]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setModalType(null);
  };

  return (
    <div>
      <h1>Task List</h1>
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
