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
/* ---------------------------------------------------
   ZOD SCHEMAS
----------------------------------------------------- */
const verifySchema = z.object({
  totpCode: z.string().min(6, "Enter a valid 6-digit code"),
});

/* ---------------------------------------------------
   TYPES
----------------------------------------------------- */
type VerifySchema = z.infer<typeof verifySchema>;

/* ---------------------------------------------------
   COMPONENT
----------------------------------------------------- */
const TwoFA = () => {
  const {
    setup2FA,
    enable2FA,
    isLoading,
  } = useTwoFactor();

  const { setTwoFactorModalOpen } = useLoginModal();

  const closeModal = () => setTwoFactorModalOpen(false);
  const { fadeState, handleAnimatedClose } = useFadeModal(closeModal);

  const [setupData, setSetupData] = useState<{
    secret: string;
    qrCode: string;
    manualEntryKey: string;
    backupCodes: string[];
  } | null>(null);

  const [mode, setMode] = useState<"initial" | "setup" | "verify" | "success">("initial");

  /* ---------------------------------------------------
     FORM
  ----------------------------------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifySchema>({
    resolver: zodResolver(verifySchema),
  });

  /* ---------------------------------------------------
     HANDLERS
  ----------------------------------------------------- */
  const handleStartSetup = async () => {
    const result = await setup2FA();
    if (result.success && result.data) {
      setSetupData(result.data);
      setMode("setup");
    }
  };

  const handleVerify = async (data: VerifySchema) => {
    const success = await enable2FA(data.totpCode);
    if (success) {
      setMode("success");
    }
  };

  const handleCopyAll = () => {
    if (setupData?.backupCodes) {
      navigator.clipboard.writeText(setupData.backupCodes.join("\n"));
    }
  };

  /* ---------------------------------------------------
     UI BLOCKS
  ----------------------------------------------------- */
  const renderHeader = (title: string) => (
    <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
      <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">{title}</h2>
      <button
        onClick={handleAnimatedClose}
        className="w-8 h-8 p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
      >
        <CancelSvg />
      </button>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center 
      dark:bg-black/50 bg-white/50 backdrop-blur-sm p-4 ${fadeState}`}
    >
      <div className="w-full max-w-md bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg">

        {/* =====================================================
             MODE: INITIAL (ENABLE 2FA)
        ======================================================= */}
        {mode === "initial" && (
          <>
            {renderHeader("Enable Two-Factor Authentication")}

            <div className="p-4 space-y-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Add an extra layer of security to your account by enabling two-factor authentication. You'll need an authenticator app like Google Authenticator or Authy.
              </p>

              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 You'll receive backup codes that can be used if you lose access to your authenticator app.
                </p>
              </div>

              <button
                onClick={handleStartSetup}
                disabled={isLoading}
                className="w-full py-2 bg-light dark:bg-dark text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {isLoading ? <Spinner size="sm" color="text-white" /> : "Set up 2FA"}
              </button>
            </div>
          </>
        )}

        {/* =====================================================
             MODE: SETUP (QR CODE)
        ======================================================= */}
        {mode === "setup" && setupData && (
          <>
            {renderHeader("Scan QR Code")}

            <div className="p-4 space-y-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Scan this QR code using your authenticator app (Google Authenticator, Authy, etc.)
              </p>

              <div className="flex justify-center">
                <img
                  src={setupData.qrCode}
                  className="w-48 h-48 border border-zinc-300 dark:border-zinc-700 rounded-lg"
                  alt="QR Code"
                />
              </div>

              <div className="text-xs p-3 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg border border-zinc-300 dark:border-zinc-700">
                <p className="font-medium text-zinc-700 dark:text-zinc-300 mb-1">Manual Entry Key:</p>
                <p className="break-all text-zinc-600 dark:text-zinc-400 font-mono">{setupData.manualEntryKey}</p>
              </div>

              <button
                onClick={() => setMode("verify")}
                className="w-full py-2 bg-light dark:bg-dark text-white rounded-lg font-medium hover:opacity-90 transition"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* =====================================================
             MODE: VERIFY OTP
        ======================================================= */}
        {mode === "verify" && (
          <>
            {renderHeader("Verify 2FA Code")}

            <form onSubmit={handleSubmit(handleVerify)} className="p-4 space-y-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Enter the 6-digit code from your authenticator app to complete setup.
              </p>

              <Input
                label="6-digit Code"
                type="text"
                placeholder="Enter OTP"
                register={register("totpCode")}
                error={errors.totpCode}
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-light dark:bg-dark text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {isLoading ? <Spinner size="sm" color="text-white" /> : "Enable 2FA"}
              </button>
            </form>
          </>
        )}

        {/* =====================================================
             MODE: SUCCESS (SHOW BACKUP CODES)
        ======================================================= */}
        {mode === "success" && setupData && (
          <>
            {renderHeader("2FA Enabled Successfully")}

            <div className="p-4 space-y-4">
              {/* Success Message */}
              <div className="flex items-center gap-3 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="w-6 h-6 text-emerald-400">
                  <CheckSvg />
                </div>
                <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                  Two-Factor Authentication is now enabled!
                </p>
              </div>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Save these backup codes in a secure location. Each code can only be used once to access your account if you lose your authenticator device.
              </p>

              {/* Backup Codes Display */}
              <div className="bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Your Backup Codes:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {setupData.backupCodes.map((code, index) => (
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
          </>
        )}

      </div>
    </div>
  );
};

export default TwoFA;