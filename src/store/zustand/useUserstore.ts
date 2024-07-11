import { create } from "zustand";

interface User {
  id: string;
  email: string | null | undefined;
  nickname: string;
  profile_img: string | null | undefined;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  clearUser: () => set({ user: null, isLoggedIn: false }),
}));
