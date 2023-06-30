import { User } from '@/lib/api/types';
import { create } from 'zustand';

interface UserStore extends UserAction {
  id: number | null;
  username: string | null;
  nickname: string | null;
}

interface UserAction {
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const userStore = create<UserStore>((set) => ({
  id: null,
  username: null,
  nickname: null,
  setUser: (user) => {
    set(() => ({
      ...user,
    }));
  },
  clearUser: () => {
    set(() => ({
      id: null,
      username: null,
      nickname: null,
    }));
  },
}));
