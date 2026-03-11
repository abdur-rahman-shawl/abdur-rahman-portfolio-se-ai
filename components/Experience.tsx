'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "AI & Web Developer",
    company: "What Digital Technologies (WhatJobs)",
    period: "Dec 2023 — Present",
    description: "Leading a full-stack engineering team to orchestrate autonomous LLM workflows and semantic search engines. Deployed private LLMs via Ollama on GCP servers to reduce third-party API costs by 40%. Architected a high-performance categorization engine resolving 100M+ real-world job listings and authored 300+ pytest suites to guarantee enterprise-grade stability."
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.exp-item');

      items.forEach((item: any, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
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
    <section ref={sectionRef} className="py-32 px-6 md:px-20 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-white/50 mb-16">02 — Experience & Skills</h2>

        <div className="flex flex-col gap-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="exp-item group relative border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-8">
              <div className="md:w-1/3">
                <p className="text-white/50 font-mono text-sm mb-2">{exp.period}</p>
                <h3 className="text-2xl font-serif">{exp.role}</h3>
                <p className="text-blue-400 font-medium mt-1">{exp.company}</p>
              </div>
              <div className="md:w-2/3">
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {/* Hover effect background */}
              <div className="absolute inset-0 bg-white/[0.02] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 -z-10 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Technical Arsenal */}
        <div className="mt-32 border-t border-white/10 pt-16 exp-item">
          <h3 className="text-2xl font-serif text-white mb-12">Technical Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
               <h4 className="text-blue-500 font-medium mb-4 uppercase tracking-widest text-xs">GenAI & NLP</h4>
               <p className="text-white/70 font-light text-sm leading-relaxed">LLM Orchestration (OpenAI, Gemini, Anthropic), Autonomous Agents, RAG Patterns, Prompt Engineering, Function Calling, BIO NER Tagging, SpaCy.</p>
            </div>
            <div>
               <h4 className="text-blue-500 font-medium mb-4 uppercase tracking-widest text-xs">Backend & Infrastructure</h4>
               <p className="text-white/70 font-light text-sm leading-relaxed">Python (FastAPI, Flask, Django), Node.js, Linux Scripting, Docker, GCP, asyncio. Frontend UI via React & Next.js.</p>
            </div>
            <div>
               <h4 className="text-blue-500 font-medium mb-4 uppercase tracking-widest text-xs">Data & Search</h4>
               <p className="text-white/70 font-light text-sm leading-relaxed">PostgreSQL (Supabase), Redis, Apache SOLR, Vector DBs (pgvector, ChromaDB), Semantic Search Optimization, Schema.org.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
