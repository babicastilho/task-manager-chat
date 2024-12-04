import React from "react";
import Modal from "../../../components/Common/Modal/Modal";
import styles from "./ConfirmDeleteModal.module.css"; // Certifique-se de criar este arquivo CSS

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion">
    <p className={styles.message}>Are you sure you want to delete this task?</p>
    <div className={styles.buttonGroup}>
      <button
        className={`${styles.button} ${styles.danger}`}
        onClick={onConfirm}
        data-testid="confirm-delete-button"
      >
        Yes, Delete
      </button>
      <button
        className={`${styles.button} ${styles.secondary}`}
        onClick={onClose}
        data-testid="cancel-button"
      >
        Cancel
      </button>
    </div>
  </Modal>
);

export default ConfirmDeleteModal;
