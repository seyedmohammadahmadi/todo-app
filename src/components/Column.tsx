import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";
import { motion } from "framer-motion";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  search: string;
  onDelete: (taskId: string) => void;
  onUpdate: (task: Task) => void;
  index: number;
}

const Column: React.FC<ColumnProps> = ({
  id,
  title,
  tasks,
  search,
  onDelete,
  onUpdate,
  index,
}) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <motion.section
          ref={provided.innerRef}
          {...provided.droppableProps}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="bg-gradient-to-b from-gray-50 to-gray-100 
                     dark:from-gray-800 dark:to-gray-900 
                     rounded-xl border border-gray-200 
                     dark:border-gray-700 shadow-inner p-4 
                     min-h-[250px]"
        >
          <h2 className="font-bold text-lg mb-4 text-gray-700 dark:text-gray-200">
            {title}
          </h2>
          {tasks
            .filter(
              (task) =>
                task.title.toLowerCase().includes(search.toLowerCase()) ||
                (task.description &&
                  task.description.toLowerCase().includes(search.toLowerCase()))
            )
            .map((task, idx) => (
              <Draggable key={task.id} draggableId={task.id} index={idx}>
                {(prov) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      onDelete={() => onDelete(task.id)}
                      onUpdate={onUpdate}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </motion.section>
      )}
    </Droppable>
  );
};

export default Column;
