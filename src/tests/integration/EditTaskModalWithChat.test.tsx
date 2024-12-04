import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Modal from "../../components/Common/Modal/Modal";
import Chat from "../../components/Chat/Chat/Chat";

/**
 * Test suite for the "Edit Task Modal with Chat Component".
 * Verifies that the modal integrates with the Chat component correctly.
 */
describe("Edit Task Modal with Chat Component", () => {
  /**
   * Test to ensure the Chat component is rendered within the modal.
   * Verifies that the modal displays the "Comments" section and contains the Chat component.
   */
  it("renders the Chat component within the modal", async () => {
    render(
      <Modal
        isOpen={true}
        title="Edit Task"
        onClose={jest.fn()} // Mock the onClose function
        data-testid="edit-task-modal"
      >
        <div>
          <h2 data-testid="comments-header">Comments</h2>
          <Chat />
        </div>
      </Modal>
    );

    // Verify that the "Comments" header is rendered
    const commentsHeader = screen.getByTestId("comments-header");
    expect(commentsHeader).toBeInTheDocument();
    expect(commentsHeader.textContent).toBe("Comments");

    // Verify that the Chat component is rendered
    const chatComponent = screen.getByTestId("chat-container");
    expect(chatComponent).toBeInTheDocument();
  });

  /**
   * Test to ensure users can type and send messages within the Chat component.
   * Verifies that messages appear in the chat container after being sent.
   */
  it("allows users to type and send messages", async () => {
    render(
      <Modal
        isOpen={true}
        title="Edit Task"
        onClose={jest.fn()} // Mock the onClose function
        data-testid="edit-task-modal"
      >
        <div>
          <h2 data-testid="comments-header">Comments</h2>
          <Chat />
        </div>
      </Modal>
    );

    // Select the chat input and send button
    const input = screen.getByTestId("chat-input");
    const sendButton = screen.getByTestId("chat-send-button");

    // Simulate typing a message in the input
    fireEvent.change(input, { target: { value: "Test message" } });
    expect(input).toHaveValue("Test message"); // Verify the input value

    // Simulate clicking the send button
    fireEvent.click(sendButton);

    // Confirm the message is added to the messages container
    await waitFor(() => {
      const messagesContainer = screen.getByTestId("messages-container");
      const message = screen.getByText("Test message");
      expect(messagesContainer).toContainElement(message);
    });
  });
});
