'use client';

import React, { useState } from 'react';
import { Download, FileText, History, Calendar, Filter, CheckCircle2, ShieldCheck, Activity, Loader2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { RoleType } from './RoleSelector';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportsAnalyticsProps {
  userRole: RoleType;
  assignedBabyIds?: string[];
  linkedBabyId?: string;
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

const allBedSummary = [
  { bed: 'BED-101', patient: 'Infant of Sharma', ward: 'NICU Ward A - High Risk', hr: '128.5 BPM', rr: '44.0 RPM', motion: '1.1', status: 'Normal' },
  { bed: 'BED-102', patient: 'Baby Girl Patel', ward: 'NICU Ward A - High Risk', hr: '162.0 BPM', rr: '58.0 RPM', motion: '3.8', status: 'Caution' },
  { bed: 'BED-103', patient: 'Twin A - Gupta', ward: 'NICU Ward B - Step-Down', hr: '92.0 BPM', rr: '22.0 RPM', motion: '0.2', status: 'Critical (Bradycardia)' },
  { bed: 'BED-104', patient: 'Infant of Reddy', ward: 'NICU Ward B - Step-Down', hr: '134.0 BPM', rr: '40.0 RPM', motion: '1.0', status: 'Normal' },
];

export default function ReportsAnalytics({
  userRole,
  assignedBabyIds = ['BED-101', 'BED-103'],
  linkedBabyId = 'BED-101'
}: ReportsAnalyticsProps) {
  const [timeframe, setTimeframe] = useState<'24h' | '7d'>('24h');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  let mockBedSummary = allBedSummary;
  if (userRole === 'NICU Doctor') {
    mockBedSummary = allBedSummary.filter(b => assignedBabyIds.includes(b.bed));
  } else if (userRole === 'Parent / Guardian') {
    mockBedSummary = allBedSummary.filter(b => b.bed === linkedBabyId);
  }

  const handleDownloadReport = async (format: 'PDF' | 'CSV') => {
    setIsGenerating(true);
    try {
      if (format === 'PDF') {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const timestampStr = new Date().toLocaleString();

        // Banner Header
        doc.setFillColor(15, 23, 42); // slate-900
        doc.rect(0, 0, 210, 34, 'F');

        // Title Accent Bar
        doc.setFillColor(16, 185, 129); // emerald-500
        doc.rect(0, 34, 210, 2, 'F');

        // Brand Name & Subtitle
        doc.setTextColor(16, 185, 129);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('AROGYA DRISHTI', 14, 15);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('CONTACTLESS NEONATAL TELEMETRY & SHIFT HANDOVER REPORT', 14, 23);

        doc.setTextColor(148, 163, 184); // slate-400
        doc.setFontSize(8);
        doc.text(`CONFIDENTIAL MEDICAL DOCUMENT | GENERATED: ${timestampStr}`, 14, 29);

        // Metadata Info Grid
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'bold');
        doc.text('Report Metadata & Clinical Context', 14, 43);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(51, 65, 85);
        doc.text(`Exported By Role: ${userRole}`, 14, 49);
        doc.text('Ward Scope: NICU Wards A & B', 14, 54);
        doc.text('Occupancy Rate: 100% (4 / 4 Active Beds)', 110, 49);
        doc.text(`Telemetry Range: ${timeframe === '24h' ? 'Last 24 Hours' : 'Last 7 Days'}`, 110, 54);

        // Divider
        doc.setDrawColor(226, 232, 240);
        doc.line(14, 58, 196, 58);

        // Section 1: Live NICU Bed Telemetry Summary Table
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('1. NICU Ward Bed Vital Telemetry Handover Summary', 14, 65);

        autoTable(doc, {
          startY: 68,
          head: [['Bed ID', 'Patient Name', 'Ward Location', 'Heart Rate', 'Resp. Rate', 'Motion Index', 'Status']],
          body: mockBedSummary.map(b => [
            b.bed,
            b.patient,
            b.ward,
            b.hr,
            b.rr,
            b.motion,
            b.status
          ]),
          headStyles: {
            fillColor: [13, 148, 136], // teal-600
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 8.5
          },
          bodyStyles: {
            fontSize: 8,
            textColor: [30, 41, 59]
          },
          alternateRowStyles: {
            fillColor: [248, 250, 252]
          },
          margin: { left: 14, right: 14 }
        });

        // Section 2: 24-Hour Historical Vital Timeline Table
        const afterBedTableY = (doc as any).lastAutoTable.finalY + 10;

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('2. Historical 24-Hour Telemetry Timeline Data', 14, afterBedTableY);

        autoTable(doc, {
          startY: afterBedTableY + 3,
          head: [['Time Slot', 'Heart Rate (BPM)', 'Respiratory Rate (RPM)', 'Motion Index', 'Clinical Note']],
          body: mock24hHistory.map(h => [
            h.time,
            `${h.hr} BPM`,
            `${h.rr} RPM`,
            `${h.motion}`,
            h.hr < 100 ? 'BRADYCARDIA ALERT DIP DETECTED' : 'Vitals Stable within normal range'
          ]),
          headStyles: {
            fillColor: [30, 41, 59], // slate-800
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 8.5
          },
          bodyStyles: {
            fontSize: 8,
            textColor: [30, 41, 59]
          },
          alternateRowStyles: {
            fillColor: [248, 250, 252]
          },
          margin: { left: 14, right: 14 }
        });

        // Section 3: Hospital Compliance Audit Logs Table
        const afterHistoryY = (doc as any).lastAutoTable.finalY + 10;

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('3. Hospital Compliance & Telemetry Audit Logs', 14, afterHistoryY);

        autoTable(doc, {
          startY: afterHistoryY + 3,
          head: [['Log ID', 'Timestamp', 'User & Role', 'Action', 'Audit Details']],
          body: mockAuditLogs.map(l => [
            l.id,
            l.timestamp,
            `${l.user} (${l.role})`,
            l.action,
            l.details
          ]),
          headStyles: {
            fillColor: [15, 23, 42],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            fontSize: 8.5
          },
          bodyStyles: {
            fontSize: 7.5,
            textColor: [30, 41, 59]
          },
          alternateRowStyles: {
            fillColor: [248, 250, 252]
          },
          margin: { left: 14, right: 14 }
        });

        // Regulatory & Safety Footer
        const finalY = (doc as any).lastAutoTable.finalY + 12;
        const pageHeight = doc.internal.pageSize.getHeight();
        const footerY = Math.max(finalY, pageHeight - 20);

        doc.setDrawColor(203, 213, 225);
        doc.line(14, footerY - 4, 196, footerY - 4);

        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        doc.text(
          'SAFETY & REGULATORY DISCLAIMER: Arogya Drishti contactless rPPG decision-assist system (ISO 14971 compliant design).',
          14,
          footerY
        );
        doc.text(
          'This PDF document is auto-generated for shift handover summary and clinical documentation backup.',
          14,
          footerY + 4
        );

        // Save PDF file
        doc.save(`Arogya_Drishti_NICU_Shift_Report_${Date.now()}.pdf`);
        setDownloadSuccess(`Medical PDF Shift Handover Report generated successfully!`);
      } else {
        // CSV Export
        const csvHeaders = ['Bed ID', 'Patient Name', 'Ward Location', 'Heart Rate BPM', 'Respiratory Rate RPM', 'Motion Index', 'Clinical Status'];
        const csvRows = [
          csvHeaders.join(','),
          ...mockBedSummary.map(b => [
            `"${b.bed}"`,
            `"${b.patient}"`,
            `"${b.ward}"`,
            `"${b.hr}"`,
            `"${b.rr}"`,
            `"${b.motion}"`,
            `"${b.status}"`
          ].join(',')),
          '',
          'Audit Log ID,Timestamp,User,Role,Action,Details',
          ...mockAuditLogs.map(l => [
            `"${l.id}"`,
            `"${l.timestamp}"`,
            `"${l.user}"`,
            `"${l.role}"`,
            `"${l.action}"`,
            `"${l.details.replace(/"/g, '""')}"`
          ].join(','))
        ];

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Arogya_Drishti_NICU_Telemetry_Dataset_${Date.now()}.csv`;
        link.click();
        URL.revokeObjectURL(url);

        setDownloadSuccess(`Medical CSV Telemetry Dataset exported successfully!`);
      }
    } catch (err) {
      console.error('Error generating report:', err);
      setDownloadSuccess('Failed to generate report file. Please try again.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }
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
          <p className="text-xs text-slate-400">24-hour / 7-day trend analysis, shift handover PDF report generator, and audit trail</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleDownloadReport('CSV')}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            Export CSV Dataset
          </button>
          <button
            onClick={() => handleDownloadReport('PDF')}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Download className="w-4 h-4 text-white" />}
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
