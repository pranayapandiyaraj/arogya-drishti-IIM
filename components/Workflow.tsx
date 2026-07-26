'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Workflow() {
  const steps = [
    { num: '01', title: 'AI detects', desc: 'Overhead camera detects rPPG anomaly' },
    { num: '02', title: 'Alert generated', desc: 'Wellness index confidence drop flagged' },
    { num: '03', title: 'Doctor notified', desc: 'Push alert sent to attending physician' },
    { num: '04', title: 'Acknowledged', desc: 'Nurse/Clinician accepts bed alert' },
    { num: '05', title: 'Intervention logged', desc: 'Bedside action recorded in portal' },
    { num: '06', title: 'Patient stabilised', desc: 'Vitals normalize back to baseline' },
    { num: '07', title: 'Report generated', desc: 'Automated clinical audit trail saved' },
  ];

  return (
    <section id="workflow" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            From detection to documentation, in one line.
          </h2>
          <p className="text-base text-slate-600 font-normal mt-4">
            End-to-end clinical workflow automation reducing nurse burnout and reaction times.
          </p>
        </div>

        {/* Horizontal Linear Timeline Stepper */}
        <div className="relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.07 }}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-3 shadow-xs">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-normal leading-normal">
                    {step.desc}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block text-right text-slate-300 text-xs font-bold pt-2">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
