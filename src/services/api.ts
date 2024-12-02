const mockTasks = [
  { id: '1', title: 'Learn React', completed: false },
  { id: '2', title: 'Build a project', completed: true },
];

export const fetchTasks = async (): Promise<typeof mockTasks> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTasks), 300); // Simula um atraso
  });
};

export const saveTask = async (task: { id: string; title: string; completed: boolean }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTasks.push(task);
      resolve(task);
    }, 300);
  });
};

export const deleteTask = async (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTasks.findIndex((task) => task.id === id);
      if (index > -1) mockTasks.splice(index, 1);
      resolve({});
    }, 300);
  });
};
