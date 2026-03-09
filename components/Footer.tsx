'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Footer() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;

    if (!eye || !pupil) return;

    const onMouseMove = (e: MouseEvent) => {
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      
      // Calculate distance from center, capped at a maximum radius
      const maxDistance = 8; // Max movement for the pupil
      const distance = Math.min(
        maxDistance,
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10
      );

      const pupilX = Math.cos(angle) * distance;
      const pupilY = Math.sin(angle) * distance;

      gsap.to(pupil, {
        x: pupilX,
        y: pupilY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <footer className="py-12 px-6 md:px-20 bg-[#050505] border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-mono text-white/40 uppercase tracking-widest relative overflow-hidden">
      <div className="flex items-center gap-4 z-10">
        &copy; {new Date().getFullYear()} Abdur Rahman
      </div>
      
      {/* Interactive AI Eye */}
      <div className="flex flex-col items-center gap-3 z-10 group cursor-pointer">
        <div 
          ref={eyeRef}
          className="w-16 h-8 rounded-[100%] border border-blue-500/50 flex items-center justify-center relative bg-black/50 backdrop-blur-sm overflow-hidden transition-colors group-hover:border-blue-400"
        >
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen" />
          <div 
            ref={pupilRef}
            className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          />
        </div>
        <span className="text-[10px] text-blue-500/70 tracking-[0.3em]">Neural Core Active</span>
      </div>

      <div className="flex gap-8 z-10">
        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-white transition-colors">GitHub</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
      </div>
      
      {/* Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </footer>
  );
}
