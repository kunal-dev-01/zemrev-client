"use client"

import dynamic from "next/dynamic";
import Skeleton from "@/components/Layouts/Loaders/Skeleton";

const TermsDynamic = dynamic(() => import("@/components/Legal/Terms"), {
  loading: () => <Skeleton height="md:h-[45vw] h-[80vh]" />,
});

const Terms = () => {
  return (
    <div className="w-full">
      <TermsDynamic />
    </div>
  )
}

export default Terms