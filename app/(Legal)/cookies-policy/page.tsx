"use client"

import dynamic from "next/dynamic";
import Skeleton from "@/components/Layouts/Loaders/Skeleton";

const CookiePolicyDynamic = dynamic(() => import("@/components/Legal/CookiePolicy"), {
  loading: () => <Skeleton height="md:h-[45vw] h-[80vh]" />,
});

const Cookie = () => {
  return (
    <div className="w-full">
      <CookiePolicyDynamic />
    </div>
  )
}

export default Cookie