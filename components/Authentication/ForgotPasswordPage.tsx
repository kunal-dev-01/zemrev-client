import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Input from "@/components/Layouts/Input/Input";
import Spinner from "../Layouts/Loaders/Spinner";
import { RightIconSvg } from "../Svg/AuthSvg";
import AuthErrorAlert from "../Layouts/ErrorLayout/AuthError";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { isLoading, forgotPassword, error, clearError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const success = await forgotPassword(data);
    if (success) {
      setEmailSent(true);
    }
  };

  return (
    <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center relative">
      <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl transition-transform duration-300 ease-in-out">
        {!emailSent ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 select-none">
                Forgot Password?
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
                No worries! Enter your email and we'll send you reset
                instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                register={register("email")}
                error={errors.email}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner color="text-white" size="sm" /> Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            {/* ✅ Show error alert only when there's an error */}
            {error && <AuthErrorAlert message={error} onClose={clearError} />}

            <div className="text-center text-sm py-2 border border-zinc-300 dark:border-zinc-800 mt-4 rounded-lg">
              <a href="/auth/login" className="text-indigo-500 hover:underline">
                Back to Login
              </a>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <RightIconSvg/>
            </div>
            <h2 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Check Your Email
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base mb-6">
              We've sent password reset instructions to your email address.
            </p>

            <a
              href="/auth/login"
              className="inline-block bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out"
            >
              Back to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;