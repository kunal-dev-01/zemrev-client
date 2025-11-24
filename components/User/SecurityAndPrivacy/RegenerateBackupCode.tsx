import Input from "@/components/Layouts/Input/Input";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import { CancelSvg, CheckSvg } from "@/components/Svg/CommonSvg";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTwoFactor } from "@/hooks/authHooks/twoFactor.hooks";
import { useFadeModal } from "@/hooks/animateHooks/useFads.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";
import { useState } from "react";


const regenerateSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegenerateSchema = z.infer<typeof regenerateSchema>;

const RegenerateBackupCode = () => {
  const { regenerateBackupCodes, isLoading } = useTwoFactor();
  const { setRegenerateModalOpen } = useLoginModal();
  const [backupCodes, setBackupCodes] = useState<string[] | null>(null);

  const closeModal = () => {
    setBackupCodes(null);
    setRegenerateModalOpen(false);
  };
  const { fadeState, handleAnimatedClose } = useFadeModal(closeModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegenerateSchema>({
    resolver: zodResolver(regenerateSchema),
  });

  const handleRegenerate = async (data: RegenerateSchema) => {
    const result = await regenerateBackupCodes(data.password);
    if (result.success && result.backupCodes) {
      setBackupCodes(result.backupCodes);
    }
  };

  const handleCopyAll = () => {
    if (backupCodes) {
      navigator.clipboard.writeText(backupCodes.join("\n"));
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
            {backupCodes ? "Your New Backup Codes" : "Regenerate Backup Codes"}
          </h2>
          <button
            onClick={handleAnimatedClose}
            className="w-8 h-8 p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <CancelSvg />
          </button>
        </div>

        {/* Content */}
        {!backupCodes ? (
          <form onSubmit={handleSubmit(handleRegenerate)} className="p-4 space-y-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Warning: This will invalidate all your existing backup codes. Make sure to save the new ones securely.
              </p>
            </div>

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              register={register("password")}
              error={errors.password}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-light dark:bg-dark text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? <Spinner size="sm" color="text-white" /> : "Generate New Codes"}
            </button>
          </form>
        ) : (
          <div className="p-4 space-y-4">
            {/* Success Message */}
            <div className="flex items-center gap-3 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="w-6 h-6 text-green-600 dark:text-green-400">
                <CheckSvg />
              </div>
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                Backup codes regenerated successfully!
              </p>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Save these codes in a secure location. Each code can only be used once to access your account if you lose your authenticator device.
            </p>

            {/* Backup Codes Display */}
            <div className="bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-300 dark:border-zinc-700 text-center font-mono text-sm"
                  >
                    {code}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleCopyAll}
                className="flex-1 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:opacity-90 transition"
              >
                Copy All
              </button>
              <button
                onClick={closeModal}
                className="flex-1 py-2 bg-light dark:bg-dark text-white rounded-lg font-medium hover:opacity-90 transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegenerateBackupCode;