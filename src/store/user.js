import { create } from 'zustand';

const useUserStore = create((set) => ({
  info: {},
  setUserInfo: (payload) => {
    set((state) => ({ ...state, info: payload }));
  },
}));
export { useUserStore };
