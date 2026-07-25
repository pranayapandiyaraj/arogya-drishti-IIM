'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  HeartHandshake, 
  Baby, 
  Scan, 
  WifiOff, 
  Mic, 
  LayoutDashboard, 
  FileText 
} from 'lucide-react';

export default function Platform() {
  const cards = [
    {
      title: 'AI Disease Prediction',
      description: 'Advanced machine learning models analyze vital signs and clinical symptoms to detect chronic & acute diseases early.',
      icon: Stethoscope,
      accent: 'emerald',
    },
    {
      title: 'Maternal Care Assistant',
      description: 'Tracks high-risk pregnancies, sends trimester alerts, and assists ANMs with automated risk stratification.',
      icon: HeartHandshake,
      accent: 'blue',
    },
    {
      title: 'Child Health Monitoring',
      description: 'Growth tracking, digital immunization cards, and early screening for pediatric nutritional deficiencies.',
      icon: Baby,
      accent: 'indigo',
    },
    {
      title: 'Medical Image Analysis',
      description: 'Edge-based computer vision for instant X-ray triage, skin lesion analysis, and diabetic retinopathy scans.',
      icon: Scan,
      accent: 'purple',
    },
    {
      title: 'Offline AI Support',
      description: 'Runs lightweight quantized AI models locally on tablets without requiring persistent internet connections.',
      icon: WifiOff,
      accent: 'teal',
    },
    {
      title: 'Voice Assistant',
      description: 'Multilingual conversational AI supporting local regional dialects for non-literate community health workers.',
      icon: Mic,
      accent: 'amber',
    },
    {
      title: 'Hospital Dashboard',
      description: 'Centralized telemetry command center for bed management, referral tracking, and ICU triage.',
      icon: LayoutDashboard,
      accent: 'cyan',
    },
    {
      title: 'Government Scheme Guidance',
      description: 'Automated eligibility matching for Ayushman Bharat (AB-PMJAY) and state healthcare subsidies.',
      icon: FileText,
      accent: 'rose',
    },
  ];

  return (
    <section id="platform" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            Platform Overview
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            One Intelligent Platform.
          </h2>
          <p className="text-lg text-gray-600 font-normal leading-relaxed">
            A comprehensive healthcare operating system built ground-up to bridge rural diagnostic gaps with cutting-edge artificial intelligence.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-soft hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 text-navy-900 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2.5 group-hover:text-emerald-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore capability</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
