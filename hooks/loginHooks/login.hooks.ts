import { create } from 'zustand';

interface LoginState {
  isOpenAuth: boolean;
  setOpenAuth: (v: boolean) => void;
  isUserInfo: boolean;
  setUserInfo: (v: boolean) => void;
  toggleUserInfo: () => void;
  isOpenSidebar: boolean;
  setOpenSidebar: (v: boolean) => void;
}

export const useLoginModal = create<LoginState>(set => ({
  isOpenAuth: false,
  setOpenAuth: v => set({ isOpenAuth: v }),
  isUserInfo: false,
  setUserInfo: v => set({ isUserInfo: v }),
  toggleUserInfo: () => set(state => ({ isUserInfo: !state.isUserInfo })),
  isOpenSidebar: false,
  setOpenSidebar: v => set({ isOpenSidebar: v }),
}));