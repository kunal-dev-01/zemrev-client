import { UserSvg } from "@/components/Svg/NavSvg";
import { EditPencilSvg } from "@/components/Svg/UserPageSvg";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { PlanType, SubscriptionStatus } from "@/services/authService/types";
import UpdateManager from "./UpdateManager";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";

const ProfilePage = () => {
  const { registeredUser } = useAuth();
  const {
    isPhoneNumberUpdateModalOpen,
    isAddressUpdateModalOpen,
    isFullNameUpdateModalOpen,
    setPhoneNumberUpdateModalOpen,
    setAddressUpdateModalOpen,
    setFullNameUpdateModalOpen,
  } = useLoginModal();

  const handleAddressEdit = () => setAddressUpdateModalOpen(true);
  const handleNumberEdit = () => setPhoneNumberUpdateModalOpen(true);
  const handleFullNameEdit = () => setFullNameUpdateModalOpen(true);

  const formatDate = (date: string | Date | null | undefined) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  /* ------ Badge Color Handlers ------ */
  const PLAN_COLORS: Record<PlanType, string> = {
    basic: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    pro: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    elite:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    scale:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  const SUB_COLORS: Record<SubscriptionStatus, string> = {
    active:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    canceled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    past_due:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    trialing:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  };

  const EMAIL_COLORS = {
    verified:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    unverified: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  /* ----- Reusable Badge Component ----- */
  const Badge = ({
    text,
    colorClass,
  }: {
    text: string;
    colorClass: string;
  }) => (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-md uppercase w-fit ${colorClass}`}
    >
      {text}
    </span>
  );

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-4 md:p-4 p-2 relative">
      {/* ---------------- LEFT SECTION ---------------- */}
      <div className="md:w-1/2 flex flex-col gap-4 items-center pt-4 md:pt-0">
        {/* Profile Picture */}
        <div className="md:w-[10vw] md:h-[10vw] w-[15vh] h-[15vh] rounded-2xl overflow-hidden bg-zinc-100/90 dark:bg-zinc-900/50">
          <UserSvg />
        </div>

        {/* User Info Card */}
        <div className="w-full p-4 bg-zinc-100/90 dark:bg-zinc-900/50 rounded-xl flex flex-col gap-3">
          {/* Name & Email */}
          <div className="flex flex-col items-center text-center pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80 relative">
            <h1 className="text-xl md:text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
              {registeredUser?.fullName || "Guest User"}
            </h1>
            <p className="text-sm md:text-base text-zinc-500 font-medium">
              {registeredUser?.email || "No email"}
            </p>

            <button
              onClick={handleFullNameEdit}
              className="p-1 md:w-9 md:h-9 w-8 h-8 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded-full transition-colors absolute top-2 right-2"
            >
              <EditPencilSvg />
            </button>
          </div>

          {/* Reusable Info Row */}
          {[
            {
              label: "Phone Number",
              value: registeredUser?.phoneNumber || "Not provided",
              editable: true,
            },
            {
              label: "Current Plan",
              value: (
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    text={registeredUser?.plan?.type || "Basic"}
                    colorClass={
                      PLAN_COLORS[registeredUser?.plan?.type as PlanType] ??
                      PLAN_COLORS.basic
                    }
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    ${registeredUser?.plan?.price || 0}/month
                  </span>
                </div>
              ),
            },
            {
              label: "Daily Credits",
              value: `${registeredUser?.plan?.dailyCredits || 0} credits/day`,
            },
            {
              label: "Credits Used Today",
              value: `${registeredUser?.creditsUsed || 0} credits`,
            },
            {
              label: "Subscription Status",
              value: (
                <Badge
                  text={registeredUser?.subscriptionStatus || "Active"}
                  colorClass={
                    SUB_COLORS[
                      registeredUser?.subscriptionStatus as SubscriptionStatus
                    ] ?? SUB_COLORS.active
                  }
                />
              ),
            },
            {
              label: "Email Status",
              value: (
                <Badge
                  text={
                    registeredUser?.isEmailVerified ? "Verified" : "Unverified"
                  }
                  colorClass={
                    registeredUser?.isEmailVerified
                      ? EMAIL_COLORS.verified
                      : EMAIL_COLORS.unverified
                  }
                />
              ),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2 border-b border-zinc-200/80 dark:border-zinc-800/80 last:border-none"
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {item.label}
                </span>
                <span className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
                  {typeof item.value === "string" ? item.value : item.value}
                </span>
              </div>

              {item.editable && (
                <button
                  onClick={handleNumberEdit}
                  className="p-1 md:w-9 md:h-9 w-8 h-8 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <EditPencilSvg />
                </button>
              )}
            </div>
          ))}

          {/* Account Status */}
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                Account Status
              </span>

              <div className="flex gap-2 mt-1">
                <Badge
                  text={registeredUser?.isActive ? "Active" : "Inactive"}
                  colorClass={
                    registeredUser?.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                  }
                />

                {registeredUser?.isEmailVerified && (
                  <Badge
                    text="Verified"
                    colorClass="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  />
                )}

                {registeredUser?.twoFactorEnabled && (
                  <Badge
                    text="2FA"
                    colorClass="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- RIGHT SECTION ---------------- */}
      <div className="md:w-1/2 flex flex-col gap-4 pb-4 md:pb-0">
        {/* Address */}
        <div className="w-full p-4 bg-zinc-100/90 dark:bg-zinc-900/50 rounded-xl flex flex-col gap-3">
          <div className="flex justify-between items-center pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <h2 className="text-lg md:text-xl font-semibold text-zinc-700 dark:text-zinc-300">
              Address
            </h2>
            <button
              type="button"
              aria-label="edit-address"
              onClick={handleAddressEdit}
              className="p-1 md:w-9 md:h-9 w-8 h-8 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded-full"
            >
              <EditPencilSvg />
            </button>
          </div>

          {[
            { label: "Street", value: registeredUser?.address?.street },
            { label: "City", value: registeredUser?.address?.city },
            { label: "State", value: registeredUser?.address?.state },
            { label: "ZIP Code", value: registeredUser?.address?.zipCode },
            { label: "Country", value: registeredUser?.address?.country },
          ].map((item, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {item.label}
              </span>
              <span className="text-sm md:text-base text-zinc-700 dark:text-zinc-300">
                {item.value || "Not provided"}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Details */}
        <div className="w-full p-4 bg-zinc-100/90 dark:bg-zinc-900/50 rounded-xl flex flex-col gap-3">
          <h2 className="text-lg md:text-xl font-semibold text-zinc-700 dark:text-zinc-300 pb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
            Account Details
          </h2>

          {[
            {
              label: "Auth Provider",
              value: registeredUser?.authProvider || "Local",
            },
            {
              label: "Member Since",
              value: formatDate(registeredUser?.createdAt),
            },
            {
              label: "Last Updated",
              value: formatDate(registeredUser?.updatedAt),
            },
            {
              label: "Billing Cycle",
              value: `${formatDate(
                registeredUser?.billingCycleStart
              )} - ${formatDate(registeredUser?.billingCycleEnd)}`,
            },
            {
              label: "User Role",
              value: (registeredUser?.role || "User").toUpperCase(),
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-zinc-200/80 dark:border-zinc-800/80 last:border-none"
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {item.label}
                </span>
                <span className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- UPDATE MANAGER ---------------- */}
      {(isFullNameUpdateModalOpen ||
        isPhoneNumberUpdateModalOpen ||
        isAddressUpdateModalOpen) && <UpdateManager />}
    </div>
  );
};

export default ProfilePage;