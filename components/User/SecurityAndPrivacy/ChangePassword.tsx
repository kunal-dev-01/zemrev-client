import Input from "@/components/Layouts/Input/Input";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "@/hooks/userHooks/user.hooks";
import { useFadeModal } from "@/hooks/animateHooks/useFads.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";

import AuthErrorAlert from "@/components/Layouts/ErrorLayout/AuthError";
import { CancelSvg } from "@/components/Svg/CommonSvg";

/* -----------------------------------------
   ZOD SCHEMA
------------------------------------------ */
const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters")
});

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

/* -----------------------------------------
   COMPONENT
------------------------------------------ */
const ChangePassword = () => {
  const { updatePassword, isUpdatingPassword, userError, clearError } = useUser();
  const { setChangePasswordModalOpen } = useLoginModal();

  const closeModal = () => {
    setChangePasswordModalOpen(false);
    clearError();
  };

  // Fade animation
  const { fadeState, handleAnimatedClose } = useFadeModal(closeModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  /* -----------------------------------------
     Submit Handler
  ------------------------------------------ */
  const onSubmit = async (data: ChangePasswordSchema) => {
    const success = await updatePassword(data.oldPassword, data.newPassword);
    if (success) handleAnimatedClose();
  };

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center 
      dark:bg-black/50 bg-white/50 backdrop-blur-sm p-4 ${fadeState}`}
    >
      <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            Change Password
          </h2>

          <button
            onClick={handleAnimatedClose}
            disabled={isUpdatingPassword}
            className="w-8 h-8 p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <CancelSvg />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">

          <Input
            label="Current Password"
            type="password"
            placeholder="Enter your current password"
            register={register("oldPassword")}
            error={errors.oldPassword}
            disabled={isUpdatingPassword}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            register={register("newPassword")}
            error={errors.newPassword}
            disabled={isUpdatingPassword}
          />

          {/* Requirements Box */}
          <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 p-2 rounded-lg">
            <p className="font-semibold mb-1">Password Requirements:</p>
            <ul className="space-y-1">
              <li>• Must be at least 6 characters</li>
              <li>• Use a strong combination of characters</li>
              <li>• Avoid using previously used passwords</li>
            </ul>
          </div>

          {/* Error */}
          {userError && (
            <AuthErrorAlert message={userError} onClose={clearError} />
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleAnimatedClose}
              disabled={isUpdatingPassword}
              className="flex-1 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 
              text-zinc-700 dark:text-zinc-200 rounded-lg font-medium 
              hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="flex-1 px-4 py-2 bg-light dark:bg-dark text-white 
              rounded-lg font-medium hover:bg-light/80 dark:hover:bg-dark/80 
              transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isUpdatingPassword ? (
                <>
                  <Spinner size="sm" color="text-white" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
