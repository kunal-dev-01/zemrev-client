import Input from "@/components/Layouts/Input/Input";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import AuthErrorAlert from "@/components/Layouts/ErrorLayout/AuthError";
import { CancelSvg } from "@/components/Svg/UserPageSvg";

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

const disableSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  totpCode: z.string().optional(),
});

/* ---------------------------------------------------
   TYPES
----------------------------------------------------- */
type VerifySchema = z.infer<typeof verifySchema>;
type DisableSchema = z.infer<typeof disableSchema>;

/* ---------------------------------------------------
   COMPONENT
----------------------------------------------------- */
const TwoFA = () => {
  const {
    setup2FA,
    enable2FA,
    disable2FA,
    regenerateBackupCodes,
    isLoading,
    is2FAEnabled,
    backupCodesRemaining,
    refresh2FAStatus,
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

  const [mode, setMode] = useState<
    "initial" | "setup" | "verify" | "enabled" | "disable"
  >(is2FAEnabled ? "enabled" : "initial");

  /* ---------------------------------------------------
     FORMS
  ----------------------------------------------------- */
  const {
    register: regVerify,
    handleSubmit: submitVerify,
    formState: { errors: verifyErrors },
  } = useForm<VerifySchema>({
    resolver: zodResolver(verifySchema),
  });

  const {
    register: regDisable,
    handleSubmit: submitDisable,
    formState: { errors: disableErrors },
  } = useForm<DisableSchema>({
    resolver: zodResolver(disableSchema),
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
      await refresh2FAStatus();
      setMode("enabled");
    }
  };

  const handleDisable = async (data: DisableSchema) => {
    const success = await disable2FA(data.password, data.totpCode);
    if (success) {
      await refresh2FAStatus();
      setMode("initial");
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
                Add an extra layer of security by enabling 2FA.
              </p>

              <button
                onClick={handleStartSetup}
                disabled={isLoading}
                className="w-full py-2 bg-light dark:bg-dark text-white rounded-lg font-medium hover:opacity-90 transition"
              >
                {isLoading ? <Spinner size="sm" color="text-white" /> : "Set up 2FA"}
              </button>
            </div>
          </>
        )}

        {/* =====================================================
             MODE: SETUP (QR + BACKUP CODES)
        ======================================================= */}
        {mode === "setup" && setupData && (
          <>
            {renderHeader("Set Up 2FA")}

            <div className="p-4 space-y-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Scan the QR code using Google Authenticator, Authy, or any OTP app.
              </p>

              <div className="flex justify-center">
                <img
                  src={setupData.qrCode}
                  className="w-48 h-48 border rounded-lg"
                  alt="QR Code"
                />
              </div>

              <div className="text-xs p-2 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg">
                <p className="font-medium">Manual Key:</p>
                <p className="break-all mt-1">{setupData.manualEntryKey}</p>
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
            {renderHeader("Verify 2FA")}

            <form onSubmit={submitVerify(handleVerify)} className="p-4 space-y-4">
              <Input
                label="6-digit Code"
                type="text"
                placeholder="Enter OTP"
                register={regVerify("totpCode")}
                error={verifyErrors.totpCode}
                disabled={isLoading}
              />

              {verifyErrors.totpCode && <p className="text-red-500 text-xs">{verifyErrors.totpCode.message}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-light dark:bg-dark text-white rounded-lg hover:opacity-90 transition"
              >
                {isLoading ? "Verifying..." : "Enable"}
              </button>
            </form>
          </>
        )}

        {/* =====================================================
             MODE: ENABLED (SHOW BACKUP CODES)
        ======================================================= */}
        {mode === "enabled" && (
          <>
            {renderHeader("2FA Enabled")}

            <div className="p-4 space-y-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Two-Factor Authentication is currently active.
              </p>

              <p className="text-xs text-zinc-500">
                Backup codes remaining: <strong>{backupCodesRemaining}</strong>
              </p>

              <button
                onClick={() => setMode("disable")}
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition"
              >
                Disable 2FA
              </button>
            </div>
          </>
        )}

        {/* =====================================================
             MODE: DISABLE (PASSWORD + OPTIONAL OTP)
        ======================================================= */}
        {mode === "disable" && (
          <>
            {renderHeader("Disable 2FA")}

            <form onSubmit={submitDisable(handleDisable)} className="p-4 space-y-4">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                register={regDisable("password")}
                error={disableErrors.password}
                disabled={isLoading}
              />

              <Input
                label="2FA Code (optional)"
                type="text"
                placeholder="Enter code"
                register={regDisable("totpCode")}
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition"
              >
                {isLoading ? "Disabling..." : "Disable 2FA"}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default TwoFA;
