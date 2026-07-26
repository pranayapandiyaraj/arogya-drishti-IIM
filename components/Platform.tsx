'use client';

import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Platform() {
  const problems = [
    'Adhesive sensors damage neonatal skin',
    'Wires restrict positioning and kangaroo care',
    'Alarms overwhelm nursing staff',
    'Rural PHCs cannot afford enterprise monitors',
  ];

  const solutions = [
    'Camera-only, zero-contact vitals via rPPG',
    'Explainable AI risk score with clinician-ready summary',
    'Alert prioritisation reduces false alarms',
    'Runs on tablet + webcam for rural deployment',
  ];

  return (
    <section id="platform" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Traditional NICU monitoring is invasive, wired, and unreachable for rural India.
          </h2>
        </div>

        {/* Comparison 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column: TODAY (Red Accents) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 border border-red-200/80 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-100">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  TODAY
                </span>
                <span className="text-xs font-semibold text-slate-400">Traditional Monitors</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Invasive Wired Monitoring
              </h3>
              <ul className="space-y-4">
                {problems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-red-50 text-xs text-red-600 font-semibold">
              High skin damage risk & high hardware cost barrier
            </div>
          </motion.div>

          {/* Right Column: AROGYA DRISHTI (Green/Dark Card) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  AROGYA DRISHTI
                </span>
                <span className="text-xs font-semibold text-slate-400">Next-Gen Vision AI</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Contactless Computer Vision
              </h3>
              <ul className="space-y-4">
                {solutions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-emerald-400 font-semibold flex items-center justify-between">
              <span>Zero skin contact • 100% Non-invasive</span>
              <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">10 Hz rPPG</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
