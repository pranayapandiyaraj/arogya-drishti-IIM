'use client';

import React, { useState } from 'react';
import { Search, Filter, Eye, User, HeartPulse, ShieldAlert, Sparkles, ChevronRight, Activity, Lock } from 'lucide-react';
import { BedData } from './OverviewDashboard';
import { RoleType } from './RoleSelector';

interface PatientsTableProps {
  beds: BedData[];
  onSelectBed: (bedId: string) => void;
  userRole: RoleType;
  assignedBabyIds?: string[];
  linkedBabyId?: string;
}

export default function PatientsTable({
  beds,
  onSelectBed,
  userRole,
  assignedBabyIds = ['BED-101', 'BED-103'],
  linkedBabyId = 'BED-101'
}: PatientsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'Critical' | 'Caution' | 'Normal'>('ALL');
  const [selectedPatientModal, setSelectedPatientModal] = useState<BedData | null>(null);

  // Role-based patient filtering
  let roleBeds = beds;
  if (userRole === 'NICU Doctor') {
    roleBeds = beds.filter(b => assignedBabyIds.includes(b.bed_id) || assignedBabyIds.includes(b.mrn));
  } else if (userRole === 'Parent / Guardian') {
    roleBeds = beds.filter(b => b.bed_id === linkedBabyId || b.mrn === linkedBabyId);
  }

  const filteredBeds = roleBeds.filter((b) => {
    const matchesSearch =
      b.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bed_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bed_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.ward.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || b.status === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6 text-white">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-emerald-400" />
            {userRole === 'Parent / Guardian' ? 'My Infant Registry' : 'NICU Patients Directory & Clinical Registry'}
          </h2>
          <p className="text-xs text-slate-400">
            {userRole === 'NICU Doctor'
              ? 'Displaying patients assigned to your care team'
              : userRole === 'Parent / Guardian'
              ? 'Isolated telemetry view for your registered baby'
              : 'Real-time patient roster across NICU Wards A & B with gestational age, birth weight, and risk triage status'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Instant Search Bar */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search infant name, MRN, bed..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Risk Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setRiskFilter('ALL')}
              className={`px-3 py-1 rounded-lg font-bold ${riskFilter === 'ALL' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All ({roleBeds.length})
            </button>
            <button
              onClick={() => setRiskFilter('Critical')}
              className={`px-3 py-1 rounded-lg font-bold ${riskFilter === 'Critical' ? 'bg-rose-600 text-white' : 'text-rose-400 hover:text-white'}`}
            >
              Critical
            </button>
            <button
              onClick={() => setRiskFilter('Caution')}
              className={`px-3 py-1 rounded-lg font-bold ${riskFilter === 'Caution' ? 'bg-amber-600 text-white' : 'text-amber-400 hover:text-white'}`}
            >
              Moderate
            </button>
            <button
              onClick={() => setRiskFilter('Normal')}
              className={`px-3 py-1 rounded-lg font-bold ${riskFilter === 'Normal' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:text-white'}`}
            >
              Stable
            </button>
          </div>
        </div>
      </div>

      {/* Main Patients Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Patient Name</th>
                <th className="p-3">MRN / ID</th>
                <th className="p-3">Bed &amp; Ward</th>
                <th className="p-3">Gestational Age</th>
                <th className="p-3">Birth Weight</th>
                <th className="p-3">Telemetry Vitals</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredBeds.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 italic">
                    No patients match your current search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBeds.map((bed) => (
                  <tr key={bed.bed_id} className="hover:bg-slate-950/50 transition-colors">
                    <td className="p-3">
                      <strong className="text-white block font-bold text-sm">{bed.patientName}</strong>
                      <span className="text-[10px] text-slate-400">NICU Resident Infant</span>
                    </td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">{bed.bed_id.replace('BED', 'PAT')}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-200 block">Bed {bed.bed_number}</span>
                      <span className="text-[10px] text-slate-400">{bed.ward}</span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-200">{bed.ageWeeks} Wks</td>
                    <td className="p-3 font-mono font-bold text-slate-200">{bed.weightGrams} g</td>
                    <td className="p-3">
                      <div className="space-y-0.5 font-mono text-[11px]">
                        <div className="text-rose-400">HR: <strong>{bed.heartRate} BPM</strong></div>
                        <div className="text-cyan-400">RR: <strong>{bed.respiratoryRate} RPM</strong></div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase inline-flex items-center gap-1 ${
                          bed.status === 'Critical'
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                            : bed.status === 'Caution'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${bed.status === 'Critical' ? 'bg-rose-400 animate-ping' : bed.status === 'Caution' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                        {bed.status === 'Critical' ? 'CRITICAL' : bed.status === 'Caution' ? 'MODERATE' : 'LOW RISK'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedPatientModal(bed)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onSelectBed(bed.bed_id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-md"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Monitor
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal */}
      {selectedPatientModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">{selectedPatientModal.patientName}</h3>
                <p className="text-xs text-slate-400 font-mono">Patient ID: {selectedPatientModal.bed_id.replace('BED', 'PAT')} | Bed {selectedPatientModal.bed_number}</p>
              </div>
              <button
                onClick={() => setSelectedPatientModal(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Gestational Age</span>
                <strong className="block text-white text-sm font-mono">{selectedPatientModal.ageWeeks} Weeks</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Birth Weight</span>
                <strong className="block text-white text-sm font-mono">{selectedPatientModal.weightGrams} Grams</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Ward Assignment</span>
                <strong className="block text-white text-sm">{selectedPatientModal.ward}</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 uppercase font-mono text-[10px]">Attending Physician</span>
                <strong className="block text-emerald-400 text-sm">Dr. Ananya Roy</strong>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" /> Live rPPG Telemetry Metrics
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Heart Rate</span>
                  <strong className="text-rose-400 text-sm">{selectedPatientModal.heartRate} BPM</strong>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Resp. Rate</span>
                  <strong className="text-cyan-400 text-sm">{selectedPatientModal.respiratoryRate} RPM</strong>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Pain Index</span>
                  <strong className="text-amber-400 text-sm">{selectedPatientModal.painScore}/10</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  const id = selectedPatientModal.bed_id;
                  setSelectedPatientModal(null);
                  onSelectBed(id);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                Launch Live Contactless Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
