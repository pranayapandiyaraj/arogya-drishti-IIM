'use client';

import React, { useState } from 'react';
import { BedData } from './OverviewDashboard';
import { Map, Search, Filter, Plus, UserPlus, LogOut, Eye, ShieldAlert, CheckCircle } from 'lucide-react';
import { RoleType } from './RoleSelector';

interface DigitalBedManagementProps {
  beds: BedData[];
  onSelectBed: (bedId: string) => void;
  userRole: RoleType;
}

export default function DigitalBedManagement({ beds, onSelectBed, userRole }: DigitalBedManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedAssignBed, setSelectedAssignBed] = useState<BedData | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Form fields for patient assignment
  const [newPatientName, setNewPatientName] = useState('');
  const [newGaWeeks, setNewGaWeeks] = useState(30);
  const [newWeight, setNewWeight] = useState(1400);

  const filteredBeds = beds.filter((b) => {
    const matchesSearch =
      b.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bed_number.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const canManageBeds = userRole === 'NICU Doctor' || userRole === 'NICU Nurse' || userRole === 'Hospital Administrator';

  return (
    <div className="space-y-6">
      {/* Top Header and Control Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Map className="w-6 h-6 text-emerald-400" />
            Digital Spatial Bed Management
          </h2>
          <p className="text-xs text-slate-400">Interactive ward blueprint & spatial bed assignment map</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search infant or bed #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                statusFilter === 'ALL' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('Normal')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                statusFilter === 'Normal' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setStatusFilter('Caution')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                statusFilter === 'Caution' ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Caution
            </button>
            <button
              onClick={() => setStatusFilter('Critical')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                statusFilter === 'Critical' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Critical
            </button>
          </div>
        </div>
      </div>

      {/* Spatial Blueprint NICU Ward Map */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              WARD A: HIGH-DEPENDENCY NICU
            </span>
            <span className="text-xs text-slate-400">Cameras: 4/4 Connected</span>
          </div>
          <div className="text-xs text-slate-500 font-mono">Spatial Grid: 4x2 Units</div>
        </div>

        {/* Blueprint Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBeds.map((bed) => {
            const isCritical = bed.status === 'Critical';
            const isCaution = bed.status === 'Caution';

            return (
              <div
                key={bed.bed_id}
                className={`relative group bg-slate-900 border rounded-2xl p-5 transition-all shadow-lg hover:shadow-2xl ${
                  isCritical
                    ? 'border-rose-500/70 bg-rose-950/20 shadow-rose-950/40'
                    : isCaution
                    ? 'border-amber-500/70 bg-amber-950/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Spatial Bed Position Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                      #{bed.bed_number}
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Station ID</span>
                      <span className="text-xs font-bold text-white">{bed.bed_id}</span>
                    </div>
                  </div>

                  <span
                    className={`w-3 h-3 rounded-full ${
                      isCritical
                        ? 'bg-rose-500 animate-ping'
                        : isCaution
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                </div>

                {/* Incubator Spatial Graphic */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 mb-4 text-center">
                  <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Incubator Camera Zone</div>
                  <div className="text-sm font-bold text-white truncate">{bed.patientName}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{bed.ageWeeks} Wks GA • {bed.weightGrams}g</div>
                </div>

                {/* Vitals Summary Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block">rPPG Heart Rate</span>
                    <strong className={`font-mono text-sm ${isCritical ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {bed.heartRate} BPM
                    </strong>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block">Respiration</span>
                    <strong className="font-mono text-sm text-cyan-400">{bed.respiratoryRate} RPM</strong>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectBed(bed.bed_id)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Monitor
                  </button>
                  {canManageBeds && (
                    <button
                      onClick={() => {
                        setSelectedAssignBed(bed);
                        setNewPatientName(bed.patientName);
                        setNewGaWeeks(bed.ageWeeks);
                        setNewWeight(bed.weightGrams);
                        setShowAssignModal(true);
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Update / Assign Patient"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Patient Assignment Modal */}
      {showAssignModal && selectedAssignBed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-400" />
              Manage Patient Assignment (Bed {selectedAssignBed.bed_number})
            </h3>
            <p className="text-xs text-slate-400">Update infant metadata for contactless telemetry mapping.</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Infant Identification Name</label>
                <input
                  type="text"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gestational Age (Weeks)</label>
                  <input
                    type="number"
                    value={newGaWeeks}
                    onChange={(e) => setNewGaWeeks(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Birth Weight (Grams)</label>
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  selectedAssignBed.patientName = newPatientName;
                  selectedAssignBed.ageWeeks = newGaWeeks;
                  selectedAssignBed.weightGrams = newWeight;
                  setShowAssignModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
              >
                Save Patient Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
