import { create } from 'zustand';

interface LoginState {
  isOpenAuth: boolean;
  setOpenAuth: (v: boolean) => void;
  isOpenSidebar: boolean;
  setOpenSidebar: (v: boolean) => void;
}

export const useLoginModal = create<LoginState>(set => ({
  isOpenAuth: false,
  setOpenAuth: v => set({ isOpenAuth: v }),
  isOpenSidebar: false,
  setOpenSidebar: v => set({ isOpenSidebar: v }),
}));