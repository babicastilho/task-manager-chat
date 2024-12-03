import { fetchTasks, saveTask, deleteTask } from "../../services/api";

describe("API Service", () => {
  const mockTasks = [
    { id: "1", title: "Learn React", completed: false },
    { id: "2", title: "Build a project", completed: true },
  ];

  /**
   * Test for `fetchTasks` function.
   * Ensures the function returns the mock tasks.
   */
  it("fetchTasks should return the list of tasks", async () => {
    const tasks = await fetchTasks();
    expect(tasks).toEqual(mockTasks); // Verifies that tasks match the mockTasks
    expect(tasks).toHaveLength(2); // Ensures the correct number of tasks
  });

  /**
   * Test for `saveTask` function.
   * Ensures a new task is added to the mock tasks array.
   */
  it("saveTask should add a new task to the task list", async () => {
    const newTask = { id: "3", title: "Test Task", completed: false };

    await saveTask(newTask);

    const tasks = await fetchTasks();
    expect(tasks).toContainEqual(newTask); // Verifies the new task is added
    expect(tasks).toHaveLength(3); // Ensures the list length is updated
  });

  /**
   * Test for `deleteTask` function.
   * Ensures a task is removed from the mock tasks array by its ID.
   */
  it("deleteTask should remove a task from the task list", async () => {
    const taskIdToRemove = "1";

    await deleteTask(taskIdToRemove);

    const tasks = await fetchTasks();
    expect(tasks.find((task) => task.id === taskIdToRemove)).toBeUndefined(); // Verifies the task is removed
    expect(tasks).toHaveLength(2); // Ensures the list length is updated
  });
});
