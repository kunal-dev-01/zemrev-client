import {
  UserRoundSvg,
  GlobeSvg,
  MapPinSvg,
  PaymentSvg
} from "@/components/Svg/UserPageSvg";

import { Shield, Zap, Lock } from "@/components/Svg/HomeSvg";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";

import UpdateManager from "./UpdateManager";
import Badge from "@/components/Layouts/PageLayout/Badge";

import {
  CheckSvg,
  EditSvg,
  EmailSvg,
  ErrorSvg
} from "@/components/Svg/CommonSvg";

import type { RegisteredUser } from "@/services/authService/types";

/* ---------------- Helpers ---------------- */
const formatDate = (date: string | Date | null | undefined) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : "N/A";

const InfoRow = ({
  label,
  value,
  highlight
}: {
  label: string;
  value: string | number | null | undefined;
  highlight?: string;
}) => (
  <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-none">
    <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
    <span className={`text-sm font-medium ${highlight || "text-zinc-800 dark:text-zinc-200"}`}>
      {value ?? "N/A"}
    </span>
  </div>
);

/* ---------------- Component ---------------- */
const ProfilePage = () => {
  const { registeredUser } = useAuth();
  const {
    setAddressUpdateModalOpen,
    setFullNameUpdateModalOpen,
    isAddressUpdateModalOpen,
    isFullNameUpdateModalOpen
  } = useLoginModal();

  const user: Partial<RegisteredUser> = registeredUser || {};

  return (
    <>
    <div className="w-full space-y-6 animate-in fade-in duration-300 md:p-4 p-2">
      {/* ----- Stats Row ----- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Credits */}
        <div className="bg-linear-to-br from-zinc-100 to-zinc-100/50 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl md:p-6 p-4 text-zinc-700 dark:text-zinc-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-1 w-5 h-5 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-zinc-300 dark:text-zinc-600 mb-4">
              <span className="w-6 h-6 text-zinc-600 dark:text-zinc-400">
                <PaymentSvg />
              </span>
              <span className="text-sm font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Available Credits
              </span>
            </div>

            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold tracking-tight">
                {user.credits?.toLocaleString() ?? 0}
              </span>
              <span className="mb-2 text-sm text-zinc-500 font-medium">Credits</span>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="md:col-span-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl md:p-6 p-4 flex flex-col justify-center">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Account Status</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Current overview of your account standing and security.</p>
            </div>

            <div className="flex gap-2">
              <Badge variant={user.isActive ? "success" : "danger"}>
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
              <Badge variant="neutral">
                {(user.role || "USER").toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {/* Email Verified */}
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
              {user.isEmailVerified ? (
                <span className="w-5 h-5 text-emerald-400"><CheckSvg /></span>
              ) : (
                <span className="text-yellow-500 w-4 h-4"><ErrorSvg /></span>
              )}
              <span>Email {user.isEmailVerified ? "Verified" : "Unverified"}</span>
            </div>

            {/* 2FA */}
            {user.authProvider === "local" && (
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
              <span className={`w-5 h-5 ${user.twoFactorEnabled ? "text-emerald-500" : "text-amber-500"}`}>
                <Lock />
              </span>
              <span>2FA {user.twoFactorEnabled ? "Enabled" : "Disabled"}</span>
            </div>
            )}

            {/* Auth Provider */}
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
              <span className="w-5 h-5 text-zinc-700 dark:text-zinc-300"><GlobeSvg /></span>
              <span>
                Provider:{" "}
                <span className="capitalize font-medium text-zinc-900 dark:text-zinc-200">
                  {user.authProvider || "Local"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ----- Main Grid ----- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Identity */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-4 border-4 border-white dark:border-zinc-900 text-zinc-700 dark:text-zinc-300">
              <UserRoundSvg />
            </div>

            <div className="relative w-full">
              <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 truncate px-6">
                {user.fullName || "Guest User"}
              </h1>

              <button
                onClick={() => setFullNameUpdateModalOpen(true)}
                title="Edit Name"
                className="absolute right-0 top-1 w-6 h-6 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <EditSvg />
              </button>
            </div>

            <div className="flex items-center gap-1.5 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="w-6 h-6 text-zinc-700 dark:text-zinc-300"> <EmailSvg/></span>
             
              <span>{user.email || "No email provided"}</span>
            </div>

            {/* Member Since - Last Login */}
            <div className="w-full mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
              <div className="text-center">
                <span className="block text-xs uppercase text-zinc-400 font-semibold tracking-wider">Member Since</span>
                <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                  {formatDate(user.createdAt)}
                </span>
              </div>

              <div className="text-center">
                <span className="block text-xs uppercase text-zinc-400 font-semibold tracking-wider">Last Login</span>
                <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                  {formatDate(user.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Address */}
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl md:p-6 p-4 relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg text-zinc-500">
                  <MapPinSvg />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Address Details</h3>
                  <p className="text-xs text-zinc-500">Manage your billing location</p>
                </div>
              </div>

              <button
                onClick={() => setAddressUpdateModalOpen(true)}
                className="absolute right-4 top-4 w-6 h-6 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <EditSvg />
              </button>
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
              {[
                ["Street", user.address?.street],
                ["City", user.address?.city],
                ["State / Province", user.address?.state],
                ["Zip Code", user.address?.zipCode],
                ["Country", user.address?.country]
              ].map(([label, value], i) => (
                <div key={i} className={`space-y-1 ${i === 4 ? "md:col-span-2" : ""}`}>
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">{label}</span>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {value || "Not provided"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl md:p-6 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-lg text-zinc-500">
                <Shield />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Security & Activity</h3>
            </div>

            <div className="space-y-4">
              <InfoRow
                label="Blocked Status"
                value={user.isBlocked ? "Blocked" : "Clear"}
                highlight={user.isBlocked ? "text-red-500" : "text-emerald-500"}
              />

              {user.isBlocked && (
                <InfoRow label="Blocked Reason" value={user.blockedReason || "N/A"} />
              )}

              <InfoRow
                label="Last Password Change"
                value={formatDate(user.passwordChangedAt)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Update Modals */}
      {(isFullNameUpdateModalOpen || isAddressUpdateModalOpen) && <UpdateManager />}
    </>
  );
};

export default ProfilePage;
