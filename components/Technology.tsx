'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Cpu, MessageSquareCode, CloudLightning, ShieldCheck, Sparkles } from 'lucide-react';

export default function Technology() {
  const techCards = [
    {
      title: 'Computer Vision',
      subtitle: 'Diagnostic Imaging AI',
      description: 'High-speed neural networks for on-device X-ray classification, ultrasound analysis, and rapid dermatological screening with 98% concordance.',
      icon: Eye,
      gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
      borderGlow: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      title: 'Machine Learning',
      subtitle: 'Predictive Health Risk Models',
      description: 'Multi-parametric risk scoring trained on over 500,000 anonymized clinical histories for early detection of maternal complications and chronic diseases.',
      icon: Cpu,
      gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
      borderGlow: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]',
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Natural Language Processing',
      subtitle: 'Multilingual Clinical Voice AI',
      description: 'Real-time speech recognition models optimized for 12 Indian regional languages and dialects, enabling hands-free clinical documentation.',
      icon: MessageSquareCode,
      gradient: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
      borderGlow: 'hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      title: 'Cloud + Edge Computing',
      subtitle: 'Hybrid Offline-First Architecture',
      description: 'Zero-latency edge inference on low-power tablet hardware with background cloud synchronization whenever network connectivity becomes available.',
      icon: CloudLightning,
      gradient: 'from-teal-500/20 via-teal-500/5 to-transparent',
      borderGlow: 'hover:border-teal-500/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]',
      iconBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    },
  ];

  return (
    <section id="technology" className="py-24 bg-navy-950 text-white relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-dark-grid-overlay opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Cutting-Edge Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Powered by Modern AI Technology
          </h2>
          <p className="text-lg text-gray-400 font-normal leading-relaxed">
            Built on state-of-the-art deep learning architectures, lightweight quantized models, and privacy-preserving edge execution pipelines.
          </p>
        </div>

        {/* 4 Tech Cards Grid with Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCards.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 bg-navy-900/80 border border-gray-800 transition-all duration-300 ${tech.borderGlow} group overflow-hidden`}
              >
                {/* Subtle gradient background highlight */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${tech.iconBg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>
                  <span className="text-xs font-mono font-medium text-emerald-400/80 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    0{idx + 1}
                  </span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  {tech.subtitle}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {tech.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed font-normal">
                  {tech.description}
                </p>

                <div className="mt-8 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" /> HIPAA & ABDM Compliant Architecture
                  </span>
                  <span className="font-mono text-gray-500">&lt;Latency &lt; 50ms&gt;</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
