import { 
  UserProfileSvg, 
  EditPencilSvg,
  GlobeSvg,
  MapPin, 
} from "@/components/Svg/UserPageSvg";
import {ErrorSvg, EmailSvg} from "@/components/Svg/AuthSvg";
import {Shield, Zap,Lock } from "@/components/Svg/HomeSvg";
import {PaymentSvg, } from "@/components/Svg/UserPageSvg";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import UpdateManager from "./UpdateManager";
import Badge from "@/components/Layouts/PageLayout/Badge";
import type { RegisteredUser } from "@/services/authService/types";
import { Tick2IconSvg } from "@/components/Svg/AuthSvg";

const ProfilePage = () => {
  const { registeredUser } = useAuth();
  const {
    setAddressUpdateModalOpen,
    setFullNameUpdateModalOpen,
    isAddressUpdateModalOpen,
    isFullNameUpdateModalOpen
  } = useLoginModal();

  // --- Helpers ---
  const handleAddressEdit = () => setAddressUpdateModalOpen(true);
  const handleFullNameEdit = () => setFullNameUpdateModalOpen(true);

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Safe fallback user object to prevent crashes if registeredUser is loading or null
  const user: Partial<RegisteredUser> = registeredUser || {};

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      
      {/* --- Top Statistics / Welcome Banner --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Credits Card (Highlighted) */}
        <div className="bg-linear-to-br from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 rounded-2xl p-6 text-white dark:text-zinc-900 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-1 w-5 h-5 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-zinc-300 dark:text-zinc-600 mb-4">
              <span className="w-6 h-6 p-1"><PaymentSvg /></span>
              <span className="text-sm font-medium uppercase tracking-wider">Available Credits</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold tracking-tight">
                {user.credits?.toLocaleString() ?? 0}
              </span>
              <span className="mb-2 text-sm text-zinc-400 dark:text-zinc-500 font-medium">tokens</span>
            </div>
          </div>
        </div>

        {/* Role & Status Card */}
        <div className="md:col-span-2 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col justify-center shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-1">
                Account Status
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Current overview of your account standing and security.
              </p>
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
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
              {user.isEmailVerified ? <Tick2IconSvg/> : (
                <span className="w-5 h-5 p-1 text-yellow-500"><ErrorSvg/></span>
              )}
              <span>Email {user.isEmailVerified ? "Verified" : "Unverified"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
              <span className={`w-5 h-5 p-1 ${user.twoFactorEnabled ? "text-emerald-500" : "text-amber-500"}`}><Lock/></span>
              <span>2FA {user.twoFactorEnabled ? "Enabled" : "Disabled"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700/50">
              <span className="p-1 w-5 h-5 text-zinc-700 dark:text-zinc-300"><GlobeSvg/></span>
              <span>Provider: <span className="capitalize font-medium text-zinc-900 dark:text-zinc-200">{user.authProvider || "Local"}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Details Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Identity */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 border-4 border-white dark:border-zinc-900 shadow-md">
              <UserProfileSvg />
            </div>
            
            <div className="relative w-full">
               <h1 className="text-xl font-bold text-zinc-900 dark:text-white truncate px-6">
                {user.fullName || "Guest User"}
              </h1>
              <button 
                onClick={handleFullNameEdit}
                className="absolute right-0 top-1 p-1.5 w-6 h-6 text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all"
                title="Edit Name"
              >
                <EditPencilSvg />
              </button>
            </div>
           
            <div className="flex items-center gap-1.5 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="p-1 w-5 h-5 text-zinc-700 dark:text-zinc-300"><EmailSvg /></span>
              <span>{user.email || "No email provided"}</span>
            </div>

            <div className="w-full mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-4">
               <div className="text-center">
                  <span className="block text-xs uppercase text-zinc-400 font-semibold tracking-wider">Member Since</span>
                  <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">{formatDate(user.createdAt)}</span>
               </div>
               <div className="text-center">
                  <span className="block text-xs uppercase text-zinc-400 font-semibold tracking-wider">Last Login</span>
                  <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">{formatDate(user.updatedAt)}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Address & Security */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Address Card */}
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-1 w-5 h-5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500">
                  <MapPin />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Address Details</h3>
                  <p className="text-xs text-zinc-500">Manage your shipping and billing location</p>
                </div>
              </div>
              <button 
                onClick={handleAddressEdit}
                className="flex items-center w-6 h-6 gap-2 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-600"
              >
                <EditPencilSvg />
                <span>Edit Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
              <div className="space-y-1">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Street</span>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{user.address?.street || "Not provided"}</p>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">City</span>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{user.address?.city || "Not provided"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">State / Province</span>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{user.address?.state || "Not provided"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Zip Code</span>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{user.address?.zipCode || "Not provided"}</p>
              </div>

              <div className="space-y-1 md:col-span-2">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Country</span>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{user.address?.country || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Security Overview (Static for now, but visualizes remaining fields) */}
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-1 w-5 h-5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-zinc-500">
                  <Shield />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Security & Activity</h3>
             </div>
             
             <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Blocked Status</span>
                  <span className={`text-sm font-medium ${user.isBlocked ? "text-red-500" : "text-emerald-500"}`}>
                    {user.isBlocked ? "Blocked" : "Clear"}
                  </span>
                </div>
                {user.isBlocked && (
                   <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Blocked Reason</span>
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{user.blockedReason || "N/A"}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Last Password Change</span>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {formatDate(user.passwordChangedAt)}
                  </span>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* --- Update Modals --- */}
      {(isFullNameUpdateModalOpen || isAddressUpdateModalOpen) && <UpdateManager />}
    </div>
  );
};

export default ProfilePage;
