"use client";

import dynamic from "next/dynamic";
import Skeleton from "@/components/Layouts/Loaders/Skeleton";

const AboutUsDynamic = dynamic(() => import("@/components/Legal/AboutUs"), {
  loading: () => <Skeleton height="md:h-[45vw] h-[80vh]" />,
});

const AboutUs = () => {
  return (
    <div className="w-full">
      <AboutUsDynamic />
    </div>
  );
};

export default AboutUs;
