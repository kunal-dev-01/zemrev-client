// components/Authentication/ResendVerifyEmail.tsx

import { useState, useEffect } from "react";
import Spinner from "../Layouts/Loaders/Spinner";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useAuthVerify } from "@/hooks/authHooks/auth.verify.hooks";
import AuthErrorAlert from "../Layouts/ErrorLayout/AuthError";
import { EmailSvg, CheckSvg } from "../Svg/CommonSvg";

interface ResendVerifyEmailProps {
  email: string;
}

const ResendVerifyEmail = ({ email }: ResendVerifyEmailProps) => {
  const { error, clearError } = useAuth();
  const { resendVerifyEmail } = useAuthVerify();

  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // ==================== COUNTDOWN TIMER ====================
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // ==================== RESEND EMAIL HANDLER ====================
  const handleResendEmail = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setResendSuccess(false);
    clearError();

    const success = await resendVerifyEmail({ email });

    if (success) {
      setResendSuccess(true);
      setCountdown(60);
      setCanResend(false);

      // Hide success message after 5 seconds
      setTimeout(() => setResendSuccess(false), 5000);
    }

    setIsResending(false);
  };

  return (
    <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center">
      <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl text-center">
        {/* Email Icon */}
        <div className="mb-6 w-20 h-20 mx-auto text-light dark:text-dark">
          <EmailSvg />
        </div>

        {/* Title */}
        <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
          Verify Your Email
        </h2>

        {/* Description */}
        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-6">
          We've sent a verification email to
          <span className="block font-semibold text-zinc-700 dark:text-zinc-300 mt-1">
            {email}
          </span>
        </p>

        {/* Instructions */}
        <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-4 mb-6 text-left">
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            📧 <strong>Check your inbox</strong> and click the verification link
            to activate your account.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
            💡 Don't see it? Check your spam folder.
          </p>
        </div>

        {/* Success Message */}
        {resendSuccess && (
          <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg p-3 mb-4 animate-fade-in">
            <p className="text-green-700 dark:text-green-400 text-sm font-medium flex items-center gap-2">
              <span className="w-6 h-6 text-emerald-400">
                <CheckSvg />
              </span>{" "}
              Verification email sent successfully!
            </p>
          </div>
        )}

        {/* Resend Button */}
        <button
          onClick={handleResendEmail}
          disabled={!canResend || isResending}
          className="w-full bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {isResending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner color="text-white" size="sm" /> Sending...
            </div>
          ) : canResend ? (
            "Resend Verification Email"
          ) : (
            `Resend in ${countdown}s`
          )}
        </button>

        {error && <AuthErrorAlert message={error} onClose={clearError} />}

        {/* Back to Login */}
        <div className="py-2 border border-zinc-300 dark:border-zinc-800 rounded-lg">
          <a
            href="/auth/login"
            className="text-zinc-500 dark:text-zinc-400 text-sm hover:text-light dark:hover:text-dark transition-colors"
          >
            Back to Login
          </a>
        </div>

        {/* Additional Help */}
        <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-6">
          Having trouble? Contact{" "}
          <a
            href="mailto:contact@zemrev.com"
            className="text-light dark:text-dark hover:underline"
          >
            contact@zemrev.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResendVerifyEmail;
