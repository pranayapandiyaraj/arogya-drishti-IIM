'use client';

import React, { useState } from 'react';
import { Download, FileText, History, Calendar, Filter, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { RoleType } from './RoleSelector';

interface ReportsAnalyticsProps {
  userRole: RoleType;
}

const mock24hHistory = [
  { time: '00:00', hr: 128, rr: 44, motion: 1.0 },
  { time: '03:00', hr: 126, rr: 42, motion: 0.8 },
  { time: '06:00', hr: 132, rr: 45, motion: 1.2 },
  { time: '09:00', hr: 135, rr: 46, motion: 1.5 },
  { time: '12:00', hr: 129, rr: 43, motion: 1.1 },
  { time: '15:00', hr: 98,  rr: 38, motion: 0.4 }, // Bradycardia dip
  { time: '18:00', hr: 130, rr: 44, motion: 1.0 },
  { time: '21:00', hr: 127, rr: 43, motion: 0.9 }
];

const mockAuditLogs = [
  { id: 'LOG-109', timestamp: '2026-07-25 21:10:04', user: 'Dr. Ananya Roy', role: 'NICU Doctor', action: 'ALERT_OVERRIDE', details: 'Acknowledged Bradycardia threshold alert on Bed 103 (Twin A - Gupta)' },
  { id: 'LOG-108', timestamp: '2026-07-25 20:45:12', user: 'Nurse Priya Nair', role: 'NICU Nurse', action: 'PATIENT_ASSIGNMENT', details: 'Updated gestational age and birth weight metadata for Bed 104' },
  { id: 'LOG-107', timestamp: '2026-07-25 19:30:00', user: 'Admin R. Kapoor', role: 'Hospital Administrator', action: 'RBAC_CONFIG', details: 'Provisioned clinical access keys for NICU Night Shift Ward Team' },
  { id: 'LOG-106', timestamp: '2026-07-25 18:15:22', user: 'Dr. Vikram Seth', role: 'NICU Doctor', action: 'REPORT_EXPORT', details: 'Generated PDF Shift Handover Summary for NICU Wards A & B' }
];

export default function ReportsAnalytics({ userRole }: ReportsAnalyticsProps) {
  const [timeframe, setTimeframe] = useState<'24h' | '7d'>('24h');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadReport = (format: 'PDF' | 'CSV') => {
    // Generate downloadable text content as synthetic medical report blob
    const reportText = `AROGYA DRISHTI CLINICAL TELEMETRY SHIFT HANDOVER REPORT\n` +
      `Generated: ${new Date().toLocaleString()}\n` +
      `Format: ${format}\n` +
      `Role: ${userRole}\n` +
      `--------------------------------------------------\n` +
      `NICU Ward A Occupancy: 100%\n` +
      `Bed 101 (Infant of Sharma): HR 128 BPM | RR 44 RPM | Normal\n` +
      `Bed 102 (Baby Girl Patel): HR 162 BPM | RR 58 RPM | Caution\n` +
      `Bed 103 (Twin A - Gupta): HR 92 BPM | RR 22 RPM | Critical (Bradycardia)\n` +
      `Bed 104 (Infant of Reddy): HR 134 BPM | RR 40 RPM | Normal\n` +
      `--------------------------------------------------\n` +
      `Safety Disclaimer: Arogya Drishti is a clinical decision-assist prototype and does not replace primary medical diagnostics.\n`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Arogya_Drishti_NICU_Report_${format}_${Date.now()}.${format.toLowerCase()}`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Medical ${format} Shift Handover Report generated successfully!`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            Reports & Historical Telemetry Analytics
          </h2>
          <p className="text-xs text-slate-400">24-hour / 7-day trend analysis, shift handover report generator, and audit trail</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleDownloadReport('CSV')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            Export CSV Dataset
          </button>
          <button
            onClick={() => handleDownloadReport('PDF')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4 text-white" />
            Generate PDF Shift Report
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded-2xl p-4 flex items-center gap-2 text-xs font-semibold animate-pulse">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          {downloadSuccess}
        </div>
      )}

      {/* Historical Vital Trend Graph */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Physiological Vitals Historical Trends</h3>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setTimeframe('24h')}
              className={`px-3 py-1 rounded-lg font-bold ${timeframe === '24h' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}
            >
              24-Hour Timeline
            </button>
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-3 py-1 rounded-lg font-bold ${timeframe === '7d' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}
            >
              7-Day Trends
            </button>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mock24hHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 180]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="hr" name="Heart Rate (BPM)" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="rr" name="Respiration (RPM)" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comprehensive System Audit Trail Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <History className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Hospital Compliance Audit Trail</h3>
            <p className="text-xs text-slate-400">Immutable logging of user authentication, overrides, and alert resolutions</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User & Role</th>
                <th className="p-3">Action Type</th>
                <th className="p-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {mockAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-950/50 transition-colors">
                  <td className="p-3 font-mono font-bold text-emerald-400">{log.id}</td>
                  <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="p-3">
                    <strong className="text-white block">{log.user}</strong>
                    <span className="text-[10px] text-slate-400">{log.role}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
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
