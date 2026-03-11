'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation
      const lines = textRef.current?.querySelectorAll('.about-line');

      if (lines) {
        gsap.fromTo(
          lines,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-20 min-h-screen flex items-center bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4 flex flex-col justify-start">
          <h2 className="text-sm uppercase tracking-widest text-white/50 mb-4">01 — About</h2>
          <div className="w-full aspect-[3/4] relative overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src="/profile-photo.png"
              alt="Abdur Rahman"
              fill
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
          </div>
        </div>

        <div ref={textRef} className="md:col-span-8 flex flex-col justify-center text-2xl md:text-3xl lg:text-5xl font-serif leading-tight">
          <div className="overflow-hidden"><span className="block about-line">Software Engineer specializing</span></div>
          <div className="overflow-hidden"><span className="block about-line">in <span className="text-blue-500 italic">Generative AI</span> and</span></div>
          <div className="overflow-hidden"><span className="block about-line">Scalable Architectures.</span></div>
          <br />
          <div className="overflow-hidden"><span className="block about-line text-white/80">Bridging the gap between</span></div>
          <div className="overflow-hidden"><span className="block about-line text-white/80">complex AI R&D and robust</span></div>
          <div className="overflow-hidden"><span className="block about-line text-white/80">enterprise engineering.</span></div>

          <div className="mt-12 flex gap-8 text-sm font-sans uppercase tracking-widest text-white/60">
            <div className="about-line">
              <span className="block text-white text-3xl font-serif mb-2">100M+</span>
              Records Resolved
            </div>
            <div className="about-line">
              <span className="block text-white text-3xl font-serif mb-2">10k+</span>
              Active Users
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
