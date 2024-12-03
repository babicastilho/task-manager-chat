// src/services/mockApi.ts

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Mock inicial de tarefas
const mockTasks: Task[] = [
  { id: "1", title: "Learn React", completed: false },
  { id: "2", title: "Build a project", completed: true },
];

// Chave para o LocalStorage
const LOCAL_STORAGE_KEY = "tasks";

/**
 * Fetch all tasks.
 * Se o LocalStorage estiver vazio, inicializa com as tarefas mockadas.
 * @returns {Promise<Task[]>} Uma promessa que resolve para a lista de tarefas.
 */
export const fetchTasks = async (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        resolve(JSON.parse(storedTasks)); // Retorna as tarefas do LocalStorage
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockTasks)); // Inicializa o LocalStorage
        resolve(mockTasks); // Retorna as tarefas mockadas
      }
    }, 300); // Simula um atraso de 300ms
  });
};

/**
 * Save a new task.
 * Salva uma nova tarefa no LocalStorage.
 * @param {Task} task - A tarefa a ser salva.
 * @returns {Promise<Task>} A promessa que resolve com a nova tarefa.
 */
export const saveTask = async (task: Task): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      tasks.push(task);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      resolve(task);
    }, 300);
  });
};

/**
 * Delete a task.
 * Remove uma tarefa do LocalStorage pelo ID.
 * @param {string} id - O ID da tarefa a ser removida.
 * @returns {Promise<void>} Uma promessa que resolve quando a tarefa é removida.
 */
export const deleteTask = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = tasks.filter((task: Task) => task.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks));
      resolve();
    }, 300);
  });
};
