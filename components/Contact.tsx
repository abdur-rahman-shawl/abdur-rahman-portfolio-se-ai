'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-text',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-20 bg-[#050505] min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full mix-blend-screen filter blur-[150px]" />
      </div>

      <div className="z-10 max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-white/50 mb-8 contact-text">04 — Contact</h2>
        
        <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-12 contact-text">
          Let&apos;s build the <br/>
          <span className="italic text-blue-500">future</span> together.
        </h3>
        
        <form className="contact-text mt-12 w-full max-w-2xl mx-auto flex flex-col gap-6 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-white/50 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                placeholder="John Doe"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/50 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-white/50 mb-2">Message</label>
            <textarea 
              id="message" 
              rows={4}
              className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" 
              placeholder="Tell me about your project..."
            />
          </div>
          <button 
            type="submit" 
            className="self-start mt-4 px-8 py-4 border border-white/30 rounded-full text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
