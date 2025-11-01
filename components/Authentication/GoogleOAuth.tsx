"use client";

import { useCallback, useState } from "react";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useLoginModal } from "@/hooks/loginHooks/login.hooks";

const GoogleOAuth = () => {
  const { loginWithGoogle, isLoading, error } = useAuth();
  const [animateClass, setAnimateClass] = useState("fade-in");
  const { onClose } = useLoginModal();

  const handleGoogleLogin = useCallback(async () => {
    await loginWithGoogle();
    onClose();
  }, [loginWithGoogle, onClose]);

  const handleCloseWithAnimation = () => {
    setAnimateClass("fade-out");
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );

  const Loader = () => (
    <>
      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>Redirecting…</span>
    </>
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0 w-full h-screen backdrop-blur-md ${animateClass}`}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-100/50 backdrop-blur-2xl dark:bg-zinc-900/30">
        {/* Close Button */}
        <button
          onClick={handleCloseWithAnimation}
          className="absolute top-4 right-4 bg-zinc-200/90 hover:bg-zinc-300/70 dark:hover:bg-zinc-700/90 transition-all duration-300 ease-in-out dark:bg-zinc-800 rounded-md text-zinc-700 dark:text-zinc-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-100">
              Welcome to Zemops
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Sign in to continue to your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/30 p-3 text-sm text-red-700 dark:text-red-300">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="group flex w-full items-center justify-center gap-3 cursor-pointer rounded-lg bg-zinc-200/50 px-6 py-2 text-base font-semibold text-zinc-800  transition hover:bg-zinc-200/80 focus:outline-none focus:ring-2 focus:ring-light dark:focus:ring-dark disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-800 dark:hover:bg-zinc-800/80"
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="grow border-t border-zinc-300 dark:border-zinc-700" />
            <span className="mx-3 text-xs text-zinc-500 dark:text-zinc-400">
              Secure auth with Google
            </span>
            <div className="grow border-t border-zinc-300 dark:border-zinc-700" />
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
            By continuing you agree to our{" "}
            <a
              href="/terms"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleOAuth;
