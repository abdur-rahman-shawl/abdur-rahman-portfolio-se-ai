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
    slug: "semantic-search-engine",
    title: "Semantic Job Resolver",
    category: "Search / NLP",
    image: "https://picsum.photos/seed/search/1200/800",
    year: "2024"
  },
  {
    id: 2,
    slug: "seo-content-architect",
    title: "AI SEO Architect",
    category: "Generative AI",
    image: "https://picsum.photos/seed/seo/1200/800",
    year: "2024"
  },
  {
    id: 3,
    slug: "lucy-ai-assistant",
    title: "Lucy AI Assistant",
    category: "Conversational AI",
    image: "https://picsum.photos/seed/lucy/1200/800",
    year: "2023"
  },
  {
    id: 4,
    slug: "autonomous-agents",
    title: "Autonomous Agents",
    category: "Agentic Workflows",
    image: "https://picsum.photos/seed/agents/1200/800",
    year: "2024"
  },
  {
    id: 5,
    slug: "resume-parser-rag",
    title: "Global Resume Parser",
    category: "RAG / Pipelines",
    image: "https://picsum.photos/seed/parser/1200/800",
    year: "2023"
  },
  {
    id: 6,
    slug: "whatjobs-pwa",
    title: "WhatJobs Native PWA",
    category: "Mobile / Infrastructure",
    image: "https://picsum.photos/seed/pwa/1200/800",
    year: "2023"
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const projectItems = gsap.utils.toArray('.project-item');

      // Horizontal Scroll Animation
      gsap.to(projectItems, {
        xPercent: -100 * (projectItems.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (projectItems.length - 1),
          // Base the duration on the width of the items to ensure smooth scrolling
          end: () => `+=${container.offsetWidth}`,
        },
      });

      // Individual Image Parallax inside horizontal scroll
      projectItems.forEach((item: any) => {
        const img = item.querySelector('.project-img');
        gsap.fromTo(img, 
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              containerAnimation: gsap.getById('horizontalScrollAnimation') || undefined,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-[#0a0a0a] min-h-screen relative overflow-hidden flex items-center">
      {/* Fixed Sticky Header for the Section */}
      <div className="absolute top-16 left-6 md:left-20 z-10 mix-blend-difference pointer-events-none w-full pr-12 md:pr-40">
        <div className="flex justify-between items-end">
          <h2 className="text-sm uppercase tracking-widest text-white/50">03 — Selected Works</h2>
          <p className="font-serif italic text-xl text-white/70">2023 — 2025</p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={scrollContainerRef} className="flex flex-nowrap h-screen" style={{ width: `${projects.length * 100}vw` }}>
        {projects.map((project) => (
          <div 
            key={project.id}
            className="project-item w-screen h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-20 relative group cursor-pointer"
          >
            <Link href={`/projects/${project.slug}`} className="w-full max-w-7xl block relative">
              <div className="relative overflow-hidden w-full aspect-[4/3] md:aspect-[21/9] rounded-lg">
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  referrerPolicy="no-referrer"
                  className="project-img w-[120%] h-full object-cover relative scale-110 group-hover:scale-100 transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)]"
                />
                
                {/* Hover reveal text */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-duration duration-[1s] ease-[cubic-bezier(0.76,0,0.24,1)] bg-black/20 backdrop-blur-[2px] translate-y-8 group-hover:translate-y-0">
                  <span className="text-white font-sans uppercase tracking-[0.3em] text-xs border border-white/20 px-8 py-4 rounded-full mb-6 hover:bg-white hover:text-black transition-colors duration-300">
                    View Case Study
                  </span>
                </div>
              </div>
              
              {/* Titles below image */}
              <div className="absolute bottom-[-100px] left-0 flex justify-between items-start w-full opacity-50 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                <div>
                  <h3 className="text-4xl md:text-6xl font-serif mb-4 text-white">{project.title}</h3>
                  <p className="text-white/50 font-sans uppercase tracking-widest text-sm">{project.category}</p>
                </div>
                <span className="font-mono text-lg text-white/40">{project.year}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
