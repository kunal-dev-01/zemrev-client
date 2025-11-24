import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Components
import { SaveSvg } from "@/components/Svg/CommonSvg";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import Input from "@/components/Layouts/Input/Input";
import AuthErrorAlert from "../../Layouts/ErrorLayout/AuthError";

// Hooks
import { useUser } from "@/hooks/userHooks/user.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useFadeModal } from "@/hooks/animateHooks/useFads.hooks";

/* ---------------------- Schema ---------------------- */
const fullNameSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed")
    .refine((v) => v.trim().includes(" "), "Please enter first and last name"),
});

type FullNameFormData = z.infer<typeof fullNameSchema>;

/* ------------------ Component ------------------ */
const UpdateFullName = () => {
  const { updateFullName, isUpdatingName, userError, clearError, user } = useUser();
  const { setFullNameUpdateModalOpen } = useLoginModal();

  const closeModal = () => {
    clearError();
    setFullNameUpdateModalOpen(false);
  };

  const { fadeState, handleAnimatedClose } = useFadeModal(closeModal);

  const form = useForm<FullNameFormData>({
    resolver: zodResolver(fullNameSchema),
    defaultValues: { fullName: user?.fullName || "" },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  /* ------------------ Submit ------------------ */
  const onSubmit = async ({ fullName }: FullNameFormData) => {
    const ok = await updateFullName(fullName);
    if (ok) handleAnimatedClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 
        bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${fadeState}`}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl 
        border border-zinc-200 dark:border-zinc-800 overflow-hidden 
        transform transition-all duration-300"
      >
        {/* Header */}
        <div className="w-full flex flex-col items-center px-5 py-3">
          <h2 className="text-lg font-bold text-zinc-700 dark:text-zinc-200">
            Update Identity
          </h2>
          <div className="h-1 w-[80%] bg-zinc-800 mt-2 rounded-xl" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="e.g. Jane Doe"
            register={register("fullName")}
            error={errors.fullName}
            disabled={isUpdatingName}
          />

          {/* Info Box */}
          <div
            className="p-3 bg-blue-50 dark:bg-blue-900/10 border 
            border-blue-100 dark:border-blue-900/20 rounded-lg text-xs 
            text-blue-700 dark:text-blue-400"
          >
            Ensure your name matches your government ID for verification purposes.
          </div>

          {userError && <AuthErrorAlert message={userError} onClose={clearError} />}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleAnimatedClose}
              disabled={isUpdatingName}
              className="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 
              text-zinc-700 dark:text-zinc-200 rounded-lg text-sm font-medium 
              hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdatingName}
              className="flex-1 px-4 py-2.5 bg-light dark:bg-dark text-white 
              rounded-lg text-sm font-medium hover:bg-light/80 
              dark:hover:bg-dark/80 transition-all duration-150 
              flex items-center justify-center gap-2"
            >
              {isUpdatingName ? (
                <>
                  <Spinner color="text-white" size="sm" />
                  Saving...
                </>
              ) : (
                <>
                  <div className="w-5 h-5 text-white">
                    <SaveSvg />
                  </div>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFullName;
