'use client';

import React from 'react';
import Image from 'next/image';
import { Building2, Landmark, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Deployment() {
  const models = [
    {
      title: 'Private Hospitals',
      description: 'Enterprise SaaS with multi-hospital dashboards and SSO.',
      image: '/images/dep_private_hospital.png',
      icon: Building2,
      badge: 'ENTERPRISE SAAS',
    },
    {
      title: 'Government Hospitals',
      description: 'Affordable, on-prem-friendly deployment for state programmes.',
      image: '/images/dep_gov_hospital.png',
      icon: Landmark,
      badge: 'STATE PROGRAMMES',
    },
    {
      title: 'Rural PHCs',
      description: 'Mobile-first, offline sync, ASHA worker dashboards.',
      image: '/images/dep_rural_phc.png',
      icon: Stethoscope,
      badge: 'MOBILE & OFFLINE',
    },
  ];

  return (
    <section id="deployment" className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Deploy anywhere — tertiary NICU to rural PHC.
          </h2>
          <p className="text-base text-slate-600 font-normal mt-4">
            Flexible architectural tiers supporting multi-hospital networks down to edge offline primary care units.
          </p>
        </div>

        {/* 3 Card Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/90 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-slate-700">
                      {item.badge}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComp className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-xl font-bold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed mt-2">
                      &quot;{item.description}&quot;
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span>Architecture Tier {idx + 1}</span>
                    <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">Details →</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
