import { memo, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/reduxHooks/redux.hooks';
import { useAuth } from '@/hooks/authHooks/auth.hooks';
import { useLoginModal } from '@/hooks/loginHooks/login.hooks';
import { useClickOutside } from '@/hooks/useClickOutside/useClickOutside';
import type { FC } from 'react';

/* ----------  Logo  ---------- */
const Logo: FC = () => (
  <Link href="/" className="block md:w-[2.5vw] w-[5.5vh] p-1">
    <Image src="/favicon.svg" alt="logo" width={50} height={50} className="w-full h-full object-cover dark:hidden" />
    <Image src="/favicon-dark.svg" alt="logo" width={50} height={50} className="w-full h-full object-cover hidden dark:block" />
  </Link>
);

/* ----------  Navbar  ---------- */
const Navbar: FC = memo(() => {
  const user = useAppSelector(s => s.auth.user);
  const { logout } = useAuth();
  const { setOpenAuth, isUserInfo, setUserInfo, toggleUserInfo } = useLoginModal();

  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  
  const closeUserInfo = useCallback(() => setUserInfo(false), [setUserInfo]);
  
  const userInfoRef = useClickOutside<HTMLDivElement>({ 
    enabled: isUserInfo, 
    onClickOutside: closeUserInfo,
    ignoreRefs: [avatarButtonRef as React.RefObject<HTMLElement>]
  });

  const handleLogout = useCallback(() => {
    logout();
    closeUserInfo();
  }, [logout, closeUserInfo]);

  return (
    <nav className="w-full md:h-[2.5vw] h-[5.5vh] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 backdrop-blur-lg border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-between relative">
      <Logo />

      <div className="p-1 h-full relative cursor-pointer">
        {user ? (
          <>
            <button
              ref={avatarButtonRef}
              aria-expanded={isUserInfo}
              aria-controls="user-menu"
              onClick={toggleUserInfo}
              className="h-full hover:scale-105 transition-transform rounded-xl p-0.5 bg-light dark:bg-dark overflow-hidden"
            >
              <Image src={user.avatar!} alt="user-avatar" width={50} height={50} className="w-full h-full object-cover rounded-xl cursor-pointer" />
            </button>

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
                <div className="flex items-center gap-3 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 p-2">
                  <div className="md:w-[2.5vw] md:h-[2.5vw] w-[5vh] h-[5vh] rounded-xl overflow-hidden">
                    <Image src={user.avatar!} alt="user-avatar" width={50} height={50} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-sm md:text-base">{user.name}</p>
                    <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 truncate">{user.email}</p>
                  </div>
                </div>

                <button
                  aria-label="user-logout"
                  onClick={handleLogout}
                  className="w-full py-1.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm md:text-base transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <button onClick={() => setOpenAuth(true)} className="font-semibold text-zinc-100 rounded-xl dark:bg-dark bg-light h-full px-6 hover:scale-105 transition-transform">
            Login
          </button>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;