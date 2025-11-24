// components/Authentication/TwoFactorVerifyModal.tsx

import { useState } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import Spinner from "../Layouts/Loaders/Spinner";
import AuthErrorAlert from "../Layouts/ErrorLayout/AuthError";
import { Lock } from "../Svg/HomeSvg";

interface TwoFactorVerifyModalProps {
  tempToken: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const TwoFactorVerifyModal = ({
  tempToken,
  onSuccess,
  onCancel,
}: TwoFactorVerifyModalProps) => {
  const { verify2FA, error, isLoading, clearError } = useAuth();

  const [totpCode, setTotpCode] = useState("");
  const [isBackupCode, setIsBackupCode] = useState(false);
  const [codeError, setCodeError] = useState("");

  const resetErrors = () => {
    setCodeError("");
    clearError();
  };

  const handleVerify = async () => {
    resetErrors();

    if (!totpCode.trim()) {
      setCodeError("Please enter the verification code");
      return;
    }

    if (!isBackupCode && totpCode.length !== 6) {
      setCodeError("Code must be 6 digits");
      return;
    }

    try {
      const success = await verify2FA({
        tempToken,
        totpCode: totpCode.trim(),
        isBackupCode,
      });

      if (success) onSuccess();
    } catch (err) {
      console.error("2FA verification error:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) handleVerify();
  };

  const toggleBackupMode = () => {
    setIsBackupCode(!isBackupCode);
    setTotpCode("");
    resetErrors();
  };

  const inputBorderClass = codeError || error
    ? "border-red-400 dark:border-red-500"
    : "border-zinc-200 dark:border-zinc-700";

  return (
    <div className="w-full md:w-[480px] md:p-6 p-4 md:bg-zinc-100/50 dark:md:bg-zinc-900/50 md:rounded-2xl">
      <div className="space-y-6">
        
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-3 w-16 h-16 rounded-2xl bg-linear-to-br from-light/10 to-light/5 dark:from-dark/10 dark:to-dark/5 mb-2 text-light dark:text-dark">
            <Lock />
          </div>

          <h2 className="text-xl font-semibold leading-none bg-linear-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
            Two-Factor Authentication
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
            {isBackupCode
              ? "Enter one of your backup codes to verify your identity"
              : "Enter the 6-digit code from your authenticator app"}
          </p>
        </div>

        {/* INPUT */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {isBackupCode ? "Backup Code" : "Authentication Code"}
          </label>

          <div className="relative">
            <input
              type="text"
              value={totpCode}
              onChange={(e) => {
                setTotpCode(e.target.value);
                resetErrors();
              }}
              onKeyPress={handleKeyPress}
              placeholder={isBackupCode ? "XXXXXXXX" : "000000"}
              className={`w-full px-6 py-1 bg-zinc-50 dark:bg-zinc-800/50 border-2 ${inputBorderClass} 
              rounded-xl focus:outline-none focus:ring-4 focus:ring-light/20 dark:focus:ring-dark/20 
              focus:border-light dark:focus:border-dark text-zinc-900 dark:text-zinc-100 text-center 
              text-2xl font-mono tracking-[0.5em] transition-all duration-200`}
              maxLength={isBackupCode ? 20 : 6}
              autoFocus
              disabled={isLoading}
            />
          </div>

          {codeError && (
            <p className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {codeError}
            </p>
          )}
        </div>

        {/* BACKUP TOGGLE */}
        <div className="flex justify-center">
          <button
            onClick={toggleBackupMode}
            className="text-sm font-medium text-light dark:text-dark hover:text-light/80 dark:hover:text-dark/80 transition-colors flex items-center gap-2 group"
            disabled={isLoading}
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            {isBackupCode
              ? "Use authenticator code instead"
              : "Use backup code instead"}
          </button>
        </div>

        {/* API ERROR */}
        {error && <AuthErrorAlert message={error} onClose={clearError} />}

        {/* BUTTONS */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="flex-1 px-6 py-2 bg-linear-to-r from-light to-light/90 hover:from-light/90 hover:to-light/80 dark:from-dark dark:to-dark/90 dark:hover:from-dark/90 dark:hover:to-dark/80 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner color="text-white" size="sm" />
                Verifying...
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Can't access your authenticator? Contact support for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorVerifyModal;
