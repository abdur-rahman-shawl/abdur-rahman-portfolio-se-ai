'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { useLoader } from '@/components/LoaderContext';

export default function Template({ children }: { children: React.ReactNode }) {
  const { setIsLoading } = useLoader();
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsLoading(false);
              document.body.style.overflow = '';
            }
          });
        }
      });

      tl.to(progressRef.current, {
        width: '100%',
        duration: 0.8,
        ease: 'power2.inOut',
      });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [setIsLoading]);

  return (
    <>
      <div 
        ref={loaderRef} 
        className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center text-white"
      >
        <div className="w-64 h-[1px] bg-white/20 relative overflow-hidden">
          <div ref={progressRef} className="absolute top-0 left-0 h-full bg-white w-0" />
        </div>
        <div className="absolute bottom-10 text-xs tracking-[0.3em] uppercase text-white/50">
          Initializing Neural Core
        </div>
      </div>
      {children}
    </>
  );
}
