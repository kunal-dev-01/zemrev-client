import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useState, useEffect } from "react";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import { RightIconSvg } from "@/components/Svg/AuthSvg";

const VerifyEmailAlert = () => {
  const { registeredUser, resendVerifyEmail, isLoading } = useAuth();
  const [cooldown, setCooldown] = useState(0);
  const [emailSent, setEmailSent] = useState(false);

  // Load cooldown from localStorage on mount
  useEffect(() => {
    const savedCooldown = localStorage.getItem("emailVerifyCooldown");
    if (savedCooldown) {
      const remainingTime = parseInt(savedCooldown) - Date.now();
      if (remainingTime > 0) {
        setCooldown(Math.ceil(remainingTime / 1000));
      } else {
        localStorage.removeItem("emailVerifyCooldown");
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    if (!registeredUser?.email || cooldown > 0) return;

    const success = await resendVerifyEmail({ email: registeredUser.email });
    
    if (success) {
      setEmailSent(true);
      // Set 60 second cooldown
      const cooldownTime = 60;
      setCooldown(cooldownTime);
      localStorage.setItem("emailVerifyCooldown", (Date.now() + cooldownTime * 1000).toString());
      
      // Hide success message after 5 seconds
      setTimeout(() => setEmailSent(false), 5000);
    }
  };

  if (!registeredUser || registeredUser.isEmailVerified) {
    return null;
  }

  return (
    <div className="md:px-4 px-2 md:mt-4 mt-2">
      <div className="w-full p-2 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
        
        <div className="flex-1">
          {!emailSent ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 text-green-600 dark:text-green-400">
                <RightIconSvg />
              </div>
              <p className="text-sm md:text-base text-green-700 dark:text-green-300 font-medium">
                Verification email sent successfully!
              </p>
            </div>
          ) : (
            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
              Your email is not verified. Please verify to access all features.
            </p>
          )}
        </div>

        <button
          onClick={handleResend}
          disabled={isLoading || cooldown > 0}
          aria-label="resend-email-verification"
          className="px-4 py-1.5 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center"
        >
          {isLoading ? (
            <Spinner size="sm" color="text-white" />
          ) : cooldown > 0 ? (
            `Resend (${cooldown}s)`
          ) : (
            "Resend"
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailAlert;