import React from "react";
import styles from "./ChatMessage.module.css";

/**
 * ChatMessage Component
 * Represents a single chat message in the chat interface.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.message - The text content of the chat message.
 * 
 * @returns {JSX.Element} A styled chat message.
 */
interface ChatMessageProps {
  message: string; // The message text to be displayed.
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={styles.message} // Apply styles from ChatMessage.module.css
      data-testid="chat-message" // Test identifier for the chat message
      data-cy="chat-message" // Cypress test identifier
    >
      {message} {/* Display the message text */}
    </div>
  );
};

export default ChatMessage;
