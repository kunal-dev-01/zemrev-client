"use client"

import dynamic from "next/dynamic"
import Skeleton from "@/components/Layouts/Loaders/Skeleton"

const ForgotPasswordPage = dynamic(() => import("@/components/Authentication/ForgotPasswordPage"), { ssr: false , loading: () => <Skeleton height="md:h-[45vw] h-[80vh]"  />});

const ForgotPassword = () => {
  return (
    <div className="w-full">
      <ForgotPasswordPage />
    </div>
  )
}

export default ForgotPassword