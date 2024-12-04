import React from "react";
import Modal from "../../../components/Common/Modal/Modal";
import TaskForm from "../../../components/Tasks/TaskForm/TaskForm";
import Chat from "../../../components/Chat/Chat/Chat"; // Certifique-se que o caminho está correto
import styles from "./EditTaskModal.module.css";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: { id: string; title: string; description?: string; completed: boolean };
  onSave: (task: { id: string; title: string; description?: string; completed: boolean }) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  task,
  onSave,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Task">
      <div className={styles.container}>
        {/* Formulário de edição */}
        <TaskForm task={task} onSave={onSave} />

        {/* Seção de comentários */}
        <div className={styles.chatSection}>
          <h3 className={styles.chatTitle}>Comments</h3>
          <Chat />
        </div>
      </div>
    </Modal>
  );
};

export default EditTaskModal;
