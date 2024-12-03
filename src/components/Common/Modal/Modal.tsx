import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      data-cy="modal-overlay"
      data-testid="modal-overlay"
    >
      <div
        className={styles.modal}
        data-cy="modal-container"
        data-testid="modal-container"
      >
        <div className={styles.header}>
          {title && (
            <h2
              className={styles.title}
              data-cy="modal-title"
              data-testid="modal-title"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className={styles.closeButton}
            data-cy="modal-close"
            data-testid="modal-close"
          >
            <FaTimes className={styles.icon} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
