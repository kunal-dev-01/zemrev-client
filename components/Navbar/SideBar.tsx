import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useCallback } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { User } from "@/services/authService/types";
import { SidebarSvgTwo , ImageConvert , ImageOptamize , ImageResizer } from "../Svg/NavSvg";
import Image from "next/image";
import clsx from "clsx";
import Spinner from "../Layouts/Loaders/Spinner";
import Link from "next/link";

const Tools = [
  { 
    name: "Image Converter", 
    href: "/image-converter", 
    icon: <ImageConvert />
  },
  { 
    name: "Image Optimizer", 
    href: "/image-optimizer", 
    icon: <ImageOptamize />
    
  },
  { 
    name: "Image Resizer", 
    href: "/image-resizer", 
    icon: <ImageResizer />
  },
]

const SideBar = () => {
  const { isOpenSidebar, setOpenSidebar } = useLoginModal();
  const { logout, isLoggingOut, user } = useAuth();

  const toggleSidebar = useCallback(
    () => setOpenSidebar(!isOpenSidebar),
    [isOpenSidebar, setOpenSidebar]
  );

  const closeSidebar = useCallback(
    () => setOpenSidebar(false),
    [setOpenSidebar]
  );

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <>
      <Backdrop isOpen={isOpenSidebar} onClick={closeSidebar} />

      <aside
        className={clsx(
          "fixed top-0 right-0 z-50 h-screen w-full md:w-[17vw] p-3 bg-zinc-50 dark:bg-[#0a0a0a] transition-transform duration-300 ease-in-out md:rounded-l-xl flex flex-col",
          { "translate-x-0": isOpenSidebar, "translate-x-full": !isOpenSidebar }
        )}
      >
        <Header onToggle={toggleSidebar} />

        <div className="flex-1 overflow-y-auto scrollbar-hide my-4 p-3 space-y-2 custom-scrollbar w-full border-2 border-zinc-100/80 dark:border-zinc-900/50 rounded-xl bg-zinc-100/10 dark:bg-zinc-900/10">
          {/* Tools */}
          <div className="space-y-2">
            {Tools.map((tool, i) => (
              <Link 
                href={tool.href} 
                key={i} 
                onClick={closeSidebar}
                className="flex items-center gap-3 px-3 py-2 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-200 group"
              >
                <div className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  {tool.icon}
                </div>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <UserMenu
          user={user as User}
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
        />
      </aside>
    </>
  );
};

// ---- Sub Components ---- //

const Backdrop = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={clsx(
      "fixed inset-0 bg-white/50 dark:bg-black/50 z-40 transition-opacity duration-300 ease-in-out",
      { "opacity-100 visible": isOpen, "opacity-0 invisible": !isOpen }
    )}
  />
);

const Header = ({ onToggle }: { onToggle: () => void }) => (
  <div className="flex items-center p-1 rounded-xl border-2 border-zinc-100/80 dark:border-zinc-900/50 bg-zinc-100/10 dark:bg-zinc-900/10">
    <button
      onClick={onToggle}
      className="rounded-lg transition-colors duration-200 cursor-pointer"
      aria-label="Toggle sidebar"
    >
      <SidebarSvgTwo />
    </button>
    <h2 className="mx-auto text-zinc-700 dark:text-zinc-300 text-2xl font-semibold">
      Explore Tools
    </h2>
  </div>
);

const UserMenu = ({
  user,
  isLoggingOut,
  onLogout,
}: {
  user: User;
  isLoggingOut: boolean;
  onLogout: () => void;
}) => (
  <div
    id="user-menu"
    className="w-full p-[1vh] md:p-[0.5vw] rounded-xl border-2 border-zinc-100/80 dark:border-zinc-900/50 bg-zinc-100/10 dark:bg-zinc-900/10"
  >
    <div className="flex flex-col gap-3">
      <UserCard user={user} />
      <LogoutButton isLoading={isLoggingOut} onLogout={onLogout} />
    </div>
  </div>
);

const UserCard = ({ user }: { user: User }) => (
  <div className="flex items-center gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 p-2">
    <div className="w-[5vh] h-[5vh] md:w-[2.5vw] md:h-[2.5vw] rounded-xl overflow-hidden shrink-0">
      <Image
        src={
          user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || "User"
          )}&background=random`
        }
        alt={`${user.name || "User"}'s avatar`}
        width={50}
        height={50}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-sm md:text-base">
        {user.name || "User"}
      </p>
      <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 truncate">
        {user.email || "Email"}
      </p>
    </div>
  </div>
);

const LogoutButton = ({
  isLoading,
  onLogout,
}: {
  isLoading: boolean;
  onLogout: () => void;
}) => (
  <button
    aria-label="Logout"
    onClick={onLogout}
    disabled={isLoading}
    className="w-full py-1.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm md:text-base transition-colors duration-700 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    {isLoading ? (
      <>
        <Spinner color="text-white" size="sm" />
        <span>Logging out...</span>
      </>
    ) : (
      "Logout"
    )}
  </button>
);

export default SideBar;