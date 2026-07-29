'use client';

import React, { useState } from 'react';
import { AlertTriangle, Bell, CheckCircle2, ShieldAlert, Clock, User, Filter, Check, FileText } from 'lucide-react';
import { RoleType } from './RoleSelector';

interface AlertCenterProps {
  userRole: RoleType;
  assignedBabyIds?: string[];
  linkedBabyId?: string;
}

interface AlertItem {
  id: string;
  timestamp: string;
  patientName: string;
  bedCode: string;
  bedId: string;
  title: string;
  description: string;
  severity: 'Critical' | 'Warning' | 'Info';
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  assignedStaff: string;
}

const initialAlerts: AlertItem[] = [
  {
    id: 'ALT-901',
    timestamp: '2026-07-29 14:02:15',
    patientName: 'Twin A - Gupta',
    bedCode: 'Bed 103 (NICU Ward B)',
    bedId: 'BED-103',
    title: 'Bradycardia Threshold Dip (HR < 100 BPM)',
    description: 'rPPG POS signal registered sudden drop to 92.0 BPM sustained over 15 seconds. High risk of neonatal apnea.',
    severity: 'Critical',
    status: 'ACTIVE',
    assignedStaff: 'Dr. Ananya Roy (Attending)'
  },
  {
    id: 'ALT-902',
    timestamp: '2026-07-29 13:45:00',
    patientName: 'Baby Girl Patel',
    bedCode: 'Bed 102 (NICU Ward A)',
    bedId: 'BED-102',
    title: 'SpO₂ Desaturation & Tachypnea (RR > 55 RPM)',
    description: 'Respiratory displacement tracking indicates rapid chest movement at 58.0 RPM with estimated oxygen drop to 89%.',
    severity: 'Warning',
    status: 'ACKNOWLEDGED',
    assignedStaff: 'Nurse Priya Nair (Charge Nurse)'
  },
  {
    id: 'ALT-903',
    timestamp: '2026-07-29 12:30:22',
    patientName: 'Infant of Sharma',
    bedCode: 'Bed 101 (NICU Ward A)',
    bedId: 'BED-101',
    title: 'FaceMesh Occlusion Alert (Mild Infant Movement)',
    description: 'Forehead rPPG region transiently occluded due to blanket adjustment. Motion filter engaged automatically.',
    severity: 'Info',
    status: 'RESOLVED',
    assignedStaff: 'Automated System Filter'
  },
  {
    id: 'ALT-904',
    timestamp: '2026-07-29 11:15:10',
    patientName: 'Infant of Reddy',
    bedCode: 'Bed 104 (NICU Ward B)',
    bedId: 'BED-104',
    title: 'Camera Stream Re-synchronization (WebSocket Re-connect)',
    description: 'Frame rate stabilized back at 30 FPS. Telemetry pipeline healthy.',
    severity: 'Info',
    status: 'RESOLVED',
    assignedStaff: 'AI Engine Daemon'
  }
];

export default function AlertCenter({
  userRole,
  assignedBabyIds = ['BED-101', 'BED-103'],
  linkedBabyId = 'BED-101'
}: AlertCenterProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [activeTab, setActiveTab] = useState<'ALL' | 'Critical' | 'Warning' | 'Info'>('ALL');

  // Filter alerts by role permissions
  let roleAlerts = alerts;
  if (userRole === 'NICU Doctor') {
    roleAlerts = alerts.filter(a => assignedBabyIds.includes(a.bedId));
  } else if (userRole === 'Parent / Guardian') {
    roleAlerts = alerts.filter(a => a.bedId === linkedBabyId);
  }

  const filteredAlerts = roleAlerts.filter((a) => activeTab === 'ALL' || a.severity === activeTab);

  const handleUpdateStatus = (id: string, newStatus: 'ACKNOWLEDGED' | 'RESOLVED') => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-rose-400" />
            {userRole === 'Parent / Guardian' ? 'My Infant Event Feed' : 'Clinical Alarm Triage & Notification Command Center'}
          </h2>
          <p className="text-xs text-slate-400">
            {userRole === 'NICU Doctor'
              ? 'Displaying alarm triggers for infants assigned to your care team'
              : userRole === 'Parent / Guardian'
              ? 'Isolated notification log for your registered baby'
              : 'Real-time ISO 14971-aligned risk alarm processing with single-click nurse/doctor acknowledgement'}
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs w-full md:w-auto">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'ALL' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({roleAlerts.length})
          </button>

          <button
            onClick={() => setActiveTab('Critical')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'Critical' ? 'bg-rose-600 text-white shadow-md' : 'text-rose-400 hover:text-white'
            }`}
          >
            Critical ({roleAlerts.filter((a) => a.severity === 'Critical').length})
          </button>

          <button
            onClick={() => setActiveTab('Warning')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'Warning' ? 'bg-amber-600 text-white shadow-md' : 'text-amber-400 hover:text-white'
            }`}
          >
            Warning ({roleAlerts.filter((a) => a.severity === 'Warning').length})
          </button>

          <button
            onClick={() => setActiveTab('Info')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'Info' ? 'bg-cyan-600 text-white shadow-md' : 'text-cyan-400 hover:text-white'
            }`}
          >
            Info ({roleAlerts.filter((a) => a.severity === 'Info').length})
          </button>
        </div>
      </div>

      {/* Alert Feed Cards */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 italic">
            No active alerts found matching the selected filter.
          </div>
        ) : (
          filteredAlerts.map((item) => {
            const isCritical = item.severity === 'Critical';
            const isWarning = item.severity === 'Warning';

            return (
              <div
                key={item.id}
                className={`bg-slate-900/90 rounded-2xl border p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                  isCritical
                    ? 'border-rose-500/60 bg-rose-950/20'
                    : isWarning
                    ? 'border-amber-500/60 bg-amber-950/20'
                    : 'border-slate-800'
                }`}
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                          : isWarning
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      }`}
                    >
                      {item.severity}
                    </span>

                    <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.timestamp}
                    </span>

                    <span className="text-slate-500 font-mono">| {item.id}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      {item.title}
                      <span className="text-xs font-mono font-normal text-emerald-400">({item.patientName} — {item.bedCode})</span>
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">{item.description}</p>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Assigned Staff: <strong className="text-slate-200">{item.assignedStaff}</strong></span>
                  </div>
                </div>

                {/* Actions & Status Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 w-full md:w-auto border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-extrabold uppercase ${
                      item.status === 'ACTIVE'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : item.status === 'ACKNOWLEDGED'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.status}
                  </span>

                  {userRole !== 'Parent / Guardian' && (
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {item.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'ACKNOWLEDGED')}
                          className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Acknowledge
                        </button>
                      )}

                      {item.status !== 'RESOLVED' && (
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'RESOLVED')}
                          className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
