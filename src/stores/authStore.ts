import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: localStorage.getItem("mockAuth") === "true",

  login: (email, password) => {
    if (email.trim() && password.trim()) {
      localStorage.setItem("mockAuth", "true");
      set({ isAuthenticated: true });
    }
  },

  logout: () => {
    localStorage.removeItem("mockAuth");
    set({ isAuthenticated: false });
  },
}));
