import React, { useState } from "react";
import styles from "./Chat.module.css";
import ChatMessage from "../ChatMessage/ChatMessage";

/**
 * Chat Component
 * A simple chat interface allowing users to send and display messages (frontend only).
 * Messages are managed locally using the useState hook.
 * 
 * @returns {JSX.Element} The chat component with a list of messages and an input field.
 */
const Chat = () => {
  // State to manage the list of messages
  const [messages, setMessages] = useState<string[]>([]);
  // State to handle the current input value
  const [input, setInput] = useState("");

  /**
   * Handles sending a message.
   * Adds the current input to the messages list if it's not empty and clears the input field.
   */
  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, input]); // Add the message to the list
      setInput(""); // Clear the input field
    }
  };

  return (
    <div
      data-testid="chat-container"
      data-cy="chat-container"
      className={styles.chatContainer}
    >
      {/* Messages Container */}
      <div
        className={styles.messagesContainer}
        data-testid="messages-container"
        data-cy="messages-container"
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index} // Unique key for React reconciliation
            message={message} // Pass the message to the ChatMessage component
            data-testid={`chat-message-${index}`}
            data-cy={`chat-message-${index}`}
          />
        ))}
      </div>

      {/* Input Field and Send Button */}
      <div
        className={styles.inputContainer}
        data-testid="input-container"
        data-cy="input-container"
      >
        <input
          type="text" // Input type is text
          value={input} // Controlled input value
          onChange={(e) => setInput(e.target.value)} // Update input state on change
          placeholder="Type a message" // Placeholder text for the input field
          className={styles.input} // Apply styles from Chat.module.css
          data-testid="chat-input"
          data-cy="chat-input"
        />
        <button
          onClick={sendMessage} // Call sendMessage on click
          className={styles.button} // Apply button styles
          data-testid="chat-send-button"
          data-cy="chat-send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
