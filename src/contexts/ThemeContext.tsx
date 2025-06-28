import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ mode: 'light' });

  useEffect(() => {
    const saved = localStorage.getItem('theme-mode');
    if (saved && (saved === 'light' || saved === 'dark')) {
      setTheme({ mode: saved });
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme({ mode: prefersDark ? 'dark' : 'light' });
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.mode);
    localStorage.setItem('theme-mode', theme.mode);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => ({ mode: prev.mode === 'light' ? 'dark' : 'light' }));
  };

  const isDark = theme.mode === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};