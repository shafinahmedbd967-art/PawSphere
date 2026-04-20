'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppStore();

  // Apply immediately on every theme change
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  // Also apply on first mount from persisted localStorage (before React hydrates)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pawsphere-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        const t = parsed?.state?.theme;
        const root = document.documentElement;
        if (t === 'light') {
          root.classList.add('light');
          root.classList.remove('dark');
        } else {
          root.classList.add('dark');
          root.classList.remove('light');
        }
      }
    } catch (_) {}
  }, []);

  return <>{children}</>;
}
