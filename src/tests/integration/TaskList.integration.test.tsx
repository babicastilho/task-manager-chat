import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "../../components/Tasks/TaskList/TaskList";
import * as api from "../../services/api"; // Mocking API functions
import TasksPage from "../../pages/Tasks/TasksPage";

jest.mock("../../services/api");

describe("TaskList Component", () => {
  const mockTasks = [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
  ];

  const mockOnComplete = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

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

  it("removes a task when the remove button is clicked", async () => {
    render(
      <TasksPage />
    );
  
    // Clicar no botão de deleção
    const deleteButton = screen.getByTestId("task-delete-button-1");
    fireEvent.click(deleteButton);
  
    // Esperar o modal de confirmação aparecer
    const confirmButton = await screen.findByTestId("confirm-delete-button");
    fireEvent.click(confirmButton);
  
    // Confirmar que a tarefa foi removida
    await waitFor(() =>
      expect(screen.queryByTestId("task-list-item-1")).not.toBeInTheDocument()
    );
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

    const editButton = screen.getByTestId("task-edit-button-1");
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("opens and closes the edit modal correctly", async () => {
    render(
      <TasksPage />
    );
  
    // Abrir o modal de edição
    const editButton = screen.getByTestId("task-edit-button-1");
    fireEvent.click(editButton);
  
    // Verificar se o modal apareceu com os dados corretos
    const titleInput = await screen.findByTestId("task-title");
    expect(titleInput).toHaveValue("Learn React");
  
    // Fechar o modal
    const closeButton = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButton);
  
    // Confirmar que o modal foi fechado
    await waitFor(() =>
      expect(screen.queryByTestId("edit-task-modal")).not.toBeInTheDocument()
    );
  });
  

  it("saves the task when the save button is clicked in the edit modal", async () => {
    render(
      <TasksPage />
    );
  
    // Abrir o modal de edição
    const editButton = screen.getByTestId("task-edit-button-1");
    fireEvent.click(editButton);
  
    // Modificar e salvar a tarefa
    const titleInput = await screen.findByTestId("task-title");
    fireEvent.change(titleInput, { target: { value: "Updated Task" } });
  
    const saveButton = screen.getByTestId("task-save-button");
    fireEvent.click(saveButton);
  
    // Confirmar que os dados foram atualizados
    const updatedTask = await screen.findByText("Updated Task");
    expect(updatedTask).toBeInTheDocument();
  });  
});
