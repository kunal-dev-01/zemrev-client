"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/authHooks/auth.hooks";

const MainHomeManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetchUserAfterAuth, user } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const authSuccess = searchParams.get("auth");

    if (authSuccess === "success" && !user && !isAuthenticating) {
      setIsAuthenticating(true);

      fetchUserAfterAuth()
        .then((success) => {
          setIsAuthenticating(false);
          if (success) {
            router.replace("/");
          } else {
            router.replace("/");
          }
        })
        .catch(() => {
          setIsAuthenticating(false);
          router.replace("/");
        });
    }
  }, [searchParams, fetchUserAfterAuth, router, user, isAuthenticating]);

  if (isAuthenticating) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-zinc-200 dark:border-zinc-800 border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 bg-light dark:bg-dark rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              Setting up your account...
            </p>
            <p className="text-sm text-zinc-500">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">

    </div>
  );
};

export default MainHomeManager;