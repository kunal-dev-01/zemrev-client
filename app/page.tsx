'use client';

import dynamic from "next/dynamic";
import Skeleton from "@/components/Layouts/Loaders/Skeleton";

const MainHomeManager = dynamic(() => import("@/components/Home"), { ssr: false , loading: () => <Skeleton height="md:h-[45vw] h-[80vh]" /> });

export default function Home() {
  return (
    <main className="w-full">
      <MainHomeManager />
    </main>
  );
}