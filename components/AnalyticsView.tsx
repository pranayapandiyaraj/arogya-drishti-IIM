'use client';

import React, { useState } from 'react';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Activity, Calendar, ShieldCheck, Users } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { RoleType } from './RoleSelector';

interface AnalyticsViewProps {
  userRole: RoleType;
}

const admissionsData = [
  { day: 'Mon', admissions: 4, discharges: 2 },
  { day: 'Tue', admissions: 6, discharges: 3 },
  { day: 'Wed', admissions: 5, discharges: 4 },
  { day: 'Thu', admissions: 8, discharges: 5 },
  { day: 'Fri', admissions: 7, discharges: 3 },
  { day: 'Sat', admissions: 3, discharges: 2 },
  { day: 'Sun', admissions: 5, discharges: 4 }
];

const alertDistributionData = [
  { time: '00:00', critical: 1, warning: 3, info: 5 },
  { time: '04:00', critical: 0, warning: 2, info: 4 },
  { time: '08:00', critical: 2, warning: 4, info: 8 },
  { time: '12:00', critical: 1, warning: 5, info: 6 },
  { time: '16:00', critical: 3, warning: 6, info: 10 },
  { time: '20:00', critical: 1, warning: 2, info: 5 }
];

const riskBreakdownData = [
  { name: 'Low Risk / Stable', value: 4, color: '#10b981' },
  { name: 'Moderate / Caution', value: 1, color: '#f59e0b' },
  { name: 'Critical Risk', value: 3, color: '#f43f5e' }
];

const doctorActivityLogs = [
  { doctor: 'Dr. Ananya Roy', overrides: 14, reports: 22, shifts: 8 },
  { doctor: 'Dr. Vikram Seth', overrides: 9, reports: 18, shifts: 7 },
  { doctor: 'Dr. Meera Menon', overrides: 6, reports: 15, shifts: 6 }
];

export default function AnalyticsView({ userRole }: AnalyticsViewProps) {
  const [timeRange, setTimeRange] = useState<'WEEK' | 'MONTH'>('WEEK');

  return (
    <div className="space-y-6 text-white">
      {/* Header bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-400" />
            Hospital Clinical Analytics &amp; Performance Telemetry
          </h2>
          <p className="text-xs text-slate-400">
            NICU admission velocity, alert triage frequency distribution, risk stratification, and physician oversight metrics
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setTimeRange('WEEK')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              timeRange === 'WEEK' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly Trend
          </button>
          <button
            onClick={() => setTimeRange('MONTH')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              timeRange === 'MONTH' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Aggregate
          </button>
        </div>
      </div>

      {/* Grid 1: Admissions Bar Chart + Risk Breakdown Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Admissions & Discharges Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">NICU Weekly Admissions vs. Discharges</h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">+12% Velocity</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="admissions" name="Admissions" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="discharges" name="Discharges" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Breakdown Pie Chart (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Infant Risk Triage Breakdown</h3>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid 2: Alert Distribution Line Chart + Doctor Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Alert Distribution Line Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <LineChartIcon className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">24-Hour Clinical Alarm Severity Distribution</h3>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="critical" name="Critical Alarms" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="warning" name="Warning Alerts" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="info" name="System Info Logs" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Doctor Activity Logs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Attending Staff Clinical Activity</h3>
          </div>

          <div className="space-y-3 pt-2">
            {doctorActivityLogs.map((doc) => (
              <div key={doc.doctor} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <strong className="text-white font-bold">{doc.doctor}</strong>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">{doc.shifts} Active Shifts</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[9px] uppercase">Alert Overrides</span>
                    <strong className="text-rose-400">{doc.overrides} Logs</strong>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[9px] uppercase">Reports Generated</span>
                    <strong className="text-cyan-400">{doc.reports} Reports</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
