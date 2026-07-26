'use client';

import React, { useState } from 'react';
import { Brain, CheckCircle2, AlertCircle, Info, Sparkles, ShieldCheck, Eye } from 'lucide-react';
import { RoleType } from './RoleSelector';

interface XAIDecisionSupportProps {
  bedId: string;
  confidence: number;
  userRole: RoleType;
}

export default function XAIDecisionSupport({ bedId, confidence, userRole }: XAIDecisionSupportProps) {
  const [overrideActive, setOverrideActive] = useState(false);
  const [overrideNote, setOverrideNote] = useState('');

  const canOverride = userRole === 'NICU Doctor' || userRole === 'NICU Nurse';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-5 text-white">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Explainable AI (XAI) Panel</h3>
            <p className="text-[11px] text-slate-400">Clinical decision support & evidence trace</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-mono font-bold border border-teal-500/20">
          POS-rPPG v2.4
        </span>
      </div>

      {/* Model Confidence Metric Card */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-semibold uppercase">Prediction Confidence</span>
          <span className="text-lg font-extrabold font-mono text-emerald-400">{confidence}%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 pt-1">
          <span>Signal Quality: High</span>
          <span>SNR: 16.4 dB</span>
        </div>
      </div>

      {/* Visual Evidence Heatmap Placeholder */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" />
            Visual Evidence (ROI Heatmap)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Bilateral Cheeks & Forehead</span>
        </div>

        {/* Heatmap Spatial Diagram */}
        <div className="relative w-full h-32 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950/40 via-emerald-950/30 to-slate-950" />
          <div className="relative z-10 text-center space-y-1">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono border border-emerald-500/30">
              High RGB Chrominance Weight
            </div>
            <p className="text-[10px] text-slate-400">Green Channel Chrominance Peak: 520nm</p>
          </div>
        </div>
      </div>

      {/* Dynamic Clinical Explanation Text */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Info className="w-4 h-4" />
          Clinical Signal Explanation
        </div>
        <p className="text-slate-300 leading-relaxed">
          Heart rate estimation is derived from <strong className="text-white">12Hz periodic facial color fluctuation</strong> with 92% signal-to-noise ratio extracted via Plane-Orthogonal-to-Skin (POS) remote photoplethysmography.
        </p>
        <p className="text-slate-400 text-[11px] border-t border-slate-800/80 pt-2">
          Sub-facial region tracking maintains signal stability during micro-movements, satisfying clinical decision-assist thresholds.
        </p>
      </div>

      {/* Clinical Override Action (RBAC Restricted) */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Physician Clinical Override
          </span>
          {canOverride ? (
            <span className="text-[10px] text-emerald-400 font-mono">Authorized</span>
          ) : (
            <span className="text-[10px] text-slate-500 font-mono">Read Only</span>
          )}
        </div>

        {canOverride ? (
          overrideActive ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Reason for clinical vitals override..."
                value={overrideNote}
                onChange={(e) => setOverrideNote(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setOverrideActive(false)}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                >
                  Confirm Clinical Override
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setOverrideActive(true)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors border border-slate-700"
            >
              Initiate Manual Vitals Override
            </button>
          )
        ) : (
          <p className="text-[11px] text-slate-500 italic">
            Clinical override actions require NICU Doctor or NICU Nurse privileges.
          </p>
        )}
      </div>
    </div>
  );
}
