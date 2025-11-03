import Image from "next/image";
import { useCallback, useRef } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useClickOutside } from "@/hooks/useClickOutside/useClickOutside";
import SidebarSvg from "../Svg/NavSvg";

const NavRightSide = () => {
  const { logout, isLoggingOut, user } = useAuth();
  const { setOpenAuth, isUserInfo, setUserInfo, toggleUserInfo } =
    useLoginModal();

  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  const closeUserInfo = useCallback(() => setUserInfo(false), [setUserInfo]);

  const userInfoRef = useClickOutside<HTMLDivElement>({
    enabled: isUserInfo,
    onClickOutside: closeUserInfo,
    ignoreRefs: [avatarButtonRef as React.RefObject<HTMLElement>],
  });

  const handleLogout = useCallback(async () => {
    closeUserInfo();
    await logout();
  }, [logout, closeUserInfo]);

  const handleLoginClick = useCallback(() => {
    setOpenAuth(true);
  }, [setOpenAuth]);

  return (
    <div className="h-full flex items-center gap-3 p-1 rounded-xl border border-zinc-100 dark:border-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 cursor-pointer">
      {user ? (
        <>
          {/* User Avatar Button */}
          <button
            ref={avatarButtonRef}
            aria-expanded={isUserInfo}
            aria-controls="user-menu"
            aria-label="Toggle user menu"
            onClick={toggleUserInfo}
            disabled={isLoggingOut}
            className="h-full hover:scale-105 transition-transform duration-300 ease-in-out rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              src={
                user.avatar && user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name && user.name
                )}&background=random`
              }
              alt={`${user.name && user.name}'s avatar`}
              width={50}
              height={50}
              className="w-full h-full object-cover rounded-xl cursor-pointer"
            />
          </button>

          {/* User Dropdown Menu */}
          <div
            id="user-menu"
            ref={userInfoRef}
            className={`w-[70vw] md:w-[15vw] md:p-[0.5vw] p-[1vh] rounded-xl absolute top-[calc(100%+0.5rem)] right-0 bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-100/80 dark:border-zinc-900/50 shadow-lg z-50 transition-all duration-300 ease-in-out origin-top-right ${
              isUserInfo
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="flex flex-col gap-3">
              {/* User Info Card */}
              <div className="flex items-center gap-3 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 p-2">
                <div className="md:w-[2.5vw] md:h-[2.5vw] w-[5vh] h-[5vh] rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={user.avatar && user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name && user.name)}&background=random`}
                    alt={`${user.name && user.name}'s avatar`}
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-sm md:text-base">
                    {user.name && user.name || "User"}
                  </p>
                  <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 truncate">
                    {user.email && user.email || "Email"}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                aria-label="Logout"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full py-1.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm md:text-base transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Logging out...</span>
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
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

      <div className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
        <SidebarSvg />
      </div>
    </div>
  );
};

export default NavRightSide;
