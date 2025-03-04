import { create } from 'zustand';

const useModalStore = create((set) => ({
  isModalOpen: true,

  setModalClose: () => {
    set({ isModalOpen: false });
  },
}));

export default useModalStore;
