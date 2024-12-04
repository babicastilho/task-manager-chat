// src/services/mockApi.ts

/**
 * Interface representing the structure of a Task.
 */
export interface Task {
  id: string; // Unique identifier for the task.
  title: string; // Title of the task.
  completed: boolean; // Indicates whether the task is completed.
}

// Initial mock tasks for demonstration purposes.
const mockTasks: Task[] = [
  { id: "1", title: "Learn React", completed: false },
  { id: "2", title: "Build a project", completed: true },
];

// Key for storing tasks in LocalStorage.
const LOCAL_STORAGE_KEY = "tasks";

/**
 * Fetches all tasks from LocalStorage.
 * If LocalStorage is empty, initializes it with the mock tasks.
 * 
 * @returns {Promise<Task[]>} A promise resolving to the list of tasks.
 */
export const fetchTasks = async (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        resolve(JSON.parse(storedTasks)); // Returns tasks from LocalStorage.
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockTasks)); // Initializes LocalStorage with mock tasks.
        resolve(mockTasks); // Returns mock tasks.
      }
    }, 300); // Simulates a delay of 300ms.
  });
};

/**
 * Saves a new task to LocalStorage.
 * Updates the stored tasks with the new task.
 * 
 * @param {Task} task - The task to be saved.
 * @returns {Promise<Task>} A promise resolving to the newly saved task.
 */
export const saveTask = async (task: Task): Promise<Task> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      tasks.push(task); // Adds the new task to the list.
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks)); // Updates LocalStorage.
      resolve(task); // Resolves with the saved task.
    }, 300); // Simulates a delay of 300ms.
  });
};

/**
 * Deletes a task from LocalStorage by its ID.
 * 
 * @param {string} id - The ID of the task to be removed.
 * @returns {Promise<void>} A promise that resolves when the task is deleted.
 */
export const deleteTask = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = tasks.filter((task: Task) => task.id !== id); // Filters out the task to be deleted.
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks)); // Updates LocalStorage.
      resolve(); // Resolves the promise after deletion.
    }, 300); // Simulates a delay of 300ms.
  });
};
