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
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
