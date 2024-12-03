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

  (api.saveTask as jest.Mock).mockResolvedValue({
    id: "task-3",
    title: "New Task",
    completed: false,
  });  

  const mockOnComplete = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchTasks as jest.Mock).mockResolvedValue(mockTasks);
    (api.saveTask as jest.Mock).mockResolvedValue({ id: "1", title: "Updated Task", completed: false });
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
    render(<TasksPage />);

    // Abrir o modal de deleção
    const deleteButton = await screen.findByTestId("task-delete-button-1");
    fireEvent.click(deleteButton);

    // Confirmar a deleção
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
    render(<TasksPage />);

    // Abrir o modal de edição
    const editButton = await screen.findByTestId("task-edit-button-1");
    fireEvent.click(editButton);

    // Verificar se o modal apareceu com os dados corretos
    const titleInput = await screen.findByTestId("task-title");
    expect(titleInput).toHaveValue("Task 1");

    // Fechar o modal
    const closeButton = await screen.findByTestId("modal-close-button");
    fireEvent.click(closeButton);

    // Confirmar que o modal foi fechado
    await waitFor(() =>
      expect(screen.queryByTestId("edit-task-modal")).not.toBeInTheDocument()
    );
  });

  it("saves the task when the save button is clicked in the edit modal", async () => {
    render(<TasksPage />);
  
    // Abrir o modal de edição
    const editButton = await screen.findByTestId("task-edit-button-1");
    fireEvent.click(editButton);
  
    // Modificar e salvar a tarefa
    const titleInput = await screen.findByTestId("task-title");
    fireEvent.change(titleInput, { target: { value: "Updated Task" } });
  
    const saveButton = await screen.findByTestId("task-save-button");
    fireEvent.click(saveButton);
  
    // Confirmar que os dados foram atualizados
    await waitFor(() => {
      const updatedTask = screen.getByTestId("task-list-item-1");
      expect(updatedTask.textContent).toContain("Updated Task");
    });
  });

  xit("adds a new task when the add button is clicked", async () => {
    render(<TasksPage />);
  
    // Capturar a quantidade inicial de tarefas
    const initialTasks = screen.getAllByRole("listitem").length;
  
    // Abrir o modal de adição
    const addButton = screen.getByTestId("add-task-button");
    fireEvent.click(addButton);
  
    // Preencher os dados da nova tarefa e salvar
    const titleInput = await screen.findByTestId("task-title");
    fireEvent.change(titleInput, { target: { value: "New Task" } });
  
    const saveButton = screen.getByTestId("task-save-button");
    fireEvent.click(saveButton);
  
    // Verificar que o número de tarefas aumentou
    await waitFor(() => {
      const tasksAfterAdd = screen.getAllByRole("listitem");
      expect(tasksAfterAdd.length).toBe(initialTasks + 1);
    });
  
    // Confirmar que o texto da nova tarefa é o esperado
    const newTask = await screen.findByText("New Task");
    expect(newTask).toBeInTheDocument();
  });
     
  
  it("does not allow saving a task without a title", async () => {
    render(<TasksPage />);
  
    // Abrir o modal de adição
    const addButton = screen.getByTestId("add-task-button");
    fireEvent.click(addButton);
  
    // Tentar salvar sem preencher o título
    const saveButton = screen.getByTestId("task-save-button");
    fireEvent.click(saveButton);
  
    // Verificar que o modal continua aberto
    const titleInput = await screen.findByTestId("task-title");
    expect(titleInput).toBeInTheDocument();
  
    // Verificar que só existe uma mensagem de erro
    const errorMessages = screen.getAllByTestId("error-message");
    expect(errorMessages).toHaveLength(1);
    expect(errorMessages[0].textContent).toBe("Title is required");
  });   

  it("displays a message when no tasks are available", async () => {
    (api.fetchTasks as jest.Mock).mockResolvedValue([]);
    render(<TasksPage />);
  
    // Verificar mensagem de "nenhuma tarefa"
    await waitFor(() => {
      const emptyMessage = screen.getByTestId("empty-task-message");
      expect(emptyMessage.textContent).toBe("No tasks available");
    });
  });  
});
