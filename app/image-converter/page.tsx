"use client"

import dynamic from "next/dynamic"
const MainImageConverterPage = dynamic(() => import("@/components/ImageConverter/MainImageConverterPage"), { ssr: false })

const page = () => {
  return (
    <div className="w-full">
      <MainImageConverterPage />
    </div>
  )
}

export default page