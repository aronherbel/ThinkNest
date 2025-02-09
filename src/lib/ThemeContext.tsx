"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [backgroundColor, setBackgroundColor] = useState("#F9F9F9");

  useEffect(() => {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
      setBackgroundColor(savedColor);
      document.body.style.backgroundColor = savedColor;
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  return (
    <ThemeContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
