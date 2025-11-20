// components/Navbar/SideBar.partials.tsx

import { RegisteredUser, GuestUser, CreditInfo, UserType } from "@/services/authService/types";
import { SidebarSvgTwo, UserSvg } from "../Svg/NavSvg";
import clsx from "clsx";
import Spinner from "../Layouts/Loaders/Spinner";

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
      className="rounded-lg cursor-pointer"
      aria-label="Toggle sidebar"
    >
      <SidebarSvgTwo />
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
      <div className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 p-3">
        <Spinner size="sm" color="text-zinc-600 dark:text-zinc-400" />
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Loading credits...
        </span>
      </div>
    );

  if (!credits) return null;

  const { remaining, used, total } = credits;

  const limit = typeof total === "number" ? total : null;
  const remainingNum =
    typeof remaining === "number" ? remaining : Number(remaining) || 0;

  const percentage =
    !limit ? 100 : (remainingNum / limit) * 100;

  const isCritical =
     limit && remainingNum < limit * 0.1;

  const isLow =
    limit &&
    remainingNum < limit * 0.2 &&
    !isCritical;

  return (
    <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900/50 p-3">
      <div className="flex items-center justify-between mb-2">
        {/* Left */}
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-8 h-8 rounded-full flex items-center justify-center", {
              "bg-red-100 dark:bg-red-900/30": isCritical,
              "bg-yellow-100 dark:bg-yellow-900/30": isLow,
              "bg-emerald-100 dark:bg-emerald-900/30": !isLow && !isCritical,
            })}
          >
            <svg
              className={clsx("w-4 h-4", {
                "text-red-600 dark:text-red-400": isCritical,
                "text-yellow-600 dark:text-yellow-400": isLow,
                "text-emerald-600 dark:text-emerald-400": !isLow && !isCritical,
              })}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          />
            </svg>
          </div>

          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Daily Credits
            </p>

            <div className="flex items-baseline gap-1.5">
              <span
                className={clsx("text-lg font-bold", {
                  "text-red-700 dark:text-red-400": isCritical,
                  "text-yellow-700 dark:text-yellow-400": isLow,
                  "text-zinc-900 dark:text-zinc-100": !isLow && !isCritical,
                })}
              >
                {remaining}
              </span>

              {limit && (
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  / {limit}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        {used !== undefined && (
          <div className="text-right">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Used</p>
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {used}
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      { limit && (
        <>
          <div className="w-full h-2 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
            <div
              className={clsx("h-full transition-all rounded-full", {
                "bg-red-500": isCritical,
                "bg-yellow-500": isLow,
                "bg-emerald-500": !isLow && !isCritical,
              })}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-right">
            {Math.round(percentage)}% remaining
          </p>
        </>
      )}

      {isCritical && (
        <p className="text-[10px] text-red-600 dark:text-red-400 text-center mt-2">
          ⚠️ Credits running low!
        </p>
      )}

      {isLow && !isCritical && (
        <p className="text-[10px] text-yellow-600 dark:text-yellow-400 text-center mt-2">
          ⚠️ Credits below 20%
        </p>
      )}
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
      <div className="w-[5vh] h-[5vh] md:w-[2.5vw] md:h-[2.5vw] rounded-xl overflow-hidden">
        <UserSvg />
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
