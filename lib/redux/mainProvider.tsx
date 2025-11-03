'use client';

import dynamic from 'next/dynamic';
import Loader from '@/components/Layouts/Loaders/Loader';

const StoreProvider = dynamic(() => import('./storeProvider'), { ssr: false , loading: () => <Loader /> });

export default function MainProvider({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}