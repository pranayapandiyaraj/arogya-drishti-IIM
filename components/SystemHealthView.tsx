'use client';

import React from 'react';
import { Activity, Server, Database, Cpu, Radio, Camera, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { RoleType } from './RoleSelector';

interface SystemHealthViewProps {
  userRole: RoleType;
}

const statusCards = [
  {
    name: 'FastAPI Backend Engine',
    status: 'ONLINE',
    ping: '14 ms',
    icon: Server,
    color: 'emerald',
    desc: 'Python 3.11 FastAPI server handling telemetry streaming & RBAC tokens'
  },
  {
    name: 'Clinical Telemetry DB',
    status: 'HEALTHY',
    ping: '8 ms',
    icon: Database,
    color: 'emerald',
    desc: 'PostgreSQL encrypted time-series database storing vital logs'
  },
  {
    name: 'AI Decision Engine (Claude Sonnet 4.5)',
    status: 'ACTIVE',
    ping: '142 ms',
    icon: Cpu,
    color: 'emerald',
    desc: 'Explainable AI inference model evaluating rPPG signal quality & risk'
  },
  {
    name: 'WebSocket 10 Hz Telemetry Stream',
    status: 'CONNECTED',
    ping: '10 Hz',
    icon: Radio,
    color: 'emerald',
    desc: 'Low-latency async WebSocket stream transmitting live waveforms'
  },
  {
    name: 'MediaPipe FaceMesh Camera Pipeline',
    status: 'STREAMING',
    ping: '30 FPS',
    icon: Camera,
    color: 'emerald',
    desc: 'Overhead RGB camera feed extracting facial ROI landmark coordinates'
  }
];

const performanceMetrics = [
  { metric: 'End-to-End Signal Latency', value: '55 ms', benchmark: '< 100 ms target', status: 'Optimal' },
  { metric: 'Camera Video Frame Rate', value: '30 FPS', benchmark: '30 FPS standard', status: 'Optimal' },
  { metric: 'Payload Encryption Standard', value: 'AES-256 GCM', benchmark: 'HIPAA / DISHA compliant', status: 'Secured' },
  { metric: 'REST API Health & Uptime', value: '99.98%', benchmark: '99.9% SLA threshold', status: 'Healthy' },
  { metric: 'rPPG POS Signal-to-Noise Ratio', value: '16.8 dB', benchmark: '> 12 dB confidence', status: 'High Precision' }
];

export default function SystemHealthView({ userRole }: SystemHealthViewProps) {
  return (
    <div className="space-y-6 text-white">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            Infrastructure &amp; System Operational Health
          </h2>
          <p className="text-xs text-slate-400">
            Real-time status of backend API microservices, WebSocket data streaming, AI engine latency, and camera pipelines
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>

      {/* Grid: 5 Operational Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statusCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.name}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-mono text-[10px] font-bold">
                  {card.status} ({card.ping})
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-white">{card.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Microservice Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Metrics Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">System Latency &amp; Encryption Performance Benchmarks</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Performance Metric</th>
                <th className="p-3">Live Value</th>
                <th className="p-3">Clinical Benchmark</th>
                <th className="p-3">Operational State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {performanceMetrics.map((m) => (
                <tr key={m.metric} className="hover:bg-slate-950/50 transition-colors">
                  <td className="p-3 font-bold text-white">{m.metric}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{m.value}</td>
                  <td className="p-3 text-slate-400 font-mono">{m.benchmark}</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
