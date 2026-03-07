import { FONT_MAP, THEME_TOKENS } from "@/lib/theme-tokens";

export function ThemeScript() {
  const themeTokensJson = JSON.stringify(THEME_TOKENS);
  const fontMapJson = JSON.stringify(FONT_MAP);
  const script = `
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const storedAccent = localStorage.getItem("accent") || "purple";
    const storedFontRaw = localStorage.getItem("font");
    const storedFont =
      storedFontRaw === "nanum" || storedFontRaw === "pretendard"
        ? "default"
        : (storedFontRaw || "default");
    const themeMode = storedTheme === "light" || storedTheme === "dark" || storedTheme === "auto" ? storedTheme : "dark";
    const resolvedTheme = themeMode === "auto"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : themeMode;
    if (resolvedTheme === "dark") root.classList.add("dark-theme");
    const themeTokens = ${themeTokensJson};
    const fontMap = ${fontMapJson};
    const accentGroup = themeTokens[storedAccent] || themeTokens.purple;
    const palette = accentGroup[resolvedTheme] || accentGroup.light;
    Object.entries(palette).forEach(([token, value]) => {
      root.style.setProperty(token, value);
    });
    root.style.setProperty("--font-family-base", fontMap[storedFont] || fontMap.default);
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
