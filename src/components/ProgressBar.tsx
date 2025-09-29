interface ProgressBarProps {
  totalTasks: number;
  doneTasks: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalTasks, doneTasks }) => {
  const progress =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
          پیشرفت کارها
        </span>
        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
