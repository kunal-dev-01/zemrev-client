// components/Navbar/SideBar.partials.tsx

import { RegisteredUser, GuestUser, CreditInfo, UserType } from "@/services/authService/types";
import { SidebarCloseSvg } from "../Svg/NavSvg";
import { CreditSvg } from "../Svg/CommonSvg";
import clsx from "clsx";
import Spinner from "../Layouts/Loaders/Spinner";
import { UserRoundSvg } from "../Svg/UserPageSvg";

// ========================= BACKDROP =========================
export const Backdrop = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={clsx(
      "fixed inset-0 bg-white/50 dark:bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm",
      {
        "opacity-100 visible": isOpen,
        "opacity-0 invisible": !isOpen,
      }
    )}
  />
);

// ========================= HEADER =========================
export const Header = ({ onToggle }: { onToggle: () => void }) => (
  <div className="flex items-center p-1 rounded-xl border-2 border-zinc-100/80 dark:border-zinc-900/50 bg-zinc-100/10 dark:bg-zinc-900/10">
    <button
      onClick={onToggle}
      className="rounded-lg cursor-pointer text-zinc-700 dark:text-zinc-300"
      aria-label="Toggle sidebar"
    >
      <SidebarCloseSvg />
    </button>
    <h2 className="mx-auto text-zinc-700 dark:text-zinc-300 text-2xl font-semibold">
      Explore Tools
    </h2>
  </div>
);

// ========================= MAIN MENU =========================
export const UserMenu = ({
  dashBoardLink,
  userType,
  registeredUser,
  guestUser,
  credits,
  isLoadingCredits,
  isLoggingOut,
  onLogout,
}: {
  userType: UserType;
  registeredUser: RegisteredUser | null;
  guestUser: GuestUser | null;
  credits: CreditInfo | null;
  isLoadingCredits: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
  dashBoardLink: () => void;
}) => (
  <div className="w-full p-[1vh] md:p-[0.5vw] rounded-xl border-2 border-zinc-100/80 dark:border-zinc-900/50 bg-zinc-100/10 dark:bg-zinc-900/10">
    <div className="flex flex-col gap-3">
      <CreditCard credits={credits} isLoading={isLoadingCredits} />
      <UserCard
        userType={userType}
        registeredUser={registeredUser}
        guestUser={guestUser}
        dashBoardLink={dashBoardLink}
      />
      <LogoutButton
        userType={userType}
        isLoading={isLoggingOut}
        onLogout={onLogout}
      />
    </div>
  </div>
);

// ========================= CREDIT CARD =========================

export const CreditCard = ({
  credits,
  isLoading,
}: {
  credits: CreditInfo | null;
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 flex items-center gap-2">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Loading credits...
        </span>
      </div>
    );

  if (!credits) return null;

  const { remaining, used, total } = credits;

  const limit = total || 0;
  const remain = Number(remaining) || 0;

  return (
    <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* SVG (no color change) */}
          <div className="w-8 h-8">
            <CreditSvg />
          </div>

          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 tracking-wide">
              Daily Credits
            </p>

            <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300">
              {remain}
              {limit ? (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {" "}/ {limit}
                </span>
              ) : null}
            </p>
          </div>
        </div>

        {used !== undefined && (
          <div className="text-right">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Used</p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{used}</p>
          </div>
        )}
      </div>

    </div>
  );
};


// ========================= USER CARD =========================
export const UserCard = ({
  userType,
  registeredUser,
  dashBoardLink,
}: {
  userType: UserType;
  registeredUser: RegisteredUser | null;
  guestUser: GuestUser | null;
  dashBoardLink: () => void;
}) => {
  const name =
    userType === "registered"
      ? registeredUser?.fullName || registeredUser?.email.split("@")[0]
      : userType === "guest"
      ? "Guest User"
      : "Anonymous User";

  const email =
    userType === "registered"
      ? registeredUser?.email
      : userType === "guest"
      ? "Guest Session"
      : "No Email";

  return (
    <div id="user-card" onClick={dashBoardLink} className="flex items-center gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 p-2 cursor-pointer">
      <div className="w-[5vh] h-[5vh] md:w-[2.5vw] md:h-[2.5vw] rounded-xl overflow-hidden text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
        <UserRoundSvg />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 truncate">
          {name}
        </p>
        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 truncate">
          {email}
        </p>
      </div>
    </div>
  );
};

// ========================= LOGOUT BUTTON =========================
export const LogoutButton = ({
  userType,
  isLoading,
  onLogout,
}: {
  userType: UserType;
  isLoading: boolean;
  onLogout: () => void;
}) => {
  // Only registered users can logout
  if (userType !== "registered") return null;

  return (
    <button
      onClick={onLogout}
      disabled={isLoading}
      className="w-full py-1.5 px-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <Spinner size="sm" color="text-white" />
          Logging out...
        </>
      ) : (
        "Logout"
      )}
    </button>
  );
};
