'use client';

import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SafetyBanner() {
  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-slate-300 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs font-medium gap-2 shadow-inner">
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          CLINICAL DECISION ASSIST PROTOTYPE
        </span>
        <p className="text-slate-300">
          <strong className="text-white">Safety Disclaimer:</strong> Arogya Drishti is a clinical decision-assist prototype and does not replace primary medical diagnostics.
        </p>
      </div>
      <div className="flex items-center gap-4 text-slate-400 text-[11px]">
        <span>Standard RGB Camera Mode: <strong className="text-emerald-400">Active (30 FPS)</strong></span>
        <span>rPPG Engine: <strong className="text-teal-400">POS Signal Extraction</strong></span>
      </div>
    </div>
  );
}
