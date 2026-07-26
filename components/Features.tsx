'use client';

import React from 'react';
import { Camera, Activity, Cpu, Award, Users, Building } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: Camera,
      title: 'Contactless rPPG',
      description: 'Forehead ROI + POS pipeline extracts heart rate at 10 Hz.',
      tag: 'Core Vision',
    },
    {
      icon: Activity,
      title: 'Respiration & SpO₂',
      description: 'Chest micro-motion + colour-based estimation (research prototype).',
      tag: 'Telemetry',
    },
    {
      icon: Cpu,
      title: 'Explainable AI',
      description: 'Claude-powered clinical summary with parameter contributions.',
      tag: 'GenAI Clinical',
    },
    {
      icon: Award,
      title: 'Neonatal Wellness Index',
      description: '0–100 composite score with confidence intervals.',
      tag: 'Risk Scoring',
    },
    {
      icon: Users,
      title: 'Role-based access',
      description: 'Doctor, nurse, admin, ASHA, parent — each their own view.',
      tag: 'Access Control',
    },
    {
      icon: Building,
      title: 'Multi-hospital SaaS',
      description: 'Enterprise dashboards, audit logs and research mode.',
      tag: 'Enterprise',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Everything a NICU command centre needs, nothing it doesn&apos;t.
          </h2>
          <p className="text-base text-slate-600 font-normal">
            Streamlined neonatal telemetry engineered for high-acuity intensive care and low-resource rural clinics.
          </p>
        </div>

        {/* 6-Card Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-emerald-400 transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-slate-200/80">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal leading-relaxed">
                    &quot;{item.description}&quot;
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
