import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Input from "@/components/Layouts/Input/Input"; 
import Spinner from "../Layouts/Loaders/Spinner";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [passwordReset, setPasswordReset] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      setTokenError(true);
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log({ token, newPassword: data.newPassword });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPasswordReset(true);
  };

  if (tokenError) {
    return (
      <div className="w-full md:h-[45vw] h-[80vh] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center relative">
        <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Invalid Reset Link
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-6">
            The password reset link is invalid or has expired. Please request a new one.
          </p>
          
          <a  href="/auth/forgot-password"
            className="inline-block bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Request New Link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:h-[45vw] h-[80vh] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center relative">
      <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl">
        {!passwordReset ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 select-none">
                Reset Password
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
                Enter your new password below.
              </p>
            </div>

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
                disabled={isSubmitting}
                className="w-full bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner color="text-white" size="sm" /> Resetting...
                  </div>
                ) : "Reset Password"}
              </button>
            </form>

            <div className="text-center mt-4 text-sm">
              <a href="/auth/login" className="text-indigo-500 hover:underline">
                Back to Login
              </a>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Password Reset Successfully
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-6">
              Your password has been reset. You can now log in with your new password.
            </p>
            
            <a  href="/auth/login"
              className="inline-block bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out"
            >
              Go to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;