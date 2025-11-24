import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Components
import { CancelSvg, SaveSvg } from "@/components/Svg/CommonSvg";
import Input from "@/components/Layouts/Input/Input";
import AuthErrorAlert from "../../Layouts/ErrorLayout/AuthError";
import Spinner from "@/components/Layouts/Loaders/Spinner";

// Hooks
import { useUser } from "@/hooks/userHooks/user.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useFadeModal } from "@/hooks/animateHooks/useFads.hooks";

/* ---------------------- Schema ---------------------- */
const addressSchema = z.object({
  street: z.string().min(3, "Street address required").max(100),
  city: z.string().min(2, "City required").max(50),
  state: z.string().min(2, "State required").max(50),
  zipCode: z.string().min(3, "Zip Code required").max(10),
  country: z.string().min(2, "Country required").max(50),
});

type AddressFormData = z.infer<typeof addressSchema>;

/* ---------------------- Component ---------------------- */
const UpdateAddress = () => {
  const { updateAddress, isUpdatingAddress, userError, clearError, user } = useUser();
  const { setAddressUpdateModalOpen } = useLoginModal();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      country: user?.address?.country || "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const closeModal = () => {
    clearError();
    setAddressUpdateModalOpen(false);
  };

  const { fadeState, handleAnimatedClose } = useFadeModal(closeModal);

  /* ---------------------- Submit ---------------------- */
  const onSubmit = async (data: AddressFormData) => {
    const ok = await updateAddress(data);
    if (ok) handleAnimatedClose();
  };

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 
        dark:bg-black/50 bg-white/50 backdrop-blur-sm transition-opacity duration-300 ${fadeState}`}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl
        border border-zinc-200 dark:border-zinc-800 overflow-hidden 
        transform transition-all duration-300"
      >
        {/* Header */}
        <div className="w-full flex flex-col items-center px-5 py-3">
          <h2 className="text-lg font-bold text-zinc-700 dark:text-zinc-200">
            Update Address
          </h2>
          <div className="h-1 w-[80%] bg-zinc-800 mt-2 rounded-xl" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">

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
          <div
            className="flex gap-3 pt-4 border-t border-zinc-100 
            dark:border-zinc-800 mt-2"
          >
            <button
              type="button"
              onClick={handleAnimatedClose}
              disabled={isUpdatingAddress}
              className="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 
                text-zinc-700 dark:text-zinc-200 rounded-lg text-sm font-medium 
                hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdatingAddress}
              className="flex-1 px-4 py-2.5 bg-light dark:bg-dark text-white 
              rounded-lg text-sm font-medium hover:bg-light/80 
              dark:hover:bg-dark/80 transition-all duration-150 
              flex items-center justify-center gap-2"
            >
              {isUpdatingAddress ? (
                <>
                  <Spinner size="sm" />
                  Updating...
                </>
              ) : (
                <>
                  <div className="w-5 h-5 text-white">
                    <SaveSvg />
                  </div>
                  Update
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;
