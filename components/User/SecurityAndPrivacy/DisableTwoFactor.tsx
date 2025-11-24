import Input from "@/components/Layouts/Input/Input";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import { CancelSvg } from "@/components/Svg/CommonSvg";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTwoFactor } from "@/hooks/authHooks/twoFactor.hooks";
import { useFadeModal } from "@/hooks/animateHooks/useFads.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";

const disableSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  totpCode: z.string().optional(),
});

type DisableSchema = z.infer<typeof disableSchema>;

const DisableTwoFactor = () => {
  const { disable2FA, isLoading } = useTwoFactor();
  const { setTwoFactorDisabledModalOpen } = useLoginModal();

  const closeModal = () => setTwoFactorDisabledModalOpen(false);
  const { fadeState, handleAnimatedClose } = useFadeModal(closeModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DisableSchema>({
    resolver: zodResolver(disableSchema),
  });

  const handleDisable = async (data: DisableSchema) => {
    const success = await disable2FA(data.password, data.totpCode);
    if (success) {
      closeModal();
    }
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
            Disable Two-Factor Authentication
          </h2>
          <button
            onClick={handleAnimatedClose}
            className="w-8 h-8 p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <CancelSvg />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleDisable)} className="p-4 space-y-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your password to disable 2FA. You can optionally provide your current 2FA code for additional verification.
          </p>

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password")}
            error={errors.password}
            disabled={isLoading}
          />

          <Input
            label="2FA Code"
            type="text"
            placeholder="Enter 6-digit code"
            register={register("totpCode")}
            error={errors.totpCode}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-red-600 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? <Spinner size="sm" color="text-white" /> : "Disable 2FA"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DisableTwoFactor;