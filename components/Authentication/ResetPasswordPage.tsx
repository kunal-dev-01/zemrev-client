import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { useAuthVerify } from "@/hooks/authHooks/auth.verify.hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Input from "@/components/Layouts/Input/Input";
import Spinner from "../Layouts/Loaders/Spinner";
import AuthErrorAlert from "../Layouts/ErrorLayout/AuthError";
import { CheckSvg, ErrorSvg } from "../Svg/CommonSvg";

// ==================== VALIDATION SCHEMA ====================
const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ==================== COMPONENT ====================
const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const { isLoading, error, clearError } = useAuth();
  const { resetPassword } = useAuthVerify();

  // Local state
  const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [passwordReset, setPasswordReset] = useState(false);

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // ==================== EFFECTS ====================
  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setIsTokenValid(false);
    } else {
      setResetPasswordToken(token);
    }
  }, [searchParams]);

  // ==================== HANDLERS ====================
  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!resetPasswordToken) return;

    const success = await resetPassword({
      resetPasswordToken,
      newPassword: data.newPassword,
    });

    if (success) {
      setPasswordReset(true);
    }
  };

  // ==================== INVALID TOKEN VIEW ====================
  if (!isTokenValid) {
    return (
      <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center">
        <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl text-center">
          {/* Error Icon */}
          <div className="mb-4 w-20 h-20">
            <ErrorSvg />
          </div>

          <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Invalid Reset Link
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-6">
            The password reset link is invalid or has expired. Please request a new one.
          </p>

          <a
            href="/auth/forgot-password"
            className="inline-block bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Request New Link
          </a>
        </div>
      </div>
    );
  }

  // ==================== SUCCESS VIEW ====================
  if (passwordReset) {
    return (
      <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center">
        <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl text-center">
          {/* Success Icon */}
          <div className="mb-4 w-16 h-16 mx-auto text-emerald-400">
           <CheckSvg/>
          </div>

          <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Password Reset Successfully
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-6">
            Your password has been reset. You can now log in with your new password.
          </p>

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

  // ==================== RESET PASSWORD FORM ====================
  return (
    <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center">
      <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 select-none">
            Reset Password
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
            Enter your new password below.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            register={register("newPassword")}
            error={errors.newPassword}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner color="text-white" size="sm" /> Resetting...
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Error Alert */}
        {error && (
            <AuthErrorAlert message={error} onClose={clearError} />
        )}

        {/* Back to Login */}
        <div className="text-center text-sm py-2 border border-zinc-300 dark:border-zinc-800 mt-4 rounded-lg">
          <a href="/auth/login" className="text-indigo-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;