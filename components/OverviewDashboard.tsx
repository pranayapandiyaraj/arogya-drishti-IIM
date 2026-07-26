'use client';

import React from 'react';
import { Activity, AlertTriangle, CheckCircle2, Clock, Eye, HeartPulse, Hospital, Users, Bell } from 'lucide-react';
import { RoleType } from './RoleSelector';

export interface BedData {
  bed_id: string;
  bed_number: string;
  ward: string;
  status: 'Normal' | 'Caution' | 'Critical';
  patientName: string;
  ageWeeks: number;
  weightGrams: number;
  heartRate: number;
  respiratoryRate: number;
  motionIndex: number;
  painScore: number;
}

interface OverviewDashboardProps {
  beds: BedData[];
  onSelectBed: (bedId: string) => void;
  userRole: RoleType;
}

export default function OverviewDashboard({ beds, onSelectBed, userRole }: OverviewDashboardProps) {
  const totalBeds = 12;
  const activeOccupied = beds.length;
  const occupancyRate = Math.round((activeOccupied / totalBeds) * 100);
  const criticalCount = beds.filter((b) => b.status === 'Critical').length;
  const cautionCount = beds.filter((b) => b.status === 'Caution').length;
  const normalCount = beds.filter((b) => b.status === 'Normal').length;

  return (
    <div className="space-y-6">
      {/* Notifications Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <Bell className="w-4 h-4 animate-bounce text-amber-400" />
          <span><strong>Global Alert:</strong> Bed 103 (Twin A - Gupta) triggered Bradycardia threshold warning (&lt; 100 BPM). Response team notified.</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>System Latency: <strong className="text-emerald-400 font-mono">14ms (WebSocket Live)</strong></span>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Occupancy Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active NICU Beds</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Hospital className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{activeOccupied}</span>
            <span className="text-xs text-slate-400 font-mono">/ {totalBeds} Capacity</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Occupancy Rate</span>
            <span className="font-bold text-emerald-400 font-mono">{occupancyRate}%</span>
          </div>
        </div>

        {/* Critical Active Alerts Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Active Alerts</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400 font-mono">{criticalCount}</span>
            <span className="text-xs text-slate-400">Immediate Action</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Cautionary Beds</span>
            <span className="font-bold text-amber-400 font-mono">{cautionCount} Beds</span>
          </div>
        </div>

        {/* Average Response Time Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Response Time</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">1.4</span>
            <span className="text-xs text-slate-400">Seconds</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Target Protocol</span>
            <span className="font-bold text-cyan-400 font-mono">&lt; 5.0 sec</span>
          </div>
        </div>

        {/* Normal Stable Count Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stable Patients</span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-teal-400 font-mono">{normalCount}</span>
            <span className="text-xs text-slate-400">Normal Vitals</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Camera Stream Quality</span>
            <span className="font-bold text-teal-400 font-mono">100% HD</span>
          </div>
        </div>
      </div>

      {/* Live Status Grid Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Digital NICU Live Status Grid
            </h3>
            <p className="text-xs text-slate-400">Real-time contactless rPPG status for assigned digital beds</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Normal ({normalCount})
            </span>
            <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Caution ({cautionCount})
            </span>
            <span className="flex items-center gap-1 text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Critical ({criticalCount})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {beds.map((bed) => {
            const isCritical = bed.status === 'Critical';
            const isCaution = bed.status === 'Caution';

            return (
              <div
                key={bed.bed_id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  isCritical
                    ? 'border-rose-500/60 bg-rose-950/20 shadow-lg shadow-rose-950/30 ring-1 ring-rose-500/40'
                    : isCaution
                    ? 'border-amber-500/60 bg-amber-950/20'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                      BED {bed.bed_number}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                          : isCaution
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {bed.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white truncate mb-1">{bed.patientName}</h4>
                  <p className="text-[11px] text-slate-400 mb-3">{bed.ageWeeks}w GA • {bed.weightGrams}g</p>

                  <div className="space-y-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 text-xs mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1">
                        <HeartPulse className="w-3.5 h-3.5 text-rose-400" /> Heart Rate (rPPG):
                      </span>
                      <strong className={`font-mono text-sm ${isCritical ? 'text-rose-400 font-bold' : 'text-white'}`}>
                        {bed.heartRate} <span className="text-[10px] text-slate-400 font-sans">BPM</span>
                      </strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" /> Respiration (RPM):
                      </span>
                      <strong className="font-mono text-white text-sm">
                        {bed.respiratoryRate} <span className="text-[10px] text-slate-400 font-sans">RPM</span>
                      </strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectBed(bed.bed_id)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                    isCritical
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                      : 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Launch Live Monitoring
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
