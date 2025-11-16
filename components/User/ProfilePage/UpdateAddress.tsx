import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/hooks/userHooks/user.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { CancelSvg } from "../../Svg/UserPageSvg";
import Input from "../../Layouts/Input/Input";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import AuthErrorAlert from "../../Layouts/ErrorLayout/AuthError";

const addressSchema = z.object({
  street: z.string().min(3, "Street must be at least 3 characters").max(100, "Street too long"),
  city: z.string().min(2, "City must be at least 2 characters").max(50, "City too long"),
  state: z.string().min(2, "State must be at least 2 characters").max(50, "State too long"),
  zipCode: z.string().min(3, "ZIP code must be at least 3 characters").max(10, "ZIP code too long"),
  country: z.string().min(2, "Country must be at least 2 characters").max(50, "Country too long"),
});

type AddressFormData = z.infer<typeof addressSchema>;

const UpdateAddress = () => {
  const { updateAddress, isUpdatingAddress, userError, clearError, user } = useUser();
  const { setAddressUpdateModalOpen } = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      country: user?.address?.country || "",
    },
  });

  const handleClose = () => {
    setAddressUpdateModalOpen(false);
    clearError();
  };

  const onSubmit = async (data: AddressFormData) => {
    const success = await updateAddress(data);
    if (success) {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
            Update Address
          </h2>
          <button
            onClick={handleClose}
            disabled={isUpdatingAddress}
            className="w-8 h-8 p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <CancelSvg />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* Street */}
          <Input
            label="Street Address"
            type="text"
            placeholder="123 Main St"
            register={register("street")}
            error={errors.street}
            disabled={isUpdatingAddress}
          />

          {/* City & State */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              type="text"
              placeholder="New York"
              register={register("city")}
              error={errors.city}
              disabled={isUpdatingAddress}
            />
            <Input
              label="State"
              type="text"
              placeholder="NY"
              register={register("state")}
              error={errors.state}
              disabled={isUpdatingAddress}
            />
          </div>

          {/* ZIP & Country */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="ZIP Code"
              type="text"
              placeholder="10001"
              register={register("zipCode")}
              error={errors.zipCode}
              disabled={isUpdatingAddress}
            />
            <Input
              label="Country"
              type="text"
              placeholder="USA"
              register={register("country")}
              error={errors.country}
              disabled={isUpdatingAddress}
            />
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
              disabled={isUpdatingAddress}
              className="flex-1 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingAddress}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isUpdatingAddress ? (
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

export default UpdateAddress;