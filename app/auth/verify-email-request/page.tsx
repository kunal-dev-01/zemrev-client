"use client"

import dynamic from "next/dynamic"
import Skeleton from "@/components/Layouts/Loaders/Skeleton"

const SendVerifyEmail = dynamic(() => import("@/components/Authentication/SendVerifyEmail"), { ssr: false , loading: () => <Skeleton height="md:h-[45vw] h-[80vh]"  />});

const page = () => {
  return (
    <div className="w-full">
        <SendVerifyEmail />
    </div>
  )
}

export default page