'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "Software Engineer - GenAI",
    company: "WHATJOBS?",
    period: "Dec 2023 — Present",
    description: "Developing large language models and implementing RAG architectures for enterprise clients. Optimizing inference pipelines for real-time applications."
  },
  {
    id: 2,
    role: "AI/ML Intern",
    company: "1Stop.ai",
    period: "Jan 2022 — May 2022",
    description: "Built predictive models for customer churn. Collaborated with data scientists to clean and preprocess large datasets using Python and PyTorch."
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
        <h2 className="text-sm uppercase tracking-widest text-white/50 mb-16">02 — Experience</h2>

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
      </div>
    </section>
  );
}
