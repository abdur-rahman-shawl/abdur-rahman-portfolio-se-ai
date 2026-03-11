'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import { useLoader } from '@/components/LoaderContext';

const projectsData: Record<string, any> = {
  "semantic-search-engine": {
    title: "Semantic Job Resolver",
    category: "Search / NLP",
    year: "2024",
    role: "AI & Web Developer",
    client: "WhatJobs",
    description: "Traditional keyword matching fails to capture the intent behind millions of messy, real-world job titles. I engineered a high-performance categorization engine that resolved 100 million+ job listings. By developing a custom NLP pipeline with BIO NER tagging and generating vector embeddings for Apache SOLR, we moved beyond literal text matching to intent-based search—drastically improving relevance and speed.",
    image: "https://picsum.photos/seed/search/1920/1080",
    gallery: [
      "https://picsum.photos/seed/search1/800/600",
      "https://picsum.photos/seed/search2/800/600"
    ]
  },
  "seo-content-architect": {
    title: "AI SEO Architect",
    category: "Generative AI",
    year: "2024",
    role: "AI Developer",
    client: "WhatJobs",
    description: "Manually creating SEO-optimized descriptions and FAQs for millions of landing pages is impossible. I built an autonomous app that generates high-standard, SEO-optimized content based on real-time search trends. It integrates Google Rich Snippets directly into generated content and runs an automated hyperlinking engine that created over 5 million internal links, massively increasing site crawlability.",
    image: "https://picsum.photos/seed/seo/1920/1080",
    gallery: [
      "https://picsum.photos/seed/seo1/800/600",
      "https://picsum.photos/seed/seo2/800/600"
    ]
  },
  "lucy-ai-assistant": {
    title: "Lucy AI Assistant",
    category: "Conversational AI",
    year: "2023",
    role: "Lead GenAI Engineer",
    client: "WhatJobs",
    description: "Job seekers are often overwhelmed by static search filters. I created 'Lucy', a conversational AI agent that guides users through their career search like a human recruiter. Orchestrated as a Flask-based microservice using GPT-4 and SpaCy, it extracts user preferences from natural dialogue and is served via a custom CORS-enabled iframe. It is currently live in 4 countries serving over 10,000 active users.",
    image: "https://picsum.photos/seed/lucy/1920/1080",
    gallery: [
      "https://picsum.photos/seed/lucy1/800/600",
      "https://picsum.photos/seed/lucy2/800/600"
    ]
  },
  "autonomous-agents": {
    title: "Autonomous Agents",
    category: "Agentic Workflows",
    year: "2024",
    role: "AI Researcher",
    client: "Internal R&D",
    description: "Moving from simple chatbots to agents that can 'think' and 'act' autonomously. I utilized LangChain and OpenAI Function Calling to create a system capable of planning its own task execution. This includes a Natural Language-to-SQL pipeline where the agent securely queries a PostgreSQL database, interprets the results, and adjusts its next steps based on data insights.",
    image: "https://picsum.photos/seed/agents/1920/1080",
    gallery: [
      "https://picsum.photos/seed/agents1/800/600",
      "https://picsum.photos/seed/agents2/800/600"
    ]
  },
  "resume-parser-rag": {
    title: "Global Resume Parser",
    category: "RAG / Pipelines",
    year: "2023",
    role: "Backend Engineer",
    client: "Global Apps",
    description: "To build a better employer-candidate matching engine, we needed high-fidelity data extraction at scale. I leveraged the Google GenAI SDK and Retrieval-Augmented Generation (RAG) to extract detailed data from over 2 million resumes. This system scaled across 40+ countries and 15 languages, generating standardized JSON profiles for downstream matching operations.",
    image: "https://picsum.photos/seed/parser/1920/1080",
    gallery: [
      "https://picsum.photos/seed/parser1/800/600",
      "https://picsum.photos/seed/parser2/800/600"
    ]
  },
  "whatjobs-pwa": {
    title: "WhatJobs Native PWA",
    category: "Mobile / Config",
    year: "2023",
    role: "Full-Stack Engineer",
    client: "WhatJobs",
    description: "Single-handedly architected a Progressive Web App using Lit and Python Flask, natively packaged for both iOS and Android stores. Designed to function seamlessly across device ecosystems, it implements custom Service Workers for offline capabilities and integrates Firebase Cloud Messaging (FCM) to deliver rich, real-time push notifications to job seekers.",
    image: "https://picsum.photos/seed/pwa/1920/1080",
    gallery: [
      "https://picsum.photos/seed/pwa1/800/600",
      "https://picsum.photos/seed/pwa2/800/600"
    ]
  }
};

export default function ProjectDetail() {
  const { isLoading } = useLoader();
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const project = projectsData[slug];
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calculate Navigation
  const projectKeys = Object.keys(projectsData);
  const currentIndex = projectKeys.indexOf(slug);
  
  let prevSlug = null;
  let nextSlug = null;
  let prevProject = null;
  let nextProject = null;

  if (currentIndex !== -1) {
    prevSlug = currentIndex === 0 ? projectKeys[projectKeys.length - 1] : projectKeys[currentIndex - 1];
    nextSlug = currentIndex === projectKeys.length - 1 ? projectKeys[0] : projectKeys[currentIndex + 1];
    prevProject = projectsData[prevSlug];
    nextProject = projectsData[nextSlug];
  }

  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!project || isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure we start at the very top immediately before fades
      window.scrollTo(0, 0);

      // Fade out the initial black screen overlay
      tl.to('.page-transition-overlay', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set('.page-transition-overlay', { display: 'none' });
        }
      })
      .fromTo(
        '.reveal-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      ).fromTo(
        '.hero-image',
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' },
        '-=0.8'
      ).fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=1.2'
      );
    });

    return () => ctx.revert();
  }, [project, isLoading]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <h1 className="text-2xl font-serif text-white">Project not found</h1>
      </div>
    );
  }

  return (
    <main className="bg-[#050505] text-[#f5f5f5] min-h-screen pt-32 relative">
      <div className="page-transition-overlay fixed inset-0 bg-[#050505] z-[100] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <button 
          onClick={() => router.push('/#projects')}
          className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-16 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          Back to Portfolio
        </button>

        <div ref={headerRef} className="mb-20">
          <div className="overflow-hidden mb-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight reveal-text opacity-0">
              {project.title}
            </h1>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 border-t border-white/10 pt-8">
            <div className="overflow-hidden">
              <div className="reveal-text opacity-0">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Category</p>
                <p className="font-medium">{project.category}</p>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="reveal-text opacity-0">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Year</p>
                <p className="font-mono">{project.year}</p>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="reveal-text opacity-0">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Role</p>
                <p className="font-medium">{project.role}</p>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="reveal-text opacity-0">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Client</p>
                <p className="font-medium">{project.client}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full aspect-video relative overflow-hidden rounded-lg mb-20">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover hero-image opacity-0"
          />
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32 opacity-0">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-serif mb-6">Overview</h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-white/80">
              {project.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {project.gallery.map((img: string, i: number) => (
            <div key={i} className="w-full aspect-[4/3] relative overflow-hidden rounded-lg">
              <Image src={img} alt={`${project.title} gallery ${i}`} fill referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Project Dock (macOS Style) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto flex justify-center">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl mx-auto w-max">
          {projectKeys.map((key, i) => {
            const isActive = key === slug;
            const projectData = projectsData[key];
            // Get just the first 1-2 words for a cleaner dock title depending on length
            const shortTitle = projectData.title.split(' ').slice(0, 2).join(' ');

            return (
              <Link 
                key={key} 
                href={`/projects/${key}`}
                className="relative group"
              >
                <div 
                  className={`
                    flex items-center justify-center transition-all duration-300 font-medium
                    ${isActive 
                      ? 'px-4 py-3 rounded-xl bg-white text-black shadow-lg scale-100 text-sm' 
                      : 'w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-3 rounded-full md:rounded-xl text-white/50 hover:bg-white/10 hover:text-white hover:scale-105 text-xs md:text-sm'
                    }
                  `}
                >
                  {/* Mobile: Show Number (if inactive). Desktop: Show Title (always) */}
                  <span className={`whitespace-nowrap ${!isActive ? 'hidden md:block' : 'block'}`}>
                    {shortTitle}
                  </span>
                  
                  {/* Mobile: Show Number (if inactive) */}
                  {!isActive && (
                    <span className="block md:hidden">
                      {i + 1}
                    </span>
                  )}
                </div>
                
                {/* Tooltip on hover (only visible if not active) */}
                {!isActive && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
                    <div className="bg-[#1a1a1a] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10 shadow-xl">
                      {projectData.title}
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
