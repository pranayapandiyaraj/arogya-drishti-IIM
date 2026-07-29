'use client';

import React from 'react';
import { Activity, AlertTriangle, CheckCircle2, Clock, Eye, HeartPulse, Hospital, Users, Bell, Shield, Heart, Stethoscope } from 'lucide-react';
import { RoleType } from './RoleSelector';

export interface BedData {
  bed_id: string;
  bed_number: string;
  mrn: string;
  ward: string;
  status: 'Normal' | 'Caution' | 'Critical';
  patientName: string;
  ageWeeks: number;
  weightGrams: number;
  heartRate: number;
  respiratoryRate: number;
  motionIndex: number;
  painScore: number;
  assignedDoctorId?: string;
  parentEmail?: string;
}

interface OverviewDashboardProps {
  beds: BedData[];
  onSelectBed: (bedId: string) => void;
  userRole: RoleType;
  assignedBabyIds?: string[];
  linkedBabyId?: string;
}

export default function OverviewDashboard({ beds, onSelectBed, userRole, assignedBabyIds = ['BED-101', 'BED-103'], linkedBabyId = 'BED-101' }: OverviewDashboardProps) {
  // Filter beds based on role
  let displayBeds = beds;
  if (userRole === 'NICU Doctor') {
    displayBeds = beds.filter(b => assignedBabyIds.includes(b.bed_id) || assignedBabyIds.includes(b.mrn));
  } else if (userRole === 'Parent / Guardian') {
    displayBeds = beds.filter(b => b.bed_id === linkedBabyId || b.mrn === linkedBabyId);
  }

  const totalBeds = userRole === 'Parent / Guardian' ? 1 : 12;
  const activeOccupied = displayBeds.length;
  const occupancyRate = Math.round((activeOccupied / totalBeds) * 100);
  const criticalCount = displayBeds.filter((b) => b.status === 'Critical').length;
  const cautionCount = displayBeds.filter((b) => b.status === 'Caution').length;
  const normalCount = displayBeds.filter((b) => b.status === 'Normal').length;

  return (
    <div className="space-y-6">
      {/* Role Access Scope Notification Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {userRole === 'Parent / Guardian' ? (
            <span className="flex items-center gap-2 text-cyan-400 font-bold">
              <Heart className="w-4 h-4 text-cyan-400" />
              Parent Isolated Access Mode: Showing continuous live telemetry for your infant only.
            </span>
          ) : userRole === 'NICU Doctor' ? (
            <span className="flex items-center gap-2 text-emerald-400 font-bold">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              Doctor Care Team Filter: Displaying assigned patients only ({displayBeds.length} active beds).
            </span>
          ) : (
            <span className="flex items-center gap-2 text-amber-400 font-medium">
              <Bell className="w-4 h-4 animate-bounce text-amber-400" />
              <span><strong>Hospital Alert:</strong> Bed 103 (Twin A - Gupta) Bradycardia alert (&lt; 100 BPM). Response team active.</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>System Latency: <strong className="text-emerald-400 font-mono">14ms (WebSocket Live)</strong></span>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Occupancy / Patient Count Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {userRole === 'Parent / Guardian' ? 'My Infant Status' : 'Assigned Patients'}
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Hospital className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{activeOccupied}</span>
            <span className="text-xs text-slate-400 font-mono">/ {totalBeds} {userRole === 'Parent / Guardian' ? 'Child' : 'Capacity'}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            <span>{userRole === 'Parent / Guardian' ? 'Wellness Score' : 'Occupancy Rate'}</span>
            <span className="font-bold text-emerald-400 font-mono">{userRole === 'Parent / Guardian' ? '92 / 100' : `${occupancyRate}%`}</span>
          </div>
        </div>

        {/* Critical Active Alerts Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Alerts</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400 font-mono">{criticalCount}</span>
            <span className="text-xs text-slate-400">Immediate Action</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Cautionary Status</span>
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

        {/* Stable Vitals Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stable Patients</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">{normalCount}</span>
            <span className="text-xs text-slate-400">Normal Vitals</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Camera Stream Quality</span>
            <span className="font-bold text-emerald-400 font-mono">100% HD</span>
          </div>
        </div>
      </div>

      {/* Bed Status Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              {userRole === 'Parent / Guardian' ? 'My Infant Live Status Grid' : 'Digital NICU Live Status Grid'}
            </h2>
            <p className="text-xs text-slate-400">
              {userRole === 'Parent / Guardian'
                ? 'Isolated telemetry view for your registered baby'
                : userRole === 'NICU Doctor'
                ? 'Filtered view showing patients assigned to your care team'
                : 'Real-time contactless rPPG status for assigned digital beds'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
              ● Normal ({normalCount})
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono font-bold">
              ● Caution ({cautionCount})
            </span>
            <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono font-bold">
              ● Critical ({criticalCount})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayBeds.map((bed) => {
            const isCritical = bed.status === 'Critical';
            const isCaution = bed.status === 'Caution';

            return (
              <div
                key={bed.bed_id}
                className={`bg-slate-900/90 rounded-2xl border p-4 shadow-xl flex flex-col justify-between space-y-4 transition-all hover:border-emerald-500/50 ${
                  isCritical
                    ? 'border-rose-500/60 bg-rose-950/20'
                    : isCaution
                    ? 'border-amber-500/60 bg-amber-950/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                      BED {bed.bed_number}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{bed.mrn}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase ${
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

                <div>
                  <h3 className="text-sm font-bold text-white">{bed.patientName}</h3>
                  <p className="text-xs text-slate-400">{bed.ageWeeks}w GA • {bed.weightGrams}g</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{bed.ward}</p>
                </div>

                {/* Vitals Quick Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Heart Rate</span>
                    <span className={`font-mono font-bold ${isCritical ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {bed.heartRate.toFixed(1)} <span className="text-[9px] font-normal text-slate-500">BPM</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Respiration</span>
                    <span className="font-mono font-bold text-cyan-400">
                      {bed.respiratoryRate.toFixed(1)} <span className="text-[9px] font-normal text-slate-500">RPM</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectBed(bed.bed_id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                    isCritical
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Launch Live Telemetry
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
