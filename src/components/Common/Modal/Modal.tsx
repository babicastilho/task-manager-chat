import React from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./Modal.module.css";

/**
 * Modal Component
 * A reusable modal dialog for displaying content in an overlay.
 * 
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {() => void} props.onClose - Function to handle modal close action.
 * @param {string} [props.title] - Optional title for the modal header.
 * @param {React.ReactNode} props.children - Content to display inside the modal body.
 * 
 * @returns {JSX.Element | null} The modal structure if `isOpen` is true; otherwise, null.
 */
interface ModalProps {
  isOpen: boolean; // Determines if the modal should be visible.
  onClose: () => void; // Callback function to close the modal.
  title?: string; // Optional title displayed in the modal header.
  children: React.ReactNode; // The content of the modal body.
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Do not render the modal if it is not open
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay} // Background overlay styling
      data-cy="modal-overlay" // Cypress test identifier for the overlay
      data-testid="modal-overlay" // Test identifier for the overlay
    >
      <div
        className={styles.modal} // Main modal container styling
        data-cy="modal-container" // Cypress test identifier for the modal container
        data-testid="modal-container" // Test identifier for the modal container
      >
        {/* Modal Header */}
        <div className={styles.header}>
          {title && (
            <h2
              className={styles.title} // Styling for the modal title
              data-cy="modal-title" // Cypress test identifier for the title
              data-testid="modal-title" // Test identifier for the title
            >
              {title} {/* Display the modal title if provided */}
            </h2>
          )}
          {/* Close Button */}
          <button
            onClick={onClose} // Call onClose when clicked
            className={styles.closeButton} // Styling for the close button
            data-cy="modal-close-button" // Cypress test identifier for the close button
            data-testid="modal-close-button" // Test identifier for the close button
          >
            <FaTimes className={styles.icon} /> {/* Close icon */}
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {children} {/* Render the modal's children content */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
