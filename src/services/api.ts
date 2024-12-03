/**
 * API Mock Service
 * 
 * This file contains mocked implementations for basic task management functionalities:
 * - `fetchTasks`: Retrieves the current list of tasks.
 * - `saveTask`: Adds a new task to the task list.
 * - `deleteTask`: Removes a task from the task list by ID.
 * 
 * Each function simulates an asynchronous operation with a delay to mimic real API behavior.
 */

/** Mocked Task List */
const mockTasks = [
  { id: '1', title: 'Learn React', completed: false },
  { id: '2', title: 'Build a project', completed: true },
];

/**
 * Fetch all tasks.
 * 
 * Simulates a GET request to retrieve the current list of tasks.
 * The function returns a promise that resolves with the `mockTasks` array after a delay.
 * 
 * @returns {Promise<typeof mockTasks>} A promise that resolves to the current list of tasks.
 */
export const fetchTasks = async (): Promise<typeof mockTasks> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTasks), 300); // Simulates a network delay of 300ms
  });
};

/**
 * Save a new task.
 * 
 * Simulates a POST request to add a new task to the task list.
 * The function pushes the new task into the `mockTasks` array and resolves the promise.
 * 
 * @param {Object} task - The task object to be saved.
 * @param {string} task.id - The unique identifier of the task.
 * @param {string} task.title - The title or description of the task.
 * @param {boolean} task.completed - Whether the task is completed or not.
 * 
 * @returns {Promise<Object>} A promise that resolves with the newly added task.
 */
export const saveTask = async (task: { id: string; title: string; completed: boolean }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTasks.push(task); // Adds the new task to the mock list
      resolve(task); // Resolves the promise with the newly added task
    }, 300); // Simulates a network delay of 300ms
  });
};

/**
 * Delete a task.
 * 
 * Simulates a DELETE request to remove a task from the task list.
 * The function removes the task with the specified ID from the `mockTasks` array and resolves the promise.
 * 
 * @param {string} id - The unique identifier of the task to be removed.
 * 
 * @returns {Promise<Object>} A promise that resolves with an empty object upon successful deletion.
 */
export const deleteTask = async (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTasks.findIndex((task) => task.id === id);
      if (index > -1) mockTasks.splice(index, 1); // Removes the task if it exists
      resolve({}); // Resolves with an empty object
    }, 300); // Simulates a network delay of 300ms
  });
};
