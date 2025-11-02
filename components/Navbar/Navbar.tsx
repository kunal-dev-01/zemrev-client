'use client';

import { memo, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/authHooks/auth.hooks';
import { useLoginModal } from '@/hooks/loginHooks/login.hooks';
import { useClickOutside } from '@/hooks/useClickOutside/useClickOutside';
import type { FC } from 'react';

/* ----------  Logo  ---------- */
const Logo: FC = () => (
  <Link href="/" className="block md:w-[2.5vw] w-[5.5vh] p-1">
    <Image 
      src="/favicon.svg" 
      alt="logo" 
      width={50} 
      height={50} 
      className="w-full h-full object-cover dark:hidden" 
    />
    <Image 
      src="/favicon-dark.svg" 
      alt="logo" 
      width={50} 
      height={50} 
      className="w-full h-full object-cover hidden dark:block" 
    />
  </Link>
);

/* ----------  Navbar  ---------- */
const Navbar: FC = memo(() => {
  const { logout, isLoggingOut,user } = useAuth();
  const { setOpenAuth, isUserInfo, setUserInfo, toggleUserInfo } = useLoginModal();

  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  
  const closeUserInfo = useCallback(() => setUserInfo(false), [setUserInfo]);
  
  const userInfoRef = useClickOutside<HTMLDivElement>({ 
    enabled: isUserInfo, 
    onClickOutside: closeUserInfo,
    ignoreRefs: [avatarButtonRef as React.RefObject<HTMLElement>]
  });

  const handleLogout = useCallback(async () => {
    closeUserInfo();
    await logout();
  }, [logout, closeUserInfo]);

  const handleLoginClick = useCallback(() => {
    setOpenAuth(true);
  }, [setOpenAuth]);

  return (
    <nav className="w-full md:h-[2.5vw] h-[5.5vh] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 backdrop-blur-lg border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-between relative">
      <Logo />

      <div className="p-1 h-full relative">
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
              className="h-full hover:scale-105 transition-transform rounded-xl p-0.5 bg-light dark:bg-dark overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image 
                src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                alt={`${user.name}'s avatar`}
                width={50} 
                height={50} 
                className="w-full h-full object-cover rounded-xl cursor-pointer" 
              />
            </button>

            {/* User Dropdown Menu */}
            <div 
              id="user-menu" 
              ref={userInfoRef}
              className={`w-[90vw] md:w-[15vw] md:p-[0.5vw] p-[1vh] rounded-xl absolute top-[calc(100%+0.5rem)] right-0 bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-100/80 dark:border-zinc-900/50 shadow-lg z-50 transition-all duration-300 ease-in-out origin-top-right ${
                isUserInfo 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col gap-3">
                {/* User Info Card */}
                <div className="flex items-center gap-3 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 p-2">
                  <div className="md:w-[2.5vw] md:h-[2.5vw] w-[5vh] h-[5vh] rounded-xl overflow-hidden shrink-0">
                    <Image 
                      src={user.avatar!}
                      alt={`${user.name}'s avatar`}
                      width={50} 
                      height={50} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-sm md:text-base">
                      {user.name}
                    </p>
                    <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 truncate">
                      {user.email}
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
                    'Logout'
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
            className="font-semibold text-zinc-100 rounded-xl dark:bg-dark bg-light h-full px-6 hover:scale-105 transition-transform cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;