'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenVideo: () => void;
}

export default function Hero({ onOpenDemo, onOpenVideo }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI Powered Healthcare
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-900 tracking-tight leading-[1.15] mb-6">
              Revolutionizing <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-brandBlue-600">
                Rural Healthcare
              </span>{' '}
              with AI.
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 font-normal leading-relaxed mb-8 max-w-xl">
              Arogya Drishti is an AI-powered healthcare platform designed for rural communities. It enables early disease prediction, maternal and child health monitoring, multilingual voice assistance, offline support, and smart hospital integration to improve healthcare accessibility.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-navy-900 text-white font-semibold text-base shadow-lg hover:bg-emerald-600 hover:shadow-emerald-glow transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Book Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenVideo}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-navy-900 font-semibold text-base border border-gray-300 shadow-sm hover:bg-gray-50 hover:border-navy-900 transition-all duration-300 flex items-center justify-center gap-2.5 group"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                Watch Video
              </button>
            </div>

            {/* Trust highlights under buttons */}
            <div className="mt-10 pt-6 border-t border-gray-200/80 flex items-center gap-6 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>ICMR Standard Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-emerald-500" />
                <span>Zero Internet Edge AI</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Visual & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Main Rounded Image Card */}
              <div className="relative rounded-3xl overflow-hidden border border-gray-200/80 shadow-2xl bg-white p-2.5">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                  <Image
                    src="/images/hero_doctor.png"
                    alt="Doctor using Arogya Drishti AI healthcare diagnostic platform"
                    fill
                    priority
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle glass overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Card Top-Right: Health Score 96 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-4 sm:top-4 sm:-right-6 glass-card p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/80 z-20"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                  96
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Health Score</div>
                  <div className="text-sm font-extrabold text-navy-900">Optimal Prognosis</div>
                  <div className="text-[11px] text-emerald-600 font-medium">↑ High Precision Index</div>
                </div>
              </motion.div>

              {/* Floating Card Bottom-Left: ✔ AI Diagnosis Active */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
                className="absolute -bottom-6 -left-4 sm:bottom-6 sm:-left-6 glass-card px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white/80 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-navy-900">AI Diagnosis Active</span>
                  </div>
                  <div className="text-xs text-gray-500">Real-time Diagnostic Scan</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
