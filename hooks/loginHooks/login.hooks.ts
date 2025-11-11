import { create } from 'zustand';

interface LoginState {
  isOpenSidebar: boolean;
  setOpenSidebar: (v: boolean) => void;
}

export const useLoginModal = create<LoginState>(set => ({
  isOpenSidebar: false,
  setOpenSidebar: v => set({ isOpenSidebar: v }),
}));