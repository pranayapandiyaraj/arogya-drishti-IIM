'use client';

import React, { useState } from 'react';
import { Building2, CheckCircle2, Clock, Mail, Phone, MapPin, Sparkles, Filter } from 'lucide-react';
import { RoleType } from './RoleSelector';

export interface DemoRequestItem {
  id: string;
  timestamp: string;
  hospitalName: string;
  hospitalType: string;
  city: string;
  state: string;
  nicuLevel: string;
  bedCount: string;
  contactPerson: string;
  email: string;
  phone: string;
  deploymentInterest: string;
  message: string;
  status: 'PENDING' | 'SCHEDULED' | 'DEPLOYED';
}

interface OnboardingViewProps {
  demoRequests: DemoRequestItem[];
  userRole: RoleType;
}

export default function OnboardingView({ demoRequests, userRole }: OnboardingViewProps) {
  const [requests, setRequests] = useState<DemoRequestItem[]>(demoRequests);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'SCHEDULED' | 'DEPLOYED'>('ALL');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, newStatus: 'SCHEDULED' | 'DEPLOYED') => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    setToastMsg(`Hospital Demo ${id} updated to ${newStatus}`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filtered = requests.filter((r) => {
    if (filterStatus === 'ALL') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-6 text-white">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-400" />
            Hospital Onboarding &amp; Demo Request Queue
          </h2>
          <p className="text-xs text-slate-400">
            Reviewing live pilot applications and camera deployment requests submitted via public portal
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-xl transition-all ${filterStatus === 'ALL' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            All Requests ({requests.length})
          </button>
          <button
            onClick={() => setFilterStatus('PENDING')}
            className={`px-3 py-1.5 rounded-xl transition-all ${filterStatus === 'PENDING' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-400 hover:text-white'}`}
          >
            Pending ({requests.filter((r) => r.status === 'PENDING').length})
          </button>
          <button
            onClick={() => setFilterStatus('SCHEDULED')}
            className={`px-3 py-1.5 rounded-xl transition-all ${filterStatus === 'SCHEDULED' ? 'bg-cyan-600 text-white shadow-md' : 'text-cyan-400 hover:text-white'}`}
          >
            Scheduled ({requests.filter((r) => r.status === 'SCHEDULED').length})
          </button>
          <button
            onClick={() => setFilterStatus('DEPLOYED')}
            className={`px-3 py-1.5 rounded-xl transition-all ${filterStatus === 'DEPLOYED' ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-400 hover:text-white'}`}
          >
            Deployed ({requests.filter((r) => r.status === 'DEPLOYED').length})
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded-2xl p-4 flex items-center gap-2 text-xs font-semibold animate-pulse shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Onboarding Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Req ID &amp; Time</th>
                <th className="p-3">Hospital &amp; Location</th>
                <th className="p-3">NICU Level &amp; Beds</th>
                <th className="p-3">Contact Person</th>
                <th className="p-3">Deployment Model</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 italic">
                    No hospital onboarding requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-950/50 transition-colors">
                    <td className="p-3">
                      <strong className="text-emerald-400 font-mono font-bold block">{req.id}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{req.timestamp}</span>
                    </td>
                    <td className="p-3">
                      <strong className="text-white block font-bold text-sm">{req.hospitalName}</strong>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" /> {req.city}, {req.state} ({req.hospitalType})
                      </span>
                    </td>
                    <td className="p-3 font-mono">
                      <span className="text-slate-200 font-bold block">{req.nicuLevel}</span>
                      <span className="text-[10px] text-slate-400">{req.bedCount} NICU Beds</span>
                    </td>
                    <td className="p-3">
                      <strong className="text-slate-200 block">{req.contactPerson}</strong>
                      <span className="text-[10px] text-slate-400 block font-mono">{req.email}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">{req.phone}</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono font-bold text-[10px]">
                        {req.deploymentInterest}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          req.status === 'PENDING'
                            ? 'bg-amber-950 text-amber-400 border border-amber-500/40 animate-pulse'
                            : req.status === 'SCHEDULED'
                            ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {req.status === 'PENDING' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'SCHEDULED')}
                            className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow"
                          >
                            Schedule Demo
                          </button>
                        )}
                        {req.status !== 'DEPLOYED' && (
                          <button
                            onClick={() => handleUpdateStatus(req.id, 'DEPLOYED')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                          >
                            Approve Pilot
                          </button>
                        )}
                        {req.status === 'DEPLOYED' && (
                          <span className="text-[11px] font-mono text-emerald-400 font-bold">Pilot Active</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
