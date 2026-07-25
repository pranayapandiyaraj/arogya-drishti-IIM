'use client';

import React from 'react';
import { Activity, Twitter, Linkedin, Github, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white border-t border-gray-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-emerald-glow">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-tight leading-none">
                  Arogya Drishti
                </span>
                <span className="text-[10px] font-medium text-emerald-400 tracking-wider uppercase mt-0.5">
                  AI Healthcare Platform
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-normal">
              Arogya Drishti is pioneering AI-driven healthcare solutions for rural and underserved communities. Empowering clinicians and ANMs with offline disease prediction, maternal care telemetry, and voice assistant tools.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 hover:bg-emerald-500 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 hover:bg-emerald-500 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 hover:bg-emerald-500 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-900 hover:bg-emerald-500 text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li><a href="#platform" className="hover:text-white transition-colors">Platform Capabilities</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Rural Features</a></li>
              <li><a href="#workflow" className="hover:text-white transition-colors">Diagnostic Workflow</a></li>
              <li><a href="#validation" className="hover:text-white transition-colors">Clinical Validation</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Compliance</a></li>
            </ul>
          </div>

          {/* Technology Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Technology
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li><a href="#technology" className="hover:text-white transition-colors">Edge AI Inference</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Computer Vision Screening</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Multilingual Voice NLP</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">ABDM & FHIR Security</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Predictive Epidemiology</a></li>
            </ul>
          </div>

          {/* Contact & Office Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Contact & HQ
            </h4>
            <ul className="space-y-3 text-sm text-gray-400 font-normal">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                <span>HealthTech Innovation Hub, Cyber City, Gurugram, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>contact@arogyadrishti.ai</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+91 1800-AROGYA-AI</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © {new Date().getFullYear()} Arogya Drishti Health Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Security & ABDM</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
