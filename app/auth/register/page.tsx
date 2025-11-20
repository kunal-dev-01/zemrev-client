"use client"

import dynamic from "next/dynamic"
import Skeleton from "@/components/Layouts/Loaders/Skeleton"

const RegisterPage = dynamic(() => import("@/components/Authentication/RegisterPage"), { ssr: false , loading: () => <Skeleton height="md:h-[45vw] h-[80vh]"  />});

const Register = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <RegisterPage />
    </div>
  )
}

export default Register