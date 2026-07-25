'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Building2, Clock, Users } from 'lucide-react';
export default function Stats() {
  const statItems = [
    {
      value: '98%',
      label: 'Prediction Accuracy',
      description: 'Validated by clinical trials in rural primary health centers.',
      icon: Target,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      value: '50+',
      label: 'Hospitals',
      description: 'Integrated across district centers & secondary hospitals.',
      icon: Building2,
      color: 'text-brandBlue-500',
      bgColor: 'bg-blue-50',
    },
    {
      value: '24/7',
      label: 'AI Monitoring',
      description: 'Continuous offline & edge automated triage scanning.',
      icon: Clock,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      value: '100K+',
      label: 'Patients Supported',
      description: 'Lives impacted through proactive early intervention.',
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];
  return (
    <section className="py-16 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-soft hover:shadow-xl hover:border-emerald-300 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    Impact
                  </span>
                </div>

                <div className="text-4xl font-extrabold text-navy-900 tracking-tight mb-1 group-hover:text-emerald-600 transition-colors">
                  {item.value}
                </div>

                <div className="text-base font-bold text-gray-800 mb-1">
                  {item.label}
                </div>

                <p className="text-xs text-gray-500 font-normal leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
