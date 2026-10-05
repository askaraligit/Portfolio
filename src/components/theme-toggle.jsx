"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useLayoutEffect(() => {
    // Restore before paint if React's development remount resets the root attribute.
    try {
      const saved = window.localStorage.getItem("askar-theme");
      document.documentElement.dataset.theme = saved === "light" ? "light" : "dark";
    } catch {
      // Keep the current theme when browser storage is unavailable.
    }
    const frame = window.requestAnimationFrame(() => {
      setDark(document.documentElement.dataset.theme === "dark");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const nextDark = document.documentElement.dataset.theme !== "dark";
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    try {
      window.localStorage.setItem("askar-theme", nextDark ? "dark" : "light");
    } catch {
      // Theme switching still works when the preference cannot be persisted.
    }
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      title={`Switch to ${dark ? "light" : "dark"} theme`}
    >
      <span className="theme-toggle-track">
        <Sun size={13} aria-hidden="true" />
        <Moon size={13} aria-hidden="true" />
        <span className="theme-toggle-thumb" />
      </span>
    </button>
  );
}
