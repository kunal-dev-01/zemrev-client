"use client"

import dynamic from "next/dynamic"
import Skeleton from "@/components/Layouts/Loaders/Skeleton"

const LoginPage = dynamic(() => import("@/components/Authentication/LoginPage"), { ssr: false , loading: () => <Skeleton height="md:h-[45vw] h-[80vh]"  />});

const Login = () => {
  return (
    <div aria-label="login-page" className="w-full">
      <LoginPage />
    </div>
  )
}

export default Login