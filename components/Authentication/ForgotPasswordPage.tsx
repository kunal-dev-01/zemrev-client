import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import Input from "@/components/Layouts/Input/Input";
import Spinner from "../Layouts/Loaders/Spinner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log(data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setEmailSent(true);
  };

  return (
    <div className="w-full md:h-[45vw] h-[80vh] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center relative">
      <div className="w-full md:w-[40%] p-6 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl">
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
                disabled={isSubmitting}
                className="w-full bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner color="text-white" size="sm" /> Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
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
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
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
