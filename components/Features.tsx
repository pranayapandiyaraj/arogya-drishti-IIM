'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  WifiOff, 
  Mic, 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface FeaturesProps {
  onOpenDemo: () => void;
}

export default function Features({ onOpenDemo }: FeaturesProps) {
  const featureList = [
    {
      id: 'offline',
      title: 'Offline AI Support',
      tagline: 'Zero Internet Diagnostic Independence',
      description: 'Rural healthcare clinics often suffer from unreliable 2G/3G connectivity. Arogya Drishti runs fully quantized AI diagnostic models on ruggedized tablets, ensuring 100% operational uptime anywhere.',
      bullets: [
        'Local quantized neural engine with instant inference',
        'Automatic cloud synchronization upon network connection',
        'Full encrypted offline electronic health record storage',
      ],
      image: '/images/feature_offline.png',
      badge: 'Edge Computing',
      icon: WifiOff,
      reverse: false,
    },
    {
      id: 'voice',
      title: 'Multilingual Voice Assistant',
      tagline: 'Voice-First AI for Non-Literate Users',
      description: 'Empower auxiliary nurse midwives (ANMs) and community health workers to record patient symptoms and listen to AI-guided diagnosis in their local dialect.',
      bullets: [
        'Supports 12 Indian languages including Hindi, Tamil, Telugu, & Marathi',
        'Automatic clinical terminology translation and record structuring',
        'Hands-free voice prompts for guided maternal risk evaluation',
      ],
      image: '/images/feature_voice.png',
      badge: 'Natural Language AI',
      icon: Mic,
      reverse: true,
    },
    {
      id: 'dashboard',
      title: 'Real-time Triage Dashboard',
      tagline: 'District Telemetry & Bed Management',
      description: 'Provide district health officers and hospital specialists with instant visibility into village health camps, urgent high-risk pregnancy alerts, and ICU bed availability.',
      bullets: [
        'Live GIS heatmap of disease outbreaks & maternal health status',
        'One-tap tele-consultation escalation to district doctors',
        'Predictive bed allocation and ambulance referral routing',
      ],
      image: '/images/feature_dashboard.png',
      badge: 'Clinical Command',
      icon: LayoutDashboard,
      reverse: false,
    },
    {
      id: 'schemes',
      title: 'Government Scheme Recommendation',
      tagline: 'Automated Financial & Benefit Guidance',
      description: 'Instantly match patients with relevant central and state healthcare insurance programs such as Ayushman Bharat (AB-PMJAY), ensuring no rural family faces catastrophic health expenses.',
      bullets: [
        'Automatic Aadhaar & Ration Card benefit matching engine',
        'Instant cashless hospital admission pre-authorization assistance',
        'Transparent subsidy tracking for medicines & diagnostics',
      ],
      image: '/images/hero_doctor.png',
      badge: 'Policy & Welfare',
      icon: FileText,
      reverse: true,
    },
    {
      id: 'analytics',
      title: 'Predictive Epidemic Analytics',
      tagline: 'Early Outbreak Warning Signals',
      description: 'Aggregate symptom trends across rural primary health centers to detect seasonal vector-borne or water-borne disease outbreaks up to 14 days before traditional reporting.',
      bullets: [
        'Machine learning anomaly detection across water quality & symptom logs',
        'Automated preventative resource dispatch warnings to local panchayats',
        'Longitudinal community epidemiological mapping',
      ],
      image: '/images/feature_offline.png',
      badge: 'Public Health Vision',
      icon: TrendingUp,
      reverse: false,
    },
    {
      id: 'hospital',
      title: 'Seamless Hospital Integration',
      tagline: 'Interoperable ABDM & EMR Standards',
      description: 'Connect local village diagnostic logs directly into district civil hospitals and tertiary care centers without data silos or duplicate manual data entry.',
      bullets: [
        'ABDM compliant Ayushman Bharat Health Account (ABHA) creation',
        'FHIR standard compliant data pipelines for seamless EHR export',
        'Direct doctor referral note generator with attached AI diagnostic telemetry',
      ],
      image: '/images/feature_dashboard.png',
      badge: 'Interoperability',
      icon: Building2,
      reverse: true,
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            Deep Capability Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Built Specifically for Rural Healthcare Reality
          </h2>
          <p className="text-lg text-gray-600 font-normal leading-relaxed">
            Every feature is engineered to solve real ground-level challenges faced by rural doctors, nurses, and patient communities.
          </p>
        </div>

        {/* Alternating Feature Items */}
        <div className="space-y-24">
          {featureList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  item.reverse ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: item.reverse ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`lg:col-span-6 ${item.reverse ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    {item.badge}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <div className="text-sm font-semibold text-emerald-600 mb-4">
                    {item.tagline}
                  </div>

                  <p className="text-base text-gray-600 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-3 mb-8">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <button
                    onClick={onOpenDemo}
                    className="px-6 py-2.5 rounded-full bg-navy-900 text-white text-sm font-semibold hover:bg-emerald-600 transition-all shadow-md flex items-center gap-2 group"
                  >
                    Learn about {item.title}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Illustration Image Side */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`lg:col-span-6 ${item.reverse ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-white p-3">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
