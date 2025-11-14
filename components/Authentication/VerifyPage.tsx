// components/Authentication/VerifyEmailPage.tsx

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import Spinner from "../Layouts/Loaders/Spinner";
import AuthErrorAlert from "../Layouts/ErrorLayout/AuthError";
import { ErrorSvg, RightIconSvg } from "../Svg/AuthSvg";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyEmail, error, clearError } = useAuth();

  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
  const [token, setToken] = useState<string | null>(null);
  
  // ✅ Prevent multiple API calls
  const hasVerified = useRef(false);

  // ==================== VERIFY EMAIL ON MOUNT ====================
  useEffect(() => {
    // ✅ If already verified, don't call again
    if (hasVerified.current) return;

    const tokenFromUrl = searchParams.get("token");

    if (!tokenFromUrl) {
      setVerificationStatus("error");
      return;
    }

    setToken(tokenFromUrl);
    hasVerified.current = true; // ✅ Mark as verified
    handleVerification(tokenFromUrl);
  }, []); // ✅ Empty dependency array

  // ==================== VERIFICATION HANDLER ====================
  const handleVerification = async (verificationToken: string) => {
    const success = await verifyEmail(verificationToken);

    if (success) {
      setVerificationStatus("success");
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } else {
      setVerificationStatus("error");
    }
  };

  // ==================== LOADING STATE ====================
  if (verificationStatus === "loading") {
    return (
      <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center">
        <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl text-center">
          {/* Loading Spinner */}
          <div className="mb-6 flex justify-center">
            <Spinner color="text-light dark:text-dark" size="lg" />
          </div>

          <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Verifying Your Email
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
            Please wait while we verify your email address...
          </p>
        </div>
      </div>
    );
  }

  // ==================== SUCCESS STATE ====================
  if (verificationStatus === "success") {
    return (
      <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center">
        <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <RightIconSvg />
          </div>

          <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Email Verified Successfully!
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-6">
            Your email has been verified. You can now log in to your account.
          </p>

          {/* Success Message */}
          <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg p-4 mb-6">
            <p className="text-green-700 dark:text-green-400 text-sm">
              🎉 Redirecting to login page in 3 seconds...
            </p>
          </div>

          <a
            href="/auth/login"
            className="inline-block bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // ==================== ERROR STATE ====================
  return (
    <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center">
      <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <ErrorSvg />
        </div>

        <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
          Verification Failed
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-6">
          {!token
            ? "Invalid or missing verification token."
            : "The verification link is invalid or has expired."}
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-6">
            <AuthErrorAlert message={error} onClose={clearError} />
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <a
            href="/auth/register"
            className="block w-full bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Register Again
          </a>

          <a
            href="/auth/login"
            className="block w-full border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Back to Login
          </a>
        </div>

        {/* Help Text */}
        <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-6">
          Need help? Contact{" "}
          <a
            href="mailto:contact.zemrev@gmail.com"
            className="text-light dark:text-dark hover:underline"
          >
            contact.zemrev@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;