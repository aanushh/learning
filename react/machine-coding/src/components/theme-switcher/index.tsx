import { useState, useEffect, useRef } from "react";
import "./styles.css";

// --- STARTER: Broken theme + accessibility demo ---
// GOAL 1: Theme Switcher
//   - Light/dark toggle that changes bg and text colors
//   - Persist choice in localStorage
//   - Respect prefers-color-scheme on first load
//
// GOAL 2: Accessibility fixes
//   - Fix color contrast (current .card text is #999 on #f0f0f0 — too light)
//   - Add visible focus indicators (remove the outline: none trap)
//   - Announce theme change to screen readers
//   - Add aria-label, role, or landmarks where missing
//   - Handle prefers-reduced-motion

type Theme = "dark" | "light";

const useDebounce = <T,>(value: T, delay: number = 300) => {
  const timerRef = useRef<number | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const themePreference = window.localStorage.getItem("theme-preference");

    if (themePreference) {
      return themePreference as Theme;
    }

    const isDarkSystemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return isDarkSystemTheme ? "dark" : "light";
  });

  const debouncedTheme = useDebounce(theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", debouncedTheme);
    window.localStorage.setItem("theme-preference", debouncedTheme);
  }, [debouncedTheme]);

  return (
    <div className="card">
      <h1>Apartment Listings</h1>
      <p>Welcome to the apartment finder. We have 12 listings available.</p>

      <button
        className="toggle"
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      >
        Switch to {debouncedTheme === "light" ? "Dark" : "Light"} Mode
      </button>

      <div role="status" className="theme-announcer">
        Switched to {debouncedTheme} theme
      </div>
    </div>
  );
}
