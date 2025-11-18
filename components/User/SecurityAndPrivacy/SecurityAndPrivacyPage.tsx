import { TwoFASvg, PasswordSvg, PersonalPrivacy } from "@/components/Svg/UserSvg";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { JSX } from "react";

const SecurityAndPrivacyPage = () => {
  const { registeredUser } = useAuth();
  const TwofaCheck = registeredUser?.twoFactorEnabled;

  const {
    setPrivacyPolicyModalOpen,
    setTwoFactorModalOpen,
    setChangePasswordModalOpen,
  } = useLoginModal();

  // 🔧 Reusable Card Component
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
      className="w-full p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/50 
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

  return (
    <div className="w-full h-full md:p-4 p-2 relative">
      <div className="w-full flex flex-col gap-4">

        {/* 🔐 TWO-FACTOR AUTHENTICATION */}
        <Card
          icon={<TwoFASvg />}
          title="Two Factor Authentication"
          description="Secure your account with two-step verification."
          onClick={() => setTwoFactorModalOpen(true)}
          badge={
            TwofaCheck ? (
              <span className="px-3 py-1 text-xs font-medium rounded-full 
              bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Enabled
              </span>
            ) : (
              <span className="px-3 py-1 text-xs font-medium rounded-full 
              bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                Disabled
              </span>
            )
          }
        />

        {/* 🔑 CHANGE PASSWORD */}
        <Card
          icon={<PasswordSvg />}
          title="Change Password"
          description="Update your account password securely."
          onClick={() => setChangePasswordModalOpen(true)}
        />

        {/* 🔒 PRIVACY SETTINGS */}
        <Card
          icon={<PersonalPrivacy />}
          title="Privacy Settings"
          description="Manage how your data is used and stored."
          onClick={() => setPrivacyPolicyModalOpen(true)}
        />

      </div>
    </div>
  );
};

export default SecurityAndPrivacyPage;
