// components/Authentication/TwoFactorVerifyModal.tsx

import { useState } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import Spinner from "../Layouts/Loaders/Spinner";
import AuthErrorAlert from "../Layouts/ErrorLayout/AuthError";

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
  const [codeError, setCodeError] = useState<string>("");

  const handleVerify = async () => {
    // Clear previous errors
    clearError();
    setCodeError("");

    // Validate input
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

      if (success) {
        onSuccess();
      }
    } catch (err) {
      console.error("2FA verification error:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleVerify();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border-2 border-zinc-200 dark:border-zinc-800 p-6 space-y-6">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
            Two-Factor Authentication
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
            {isBackupCode
              ? "Enter one of your backup codes"
              : "Enter the 6-digit code from your authenticator app"}
          </p>
        </div>

        {/* CODE INPUT */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {isBackupCode ? "Backup Code" : "Authentication Code"}
          </label>
          <input
            type="text"
            value={totpCode}
            onChange={(e) => {
              setTotpCode(e.target.value);
              setCodeError("");
              clearError();
            }}
            onKeyPress={handleKeyPress}
            placeholder={isBackupCode ? "XXXXXXXX" : "000000"}
            className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-light dark:focus:ring-dark text-zinc-900 dark:text-zinc-100 text-center text-lg tracking-widest"
            maxLength={isBackupCode ? 20 : 6}
            autoFocus
            disabled={isLoading}
          />
          {codeError && (
            <p className="text-red-500 text-sm mt-1">{codeError}</p>
          )}
        </div>

        {/* TOGGLE BACKUP CODE */}
        <button
          onClick={() => {
            setIsBackupCode(!isBackupCode);
            setTotpCode("");
            setCodeError("");
            clearError();
          }}
          className="text-sm text-light dark:text-dark hover:underline"
          disabled={isLoading}
        >
          {isBackupCode
            ? "Use authenticator code instead"
            : "Use backup code instead"}
        </button>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-light hover:bg-light/80 dark:bg-dark dark:hover:bg-dark/80 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner color="text-white" size="sm" />
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </div>

        {error && <AuthErrorAlert message={error} onClose={clearError} />}

        {/* INFO */}
        <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
          Can't access your authenticator? Contact support for assistance.
        </p>
      </div>
    </div>
  );
};

export default TwoFactorVerifyModal;
