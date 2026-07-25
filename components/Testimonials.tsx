'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, Star, Building, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Arogya Drishti transformed our district primary health center. The offline AI disease prediction enabled our team to spot early signs of chronic kidney disease and severe anemia weeks before symptoms escalated.",
      author: "Dr. Rajesh Sharma",
      role: "Chief Medical Officer",
      location: "District Health Center, Maharashtra",
      avatar: "/images/doctor_avatar.png",
      rating: 5,
    },
    {
      quote: "As an ANM midwife covering 8 remote villages, internet connection was always my biggest barrier. Arogya Drishti's offline voice assistant lets me log high-risk maternal vitals in Marathi effortlessly.",
      author: "Sister Sunita Devi",
      role: "Senior Auxiliary Nurse Midwife (ANM)",
      location: "Community Health Post, Madhya Pradesh",
      avatar: "/images/nurse_avatar.png",
      rating: 5,
    },
    {
      quote: "The real-time triage dashboard gives us district-wide visibility over maternal emergency referrals and ICU bed allocation. It has cut our emergency response handoff times by over 40%.",
      author: "Vikramaditya Patel",
      role: "State Public Healthcare Officer",
      location: "Department of Health & Family Welfare",
      avatar: "/images/doctor_avatar.png",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-gray-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-200">
            Field Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight mb-4">
            Trusted by Doctors & Frontline Workers
          </h2>
          <p className="text-lg text-gray-600 font-normal leading-relaxed">
            Hear from medical professionals and health administration leaders using Arogya Drishti every day.
          </p>
        </div>

        {/* 3 Premium Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-soft hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-emerald-200 group-hover:text-emerald-400 transition-colors" />
                </div>

                <p className="text-gray-700 text-sm leading-relaxed italic mb-8 font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shadow-sm flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-navy-900 group-hover:text-emerald-600 transition-colors">
                    {item.author}
                  </h4>
                  <div className="text-xs font-semibold text-emerald-700">
                    {item.role}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {item.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
