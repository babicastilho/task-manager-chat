import React from "react";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={styles.message}
      data-testid="chat-message"
      data-cy="chat-message"
    >
      {message}
    </div>
  );
};

export default ChatMessage;
