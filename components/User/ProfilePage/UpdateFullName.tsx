import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CancelSvg, SaveSvg } from "@/components/Svg/CommonSvg";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import { useUser } from "@/hooks/userHooks/user.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useFadeModal } from "@/hooks/animateHooks/useFads.hooks";
import Input from "@/components/Layouts/Input/Input";
import AuthErrorAlert from "../../Layouts/ErrorLayout/AuthError";

/* --- Schema --- */
const fullNameSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed")
    .refine((val) => val.trim().includes(" "), "Please enter first and last name"),
});

type FullNameFormData = z.infer<typeof fullNameSchema>;

const UpdateFullName = () => {
  const { updateFullName, isUpdatingName, userError, clearError, user } = useUser();
  const { setFullNameUpdateModalOpen } = useLoginModal();

  const closeModal = () => {
    setFullNameUpdateModalOpen(false);
    clearError();
  };

  const { fadeState, handleAnimatedClose } = useFadeModal(closeModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullNameFormData>({
    resolver: zodResolver(fullNameSchema),
    defaultValues: { fullName: user?.fullName || "" },
  });

  const onSubmit = async (data: FullNameFormData) => {
    const success = await updateFullName(data.fullName);
    if (success) handleAnimatedClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${fadeState}`}>
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transform transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Update Identity</h2>
            <p className="text-xs text-zinc-500">How you appear to others.</p>
          </div>
          <button
            onClick={handleAnimatedClose}
            disabled={isUpdatingName}
            className="p-1 w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <CancelSvg />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="e.g. Jane Doe"
            register={register("fullName")}
            error={errors.fullName}
            disabled={isUpdatingName}
          />

          {/* Info Box */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-400">
             Ensure your name matches your government ID for verification purposes.
          </div>

          {userError && (
            <AuthErrorAlert message={userError} onClose={clearError} />
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleAnimatedClose}
              disabled={isUpdatingName}
              className="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingName}
              className="flex-1 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {isUpdatingName ? <Spinner size="sm" /> : (
                <div className="w-5 h-5 p-1">
                  <SaveSvg />
                </div>
              )}
              {isUpdatingName ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFullName;