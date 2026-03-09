'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useLoader } from '@/components/LoaderContext';

export default function Navbar() {
  const { isLoading } = useLoader();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current || isLoading) return;
    
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, [isLoading]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(targetId);
    } else {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference flex justify-between items-center opacity-0">
      <Link href="/" className="text-xl font-serif font-bold tracking-tighter cursor-pointer">
        AR.
      </Link>
      <div className="flex gap-6 text-sm font-medium uppercase tracking-widest">
        <Link href="/#about" onClick={(e) => handleScroll(e, '#about')} className="hover:opacity-70 transition-opacity cursor-pointer">About</Link>
        <Link href="/#projects" onClick={(e) => handleScroll(e, '#projects')} className="hover:opacity-70 transition-opacity cursor-pointer">Projects</Link>
        <Link href="/#contact" onClick={(e) => handleScroll(e, '#contact')} className="hover:opacity-70 transition-opacity cursor-pointer">Contact</Link>
      </div>
    </nav>
  );
}
