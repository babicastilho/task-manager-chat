import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "../../components/Tasks/TaskList/TaskList"; // Direct path to the TaskList component
import * as api from "../../services/api"; // Mocking API functions

// Mocking the API functions to simulate behavior
jest.mock("../../services/api");

describe("TaskList Component", () => {
  // Mock data representing tasks
  const mockTasks = [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
  ];

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchTasks as jest.Mock).mockResolvedValue(mockTasks); // Mock fetchTasks API response
    (api.saveTask as jest.Mock).mockResolvedValue(undefined); // Mock saveTask behavior
    (api.deleteTask as jest.Mock).mockResolvedValue(undefined); // Mock deleteTask behavior
  });

  /**
   * Test to verify tasks fetched from the API are rendered correctly.
   */
  it("renders tasks fetched from the API", async () => {
    render(<TaskList />);

    // Wait for the component to render tasks fetched from the API
    const task1 = await screen.findByTestId("task-title-1");
    const task2 = await screen.findByTestId("task-title-2");

    // Verify that tasks are present in the DOM with correct text
    expect(task1).toBeInTheDocument();
    expect(task1.textContent).toBe("Task 1");
    expect(task2).toBeInTheDocument();
    expect(task2.textContent).toBe("Task 2");
  });

  /**
   * Test to verify a new task is added when the Enter key is pressed.
   */
  it("adds a new task when Enter is pressed", async () => {
    render(<TaskList />);

    const input = screen.getByTestId("task-input");

    // Simulate typing a new task title and pressing Enter
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Verify saveTask is called with the correct data
    expect(api.saveTask).toHaveBeenCalledWith({
      id: expect.any(String),
      title: "New Task",
      completed: false,
    });

    // Wait for the new task to be rendered in the list
    const newTask = await screen.findByText("New Task");
    expect(newTask).toBeInTheDocument();
  });

  /**
   * Test to verify a task is removed when the remove button is clicked.
   */
  it("removes a task when the remove button is clicked", async () => {
    render(<TaskList />);

    const removeButton = await screen.findByTestId("remove-task-1");

    // Simulate clicking the remove button
    fireEvent.click(removeButton);

    // Wait for the task to be removed from the DOM
    await waitFor(() =>
      expect(screen.queryByTestId("task-item-1")).not.toBeInTheDocument()
    );

    // Verify deleteTask is called with the correct task ID
    expect(api.deleteTask).toHaveBeenCalledWith("1");
  });
});
