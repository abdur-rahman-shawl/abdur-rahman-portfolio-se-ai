'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from '@/components/LoaderContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const { isLoading } = useLoader();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        '.hero-line',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out', delay: 0.2 }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      // Parallax effect on scroll
      gsap.to(containerRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="z-10 text-center px-4">
        <h1 ref={titleRef} className="font-serif text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase font-bold">
          <div className="overflow-hidden">
            <span className="block hero-line opacity-0">Abdur</span>
          </div>
          <div className="overflow-hidden">
            <span className="block hero-line text-stroke opacity-0">Rahman</span>
          </div>
        </h1>
        
        <p ref={subtitleRef} className="mt-8 text-lg md:text-xl font-light tracking-widest uppercase text-white/70 opacity-0">
          Software Engineer <span className="text-blue-500 font-medium">— AI</span>
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  );
}
