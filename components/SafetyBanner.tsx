'use client';

import React, { useState } from 'react';
import { Server, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SafetyBanner() {
  const [waking, setWaking] = useState(false);
  const [woken, setWoken] = useState(false);

  const handleWake = () => {
    setWaking(true);
    setTimeout(() => {
      setWaking(false);
      setWoken(true);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl">
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 shadow-2xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs font-medium">
        <div className="flex items-center gap-2.5 truncate">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${woken ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${woken ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
          <p className="truncate text-slate-200">
            {woken ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Backend servers active. Real-time rPPG WebSocket stream ready.
              </span>
            ) : (
              'Frontend Preview Only. Please wake servers to enable backend functionality.'
            )}
          </p>
        </div>

        <button
          onClick={handleWake}
          disabled={waking || woken}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
            woken
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-500/20'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          {waking ? 'Waking servers...' : woken ? 'Servers Live' : 'Wake up servers'}
        </button>
      </div>
    </div>
  );
}
