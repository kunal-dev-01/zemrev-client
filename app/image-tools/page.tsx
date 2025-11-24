"use client"

import Skeleton from "@/components/Layouts/Loaders/Skeleton"

import dynamic from "next/dynamic"
const MainImageToolsPage = dynamic(() => import("@/components/ImageTools/MainToolPage/MainImageToolsPage"), { ssr: false , loading: () => <Skeleton height="md:h-[45vw] h-[80vh]"  /> })

const page = () => {
  return (
    <main className="w-full">
      <MainImageToolsPage />
    </main>
  )
}

export default page