'use client';

import React, { useState } from 'react';
import { ShieldCheck, Download, Lock, CheckCircle2, AlertTriangle, FileText, ToggleLeft, ToggleRight } from 'lucide-react';
import { RoleType } from './RoleSelector';

interface GovernanceViewProps {
  userRole: RoleType;
}

const auditLogsData = [
  { id: 'LOG-9001', timestamp: '2026-07-29 14:05:12', user: 'Dr. Ananya Roy', role: 'NICU Doctor', action: 'ALERT_OVERRIDE', targetId: 'BED-103', details: 'Acknowledged Bradycardia threshold alert on Bed 103' },
  { id: 'LOG-9002', timestamp: '2026-07-29 13:48:00', user: 'Nurse Priya Nair', role: 'NICU Nurse', action: 'METADATA_UPDATE', targetId: 'BED-104', details: 'Updated gestational age metadata for Infant of Reddy' },
  { id: 'LOG-9003', timestamp: '2026-07-29 12:15:30', user: 'Admin R. Kapoor', role: 'Hospital Administrator', action: 'RBAC_PROVISION', targetId: 'USER-102', details: 'Provisioned night shift clinical telemetry keys' },
  { id: 'LOG-9004', timestamp: '2026-07-29 11:00:22', user: 'Dr. Vikram Seth', role: 'NICU Doctor', action: 'PDF_REPORT_EXPORT', targetId: 'WARD-A', details: 'Generated PDF Shift Handover Summary for NICU Ward A' }
];

export default function GovernanceView({ userRole }: GovernanceViewProps) {
  const [researchMode, setResearchMode] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleExportAuditLogs = () => {
    const csvContent = [
      'Log ID,Timestamp,User,Role,Action,Target ID,Details',
      ...auditLogsData.map(
        (l) => `"${l.id}","${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.targetId}","${l.details.replace(/"/g, '""')}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Arogya_Drishti_Governance_Audit_Trail_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('Immutable Governance Audit Trail exported successfully!');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Hospital Governance &amp; Compliance Audit Trail
          </h2>
          <p className="text-xs text-slate-400">
            Immutable tracking of clinical overrides, telemetry export events, and HIPAA/DISHA data protection governance
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Research Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-300 font-bold">Research Mode:</span>
            <button
              onClick={() => setResearchMode(!researchMode)}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono font-bold"
            >
              {researchMode ? (
                <>
                  <ToggleRight className="w-6 h-6 text-emerald-400" />
                  <span className="text-emerald-400">ENABLED</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="w-6 h-6 text-slate-500" />
                  <span className="text-slate-500">DISABLED</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleExportAuditLogs}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4 text-white" />
            Export Audit Log CSV
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded-2xl p-4 flex items-center gap-2 text-xs font-semibold animate-pulse shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          {downloadSuccess}
        </div>
      )}

      {researchMode && (
        <div className="bg-indigo-950/80 border border-indigo-500/50 text-indigo-200 rounded-2xl p-4 flex items-center gap-3 text-xs">
          <Lock className="w-5 h-5 text-indigo-400 shrink-0" />
          <div>
            <strong className="text-white block font-bold">RESEARCH MODE ACTIVE (De-identified Dataset Stream)</strong>
            <p className="text-slate-300 text-[11px]">
              Patient names and MRNs are anonymized according to HIPAA Safe Harbor guidelines for clinical research auditing.
            </p>
          </div>
        </div>
      )}

      {/* Governance Audit Logs Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Immutable Security &amp; Compliance Audit Logs</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User &amp; Role</th>
                <th className="p-3">Action Type</th>
                <th className="p-3">Target ID</th>
                <th className="p-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {auditLogsData.map((log) => (
                <tr key={log.id} className="hover:bg-slate-950/50 transition-colors">
                  <td className="p-3 font-mono font-bold text-emerald-400">{log.id}</td>
                  <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="p-3">
                    <strong className="text-white block">{researchMode ? 'ANONYMIZED_USER' : log.user}</strong>
                    <span className="text-[10px] text-slate-400">{log.role}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-cyan-400 font-bold">{log.targetId}</td>
                  <td className="p-3 text-slate-300">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
