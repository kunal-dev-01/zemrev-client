"use client"

import dynamic from "next/dynamic";
import Skeleton from "@/components/Layouts/Loaders/Skeleton";

const CareersDynamic = dynamic(() => import("@/components/Legal/Careers"), {
  loading: () => <Skeleton height="md:h-[45vw] h-[80vh]" />,
});

const Careers = () => {
  return (
    <div className="w-full">
      <CareersDynamic />
    </div>
  )
}

export default Careers