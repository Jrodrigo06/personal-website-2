"use client";

// Dev-only tool for comparing candidate palettes live. Not rendered in
// production (see app/layout.tsx). Safe to delete this file + its import
// once a final theme is chosen.

import { useEffect, useState } from "react";
import { THEME, THEMES, type ThemeKey } from "@/config/theme";

const STORAGE_KEY = "dev-theme-override";

export default function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeKey>(THEME);

  useEffect(() => {
    const restore = () => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeKey | null;
        if (stored && THEMES.some((t) => t.key === stored)) setActive(stored);
      } catch {
        // localStorage unavailable — fall back to the production default.
      }
    };
    restore();
  }, []);

  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = active;
    };
    apply();
  }, [active]);

  const select = (key: ThemeKey) => {
    setActive(key);
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch {
      // ignore — this is a throwaway dev convenience
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "12px",
        right: "12px",
        zIndex: 999,
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        maxWidth: "220px",
        padding: "6px",
        background: "var(--bg-surface)",
        border: "0.5px solid var(--border)",
        borderRadius: "8px",
      }}
    >
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => select(t.key)}
          style={{
            fontSize: "10px",
            padding: "3px 8px",
            borderRadius: "20px",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            border:
              active === t.key
                ? "0.5px solid var(--border-em)"
                : "0.5px solid var(--border)",
            background: active === t.key ? "var(--bg-hover)" : "transparent",
            color: active === t.key ? "var(--text-accent)" : "var(--text-dim)",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
