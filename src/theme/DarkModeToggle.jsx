import { Icons } from "../assets/Icons";
import { useTheme } from "./ThemeContext";

// ============================================================
// DARK MODE TOGGLE
// Simple toggle button with icon for dark mode switching
// ============================================================
export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Light mode" : "Dark mode"}
    >
      {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
    </button>
  );
}
