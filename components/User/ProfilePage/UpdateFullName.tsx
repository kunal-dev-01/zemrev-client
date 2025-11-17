import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/hooks/userHooks/user.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { CancelSvg } from "../../Svg/UserPageSvg";
import Input from "../../Layouts/Input/Input";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import AuthErrorAlert from "../../Layouts/ErrorLayout/AuthError";

const fullNameSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .refine((val) => {
      // Count digits in the name
      const digitCount = (val.match(/\d/g) || []).length;
      return digitCount <= 2;
    }, "Name cannot contain more than 2 numbers")
    .refine((val) => {
      // Must have at least one space (first and last name)
      return val.trim().includes(" ");
    }, "Please enter both first and last name")
    .refine((val) => {
      // Each word should be at least 2 characters
      const words = val.trim().split(/\s+/);
      return words.every((word) => word.length >= 2);
    }, "Each name part must be at least 2 characters"),
});

type FullNameFormData = z.infer<typeof fullNameSchema>;

const UpdateFullName = () => {
  const { updateFullName, isUpdatingName, userError, clearError, user } = useUser();
  const { setFullNameUpdateModalOpen } = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullNameFormData>({
    resolver: zodResolver(fullNameSchema),
    defaultValues: {
      fullName: user?.fullName || "",
    },
  });

  const handleClose = () => {
    setFullNameUpdateModalOpen(false);
    clearError();
  };

  const onSubmit = async (data: FullNameFormData) => {
    const success = await updateFullName(data.fullName);
    if (success) {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center dark:bg-black/50 bg-white/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            Update Full Name
          </h2>
          <button
            onClick={handleClose}
            disabled={isUpdatingName}
            className="w-8 h-8 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <CancelSvg />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            register={register("fullName")}
            error={errors.fullName}
            disabled={isUpdatingName}
          />

          <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 p-2 rounded-lg">
            <p className="font-semibold mb-1">Requirements:</p>
            <ul className="space-y-0.5">
              <li>• Must include first and last name</li>
              <li>• Each name must be at least 2 characters</li>
              <li>• Only letters and spaces allowed</li>
              <li>• Maximum 2 numbers allowed (if needed)</li>
            </ul>
          </div>

          {/* Error Alert */}
          {userError && (
            <AuthErrorAlert message={userError} onClose={clearError} />
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUpdatingName}
              className="flex-1 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg font-medium hover:bg-zinc-200/70 dark:hover:bg-zinc-800/70 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingName}
              className="flex-1 px-4 py-2 bg-light dark:bg-dark text-white rounded-lg font-medium hover:bg-light/80 dark:hover:bg-dark/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isUpdatingName ? (
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

export default UpdateFullName;