'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    slug: "neural-vision",
    title: "Neural Vision",
    category: "Computer Vision",
    image: "https://picsum.photos/seed/vision/1200/800",
    year: "2025"
  },
  {
    id: 2,
    slug: "llm-agent",
    title: "Autonomous Agent",
    category: "NLP / Agents",
    image: "https://picsum.photos/seed/agent/1200/800",
    year: "2024"
  },
  {
    id: 3,
    slug: "predictive-analytics",
    title: "Predictive Engine",
    category: "Time Series",
    image: "https://picsum.photos/seed/predict/1200/800",
    year: "2024"
  },
  {
    id: 4,
    slug: "generative-art",
    title: "Generative Canvas",
    category: "Generative AI",
    image: "https://picsum.photos/seed/art/1200/800",
    year: "2023"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectItems = gsap.utils.toArray('.project-item');
      
      projectItems.forEach((item: any) => {
        const img = item.querySelector('img');
        
        // Parallax image effect
        gsap.to(img, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Reveal effect
        gsap.fromTo(
          item,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-sm uppercase tracking-widest text-white/50">03 — Selected Works</h2>
          <p className="font-serif italic text-xl text-white/70">2023 — 2025</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, index) => (
            <Link 
              href={`/projects/${project.slug}`} 
              key={project.id}
              className={`project-item group block cursor-pointer ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6 rounded-lg">
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  referrerPolicy="no-referrer"
                  className="w-full h-[120%] object-cover -top-[10%] relative scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
                
                {/* Hover reveal text */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                  <span className="text-white font-sans uppercase tracking-[0.2em] text-sm border border-white/30 px-6 py-3 rounded-full">
                    View Project
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-serif mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-white/50 font-sans uppercase tracking-widest text-xs">{project.category}</p>
                </div>
                <span className="font-mono text-sm text-white/40">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
