import React from "react";
import Modal from "../../../components/Common/Modal/Modal";
import TaskForm from "../../../components/Tasks/TaskForm/TaskForm";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { id: string; title: string; completed: boolean }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onSave }) => {
  const handleSave = (task: { title: string; description?: string }) => {
    onSave({ id: `${Date.now()}`, title: task.title, completed: false });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Task">
      <TaskForm onSave={handleSave} />
    </Modal>
  );
};

export default AddTaskModal;
