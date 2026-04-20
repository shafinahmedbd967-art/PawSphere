import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import en from '@/translations/en.json';
import bn from '@/translations/bn.json';

type Language = 'en' | 'bn';
type Theme = 'light' | 'dark';
type UserRole = 'admin' | 'ngo' | 'vet' | 'volunteer' | 'user';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  points: number;
  badges: string[];
  verified: boolean;
  location?: { lat: number; lng: number; city: string };
}

interface Notification {
  id: string;
  type: 'emergency' | 'adoption' | 'donation' | 'task' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface AppState {
  language: Language;
  theme: Theme;
  user: User | null;
  notifications: Notification[];
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  setUser: (user: User | null) => void;
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  unreadCount: () => number;
}

const translations: Record<Language, Record<string, unknown>> = { en, bn };

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: 'en',
      theme: 'dark',
      user: null,
      notifications: [
        {
          id: '1',
          type: 'emergency',
          title: 'Emergency Rescue Nearby',
          message: 'Injured dog reported 2km from your location',
          read: false,
          createdAt: new Date(),
        },
        {
          id: '2',
          type: 'adoption',
          title: 'Adoption Request Approved',
          message: 'Your application for Luna has been approved!',
          read: false,
          createdAt: new Date(),
        },
      ],

      t: (key: string) => {
        const lang = get().language;
        return getNestedValue(translations[lang] as Record<string, unknown>, key);
      },

      setLanguage: (lang) => set({ language: lang }),

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      setUser: (user) => set({ user }),

      addNotification: (n) =>
        set((state) => ({
          notifications: [
            {
              ...n,
              id: Date.now().toString(),
              read: false,
              createdAt: new Date(),
            },
            ...state.notifications,
          ],
        })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      unreadCount: () => get().notifications.filter((n) => !n.read).length,
    }),
    {
      name: 'pawsphere-store',
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        user: state.user,
      }),
    }
  )
);
