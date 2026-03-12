'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';
import { useLoader } from '@/components/LoaderContext';

const projectsData: Record<string, any> = {
  "semantic-search-engine": {
    title: "Semantic Job Resolver",
    subtitle: "Intent-Based Job Title Resolution at Scale",
    category: "Search / NLP",
    year: "2024",
    role: "AI & Web Developer",
    client: "WhatJobs",
    description: "Traditional keyword matching fails to capture the intent behind millions of messy, real-world job titles. I engineered a high-performance categorization engine that resolved 100 million+ job listings. By developing a custom NLP pipeline with BIO NER tagging and generating vector embeddings for Apache SOLR, we moved beyond literal text matching to intent-based search—drastically improving relevance and speed.",
    challenge: "Job titles in the real world are inconsistent and unstructured. Job seekers use different terminology than employers. A simple keyword-based search would fail to match semantically equivalent roles, leading to poor search results and user frustration. We needed to process 100 million+ listings in real-time.",
    solution: "Built a sophisticated NLP pipeline combining:\n• BIO Named Entity Recognition for role components\n• Vector embeddings with Apache SOLR for semantic matching\n• Custom tokenization for job title normalization\n• Distributed processing with optimized indexing\n\nThe system learns from historical job title data and user interactions, continuously improving intent detection accuracy.",
    results: [
      "Resolved 100M+ job listings with 95%+ accuracy",
      "Reduced search irrelevance by 78%",
      "Improved user job match quality by 3.2x",
      "Real-time processing at <200ms latency"
    ],
    technologies: ["Python", "NLP/SpaCy", "Apache SOLR", "Vector Embeddings", "PostgreSQL"],
    image: "/project-nlp-semantic.jpg",
    gallery: [
      { url: "/project-nlp-semantic.jpg", caption: "BIO NER Tagging Pipeline - Semantic understanding of job titles" },
      { url: "https://picsum.photos/seed/search2/1200/700", caption: "Vector Embedding Visualization - High-dimensional representation space" },
      { url: "https://picsum.photos/seed/search3/800/600", caption: "Semantic Matching Results - Real-world test case performance" }
    ]
  },
  "seo-content-architect": {
    title: "AI SEO Architect",
    subtitle: "Autonomous Content Generation at Scale",
    category: "Generative AI",
    year: "2024",
    role: "AI Developer",
    client: "WhatJobs",
    description: "Manually creating SEO-optimized descriptions and FAQs for millions of landing pages is impossible. I built an autonomous app that generates high-standard, SEO-optimized content based on real-time search trends. It integrates Google Rich Snippets directly into generated content and runs an automated hyperlinking engine that created over 5 million internal links, massively increasing site crawlability.",
    challenge: "WhatJobs had 5M+ location-based landing pages, each needing unique, SEO-optimized meta descriptions, FAQs, and body content. Manual creation was impossible. Existing content was stale and not optimized for search trends, causing organic traffic stagnation.",
    solution: "Created an end-to-end autonomous content generation system:\n• Real-time search trend analysis via Google Trends API\n• Prompt engineering with GPT-4 for context-aware content\n• Automated Schema.org markup generation for Rich Snippets\n• Intelligent internal linking engine using graph analysis\n• Quality scoring and manual review workflow\n\nContent is generated on-demand and regenerated quarterly for freshness.",
    results: [
      "Generated content for 5M+ pages in 3 weeks",
      "5M+ intelligent internal links created automatically",
      "Organic traffic increased by 180% in 6 months",
      "Core Web Vitals improved to 95+ scores"
    ],
    technologies: ["GPT-4", "Node.js", "Search API", "Schema.org", "Graph Algorithms"],
    image: "/project-seo-content.jpg",
    gallery: [
      { url: "/project-seo-content.jpg", caption: "Content Generation Pipeline - Automated workflow from trending topics to published pages" },
      { url: "https://picsum.photos/seed/seo2/1200/700", caption: "Link Graph Visualization - Intelligent internal linking network across 5M+ pages" },
      { url: "https://picsum.photos/seed/seo3/800/600", caption: "Traffic Impact Dashboard - 180% organic growth over 6 months" }
    ]
  },
  "lucy-ai-assistant": {
    title: "Lucy AI Assistant",
    subtitle: "Conversational Job Search Guidance",
    category: "Conversational AI",
    year: "2023",
    role: "Lead GenAI Engineer",
    client: "WhatJobs",
    description: "Job seekers are often overwhelmed by static search filters. I created 'Lucy', a conversational AI agent that guides users through their career search like a human recruiter. Orchestrated as a Flask-based microservice using GPT-4 and SpaCy, it extracts user preferences from natural dialogue and is served via a custom CORS-enabled iframe. It is currently live in 4 countries serving over 10,000 active users.",
    challenge: "Job search platforms have complex filtering options that overwhelm users. Traditional dropdowns and checkboxes don't provide guidance. Users struggle to articulate their career goals, especially early-career seekers. We needed a conversational interface that felt natural and human-like.",
    solution: "Built Lucy as a conversational AI recruiter:\n• Flask-based microservice architecture with async processing\n• GPT-4 for natural language understanding and generation\n• SpaCy for entity extraction and preference parsing\n• Context management across conversation turns\n• CORS-enabled iframe for seamless platform integration\n• Fallback rules for handling out-of-scope queries",
    results: [
      "10,000+ active users across 4 countries",
      "65% of conversations led to qualified job matches",
      "Average session time: 8.5 minutes (vs 2 min for traditional search)",
      "User satisfaction score: 4.6/5.0"
    ],
    technologies: ["GPT-4", "Flask", "SpaCy", "WebSocket", "Docker"],
    image: "/project-lucy-chat.jpg",
    gallery: [
      { url: "/project-lucy-chat.jpg", caption: "Conversation Flow Design - Natural dialogue guidance through career search" },
      { url: "https://picsum.photos/seed/lucy2/1200/700", caption: "Intent Classification System - Multi-turn context understanding" },
      { url: "https://picsum.photos/seed/lucy3/800/600", caption: "User Preference Extraction - Converting conversation to search parameters" }
    ]
  },
  "autonomous-agents": {
    title: "Autonomous Agents",
    subtitle: "Self-Planning AI for Complex Tasks",
    category: "Agentic Workflows",
    year: "2024",
    role: "AI Researcher",
    client: "Internal R&D",
    description: "Moving from simple chatbots to agents that can 'think' and 'act' autonomously. I utilized LangChain and OpenAI Function Calling to create a system capable of planning its own task execution. This includes a Natural Language-to-SQL pipeline where the agent securely queries a PostgreSQL database, interprets the results, and adjusts its next steps based on data insights.",
    challenge: "Traditional chatbots can only retrieve and format information. Real-world business problems require multi-step reasoning, decision-making, and action execution. How do we let AI agents plan, execute, and adapt without hallucinating or making errors? How do we maintain security when agents query databases?",
    solution: "Developed an autonomous agent framework using:\n• LangChain for orchestration and memory management\n• OpenAI Function Calling for reliable tool invocation\n• Natural Language-to-SQL with validation layers\n• Agent reflection and self-correction loops\n• Audit logging for all database operations\n• Cost optimization through token budgeting\n\nAgents can now plan multi-step workflows, execute them, and adapt based on results.",
    results: [
      "Successfully completes 89% of complex queries without human intervention",
      "Reduces manual data analysis time by 70%",
      "Zero security incidents with full audit trail",
      "Handles 500+ daily agent-executed queries"
    ],
    technologies: ["LangChain", "OpenAI API", "PostgreSQL", "Python", "Redis"],
    image: "/project-agents-workflow.jpg",
    gallery: [
      { url: "/project-agents-workflow.jpg", caption: "Agent Planning Architecture - Multi-step task decomposition and reasoning" },
      { url: "https://picsum.photos/seed/agents2/1200/700", caption: "Tool Execution Pipeline - Secure function calling with validation layers" },
      { url: "https://picsum.photos/seed/agents3/800/600", caption: "Reflection & Adaptation Loop - Self-correction and learning from results" }
    ]
  },
  "resume-parser-rag": {
    title: "Global Resume Parser",
    subtitle: "Multilingual Data Extraction at Scale",
    category: "RAG / Pipelines",
    year: "2023",
    role: "Backend Engineer",
    client: "Global Apps",
    description: "To build a better employer-candidate matching engine, we needed high-fidelity data extraction at scale. I leveraged the Google GenAI SDK and Retrieval-Augmented Generation (RAG) to extract detailed data from over 2 million resumes. This system scaled across 40+ countries and 15 languages, generating standardized JSON profiles for downstream matching operations.",
    challenge: "Resumes come in hundreds of formats (PDF, DOCX, HTML) across 40+ countries and 15 languages. Traditional regex-based parsing fails. We needed to extract structured data (skills, experience, education) with high accuracy for matching algorithms. Resume quality and format vary wildly.",
    solution: "Built a RAG-powered extraction pipeline:\n• Multi-format document parsing (OCR for PDFs via Google Vision)\n• Retrieval-Augmented Generation for context-aware extraction\n• Language detection and multilingual NLP processing\n• Dynamic schema generation based on resume content\n• Confidence scoring for each extracted field\n• Human-in-the-loop for low-confidence extractions\n\nData is standardized into JSON profiles compatible with matching systems.",
    results: [
      "Processed 2M+ resumes successfully",
      "92% accuracy on skills extraction",
      "Supports 15 languages with consistent output",
      "Reduced manual data entry by 85%"
    ],
    technologies: ["Google GenAI", "RAG", "OCR/Vision API", "Python", "PostgreSQL", "Elasticsearch"],
    image: "/project-resume-parser.jpg",
    gallery: [
      { url: "/project-resume-parser.jpg", caption: "Document Processing Pipeline - Multi-format resume parsing with OCR" },
      { url: "https://picsum.photos/seed/parser2/1200/700", caption: "RAG Extraction Accuracy - 92% precision on skills and experience extraction" },
      { url: "https://picsum.photos/seed/parser3/800/600", caption: "Multilingual Support - Consistent extraction across 15 languages and 40+ countries" }
    ]
  },
  "whatjobs-pwa": {
    title: "WhatJobs Native PWA",
    subtitle: "Cross-Platform Job Search Experience",
    category: "Mobile / Config",
    year: "2023",
    role: "Full-Stack Engineer",
    client: "WhatJobs",
    description: "Single-handedly architected a Progressive Web App using Lit and Python Flask, natively packaged for both iOS and Android stores. Designed to function seamlessly across device ecosystems, it implements custom Service Workers for offline capabilities and integrates Firebase Cloud Messaging (FCM) to deliver rich, real-time push notifications to job seekers.",
    challenge: "Building separate iOS and Android apps is expensive and maintains tech debt. Users want a consistent experience across devices. We needed offline functionality for users with unreliable connections. App store reviews and release cycles slow down iterations. How do we reach mobile users efficiently?",
    solution: "Built a Progressive Web App with native app packaging:\n• Lit Web Components for lightweight, performant UI\n• Python Flask backend for API and SSR\n• Custom Service Workers for offline sync and caching\n• Firebase Cloud Messaging for rich push notifications\n• Capacitor/PWA build system for iOS/Android app store packaging\n• Responsive design with mobile-first architecture\n\nSingle codebase deployed to web, iOS App Store, and Google Play.",
    results: [
      "Deployed to web and 2 app stores from single codebase",
      "150K+ app store downloads in first quarter",
      "92% offline functionality rating",
      "45% fewer bugs vs traditional app development"
    ],
    technologies: ["Lit", "Flask", "Service Workers", "Firebase", "Capacitor"],
    image: "/project-pwa-mobile.jpg",
    gallery: [
      { url: "/project-pwa-mobile.jpg", caption: "Responsive Mobile Design - Consistent experience across all devices" },
      { url: "https://picsum.photos/seed/pwa2/1200/700", caption: "Offline Capabilities - Service Workers enabling 92% offline functionality" },
      { url: "https://picsum.photos/seed/pwa3/800/600", caption: "App Store Presence - Single codebase deployed to web, iOS, and Android" }
    ]
  }
};

export default function ProjectDetail() {
  const { isLoading } = useLoader();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const slug = params?.slug as string;
  const project = projectsData[slug];
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // If we are not on the home page, redirect to the home page with the hash
    if (pathname !== '/') {
      router.push(`/${targetId}`);
      return;
    }

    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(targetId);
    } else {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
    <main className="bg-[#050505] text-[#f5f5f5] min-h-screen relative">
      <div className="page-transition-overlay fixed inset-0 bg-[#050505] z-[100] pointer-events-none" />
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-32 pb-16 md:pb-24 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-20">
            <button 
              onClick={() => router.push('/#projects')}
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-12 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
              Back to Portfolio
            </button>

            <div className="mb-8">
              <div className="overflow-hidden mb-3">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight reveal-text opacity-0">
                  {project.title}
                </h1>
              </div>
              <div className="overflow-hidden">
                <p className="text-lg md:text-2xl text-white/60 font-light reveal-text opacity-0">
                  {project.subtitle}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 pt-12 border-t border-white/10">
              <div className="overflow-hidden">
                <div className="reveal-text opacity-0">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Category</p>
                  <p className="font-medium text-base">{project.category}</p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="reveal-text opacity-0">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Year</p>
                  <p className="font-mono text-base">{project.year}</p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="reveal-text opacity-0">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Role</p>
                  <p className="font-medium text-base">{project.role}</p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="reveal-text opacity-0">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Client</p>
                  <p className="font-medium text-base">{project.client}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[600px] relative overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover hero-image opacity-0"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          {/* Overview */}
          <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 py-24 border-b border-white/5 opacity-0">
            <div className="md:col-span-4">
              <h2 className="text-2xl md:text-3xl font-serif mb-2">Overview</h2>
              <div className="w-12 h-1 bg-[#3b82f6] rounded-full"></div>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-white/75">
                {project.description}
              </p>
            </div>
          </div>

          {/* Challenge Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-24 border-b border-white/5">
            <div className="md:col-span-4">
              <h2 className="text-2xl md:text-3xl font-serif mb-2">Challenge</h2>
              <div className="w-12 h-1 bg-[#3b82f6] rounded-full"></div>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-white/75 whitespace-pre-line">
                {project.challenge}
              </p>
            </div>
          </div>

          {/* Solution Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-24 border-b border-white/5">
            <div className="md:col-span-4">
              <h2 className="text-2xl md:text-3xl font-serif mb-2">Solution</h2>
              <div className="w-12 h-1 bg-[#3b82f6] rounded-full"></div>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg md:text-xl font-light leading-relaxed text-white/75 whitespace-pre-line mb-8">
                {project.solution}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string, i: number) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-24 border-b border-white/5">
            <div className="md:col-span-4">
              <h2 className="text-2xl md:text-3xl font-serif mb-2">Results</h2>
              <div className="w-12 h-1 bg-[#3b82f6] rounded-full"></div>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-4">
                {project.results?.map((result: string, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-[#3b82f6] font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-lg font-light text-white/75">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="py-24 border-b border-white/5">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-serif mb-3">Visual Gallery</h2>
              <p className="text-white/50 text-base">Behind-the-scenes looks at the project architecture, workflows, and results</p>
            </div>
            <div className="space-y-16">
              {project.gallery?.map((item: any, i: number) => (
                <div key={i} className="space-y-4 group">
                  <div className="w-full aspect-video relative overflow-hidden rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <Image 
                      src={item.url} 
                      alt={item.caption} 
                      fill 
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover project-image-hover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/70 text-base font-light">{item.caption}</p>
                    <span className="text-white/30 text-sm">0{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-20 py-24">
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl p-12 md:p-16 backdrop-blur-sm hover:border-white/20 hover:from-white/[0.08] transition-all duration-500">
            <h3 className="text-3xl md:text-4xl font-serif mb-4">Ready for your next project?</h3>
            <div className="w-12 h-1 bg-[#3b82f6] rounded-full mb-6"></div>
            <p className="text-lg text-white/70 mb-8 max-w-2xl font-light leading-relaxed">
              I build AI-powered solutions that solve real-world problems at scale. From NLP systems processing millions of records to autonomous agents orchestrating complex workflows. Let's create something exceptional together.
            </p>
            <Link href="/#contact" onClick={(e) => handleScroll(e, '#contact')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-[#2563eb] transition-all duration-300 hover:gap-3 group">
              Get in Touch
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Project Dock (macOS Style) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto flex justify-center">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl mx-auto w-max">
          {projectKeys.map((key, i) => {
            const isActive = key === slug;
            const projectData = projectsData[key];
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
                  <span className={`whitespace-nowrap ${!isActive ? 'hidden md:block' : 'block'}`}>
                    {shortTitle}
                  </span>
                  
                  {!isActive && (
                    <span className="block md:hidden">
                      {i + 1}
                    </span>
                  )}
                </div>
                
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
