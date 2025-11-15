"use client"
import dynamic from "next/dynamic"
import Skeleton from "@/components/Layouts/Loaders/Skeleton"

const MainUserPageManager = dynamic(() => import('@/components/User/MainUserPageManager'), {
  loading: () => <Skeleton height="md:h-[47vw] h-[90vh]" />,
  ssr: false,
})

const User = () => {
  return (
    <div className="w-full">
      <MainUserPageManager />
    </div>
  )
}

export default User