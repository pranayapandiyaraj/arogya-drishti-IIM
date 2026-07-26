'use client';

import React from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Validation() {
  return (
    <section id="validation" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Honest about what&apos;s ready, and what&apos;s not.
          </h2>
          <p className="text-base text-slate-600 font-normal mt-4">
            Transparent clinical validation maturity model and engineering deployment roadmap.
          </p>
        </div>

        {/* 3-Column Status Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          
          {/* 1. IMPLEMENTED (Green Tag) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  IMPLEMENTED
                </span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Production-Ready Platform
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                JWT auth, role-based portal, patient CRUD, alert workflow, analytics.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-semibold text-emerald-700">
              ✓ Fully functional software stack
            </div>
          </motion.div>

          {/* 2. PROTOTYPE (Yellow Tag) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  PROTOTYPE
                </span>
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Research Pipeline
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                MediaPipe overlay, rPPG heart rate, respiration and SpO₂ estimation, explainable AI.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-semibold text-amber-700">
              ⚡ Active pilot demonstration
            </div>
          </motion.div>

          {/* 3. FUTURE (Blue Tag) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                  FUTURE
                </span>
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Clinical Expansion
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                Multi-site clinical validation, regulatory filings, seizure detection, digital twin.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-semibold text-blue-700">
              🚀 Planned clinical trials
            </div>
          </motion.div>

        </div>

        {/* Roadmap Bar Below */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">
            COMMERCIALISATION ROADMAP
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-slate-200 font-mono text-center">
            <span className="bg-slate-800 text-amber-400 px-3 py-1.5 rounded-lg border border-slate-700">PROTOTYPE</span>
            <span className="text-slate-500">→</span>
            <span className="bg-slate-800 text-emerald-400 px-3 py-1.5 rounded-lg border border-slate-700">HOSPITAL PILOT</span>
            <span className="text-slate-500">→</span>
            <span className="bg-slate-800 text-cyan-400 px-3 py-1.5 rounded-lg border border-slate-700">CLINICAL VALIDATION</span>
            <span className="text-slate-500">→</span>
            <span className="bg-slate-800 text-blue-400 px-3 py-1.5 rounded-lg border border-slate-700">REGULATORY APPROVAL</span>
            <span className="text-slate-500">→</span>
            <span className="bg-slate-800 text-indigo-400 px-3 py-1.5 rounded-lg border border-slate-700">COMMERCIAL DEPLOYMENT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
