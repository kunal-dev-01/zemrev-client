import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useCallback } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { ImageSvg } from "../Svg/NavSvg";
import clsx from "clsx";
import Link from "next/link";
import { Backdrop, Header, UserMenu } from "./SideBar.partials";
import { useRouter } from "next/navigation";

const Tools = [
  { name: "Image ToolKit", href: "/image-tools", icon: <ImageSvg /> },
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
      router.replace("/user?page=dashboard");
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
                className="flex items-center gap-3 px-3 py-1 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/30 group relative"
              >
                <div className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors w-7 h-7">
                  {tool.icon}
                </div>
                <span className="md:text-md text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  {tool.name}
                </span>

                <div className="opacity-0 group-hover:opacity-100 scale-80 group-hover:scale-100 transition-all duration-300 ease-in-out absolute top-0 left-0 w-full h-full -z-2 dark:bg-zinc-900 bg-zinc-200 rounded-lg"/>
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
