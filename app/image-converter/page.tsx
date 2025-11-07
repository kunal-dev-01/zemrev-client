"use client"

import dynamic from "next/dynamic"
const MainImageToolsPage = dynamic(() => import("@/components/ImageTools/MainImageToolsPage"), { ssr: false })

const page = () => {
  return (
    <div className="w-full">
      <MainImageToolsPage />
    </div>
  )
}

export default page