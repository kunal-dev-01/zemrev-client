"use client"

import dynamic from "next/dynamic"
import Skeleton from "@/components/Layouts/Loaders/Skeleton"

const ResetPasswordPage = dynamic(() => import("@/components/Authentication/ResetPasswordPage"), { ssr: false , loading: () => <Skeleton height="md:h-[45vw] h-[80vh]"  />});

const ResetPassword = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ResetPasswordPage />
    </div>
  )
}

export default ResetPassword