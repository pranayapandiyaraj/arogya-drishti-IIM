'use client';

import React from 'react';
import { Eye, ShieldAlert, Heart, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Eye className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Arogya Drishti
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                AI NEONATAL VISION
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
              Contactless intelligence for every newborn in the NICU. Replaces invasive wires with 10 Hz rPPG computer vision telemetry.
            </p>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-amber-400 bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
              <ShieldAlert className="w-3 h-3 text-amber-400" /> PROTOTYPE - NOT FOR CLINICAL USE
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li><a href="#platform" className="hover:text-emerald-400 transition-colors">Platform Overview</a></li>
              <li><a href="#technology" className="hover:text-emerald-400 transition-colors">Computer Vision Stack</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Feature Grid</a></li>
              <li><a href="#workflow" className="hover:text-emerald-400 transition-colors">Workflow Stepper</a></li>
              <li><a href="#validation" className="hover:text-emerald-400 transition-colors">Clinical Validation</a></li>
              <li><a href="#deployment" className="hover:text-emerald-400 transition-colors">Deployment Models</a></li>
            </ul>
          </div>

          {/* Compliance & Contact Col */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
              Research & Innovation
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Developed as part of the healthcare innovation initiative at IIM Bangalore NSRCEL.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-400" /> AES-256</span>
              <span>•</span>
              <span>ISO 13485 Compliant Architecture</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Arogya Drishti Platform • IIM Bangalore Innovation Project</p>
          <p className="flex items-center gap-1">
            Engineered with care for neonatal health in India <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </p>
        </div>

      </div>
    </footer>
  );
}
