import { create } from 'zustand';

interface LoginState {
  isOpenSidebar: boolean;
  setOpenSidebar: (v: boolean) => void;
  isOpenUserMenu: boolean;
  setOpenUserMenu: (v: boolean) => void;
  isPhoneNumberUpdateModalOpen: boolean;
  setPhoneNumberUpdateModalOpen: (v: boolean) => void;
  isAddressUpdateModalOpen: boolean;
  setAddressUpdateModalOpen: (v: boolean) => void;
  isFullNameUpdateModalOpen: boolean;
  setFullNameUpdateModalOpen: (v: boolean) => void;
  isTwoFactorModalOpen: boolean;
  setTwoFactorModalOpen: (v: boolean) => void;
  isTwoFactorDisabledModalOpen: boolean;
  setTwoFactorDisabledModalOpen: (v: boolean) => void;
  isRegenerateModalOpen: boolean;
  setRegenerateModalOpen: (v: boolean) => void;
  isChangePasswordModalOpen: boolean;
  setChangePasswordModalOpen: (v: boolean) => void;
  isPrivacyPolicyModalOpen: boolean;
  setPrivacyPolicyModalOpen: (v: boolean) => void;
}

export const useLoginModal = create<LoginState>(set => ({
  isOpenSidebar: false,
  setOpenSidebar: v => set({ isOpenSidebar: v }),
  isOpenUserMenu: false,
  setOpenUserMenu: v => set({ isOpenUserMenu: v }),
  isPhoneNumberUpdateModalOpen: false,
  setPhoneNumberUpdateModalOpen: v => set({ isPhoneNumberUpdateModalOpen: v }),
  isAddressUpdateModalOpen: false,
  setAddressUpdateModalOpen: v => set({ isAddressUpdateModalOpen: v }),
  isFullNameUpdateModalOpen: false,
  setFullNameUpdateModalOpen: v => set({ isFullNameUpdateModalOpen: v }),
  isTwoFactorModalOpen: false,
  setTwoFactorModalOpen: v => set({ isTwoFactorModalOpen: v }),
  isTwoFactorDisabledModalOpen: false,
  setTwoFactorDisabledModalOpen: v => set({ isTwoFactorDisabledModalOpen: v }),
  isRegenerateModalOpen: false,
  setRegenerateModalOpen: v => set({ isRegenerateModalOpen: v }),
  isChangePasswordModalOpen: false,
  setChangePasswordModalOpen: v => set({ isChangePasswordModalOpen: v }),
  isPrivacyPolicyModalOpen: false,
  setPrivacyPolicyModalOpen: v => set({ isPrivacyPolicyModalOpen: v }),
}));