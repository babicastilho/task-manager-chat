import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "../../components/Tasks/TaskList/TaskList";
import * as api from "../../services/api"; // Mocking API functions
import TasksPage from "../../pages/Tasks/TasksPage";

// Mock the API service
jest.mock("../../services/api");

/**
 * Test suite for TaskList and TasksPage components.
 * Ensures that task operations (fetch, add, edit, delete) work as expected
 * and validates UI interactions.
 */
describe("TaskList Component", () => {
  // Mock data for tasks
  const mockTasks = [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
  ];

  // Setup mocks for API calls
  (api.saveTask as jest.Mock).mockResolvedValue({
    id: "task-3",
    title: "New Task",
    completed: false,
  });

  const mockOnComplete = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks to ensure isolation between tests
    (api.fetchTasks as jest.Mock).mockResolvedValue(mockTasks);
    (api.saveTask as jest.Mock).mockResolvedValue({ id: "1", title: "Updated Task", completed: false });
    (api.deleteTask as jest.Mock).mockResolvedValue(undefined);
  });

  /**
   * Test to ensure tasks fetched from the API are rendered in the TaskList.
   */
  it("renders tasks fetched from the API", async () => {
    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const task1 = await screen.findByTestId("task-list-item-1");
    const task2 = await screen.findByTestId("task-list-item-2");

    expect(task1).toBeInTheDocument();
    expect(task1.textContent).toContain("Task 1");
    expect(task2).toBeInTheDocument();
    expect(task2.textContent).toContain("Task 2");
  });

  /**
   * Test to ensure marking a task as completed works correctly.
   */
  it("marks a task as completed when the checkbox is clicked", async () => {
    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const checkbox = screen.getByTestId("task-complete-checkbox-1");
    fireEvent.click(checkbox);

    expect(mockOnComplete).toHaveBeenCalledWith("1");
  });

  /**
   * Test to ensure a task is removed correctly when delete is confirmed.
   */
  it("removes a task when the remove button is clicked", async () => {
    render(<TasksPage />);

    const deleteButton = await screen.findByTestId("task-delete-button-1");
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByTestId("confirm-delete-button");
    fireEvent.click(confirmButton);

    await waitFor(() =>
      expect(screen.queryByTestId("task-list-item-1")).not.toBeInTheDocument()
    );
  });

  /**
   * Test to ensure editing a task triggers the edit handler.
   */
  it("calls onEdit when the edit button is clicked", async () => {
    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const editButton = screen.getByTestId("task-edit-button-1");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  /**
   * Test to ensure the edit modal opens and closes correctly.
   */
  it("opens and closes the edit modal correctly", async () => {
    render(<TasksPage />);

    const editButton = await screen.findByTestId("task-edit-button-1");
    fireEvent.click(editButton);

    const titleInput = await screen.findByTestId("task-title");
    expect(titleInput).toHaveValue("Task 1");

    const closeButton = await screen.findByTestId("modal-close-button");
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(screen.queryByTestId("edit-task-modal")).not.toBeInTheDocument()
    );
  });

  /**
   * Test to ensure saving an edited task updates the UI.
   */
  it("saves the task when the save button is clicked in the edit modal", async () => {
    render(<TasksPage />);

    const editButton = await screen.findByTestId("task-edit-button-1");
    fireEvent.click(editButton);

    const titleInput = await screen.findByTestId("task-title");
    fireEvent.change(titleInput, { target: { value: "Updated Task" } });

    const saveButton = await screen.findByTestId("task-save-button");
    fireEvent.click(saveButton);

    await waitFor(() => {
      const updatedTask = screen.getByTestId("task-list-item-1");
      expect(updatedTask.textContent).toContain("Updated Task");
    });
  });

  /**
   * Skipped test to ensure a new task can be added.
   */
  xit("adds a new task when the add button is clicked", async () => {
    render(<TasksPage />);

    const initialTasks = screen.getAllByRole("listitem").length;

    const addButton = screen.getByTestId("add-task-button");
    fireEvent.click(addButton);

    const titleInput = await screen.findByTestId("task-title");
    fireEvent.change(titleInput, { target: { value: "New Task" } });

    const saveButton = screen.getByTestId("task-save-button");
    fireEvent.click(saveButton);

    await waitFor(() => {
      const tasksAfterAdd = screen.getAllByRole("listitem");
      expect(tasksAfterAdd.length).toBe(initialTasks + 1);
    });

    const newTask = await screen.findByText("New Task");
    expect(newTask).toBeInTheDocument();
  });

  /**
   * Test to ensure a task cannot be saved without a title.
   */
  it("does not allow saving a task without a title", async () => {
    render(<TasksPage />);

    const addButton = screen.getByTestId("add-task-button");
    fireEvent.click(addButton);

    const saveButton = screen.getByTestId("task-save-button");
    fireEvent.click(saveButton);

    const titleInput = await screen.findByTestId("task-title");
    expect(titleInput).toBeInTheDocument();

    const errorMessages = screen.getAllByTestId("error-message");
    expect(errorMessages).toHaveLength(1);
    expect(errorMessages[0].textContent).toBe("Title is required");
  });

  /**
   * Test to ensure a message is displayed when no tasks are available.
   */
  it("displays a message when no tasks are available", async () => {
    (api.fetchTasks as jest.Mock).mockResolvedValue([]);
    render(<TasksPage />);

    await waitFor(() => {
      const emptyMessage = screen.getByTestId("empty-task-message");
      expect(emptyMessage.textContent).toBe("No tasks available");
    });
  });
});
