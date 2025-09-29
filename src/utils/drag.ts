import type { ColumnType } from "../types/task";
import type { DropResult } from "@hello-pangea/dnd";

export const handleDrag = (
  columns: ColumnType[],
  result: DropResult,
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>
) => {
  const { source, destination } = result;
  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  const sourceColIndex = columns.findIndex((c) => c.id === source.droppableId);
  const destColIndex = columns.findIndex(
    (c) => c.id === destination.droppableId
  );

  const sourceCol = columns[sourceColIndex];
  const destCol = columns[destColIndex];

  const [movedTask] = sourceCol.tasks.splice(source.index, 1);
  const updatedTask = {
    ...movedTask,
    status: destCol.id,
  };

  destCol.tasks.splice(destination.index, 0, updatedTask);

  const newColumns = [...columns];
  newColumns[sourceColIndex] = { ...sourceCol, tasks: [...sourceCol.tasks] };
  newColumns[destColIndex] = { ...destCol, tasks: [...destCol.tasks] };

  setColumns(newColumns);
};
