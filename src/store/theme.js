import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: 'light',
  darkModeEnabled: false,
  toggleTheme: (name) =>
    set((state) => {
      return { theme: name };
    }),
  toggleDarkMode: (e) =>
    set((state) => {
      return { darkModeEnabled: e };
    }),
}));

export default useThemeStore;
