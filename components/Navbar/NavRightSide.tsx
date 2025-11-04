import Image from "next/image";
import { useCallback } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { SidebarSvg } from "../Svg/NavSvg";

const NavRightSide = () => {
  const { user } = useAuth();
  const { setOpenAuth, setOpenSidebar } = useLoginModal();

  const handleLoginClick = useCallback(() => {
    setOpenAuth(true);
  }, [setOpenAuth]);

  const handleSidebarClick = useCallback(() => {
    setOpenSidebar(true);
  }, [setOpenSidebar]);

  return (
    <div className="h-full flex items-center gap-3 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 cursor-pointer">
      {user ? (
        <>
          {/* User Avatar Button */}
          <button
            aria-label="User Avatar"
            className="h-full hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              src={
                (user.avatar && user.avatar) ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name && user.name
                )}&background=random`
              }
              alt={`${user.name && user.name}'s avatar`}
              width={50}
              height={50}
              loading="eager"
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          </button>
        </>
      ) : (
        /* Login Button */
        <button
          onClick={handleLoginClick}
          aria-label="Login"
          className="font-semibold text-zinc-100 rounded-md dark:bg-dark bg-light h-full px-6 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
        >
          Login
        </button>
      )}

      <div
        aria-label="Nav-Sidebar"
        onClick={handleSidebarClick}
        className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <SidebarSvg />
      </div>
    </div>
  );
};

export default NavRightSide;
