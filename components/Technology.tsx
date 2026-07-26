'use client';

import React from 'react';
import Image from 'next/image';
import { Code, Server, Eye, Radio, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Technology() {
  const stack = [
    {
      category: 'Frontend',
      tech: 'React • Tailwind • Recharts',
      icon: Code,
    },
    {
      category: 'Backend',
      tech: 'FastAPI • MongoDB • WebSockets',
      icon: Server,
    },
    {
      category: 'Computer Vision',
      tech: 'MediaPipe FaceMesh • POS rPPG',
      icon: Eye,
    },
    {
      category: 'Signal Processing',
      tech: 'Welch PSD • Butterworth',
      icon: Radio,
    },
    {
      category: 'AI',
      tech: 'Claude Sonnet 4.5 • Explainable AI',
      icon: Cpu,
    },
    {
      category: 'Security',
      tech: 'JWT • AES-256 • Audit Logs',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="technology" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 mb-4 inline-block">
            ARCHITECTURE & STACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Computer vision meets clinical AI.
          </h2>
        </div>

        {/* Featured Dark Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Grid: Stack Items */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {stack.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white font-mono">
                    {item.tech}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Visual: Image of NICU medical monitors */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-2.5 shadow-2xl">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/nicu_monitors.png"
                  alt="High-resolution image of NICU medical monitors and equipment setup"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-emerald-400 font-mono font-semibold">
                  10 Hz Real-Time Computer Vision Telemetry Feed
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
