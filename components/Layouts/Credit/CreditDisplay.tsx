// src/components/Layouts/Credit/CreditDisplay.tsx
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import clsx from "clsx";
import Spinner from "../Loaders/Spinner";

const CreditDisplay = () => {
  const { credits, isLoading, isLowCredits, isCriticalCredits } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 h-full rounded-xl border border-zinc-200/50 dark:border-zinc-900 cursor-pointer">
        <Spinner size="sm" color="text-zinc-600 dark:text-zinc-400" />
        <span className="text-sm text-zinc-600 dark:text-zinc-400">Loading...</span>
      </div>
    );
  }

  if (!credits) return null;

  const borderAndBgClasses = clsx(
    "flex items-center gap-3 px-3 h-full rounded-xl border transition-all duration-200 cursor-pointer",
    {
      "border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10": isCriticalCredits,
      "border-yellow-200 dark:border-yellow-900/50 bg-yellow-50/50 dark:bg-yellow-900/10": isLowCredits && !isCriticalCredits,
      "border-zinc-200/50 dark:border-zinc-900 bg-white/50 dark:bg-zinc-900/30": !isLowCredits && !isCriticalCredits,
    }
  );

  const iconBgClasses = clsx(
    "flex items-center justify-center w-6 h-6 rounded-full transition-colors",
    {
      "bg-red-100 dark:bg-red-900/30": isCriticalCredits,
      "bg-yellow-100 dark:bg-yellow-900/30": isLowCredits && !isCriticalCredits,
      "bg-zinc-100 dark:bg-zinc-800": !isLowCredits && !isCriticalCredits,
    }
  );

  const iconColorClasses = clsx("w-5 h-5", {
    "text-red-600 dark:text-red-400": isCriticalCredits,
    "text-yellow-600 dark:text-yellow-400": isLowCredits && !isCriticalCredits,
    "text-zinc-600 dark:text-zinc-400": !isLowCredits && !isCriticalCredits,
  });

  const textColorClasses = clsx("text-base font-bold leading-none", {
    "text-red-700 dark:text-red-400": isCriticalCredits,
    "text-yellow-700 dark:text-yellow-400": isLowCredits && !isCriticalCredits,
    "text-zinc-900 dark:text-zinc-100": !isLowCredits && !isCriticalCredits,
  });

  return (
    <div className={borderAndBgClasses}>
      {/* Credit Icon */}
      <div className={iconBgClasses}>
        <svg className={iconColorClasses} fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Credit Info */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={textColorClasses}>{credits.remaining}</span>
        </div>
      </div>
    </div>
  );
};

export default CreditDisplay;
