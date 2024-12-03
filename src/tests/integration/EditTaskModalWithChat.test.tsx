import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "../../components/Common/Modal/Modal";
import Chat from "../../components/Chat/Chat/Chat";

describe("Edit Task Modal with Chat Component", () => {
  it("renders the Chat component within the modal", async () => {
    render(
      <Modal
        isOpen={true}
        title="Edit Task"
        onClose={jest.fn()}
        data-testid="edit-task-modal"
      >
        <div>
          <h2 data-testid="comments-header">Comments</h2>
          <Chat />
        </div>
      </Modal>
    );

    // Verificar se o header e o Chat estão renderizados
    const commentsHeader = screen.getByTestId("comments-header");
    expect(commentsHeader).toBeInTheDocument();
    expect(commentsHeader.textContent).toBe("Comments");

    const chatComponent = screen.getByTestId("chat-container");
    expect(chatComponent).toBeInTheDocument();
  });

  it("allows users to type and send messages", async () => {
    render(
      <Modal
        isOpen={true}
        title="Edit Task"
        onClose={jest.fn()}
        data-testid="edit-task-modal"
      >
        <div>
          <h2 data-testid="comments-header">Comments</h2>
          <Chat />
        </div>
      </Modal>
    );

    const input = screen.getByTestId("chat-input");
    const sendButton = screen.getByTestId("chat-send-button");

    // Simular digitar e enviar mensagem
    fireEvent.change(input, { target: { value: "Test message" } });
    expect(input).toHaveValue("Test message");

    fireEvent.click(sendButton);

    // Confirmar que a mensagem foi adicionada
    await waitFor(() => {
      const messagesContainer = screen.getByTestId("messages-container");
      const message = screen.getByText("Test message");
      expect(messagesContainer).toContainElement(message);
    });
  });
});
