import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import Home from "@pages/Home/Home";
import TasksPage from "@pages/Tasks/TasksPage"; // Página de tarefas
import "@styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
