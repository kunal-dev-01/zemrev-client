// app/auth/callback/page.tsx - COMPLETE REWRITE

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxHooks/redux.hooks";
import { setRegisteredCredentials } from "@/services/authService/auth.slice";
import Loader from "@/components/Layouts/Loaders/Loader";
import { ErrorSvg } from "@/components/Svg/CommonSvg";

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const token = searchParams.get("token");
        const userParam = searchParams.get("user");

        if (!token || !userParam) {
          setError("Authentication failed. Missing credentials.");
          setIsProcessing(false);
          return;
        }

        // ✅ Parse user data from URL
        const user = JSON.parse(decodeURIComponent(userParam));

        // ✅ Directly set credentials (NO API call needed)
        dispatch(
          setRegisteredCredentials({
            user,
            accessToken: token,
          })
        );

        // ✅ Redirect to dashboard
        router.push("/user?page=dashboard");
      } catch (err) {
        console.error("Callback error:", err);
        setError("Something went wrong during authentication.");
        setIsProcessing(false);
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    };

    run();
  }, [searchParams, router, dispatch]);

  // ================================ ERROR STATE ===================================
  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="p-8 rounded-2xl text-center max-w-md">
          <div className="w-16 h-16 mb-4 mx-auto text-red-500">
            <ErrorSvg />
          </div>

          <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Authentication Failed
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>

          <p className="text-gray-500 text-sm dark:text-gray-400">
            Redirecting to login…
          </p>
        </div>
      </div>
    );
  }

  // ================================ LOADING STATE ===================================
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader />
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 font-medium">
          {isProcessing ? "Completing authentication..." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
};

export default Callback;