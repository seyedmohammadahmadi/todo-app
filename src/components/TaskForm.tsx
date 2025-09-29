import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
import { useTasks } from "../context/TasksContext";
import { motion } from "framer-motion";

const schema = z.object({
  title: z.string().min(1, "عنوان نباید خالی باشد"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      status: "todo",
      dueDate: data.dueDate || undefined,
    };
    addTask(newTask);
    reset();
    if (textareaRef.current) textareaRef.current.style.height = "60px";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-3"
    >
      {/* عنوان */}
      <motion.div
        animate={errors.title ? { x: [0, -8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <input
          {...register("title")}
          placeholder="✍️ عنوان تسک"
          className={`w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            errors.title ? "border-red-500" : ""
          }`}
        />
      </motion.div>
      {errors.title && (
        <span className="text-red-500 text-sm">{errors.title.message}</span>
      )}

      {/* توضیحات */}
      <textarea
        {...register("description")}
        ref={(el) => {
          register("description").ref(el);
          textareaRef.current = el;
        }}
        placeholder="🗒️ توضیحات (اختیاری)"
        className="w-full min-h-[60px] p-3 border rounded-lg 
                   dark:bg-gray-700 dark:text-gray-100 resize-none 
                   overflow-hidden focus:ring-2 focus:ring-purple-500 outline-none"
      />

      {/* تاریخ */}
      <input
        type="date"
        {...register("dueDate")}
        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
      />

      {/* دکمه */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition"
      >
        ➕ افزودن تسک
      </button>
    </form>
  );
};

export default TaskForm;
