import SideBar from "./SideBar";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Skeleton from "@/components/Layouts/Loaders/Skeleton";
import { UserMenuSvg } from "../../Svg/UserPageSvg";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import Link from "next/link";

const ProfilePage = dynamic(() => import("../ProfilePage/ProfilePage"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full rounded-2xl" />,
});

const MainUserPageManager = () => {
  const { isOpenUserMenu, setOpenUserMenu } = useLoginModal();
  const { registeredUser } = useAuth();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");

  const toggleUserMenu = () => setOpenUserMenu(true);
  const closeUserMenu = () => setOpenUserMenu(false);

  const VerifyEmailAlert = () => {
    return (
      <div className="md:px-4 px-2 md:mt-4 mt-2">
        <div className="w-full p-2 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
        <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
          Your email is not verified. Please verify to access all features.
        </p>

        <Link
          href="/auth/verify-email-request"
          className="px-3 py-1 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Resend
        </Link>
      </div>
      </div>
    );
  };

  return (
    <div className="w-full md:h-[calc(100vh-5vw)] h-[calc(100vh-8vh)] md:flex md:flex-row md:justify-between items-center">
      {/* PC Sidebar */}
      <div className="w-full h-full md:w-[15vw] dark:bg-zinc-900/10 bg-zinc-100/20 md:block hidden rounded-2xl p-2 md:border-2 border-zinc-100/80 dark:border-zinc-900/50 overflow-y-scroll">
        <SideBar />
      </div>

      {/* MOBILE Sidebar Drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[70vw] max-w-[300px] z-40 
          bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-2
          transform transition-transform duration-300 ease-in-out
          ${isOpenUserMenu ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SideBar />
      </div>

      {/* MOBILE Overlay Background */}
      {isOpenUserMenu && (
        <div
          className="fixed top-0 left-0 w-full h-full dark:bg-black/40 bg-zinc-100/10 z-30 md:hidden"
          onClick={closeUserMenu}
        ></div>
      )}

      {/* RIGHT CONTENT */}
      <div className="w-full h-full md:w-[calc(100%-16vw)] dark:bg-zinc-900/10 bg-zinc-100/20 rounded-2xl border-2 border-zinc-100/80 dark:border-zinc-900/50 overflow-y-scroll">
        {/* Mobile Menu Button */}
        <div className="md:hidden w-full h-[4vh] flex flex-row justify-between items-center p-2 mt-2">
          <div
            onClick={toggleUserMenu}
            className="w-[3.5vh] h-[3.5vh] text-zinc-700 dark:text-zinc-300"
          >
            <UserMenuSvg />
          </div>

          <p className="px-3 py-1 truncate bg-zinc-100 dark:bg-zinc-900/90 rounded-md">
            {registeredUser?.fullName || registeredUser?.email.split("@")[0]}
          </p>
        </div>

        <div className="w-full md:h-full h-[calc(100%-4vh)]">
          {!registeredUser?.isEmailVerified && <VerifyEmailAlert />}
          {currentPage === "profile" && <ProfilePage />}
        </div>
      </div>
    </div>
  );
};

export default MainUserPageManager;
