import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

/**
 * Interface for ThemeContext properties.
 * - `theme`: The current theme (light or dark).
 * - `toggleTheme`: A function to toggle between light and dark themes.
 */
interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

// Create a context with the initial value as undefined
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * ThemeProvider component to manage and provide the current theme context.
 * Stores the theme in `localStorage` and applies it to the document's root element.
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Retrieve the initial theme from localStorage or default to "light"
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  /**
   * Side effect: Updates the `data-theme` attribute on the root `<html>` element
   * and saves the theme to `localStorage` whenever the theme state changes.
   */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Set the theme attribute
    localStorage.setItem("theme", theme); // Persist the theme in localStorage
  }, [theme]);

  /**
   * Toggles the theme between "light" and "dark".
   * Updates the state to reflect the new theme.
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access the ThemeContext.
 * Ensures that the hook is used only within a ThemeProvider.
 * @returns ThemeContextProps
 * @throws Error if the hook is used outside of the ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
