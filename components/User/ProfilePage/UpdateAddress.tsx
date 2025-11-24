import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CancelSvg, SaveSvg } from "@/components/Svg/UserPageSvg";
import { useUser } from "@/hooks/userHooks/user.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useFadeModal } from "@/hooks/animateHooks/useFads.hooks";
import Input from "@/components/Layouts/Input/Input";
import AuthErrorAlert from "../../Layouts/ErrorLayout/AuthError";
import Spinner from "@/components/Layouts/Loaders/Spinner";

const addressSchema = z.object({
  street: z.string().min(3, "Street address required").max(100),
  city: z.string().min(2, "City required").max(50),
  state: z.string().min(2, "State required").max(50),
  zipCode: z.string().min(3, "Zip Code required").max(10),
  country: z.string().min(2, "Country required").max(50),
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

  const closeModal = () => {
    setAddressUpdateModalOpen(false);
    clearError();
  };

  const { fadeState, handleAnimatedClose } = useFadeModal(closeModal);

  const onSubmit = async (data: AddressFormData) => {
    const success = await updateAddress(data);
    if (success) handleAnimatedClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${fadeState}`}>
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transform transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Update Location</h2>
            <p className="text-xs text-zinc-500">Billing and shipping details.</p>
          </div>
          <button
            onClick={handleAnimatedClose}
            disabled={isUpdatingAddress}
            className="p-1 w-5 h-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <CancelSvg />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          
          <Input
            label="Street Address"
            type="text"
            placeholder="e.g. 123 Innovation Blvd"
            register={register("street")}
            error={errors.street}
            disabled={isUpdatingAddress}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              type="text"
              placeholder="New York"
              register={register("city")}
              error={errors.city}
              disabled={isUpdatingAddress}
            />
            <Input
              label="State / Province"
              type="text"
              placeholder="NY"
              register={register("state")}
              error={errors.state}
              disabled={isUpdatingAddress}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ZIP / Postal Code"
              type="text"
              placeholder="10001"
              register={register("zipCode")}
              error={errors.zipCode}
              disabled={isUpdatingAddress}
            />
            <Input
              label="Country"
              type="text"
              placeholder="United States"
              register={register("country")}
              error={errors.country}
              disabled={isUpdatingAddress}
            />
          </div>

          {userError && (
            <AuthErrorAlert message={userError} onClose={clearError} />
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2">
            <button
              type="button"
              onClick={handleAnimatedClose}
              disabled={isUpdatingAddress}
              className="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdatingAddress}
              className="flex-1 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {isUpdatingAddress ? <Spinner size="sm" /> : (
                <div className="w-5 h-5 p-1">
                  <SaveSvg />
                </div>
              )}
              {isUpdatingAddress ? "Updating..." : "Update"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UpdateAddress;