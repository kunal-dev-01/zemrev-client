import { CreditStats, User } from "@/services/authService/types";
import { SidebarSvgTwo, UserSvg } from "../Svg/NavSvg";
import clsx from "clsx";
import Spinner from "../Layouts/Loaders/Spinner";

export const Backdrop = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <div
    onClick={onClick}
    className={clsx(
      "fixed inset-0 bg-white/50 dark:bg-black/50 z-40 transition-opacity duration-300 ease-in-out",
      { "opacity-100 visible": isOpen, "opacity-0 invisible": !isOpen }
    )}
  />
);

export const Header = ({ onToggle }: { onToggle: () => void }) => (
  <div className="flex items-center p-1 rounded-xl border-2 border-zinc-100/80 dark:border-zinc-900/50 bg-zinc-100/10 dark:bg-zinc-900/10">
    <button onClick={onToggle} className="rounded-lg transition-colors duration-200 cursor-pointer" aria-label="Toggle sidebar">
      <SidebarSvgTwo />
    </button>
    <h2 className="mx-auto text-zinc-700 dark:text-zinc-300 text-2xl font-semibold">Explore Tools</h2>
  </div>
);

export const UserMenu = ({
  user,
  credits,
  isLoadingCredits,
  isLoggingOut,
  onLogout,
}: {
  user: User;
  credits: CreditStats | null;
  isLoadingCredits: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
}) => (
  <div className="w-full p-[1vh] md:p-[0.5vw] rounded-xl border-2 border-zinc-100/80 dark:border-zinc-900/50 bg-zinc-100/10 dark:bg-zinc-900/10">
    <div className="flex flex-col gap-3">
      <CreditCard credits={credits} isLoading={isLoadingCredits} />
      <UserCard user={user} />
      <LogoutButton isLoading={isLoggingOut} onLogout={onLogout} />
    </div>
  </div>
);

export const CreditCard = ({ credits, isLoading }: { credits: any; isLoading: boolean }) => {
  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 p-3">
        <Spinner color="text-zinc-600 dark:text-zinc-400" size="sm" />
        <span className="text-sm text-zinc-600 dark:text-zinc-400">Loading credits...</span>
      </div>
    );

  if (!credits) return null;

  const percentage = credits.limit > 0 ? (credits.remaining / credits.limit) * 100 : 0;
  const isLowCredits = credits.remaining < credits.limit * 0.2;
  const isCriticalCredits = credits.remaining < credits.limit * 0.1;

  return (
    <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900/50 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("flex items-center justify-center w-8 h-8 rounded-full transition-colors", {
              "bg-red-100 dark:bg-red-900/30": isCriticalCredits,
              "bg-yellow-100 dark:bg-yellow-900/30": isLowCredits && !isCriticalCredits,
              "bg-emerald-100 dark:bg-emerald-900/30": !isLowCredits && !isCriticalCredits,
            })}
          >
            <svg
              className={clsx("w-4 h-4", {
                "text-red-600 dark:text-red-400": isCriticalCredits,
                "text-yellow-600 dark:text-yellow-400": isLowCredits && !isCriticalCredits,
                "text-emerald-600 dark:text-emerald-400": !isLowCredits && !isCriticalCredits,
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
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Daily Credits</p>
            <div className="flex items-baseline gap-1.5">
              <span
                className={clsx("text-lg font-bold leading-none", {
                  "text-red-700 dark:text-red-400": isCriticalCredits,
                  "text-yellow-700 dark:text-yellow-400": isLowCredits && !isCriticalCredits,
                  "text-zinc-900 dark:text-zinc-100": !isLowCredits && !isCriticalCredits,
                })}
              >
                {credits.remaining}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">/ {credits.limit}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Used</p>
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{credits.used}</p>
        </div>
      </div>

      <div className="space-y-1">
        <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div
            className={clsx("h-full transition-all duration-300 rounded-full", {
              "bg-red-500": isCriticalCredits,
              "bg-yellow-500": isLowCredits && !isCriticalCredits,
              "bg-emerald-500": !isLowCredits && !isCriticalCredits,
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 text-right">{Math.round(percentage)}% remaining</p>
      </div>

      {isCriticalCredits && (
        <p className="text-[10px] text-red-600 dark:text-red-400 mt-2 text-center">⚠️ Credits running low!</p>
      )}
      {isLowCredits && !isCriticalCredits && (
        <p className="text-[10px] text-yellow-600 dark:text-yellow-400 mt-2 text-center">⚠️ Credits below 20%</p>
      )}
    </div>
  );
};

export const UserCard = ({ user }: { user: User }) => (
  <div className="flex items-center gap-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 p-2">
    <div className="w-[5vh] h-[5vh] md:w-[2.5vw] md:h-[2.5vw] rounded-xl overflow-hidden shrink-0">
      <UserSvg />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-sm md:text-base">{user.fullName || "User"}</p>
      <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 truncate">{user.email || "Email"}</p>
    </div>
  </div>
);

export const LogoutButton = ({ isLoading, onLogout }: { isLoading: boolean; onLogout: () => void }) => (
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