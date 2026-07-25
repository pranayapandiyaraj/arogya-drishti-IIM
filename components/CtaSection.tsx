'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Sparkles, ShieldCheck } from 'lucide-react';

interface CtaProps {
  onOpenDemo: () => void;
  onOpenContact: () => void;
}

export default function CtaSection({ onOpenDemo, onOpenContact }: CtaProps) {
  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-[2.5rem] bg-navy-950 text-white overflow-hidden p-8 sm:p-12 lg:p-16 border border-gray-800 shadow-2xl">
          
          {/* Ambient Glowing Background Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-dark-grid-overlay opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Transform Rural Healthcare Today
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Bring AI Healthcare to Every Village.
            </h2>

            <p className="text-lg text-gray-300 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              Partner with Arogya Drishti to deploy early disease prediction, offline AI diagnostic tools, and maternal telemetry across your state, district, or hospital network.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 text-white font-bold text-base shadow-lg hover:bg-emerald-600 hover:shadow-emerald-glow transition-all duration-300 flex items-center justify-center gap-2.5 group"
              >
                Request Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-bold text-base border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <Mail className="w-5 h-5" />
                Contact Sales
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-medium text-gray-400 border-t border-white/10 pt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ABDM & Ayushman Bharat Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Rapid 48-Hour Pilot Onboarding</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>24/7 Enterprise Clinical Support</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
