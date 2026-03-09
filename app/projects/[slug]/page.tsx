'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { useLoader } from '@/components/LoaderContext';

const projectsData: Record<string, any> = {
  "neural-vision": {
    title: "Neural Vision",
    category: "Computer Vision",
    year: "2025",
    role: "Lead AI Engineer",
    client: "TechNova Solutions",
    description: "Developed a state-of-the-art computer vision system capable of real-time object detection and segmentation in low-light environments. The system utilizes a custom transformer architecture optimized for edge devices.",
    image: "https://picsum.photos/seed/vision/1920/1080",
    gallery: [
      "https://picsum.photos/seed/vision1/800/600",
      "https://picsum.photos/seed/vision2/800/600"
    ]
  },
  "llm-agent": {
    title: "Autonomous Agent",
    category: "NLP / Agents",
    year: "2024",
    role: "AI Researcher",
    client: "OpenSource Initiative",
    description: "Built an autonomous LLM-powered agent capable of executing complex multi-step reasoning tasks. Integrated with various APIs to allow the agent to perform actions on behalf of the user.",
    image: "https://picsum.photos/seed/agent/1920/1080",
    gallery: [
      "https://picsum.photos/seed/agent1/800/600",
      "https://picsum.photos/seed/agent2/800/600"
    ]
  },
  "predictive-analytics": {
    title: "Predictive Engine",
    category: "Time Series",
    year: "2024",
    role: "Machine Learning Engineer",
    client: "FinTech Global",
    description: "Engineered a highly accurate time-series forecasting model for financial markets. The model processes millions of data points per second to provide real-time insights and predictions.",
    image: "https://picsum.photos/seed/predict/1920/1080",
    gallery: [
      "https://picsum.photos/seed/predict1/800/600",
      "https://picsum.photos/seed/predict2/800/600"
    ]
  },
  "generative-art": {
    title: "Generative Canvas",
    category: "Generative AI",
    year: "2023",
    role: "Creative Technologist",
    client: "ArtSpace Gallery",
    description: "Created an interactive generative art installation using diffusion models. Users can input text prompts to generate unique, high-resolution artworks in real-time.",
    image: "https://picsum.photos/seed/art/1920/1080",
    gallery: [
      "https://picsum.photos/seed/art1/800/600",
      "https://picsum.photos/seed/art2/800/600"
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
          onClick={() => router.back()}
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
        
        <div className="flex justify-center mb-32">
          <Link 
            href="/#projects" 
            className="inline-block border border-white/30 rounded-full px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            Next Project
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
