"use client"

import dynamic from "next/dynamic";
import Skeleton from "@/components/Layouts/Loaders/Skeleton";

const PrivacyPolicyDynamic = dynamic(() => import("@/components/Legal/PrivacyPolicy"), {
  loading: () => <Skeleton height="md:h-[45vw] h-[80vh]" />,
});

const PrivacyPolicy = () => {
  return (
    <div className="w-full">
      <PrivacyPolicyDynamic />
    </div>
  )
}

export default PrivacyPolicy