import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  // add any other fields you need to persist about the user
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: IUserInfo | null;
  setToken: (token: string | null) => void;
  setUser: (user: IUserInfo | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      user: null,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
