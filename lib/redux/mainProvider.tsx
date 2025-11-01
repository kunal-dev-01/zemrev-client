'use client';

import dynamic from 'next/dynamic';

const StoreProvider = dynamic(() => import('./storeProvider'), { ssr: false });

export default function MainProvider({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}