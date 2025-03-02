import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useAuthStore = create(
  persist(
    immer((set) => ({
      // state
      user: null,
      isAuthenticated: false,

      //set
      setUserData: (userData) =>
        set((state) => {
          (state.user = userData), (state.isAuthenticated = true);
        }),
      setLogout: () =>
        set((state) => {
          (state.user = null), (state.isAuthenticated = false);
        }),
    })),
    { name: 'auth-storage' },
  ),
);

export default useAuthStore;
