import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "swiss" | "paper" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "paper",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("factlive_theme");
    if (saved === "dark") return "dark";
    if (saved === "swiss") return "swiss";
    return "paper"; // Default to authentic Editorial Aesthetic Light
  });

  useEffect(() => {
    localStorage.setItem("factlive_theme", theme);
    const root = document.documentElement;

    // Clear old classes
    root.classList.remove("theme-swiss", "theme-paper", "paper", "dark");

    if (theme === "swiss") {
      root.classList.add("theme-swiss");
      document.body.className = "theme-swiss bg-[#FFFFFF] text-[#09090B] font-sans antialiased selection:bg-red-500/20 selection:text-red-900";
    } else if (theme === "dark") {
      root.classList.add("dark");
      document.body.className = "dark bg-[#121110] text-[#F5F2EB] font-serif antialiased selection:bg-amber-700/30 selection:text-amber-100";
    } else {
      // Editorial Aesthetic Light (broadsheet paper)
      root.classList.add("theme-paper", "paper");
      document.body.className = "theme-paper bg-[#FAF7F2] text-[#1C1917] font-serif antialiased selection:bg-amber-500/20 selection:text-amber-900";
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "paper" : "dark"));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

