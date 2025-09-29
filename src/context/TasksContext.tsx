import { createContext, useContext, useState, useEffect } from "react";
import type { Task, ColumnType } from "../types/task";
import type { DropResult } from "@hello-pangea/dnd";

interface TasksContextType {
  columns: ColumnType[];
  addTask: (task: Task) => void;
  deleteTask: (colId: string, taskId: string) => void;
  updateTask: (colId: string, task: Task) => void;
  handleDrag: (result: DropResult) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [columns, setColumns] = useState<ColumnType[]>(() => {
    const saved = localStorage.getItem("columns");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "todo", title: "📝 To Do", tasks: [] },
          { id: "in-progress", title: "⚡ In Progress", tasks: [] },
          { id: "done", title: "✅ Done", tasks: [] },
        ];
  });

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const addTask = (task: Task) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === "todo" ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const deleteTask = (colId: string, taskId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === colId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
  };

  const updateTask = (colId: string, updatedTask: Task) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === colId
          ? {
              ...col,
              tasks: col.tasks.map((t) =>
                t.id === updatedTask.id ? updatedTask : t
              ),
            }
          : col
      )
    );
  };

  const handleDrag = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sourceColIndex = columns.findIndex(
      (c) => c.id === source.droppableId
    );
    const destColIndex = columns.findIndex(
      (c) => c.id === destination.droppableId
    );

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    const updatedTask = { ...movedTask, status: destCol.id };

    destCol.tasks.splice(destination.index, 0, updatedTask);

    const newColumns = [...columns];
    newColumns[sourceColIndex] = { ...sourceCol, tasks: [...sourceCol.tasks] };
    newColumns[destColIndex] = { ...destCol, tasks: [...destCol.tasks] };

    setColumns(newColumns);
  };

  return (
    <TasksContext.Provider
      value={{ columns, addTask, deleteTask, updateTask, handleDrag }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within TasksProvider");
  return context;
};
