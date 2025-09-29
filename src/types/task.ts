export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  dueDate?: string;
}

export type ColumnType = {
  id: "todo" | "in-progress" | "done";
  title: string;
  tasks: Task[];
};
