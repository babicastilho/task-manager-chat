import React, { useState } from "react";
import styles from "./Chat.module.css";
import ChatMessage from "../ChatMessage/ChatMessage";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, input]);
      setInput(""); // Limpar o campo de entrada após o envio
    }
  };

  return (
    <div
      data-testid="chat-container"
      data-cy="chat-container"
      className={styles.chatContainer}
    >
      <div
        className={styles.messagesContainer}
        data-testid="messages-container"
        data-cy="messages-container"
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            data-testid={`chat-message-${index}`}
            data-cy={`chat-message-${index}`}
          />
        ))}
      </div>
      <div
        className={styles.inputContainer}
        data-testid="input-container"
        data-cy="input-container"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className={styles.input}
          data-testid="chat-input"
          data-cy="chat-input"
        />
        <button
          onClick={sendMessage}
          className={styles.button}
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
