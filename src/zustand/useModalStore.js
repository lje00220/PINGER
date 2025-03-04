import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useModalStore = create(
  persist((set) => ({
    isModalOpen: true,

    setModalClose: () => {
      set({ isModalOpen: false });
    },
  })),
  { name: 'modal' },
);

export default useModalStore;
