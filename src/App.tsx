import { DragDropContext } from "@hello-pangea/dnd";
import TaskForm from "./components/TaskForm";
import Column from "./components/Column";
import ProgressBar from "./components/ProgressBar";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { TasksProvider, useTasks } from "./context/TasksContext";
import { useTheme } from "./context/ThemeContext";
import { useState } from "react";

function AppContent() {
  const { columns, handleDrag, deleteTask, updateTask } = useTasks();
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");

  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0);
  const doneTasks = columns.find((c) => c.id === "done")?.tasks.length || 0;

  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          🚀 My To-Do App {darkMode ? "🌙" : "☀️"}
        </h1>
        <ThemeToggle />
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          🔍
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو در تسک‌ها..."
          className="w-full pl-10 p-3 border rounded-lg shadow-sm dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <ProgressBar totalTasks={totalTasks} doneTasks={doneTasks} />
      <TaskForm />

      <DragDropContext onDragEnd={handleDrag}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
          {columns.map((col, idx) => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={col.tasks}
              search={search}
              onDelete={(id) => deleteTask(col.id, id)}
              onUpdate={(task) => updateTask(col.id, task)}
              index={idx}
            />
          ))}
        </div>
      </DragDropContext>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <AppContent />
      </TasksProvider>
    </ThemeProvider>
  );
}

export default App;
