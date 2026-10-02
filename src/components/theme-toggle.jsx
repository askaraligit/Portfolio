"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("askar-theme");
    const nextDark = saved ? saved === "dark" : false;
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    const frame = window.requestAnimationFrame(() => setDark(nextDark));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    window.localStorage.setItem("askar-theme", nextDark ? "dark" : "light");
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
        <span className="theme-toggle-thumb" data-dark={dark} />
      </span>
    </button>
  );
}
