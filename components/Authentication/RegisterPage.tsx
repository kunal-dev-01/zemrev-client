// components/Authentication/RegisterPage.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/authHooks/auth.hooks";
import * as z from "zod";
import { FC, useState } from "react";
import Input from "@/components/Layouts/Input/Input";
import Spinner from "../Layouts/Loaders/Spinner";
import GoogleAuthButton from "./GoogleAuthButton";
import AuthErrorAlert from "../Layouts/ErrorLayout/AuthError";
import ResendVerifyEmail from "./ResendVerifyEmail";
import Image from "next/image";
import Link from "next/link";

// ==================== VALIDATION SCHEMA ====================
const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Logo: FC = () => (
  <Link href="/" className="block md:w-[2.8vw] w-[6vh] mx-auto mb-2">
    <Image 
      src="/favicon.svg" 
      alt="logo" 
      width={50} 
      height={50} 
      loading='eager'
      className="w-full h-full object-cover dark:hidden" 
    />
    <Image 
      src="/favicon-dark.svg" 
      alt="logo" 
      width={50} 
      height={50} 
      loading='eager'
      className="w-full h-full object-cover hidden dark:block" 
    />
  </Link>
);

// ==================== COMPONENT ====================
const RegisterPage = () => {
  const { signup, isLoading, error, clearError } = useAuth();
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  // ==================== HANDLERS ====================
  const onSubmit = async (data: RegisterFormData) => {
    const success = await signup(data);

    if (success) {
      setRegisteredEmail(data.email);
    }
  };

  // ==================== SHOW VERIFY EMAIL SCREEN ====================
  if (registeredEmail) {
    return <ResendVerifyEmail email={registeredEmail} />;
  }

  // ==================== REGISTRATION FORM ====================
  return (
    <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-center relative">
      <div className="w-full md:w-[40%] md:p-6 p-4 dark:md:bg-zinc-900/50 md:bg-zinc-100/50 md:rounded-2xl">

        {/* Logo */}
        <Logo />

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 select-none">
            Create an Account
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
            Join us today and start using your dashboard instantly.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            register={register("fullName")}
            error={errors.fullName}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            register={register("email")}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            register={register("password")}
            error={errors.password}
          />

          

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-light hover:bg-light/80 dark:hover:bg-dark/80 dark:bg-dark text-white font-medium py-2 rounded-lg transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner color="text-white" size="sm" /> Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center my-6 select-none">
          <div className="grow border-t border-zinc-300 dark:border-zinc-800"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
            or
          </span>
          <div className="grow border-t border-zinc-300 dark:border-zinc-800"></div>
        </div>

        {/* Google Login */}
        <GoogleAuthButton />

        {/* Login Link */}
        <div className="py-2 border border-zinc-300 dark:border-zinc-800 mt-4 rounded-lg">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base text-center">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-light hover:text-light/80 dark:hover:text-dark/80 dark:text-dark font-medium"
            >
              Login
            </a>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-4">
            <AuthErrorAlert message={error} onClose={clearError} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
