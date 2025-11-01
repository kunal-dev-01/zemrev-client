import {create} from "zustand";

interface LoginState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    isUserInfo: boolean
    onUserInfoOpen: () => void;
    onUserInfoClose: () => void;

}

export const useLoginModal = create<LoginState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    isUserInfo: false,
    onUserInfoOpen: () => set({ isUserInfo: true }),
    onUserInfoClose: () => set({ isUserInfo: false }),
}))