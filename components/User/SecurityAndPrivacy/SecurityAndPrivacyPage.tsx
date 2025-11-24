import {
  TwoFASvg,
  PasswordSvg,
  PrivacySvg,
  RegenerateCodeSvg,
} from "@/components/Svg/UserPageSvg";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { JSX } from "react";
import ChangePassword from "./ChangePassword";
import Privacy from "./Privacy";
import RegenerateBackupCode from "./RegenerateBackupCode";
import DisableTwoFactor from "./DisableTwoFactor";
import TwoFA from "./TwoFA";

const SecurityAndPrivacyPage = () => {
  const { registeredUser } = useAuth();
  const TwofaCheck = registeredUser?.twoFactorEnabled;
  const LocalAccount = registeredUser?.authProvider === "local";

  const {
    setPrivacyPolicyModalOpen,
    setTwoFactorModalOpen,
    setTwoFactorDisabledModalOpen,
    setChangePasswordModalOpen,
    setRegenerateModalOpen,
    isChangePasswordModalOpen,
    isTwoFactorModalOpen,
    isRegenerateModalOpen,
    isTwoFactorDisabledModalOpen,
    isPrivacyPolicyModalOpen,
  } = useLoginModal();

  const Card = ({
    icon,
    title,
    description,
    badge,
    onClick,
  }: {
    icon: JSX.Element;
    title: string;
    description: string;
    badge?: JSX.Element;
    onClick?: () => void;
  }) => (
    <div
      onClick={onClick}
      className="w-full p-4 rounded-xl bg-transparent dark:bg-zinc-900/50 
                 border border-zinc-200 dark:border-zinc-800 flex items-start justify-between 
                 cursor-pointer relative group overflow-hidden transition-all"
    >
      {/* Hover Layer */}
      <div className="absolute inset-0 opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-10 bg-zinc-400 pointer-events-none transition-all duration-200 rounded-xl"></div>

      {/* ICON + TEXT */}
      <div className="flex items-start gap-3 md:gap-4 z-10">
        <div className="md:w-10 md:h-10 w-8 h-8 text-zinc-700 dark:text-zinc-300 shrink-0">
          {icon}
        </div>

        <div className="flex flex-col">
          <h1 className="text-zinc-700 dark:text-zinc-300 md:text-lg text-base font-medium">
            {title}
          </h1>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>

      {/* BADGE */}
      <div className="z-10">{badge}</div>
    </div>
  );

  const handleTwoFactorModalOpen = () => {
    if (TwofaCheck) {
      setTwoFactorDisabledModalOpen(true);
    } else {
      setTwoFactorModalOpen(true);
    }
  };

  return (
    <>
      {isPrivacyPolicyModalOpen ? (
        <Privacy />
      ) : (
        <div className="w-full flex flex-col gap-4 md:p-4 p-2 relative fade-in">
          {/* 🔐 TWO-FACTOR AUTHENTICATION */}
          {LocalAccount && (
            <Card
              icon={<TwoFASvg />}
              title="Two Factor Authentication"
              description="Secure your account with two-step verification."
              onClick={handleTwoFactorModalOpen}
              badge={
                TwofaCheck ? (
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full 
              bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    Enabled
                  </span>
                ) : (
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full 
              bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  >
                    Disabled
                  </span>
                )
              }
            />
          )}

          {/* 🔄 REGENERATE BACKUP CODES */}
          {TwofaCheck && (
            <Card
              icon={<RegenerateCodeSvg />}
              title="Regenerate Backup Codes"
              description="Generate new backup codes for account recovery."
              onClick={() => setRegenerateModalOpen(true)}
            />
          )}

          {/* 🔑 CHANGE PASSWORD */}
          <Card
            icon={<PasswordSvg />}
            title="Change Password"
            description="Update your account password securely."
            onClick={() => setChangePasswordModalOpen(true)}
          />

          {/* 🔒 PRIVACY SETTINGS */}
          <Card
            icon={<PrivacySvg />}
            title="Privacy Settings"
            description="Manage how your data is used and stored."
            onClick={() => setPrivacyPolicyModalOpen(true)}
          />
        </div>
      )}

      {/* Modals */}
      {isChangePasswordModalOpen && <ChangePassword />}
      {isTwoFactorModalOpen && <TwoFA />}
      {isTwoFactorDisabledModalOpen && <DisableTwoFactor />}
      {isRegenerateModalOpen && <RegenerateBackupCode />}
    </>
  );
};

export default SecurityAndPrivacyPage;
