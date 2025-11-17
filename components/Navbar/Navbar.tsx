'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import NavRightSide from './NavRightSide';

/* ----------  Logo  ---------- */
const Logo: FC = () => (
  <Link href="/" className="block md:w-[2.5vw] w-[5.5vh] p-1">
    <Image 
      src="/favicon.svg" 
      alt="logo" 
      width={50} 
      height={50} 
      loading='eager'
      className="w-full h-full object-cover dark:hidden" 
    />
    <Image 
      src="/favicon-dark.svg" 
      alt="logo" 
      width={50} 
      height={50} 
      loading='eager'
      className="w-full h-full object-cover hidden dark:block" 
    />
  </Link>
);

/* ----------  Navbar  ---------- */
const Navbar: FC = memo(() => {

  return (
    <nav className="w-full md:h-[2.5vw] h-[5.5vh] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 backdrop-blur-lg border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-between relative">
      <Logo />

      <div className="p-1 h-full relative">
        <NavRightSide />
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;