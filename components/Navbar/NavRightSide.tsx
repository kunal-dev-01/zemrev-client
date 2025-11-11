// src/components/Navbar/NavRightSide.tsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { SidebarSvg } from "../Svg/NavSvg";
import CreditDisplay from "../Layouts/Credit/CreditDisplay";

const NavRightSide = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { setOpenSidebar } = useLoginModal();
  const handleSidebarClick = useCallback(() => setOpenSidebar(true), [setOpenSidebar]);

  const handleLoginClick = () => {
    router.replace("/auth/login");
  }

  const avatarSrc =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`;

  return (
    <div className="h-full flex items-center gap-2">
      {/* Credit Display */}
      <CreditDisplay />

      {/* User / Login and Sidebar */}
      <div className="h-full flex items-center gap-3 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 cursor-pointer">
        {user ? (
          <button
            aria-label="User Avatar"
            className="h-full rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              src={avatarSrc}
              alt={`${user.name}'s avatar`}
              width={50}
              height={50}
              loading="eager"
              className="w-full h-full object-cover rounded-lg"
            />
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
          className="hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          <SidebarSvg />
        </button>
      </div>
    </div>
  );
};

export default NavRightSide;
