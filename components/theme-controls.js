"use client";

import { useEffect, useMemo, useState } from "react";

import { MaterialIcon } from "@/components/material-icon";
import { THEME_TOKENS, applyThemeTokens } from "@/lib/theme-tokens";

const THEME_MODES = ["auto", "light", "dark"];
const FONT_OPTIONS = [
  { key: "default", label: "Pretendard" },
  { key: "a2z", label: "A2z" },
  { key: "roboto", label: "Roboto" },
  { key: "nanumSquareNeo", label: "NanumSquareNeo" }
];

export function ThemeControls() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [themeMode, setThemeMode] = useState("dark");
  const [systemTheme, setSystemTheme] = useState("light");
  const [accent, setAccent] = useState("purple");
  const [font, setFont] = useState("default");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem("theme");
    const storedAccent = localStorage.getItem("accent");
    const storedFont = localStorage.getItem("font");

    setThemeMode(THEME_MODES.includes(storedTheme) ? storedTheme : "dark");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    setAccent(THEME_TOKENS[storedAccent] ? storedAccent : "purple");
    setFont(
      storedFont === "nanum" || storedFont === "pretendard"
        ? "default"
        : storedFont || "default"
    );
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isMounted]);

  const resolvedTheme = useMemo(() => {
    return themeMode === "auto" ? systemTheme : themeMode;
  }, [systemTheme, themeMode]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const root = document.documentElement;

    root.classList.toggle("dark-theme", resolvedTheme === "dark");
    applyThemeTokens(root, resolvedTheme, accent, font);

    localStorage.setItem("theme", themeMode);
    localStorage.setItem("accent", accent);
    localStorage.setItem("font", font);
  }, [accent, font, isMounted, resolvedTheme, themeMode]);

  return (
    <>
      <button
        type="button"
        id="settings-toggle"
        className="icon-btn ripple"
        aria-label="Settings"
        onClick={() => setIsPanelOpen((open) => !open)}
      >
        <MaterialIcon name="settings" />
      </button>

      <div
        id="settings-overlay"
        className={`settings-overlay ${isPanelOpen ? "open" : ""}`}
        onClick={() => setIsPanelOpen(false)}
      />

      <div id="settings-panel" className={`settings-panel ${isPanelOpen ? "open" : ""}`}>
        <h3 className="settings-title">Personalize</h3>

        <div className="settings-section">
          <div className="settings-section-title">Appearance</div>
          <div className="chip-group">
            {THEME_MODES.map((mode) => (
              <button
                key={mode}
                type="button"
                className={`md-chip ripple ${themeMode === mode ? "active" : ""}`}
                onClick={() => setThemeMode(mode)}
              >
                {mode === "auto" ? "Auto" : mode === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Theme Color</div>
          <div className="color-picker">
            {Object.keys(THEME_TOKENS).map((colorKey) => (
              <button
                key={colorKey}
                type="button"
                data-color={colorKey}
                aria-label={`${colorKey} color`}
                className={`color-circle ripple ${accent === colorKey ? "active" : ""}`}
                style={{
                  backgroundColor:
                    THEME_TOKENS[colorKey].seed ??
                    THEME_TOKENS[colorKey].light["--md-sys-color-primary"]
                }}
                onClick={() => setAccent(colorKey)}
              />
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Typography</div>
          <div className="chip-group">
            {FONT_OPTIONS.map((option) => (
              <button
                key={option.key}
                type="button"
                data-font={option.key}
                className={`md-chip ripple ${font === option.key ? "active" : ""}`}
                onClick={() => setFont(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
