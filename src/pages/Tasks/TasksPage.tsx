import React, { useState } from "react";
import TaskList from "../../components/Tasks/TaskList/TaskList";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Learn React", completed: false },
    { id: "2", title: "Build a project", completed: true },
  ]);

  const handleCompleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Task List</h1>
      <TaskList
        tasks={tasks}
        onComplete={handleCompleteTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default TasksPage;
