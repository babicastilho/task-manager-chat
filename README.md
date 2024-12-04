# Task Manager with Chat

A feature-rich task management application with a chat interface built using React and TypeScript. It showcases efficient task handling, modular components, and testing practices.

### **Features**

#### **Task Management**
- Add, edit, mark as completed, and delete tasks.

#### **Chat Interface**
- Send and display mock messages (frontend only).

#### **Theme Switching**
- Light and Dark mode toggles.

#### **Mock API**
- Basic CRUD operations without requiring a backend.

#### **Testing**
- Unit and integration tests for key components.

## Tech Stack
- **React + TypeScript**
- **CSS Modules**
- **Fetch API** for mock API
- **Jest + React Testing Library**
- **Vercel for deployment**

## Project Structure

```
task-manager-chat/
├── 📂 .github/
│   └── 📂 workflows/
│       └── 📄 ci.yml
├── 📂 public/
│   └── ...
└── 📂 src/
    ├── 📂 components/
    │   ├── 📂 Chat/
    │   │   ├── 📂 Chat/
    │   │   │   ├── 📄 Chat.module.css
    │   │   │   └── 📄 Chat.tsx
    │   │   └── 📂 ChatMessage/
    │   │       ├── 📄 ChatMessage.module.css
    │   │       └── 📄 ChatMessage.tsx
    │   ├── 📂 Common/
    │   │   ├── 📂 Button/
    │   │   └── 📂 Modal/
    │   │       ├── 📄 Modal.module.css
    │   │       ├── 📄 Modal.tsx
    │   │       └── 📄 index.ts
    │   ├── 📂 Layout/
    │   │   ├── 📂 Footer/
    │   │   │   ├── 📄 Footer.module.css
    │   │   │   └── 📄 Footer.tsx
    │   │   ├── 📂 Header/
    │   │   │   ├── 📄 Header.module.css
    │   │   │   └── 📄 Header.tsx
    │   │   └── 📂 Sidebar/
    │   │       ├── 📄 Sidebar.module.css
    │   │       └── 📄 Sidebar.tsx
    │   │   ├── 📄 Layout.module.css
    │   │   └── 📄 Layout.tsx
    │   └── 📂 Tasks/
    │       ├── 📂 TaskForm/
    │       │   ├── 📄 TaskForm.module.css
    │       │   └── 📄 TaskForm.tsx
    │       ├── 📂 TaskItem/
    │       │   └── 📄 TaskItem.tsx
    │       └── 📂 TaskList/
    │           ├── 📄 TaskList.module.css
    │           └── 📄 TaskList.tsx
    ├── 📂 context/
    │   └── 📄 ThemeContext.tsx
    ├── 📂 hooks/
    ├── 📂 pages/
    │   ├── 📂 Home/
    │   │   ├── 📄 Home.module.css
    │   │   └── 📄 Home.tsx
    │   └── 📂 Tasks/
    │       └── 📂 Modals/
    │           ├── 📄 AddTaskModal.tsx
    │           ├── 📄 ConfirmDeleteModal.module.css
    │           ├── 📄 ConfirmDeleteModal.tsx
    │           ├── 📄 EditTaskModal.module.css
    │           ├── 📄 EditTaskModal.tsx
    │           ├── 📄 Modals.module.css
    │           └── 📄 index.ts
    │       ├── 📄 TasksPage.module.css
    │       └── 📄 TasksPage.tsx
    ├── 📂 services/
    │   └── 📄 api.ts
    ├── 📂 styles/
    │   └── 📄 index.css
    └── 📂 tests/
        ├── 📂 components/
        │   └── 📂 Layout/
        │       ├── 📄 Header.test.tsx
        │       └── 📄 Sidebar.test.tsx
        ├── 📂 integration/
        │   ├── 📄 EditTaskModalWithChat.test.tsx
        │   └── 📄 TaskList.integration.test.tsx
        └── 📂 unit/
            └── 📄 api.test.ts
    ├── 📄 index.tsx
    ├── 📄 logo.svg
    ├── 📄 react-app-env.d.ts
    ├── 📄 reportWebVitals.ts
    └── 📄 setupTests.ts
├── 📄 README.md
├── 📄 config-overrides.js
├── 📄 generate-structures.js
├── 📄 jest.config.ts
├── 📄 jest.setup.ts
├── 📄 package.json
└── 📄 tsconfig.json
```

**Total Directories:** 32
**Total Files:** 59


## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/babicastilho/task-manager-chat.git
   cd task-manager-chat
   ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Run the application:
  ```bash
  npm start
  ```
## **API and Data Persistence**

The project uses a **mock API** implemented in the `services/api.ts` file to simulate basic CRUD operations:

- `fetchTasks()`: Retrieves a list of tasks.
- `saveTask(task: Task)`: Saves a new or updated task.
- `deleteTask(taskId: string)`: Deletes a task by its ID.

This setup allows frontend developers to test the application without a backend.

### **Testing**

- **Unit Tests**:  
  Functions and individual components are tested using Jest and React Testing Library.

- **Integration Tests**:  
  Components like `TaskList` and `Modals` are tested for complex interactions.

To run tests:

```bash
npm test
```

## **Application Flow**

- **Task Management**:  
  - Add a task using the "Add Task" button.  
  - Mark tasks as completed by checking the box.  
  - Edit or delete tasks using the respective buttons.  

- **Chat Interface**:  
  - Mock chat messages can be sent and displayed (frontend only).  

- **Theme Switching**:  
  - Toggle between Light and Dark modes with a button in the sidebar.  

## **Future Improvements**

- Replace the mock API with a real backend (e.g., Node.js/Express).  
- Add user authentication and task assignments.  
- Implement real-time chat functionality with WebSockets.  
- Add internationalization (i18n) for multi-language support.  
- Integrate notifications for task deadlines.  

### **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  

## 
