'use client';

import dynamic from "next/dynamic";
const MainHomeManager = dynamic(() => import("@/components/Home/MainHomeManager"), { ssr: false });

export default function Home() {
  return (
    <main className="w-full">
      <MainHomeManager />
    </main>
  );
}