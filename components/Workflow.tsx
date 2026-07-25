'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, BrainCircuit, Activity, UserCheck, FileCheck, ArrowRight, ChevronDown } from 'lucide-react';

export default function Workflow() {
  const steps = [
    {
      step: '01',
      title: 'Collect Health Data',
      description: 'ANM/Worker gathers patient vitals, symptoms, and medical history using tablet app.',
      icon: Database,
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Quantized neural models perform local edge inference in seconds without internet.',
      icon: BrainCircuit,
    },
    {
      step: '03',
      title: 'Disease Prediction',
      description: 'System computes risk score, flags critical alerts, and stratifies urgency level.',
      icon: Activity,
    },
    {
      step: '04',
      title: 'Doctor Recommendation',
      description: 'Tele-consultation dashboard alerts district doctors with diagnostic insights.',
      icon: UserCheck,
    },
    {
      step: '05',
      title: 'Health Report',
      description: 'Generates multilingual digital prescription and localized care path plan.',
      icon: FileCheck,
    },
  ];

  return (
    <section id="workflow" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            End-to-End Care Delivery
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Seamless Diagnostic Workflow
          </h2>
          <p className="text-lg text-gray-600 font-normal leading-relaxed">
            How Arogya Drishti connects front-line healthcare workers with district medical experts in 5 simple steps.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={item.step} className="relative flex flex-col items-center text-center group">
                
                {/* Arrow connector between steps */}
                {!isLast && (
                  <div className="absolute top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-emerald-400 via-emerald-200 to-gray-200 z-0">
                    <motion.div
                      animate={{ x: [0, 20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-1.5 right-0 text-emerald-500"
                    >
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </motion.div>
                  </div>
                )}

                {/* Step Circle Icon */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-2xl bg-white border-2 border-emerald-500 shadow-lg text-emerald-600 flex items-center justify-center relative z-10 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-8 h-8 stroke-[2]" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-navy-900 text-white font-bold text-xs flex items-center justify-center border-2 border-white shadow">
                    {item.step}
                  </span>
                </motion.div>

                {/* Step Title & Description */}
                <h3 className="text-base font-bold text-navy-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden flex flex-col gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-200/80 shadow-soft"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex-shrink-0 flex items-center justify-center font-bold text-lg">
                  <Icon className="w-7 h-7" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
