"use client"

import dynamic from "next/dynamic"
import Skeleton from "@/components/Layouts/Loaders/Skeleton"

const VerifyPage = dynamic(() => import("@/components/Authentication/VerifyPage"), { ssr: false , loading: () => <Skeleton height="md:h-[45vw] h-[80vh]"  />});

const VerifyEmail = () => {
  return (
    <div className="w-full">
      <VerifyPage />
    </div>
  )
}

export default VerifyEmail