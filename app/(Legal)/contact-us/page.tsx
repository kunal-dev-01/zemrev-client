"use client"

import dynamic from "next/dynamic";
import Skeleton from "@/components/Layouts/Loaders/Skeleton";

const ContactUsDynamic = dynamic(() => import("@/components/Legal/ContactUs"), {
  loading: () => <Skeleton height="md:h-[45vw] h-[80vh]" />,
});

const ContactUs = () => {
  return (
    <div className="w-full">
      <ContactUsDynamic />
    </div>
  )
}

export default ContactUs