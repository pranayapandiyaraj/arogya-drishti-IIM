'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Lock, Camera, LineChart, Radio, HeartPulse, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenPortal: () => void;
}

export default function Hero({ onOpenDemo, onOpenPortal }: HeroProps) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-50 overflow-hidden border-b border-slate-200/60">
      
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              LIVE NICU PILOT READY
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Contactless intelligence for every newborn in the NICU.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
              Arogya Drishti replaces wires with computer vision. Continuous heart rate, respiration, oxygen, and pain detection — through a single overhead camera. Built for hospitals, tuned for rural India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-900 text-white font-bold text-sm shadow-lg hover:bg-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                Book a hospital demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenPortal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-slate-900 font-bold text-sm border border-slate-300 shadow-sm hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Open Portal
              </button>
            </div>

            {/* Tech Stack Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-6 border-t border-slate-200/80 w-full text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> AES-256
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
                <Camera className="w-3.5 h-3.5 text-emerald-600" /> MEDIAPIPE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
                <LineChart className="w-3.5 h-3.5 text-emerald-600" /> RPPG
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs">
                <Radio className="w-3.5 h-3.5 text-emerald-600" /> 10 HZ STREAM
              </span>
            </div>
          </motion.div>

          {/* Right Side Visual Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Image Container with Crisp White Card Border */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white p-3 shadow-xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                  <Image
                    src="/images/hero_baby_nicu.png"
                    alt="Newborn infant in a NICU environment monitored by Arogya Drishti overhead camera"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Overlay Top Right: WELLNESS INDEX 92 */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-2 sm:top-4 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3 z-20"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                  92
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">WELLNESS INDEX</div>
                  <div className="text-xs font-extrabold text-slate-900">Optimal Stability</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">95% Confidence Interval</div>
                </div>
              </motion.div>

              {/* Floating Overlay Bottom Right: PROTOTYPE ticker */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-4 -right-2 sm:bottom-4 sm:-right-4 bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 flex flex-col gap-1.5 z-20 min-w-[200px]"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                  <span className="text-[9px] font-mono text-amber-400 font-bold tracking-wider uppercase flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-amber-400" /> PROTOTYPE - NOT FOR CLINICAL USE
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 flex items-center gap-1">
                    <HeartPulse className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> HR:
                  </span>
                  <span className="font-bold text-emerald-400">134 bpm</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">SpO₂:</span>
                  <span className="font-bold text-cyan-400">97%</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
