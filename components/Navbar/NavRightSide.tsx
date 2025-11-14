// src/components/Navbar/NavRightSide.tsx
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { SidebarSvg, UserSvg } from "../Svg/NavSvg";
import CreditDisplay from "../Layouts/Credit/CreditDisplay";

const NavRightSide = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { setOpenSidebar } = useLoginModal();
  const handleSidebarClick = useCallback(() => setOpenSidebar(true), [setOpenSidebar]);

  const handleLoginClick = () => {
    router.replace("/auth/login");
  }

  return (
    <div className="h-full flex items-center gap-2">
      {/* Credit Display */}
      <CreditDisplay />

      {/* User / Login and Sidebar */}
      <div className="h-full flex items-center gap-3 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 cursor-pointer">
        {user ? (
          <button
            aria-label="User Avatar"
            className=" w-8 h-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-900 bg-zinc-100 cursor-pointer p-0.5"
          >
            <UserSvg />
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
          className="transition-transform duration-300 ease-in-out cursor-pointer"
        >
          <SidebarSvg />
        </button>
      </div>
    </div>
  );
};

export default NavRightSide;
