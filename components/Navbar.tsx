'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useLoader } from '@/components/LoaderContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const { isLoading } = useLoader();
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

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
    
    // If we are not on the home page, redirect to the home page with the hash
    if (pathname !== '/') {
      router.push(`/${targetId === '#home' ? '' : targetId}`);
      return;
    }

    const lenis = (window as any).lenis;

    if (targetId === '#home') {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

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
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6">
      <nav 
        ref={navRef} 
        className={`flex items-center gap-4 md:gap-8 px-5 py-2.5 rounded-full transition-all duration-300 opacity-0 ${
          isScrolled 
            ? 'bg-[#111111]/90 backdrop-blur-md border border-white/10 shadow-lg' 
            : 'bg-transparent border border-transparent'
        }`}
      >
        <Link href="/" onClick={(e) => handleScroll(e, '#home')} className="text-xl font-serif font-bold tracking-tighter cursor-pointer flex items-center pr-2 md:pr-4 border-r border-white/20">
          AR.
        </Link>
        <div className="flex items-center gap-4 md:gap-6 text-sm font-medium">
          <Link href="/#home" onClick={(e) => handleScroll(e, '#home')} className="text-white/70 hover:text-white transition-colors cursor-pointer hidden md:block">Home</Link>
          <Link href="/#about" onClick={(e) => handleScroll(e, '#about')} className="text-white/70 hover:text-white transition-colors cursor-pointer">About</Link>
          <Link href="/#projects" onClick={(e) => handleScroll(e, '#projects')} className="text-white/70 hover:text-white transition-colors cursor-pointer">Work</Link>
        </div>
        <Link href="/#contact" onClick={(e) => handleScroll(e, '#contact')} className="ml-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-white/5 rounded-full px-5 py-2 text-sm font-medium transition-colors cursor-pointer flex-shrink-0">
          Contact
        </Link>
      </nav>
    </div>
  );
}
