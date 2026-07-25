'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';

export default function Validation() {
  const metrics = [
    {
      percentage: '95%',
      title: 'AI Diagnostic Accuracy',
      description: 'Validated in clinical trial comparison with expert radiologist and pathologist benchmarks.',
      badge: 'Clinical Grade',
      barWidth: 'w-[95%]',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      percentage: '85%',
      title: 'Early Detection Improvement',
      description: 'Increase in identifying high-risk maternal anemia, hypertension, and diabetes in Trimester 1.',
      badge: 'Maternal Impact',
      barWidth: 'w-[85%]',
      color: 'from-blue-500 to-blue-600',
    },
    {
      percentage: '70%',
      title: 'Reduction in Manual Screening Time',
      description: 'Streamlined intake workflows allowing community nurses to evaluate twice as many patients daily.',
      badge: 'Efficiency Gain',
      barWidth: 'w-[70%]',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section id="validation" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            Clinical Validation & Efficacy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Proven Clinical Impact
          </h2>
          <p className="text-lg text-gray-600 font-normal leading-relaxed">
            Rigorous validation conducted across district hospitals and rural health posts, delivering measurable outcomes.
          </p>
        </div>

        {/* 3 Metric Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-gray-200 shadow-soft hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {item.badge}
                  </span>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>

                <div className="text-5xl font-extrabold text-navy-900 tracking-tight mb-2">
                  {item.percentage}
                </div>

                <h3 className="text-lg font-bold text-navy-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              {/* Visual Progress Bar */}
              <div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: item.percentage }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
                <div className="mt-2 text-[11px] text-right font-mono font-medium text-gray-400">
                  Target Efficacy Met
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
