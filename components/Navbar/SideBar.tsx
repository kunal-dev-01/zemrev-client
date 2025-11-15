import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useCallback } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { ImageConvert, ImageOptamize, ImageResizer } from "../Svg/NavSvg";
import clsx from "clsx";
import Link from "next/link";
import { Backdrop, Header, UserMenu } from "./SideBar.partials";
import { useRouter } from "next/navigation";

const Tools = [
  { name: "Image Converter", href: "/image-converter", icon: <ImageConvert /> },
  { name: "Image Optimizer", href: "/image-optimizer", icon: <ImageOptamize /> },
  { name: "Image Resizer", href: "/image-resizer", icon: <ImageResizer /> },
];

const SideBar = () => {
  const { isOpenSidebar, setOpenSidebar } = useLoginModal();
  const router = useRouter();

  const {
    logout,
    isLoading,
    registeredUser,
    guestUser,
    userType,
    credits,
  } = useAuth();

  const toggleSidebar = useCallback(
    () => setOpenSidebar(!isOpenSidebar),
    [isOpenSidebar, setOpenSidebar]
  );

  const closeSidebar = useCallback(() => setOpenSidebar(false), [setOpenSidebar]);

  const handleLogout = useCallback(async () => await logout(), [logout]);

  // If user is anonymous (not yet guest or registered), hide user menu
  const shouldShowUserMenu = userType !== "anonymous";

  const handleProfileClick = () => {
    if(userType === 'registered') {
      router.replace("/user?page=profile");
    }
  }

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

        {/* TOOL LINKS */}
        <div className="flex-1 overflow-y-auto scrollbar-hide my-4 p-3 space-y-2 custom-scrollbar w-full border-2 border-zinc-100/80 dark:border-zinc-900/50 rounded-xl bg-zinc-100/10 dark:bg-zinc-900/10">
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

        {/* USER INFO + CREDIT CARD */}
        {shouldShowUserMenu && (
          <UserMenu
            dashBoardLink={handleProfileClick}
            userType={userType}
            registeredUser={registeredUser}
            guestUser={guestUser}
            credits={credits}
            isLoadingCredits={isLoading}
            isLoggingOut={isLoading}
            onLogout={handleLogout}
          />
        )}
      </aside>
    </>
  );
};

export default SideBar;
