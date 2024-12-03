import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "../../components/Tasks/TaskList/TaskList";
import * as api from "../../services/api"; // Mocking API functions

jest.mock("../../services/api");

describe("TaskList Component", () => {
  const mockTasks = [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
  ];

  const mockOnComplete = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn(); // Adicionando mock para onEdit

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchTasks as jest.Mock).mockResolvedValue(mockTasks);
    (api.saveTask as jest.Mock).mockResolvedValue(undefined);
    (api.deleteTask as jest.Mock).mockResolvedValue(undefined);
  });

  it("renders tasks fetched from the API", async () => {
    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit} // Passando o mock para onEdit
      />
    );

    const task1 = await screen.findByTestId("task-item-1");
    const task2 = await screen.findByTestId("task-item-2");

    expect(task1).toBeInTheDocument();
    expect(task1.textContent).toContain("Task 1");
    expect(task2).toBeInTheDocument();
    expect(task2.textContent).toContain("Task 2");
  });

  it("adds a new task when Enter is pressed", async () => {
    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const input = screen.getByTestId("task-input");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(api.saveTask).toHaveBeenCalledWith({
      id: expect.any(String),
      title: "New Task",
      completed: false,
    });

    const newTask = await screen.findByText("New Task");
    expect(newTask).toBeInTheDocument();
  });

  it("marks a task as completed when the checkbox is clicked", async () => {
    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const checkbox = await screen.findByTestId("task-checkbox-1");

    fireEvent.click(checkbox);

    expect(mockOnComplete).toHaveBeenCalledWith("1");
  });

  it("removes a task when the remove button is clicked", async () => {
    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const removeButton = await screen.findByTestId("remove-task-1");

    fireEvent.click(removeButton);

    await waitFor(() =>
      expect(screen.queryByTestId("task-item-1")).not.toBeInTheDocument()
    );

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("calls onEdit when the edit button is clicked", async () => {
    render(
      <TaskList
        tasks={mockTasks}
        onComplete={mockOnComplete}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    );

    const editButton = await screen.findByTestId("edit-task-1");

    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
  });
});
