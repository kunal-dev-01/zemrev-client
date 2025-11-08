"use client"
import dynamic from "next/dynamic"
import Skeleton from "@/components/Layouts/Loaders/Skeleton";

const MainConvertPage = dynamic(() => import("@/components/ImageTools/ImageConvertPage/MainConvertPage"), { ssr: false, loading: () => <Skeleton height="md:h-[45vw] h-[80vh]"  /> });

const page = () => {
  return (
    <div className="w-full">
      <MainConvertPage />
    </div>
  )
}

export default page