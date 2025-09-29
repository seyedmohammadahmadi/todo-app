import { motion } from "framer-motion";
import type { Task } from "../types/task";
import { FiTrash2, FiEdit3, FiCheck } from "react-icons/fi";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onDelete: () => void;
  onUpdate: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || "");
  const [editDate, setEditDate] = useState(task.dueDate || "");

  // 📅 Highlight deadline
  let isOverdue = false;
  if (task.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    isOverdue = due <= today;
  }

  // ✨ رنگ Glow بر اساس status
  const glowColor =
    task.status === "done"
      ? "0 0 12px rgba(34,197,94,0.6)" // سبز
      : task.status === "in-progress"
      ? "0 0 12px rgba(234,179,8,0.6)" // زرد
      : "0 0 12px rgba(59,130,246,0.6)"; // آبی

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.03,
        boxShadow: `0px 6px 20px rgba(0,0,0,0.15), ${glowColor}`,
      }}
      whileTap={{ scale: 0.97 }}
      className={`p-4 mb-3 rounded-xl shadow-md cursor-grab active:cursor-grabbing border-l-4 ${
        task.status === "done"
          ? "border-green-500 bg-green-50 dark:bg-green-900/30"
          : task.status === "in-progress"
          ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30"
          : "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-1 text-sm border rounded dark:bg-gray-600 dark:text-gray-100"
          />
        ) : (
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {task.title}
          </h3>
        )}
        <div className="flex gap-2 ml-2">
          {isEditing ? (
            <button
              onClick={() => {
                onUpdate({
                  ...task,
                  title: editTitle,
                  description: editDesc,
                  dueDate: editDate || undefined,
                });
                setIsEditing(false);
              }}
              className="text-green-600 hover:text-green-800"
            >
              <FiCheck />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FiEdit3 />
            </button>
          )}
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {isEditing ? (
        <>
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full mt-2 p-1 text-xs border rounded dark:bg-gray-600 dark:text-gray-100"
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="w-full mt-2 p-1 text-xs border rounded dark:bg-gray-600 dark:text-gray-100"
          />
        </>
      ) : (
        <>
          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <p
              className={`text-xs mt-1 ${
                isOverdue
                  ? "text-red-600 dark:text-red-300 font-bold"
                  : "text-violet-600 dark:text-violet-300"
              }`}
            >
              📅 موعد: {task.dueDate}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
};

export default TaskCard;
