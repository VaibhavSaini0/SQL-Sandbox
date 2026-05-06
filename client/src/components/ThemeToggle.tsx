import { useState, useEffect } from "react";

/*
  Dark/light mode toggle button.
  Saves preference to localStorage and toggles .dark on <html>.
*/

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center 
        w-9 h-9 
        rounded-[var(--rad)] 
        bg-[var(--c-card)] 
        border border-[var(--c-border)] 
        hover:border-[var(--c-primary)] 
        hover:bg-[var(--c-input)] 
        transition"
    >
      <span className="text-lg leading-none">
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

export { ThemeToggle };