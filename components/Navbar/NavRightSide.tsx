// src/components/Navbar/NavRightSide.tsx
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { CreditSvg,  } from "@/components/Svg/CommonSvg";
import { SidebarOpenSvg } from "../Svg/NavSvg";
import { UserRoundSvg } from "../Svg/UserPageSvg";

const NavRightSide = () => {
  const { userType, credits } = useAuth();
  const router = useRouter();
  const { setOpenSidebar } = useLoginModal();
  const handleSidebarClick = useCallback(
    () => setOpenSidebar(true),
    [setOpenSidebar]
  );

  const handleLoginClick = () => {
    router.replace("/auth/login");
  };

  const handleProfileClick = () => {
    if (userType === "registered") {
      router.replace("/user?page=profile");
    }
  };

  return (
    <div className="h-full flex items-center gap-2">
      {/* User Credits */}
      {userType === "registered" || userType === "guest" && (
        <div
        aria-label="user-credits"
        className="flex items-center gap-3 px-3 h-full rounded-xl border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 bg-white/50 cursor-pointer select-none dark:bg-zinc-900/30"
      >
        {/* Credit Icon */}
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800">
          <CreditSvg />
        </div>

        {/* Credit Number */}
        <span className="text-base font-bold text-zinc-700 dark:text-zinc-300">
          {credits?.remaining || 0}
        </span>
      </div>
      )}

      {/* User / Login and Sidebar */}
      <div
        aria-label="user-login-sidebar"
        className="h-full flex items-center gap-3 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 cursor-pointer"
      >
        {userType === "registered" || userType === "guest" ? (
          <button
            aria-label="User Avatar"
            onClick={handleProfileClick}
            className="w-7 h-7 text-zinc-700 dark:text-zinc-300 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <UserRoundSvg />
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            aria-label="Login"
            className="h-full px-6 font-semibold rounded-md bg-light dark:bg-dark text-zinc-100 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            Login
          </button>
        )}

        <button
          aria-label="Nav Sidebar"
          onClick={handleSidebarClick}
          className="transition-transform duration-300 ease-in-out cursor-pointer text-zinv-700 dark:text-zinc-300 w-7 h-7"
        >
          <SidebarOpenSvg />
        </button>
      </div>
    </div>
  );
};

export default NavRightSide;
