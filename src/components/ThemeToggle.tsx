import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full shadow-md bg-gray-200 dark:bg-gray-700 hover:scale-110 transform transition"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
