'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

type ThemeMode = 'light' | 'dark';

interface DemoThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isDark: boolean;
}

const DemoThemeContext = createContext<DemoThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
});

export function DemoThemeProvider({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Initialize theme based on role
  useEffect(() => {
    if (isAdmin) {
      // Admin: respect saved preference or system preference
      const saved = localStorage.getItem('theme') as ThemeMode | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const resolved = saved || (prefersDark ? 'dark' : 'light');
      setTheme(resolved);
      applyTheme(resolved);
    } else {
      // Demo: default to dark, respect saved demo preference
      const savedDemo = localStorage.getItem('demo-theme') as ThemeMode | null;
      const resolved = savedDemo || 'dark';
      setTheme(resolved);
      applyTheme(resolved);
    }
  }, [isAdmin]);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);

      // Persist based on role
      if (isAdmin) {
        localStorage.setItem('theme', next);
      } else {
        localStorage.setItem('demo-theme', next);
      }

      return next;
    });
  }, [isAdmin]);

  return (
    <DemoThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </DemoThemeContext.Provider>
  );
}

export function useDemoTheme() {
  return useContext(DemoThemeContext);
}
