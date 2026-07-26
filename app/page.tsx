'use client';

import React, { useState } from 'react';
import SafetyBanner from '@/components/SafetyBanner';
import RoleSelector, { RoleType } from '@/components/RoleSelector';
import OverviewDashboard, { BedData } from '@/components/OverviewDashboard';
import DigitalBedManagement from '@/components/DigitalBedManagement';
import LiveMonitoringView from '@/components/LiveMonitoringView';
import ValidationCompliance from '@/components/ValidationCompliance';
import ReportsAnalytics from '@/components/ReportsAnalytics';
import { Activity, LayoutDashboard, Map, Eye, Award, FileText, HeartPulse, Building2 } from 'lucide-react';

const initialBedsData: BedData[] = [
  {
    bed_id: 'BED-101',
    bed_number: '101',
    ward: 'NICU Ward A - High Risk',
    status: 'Normal',
    patientName: 'Infant of Sharma',
    ageWeeks: 32,
    weightGrams: 1650,
    heartRate: 128.5,
    respiratoryRate: 44.0,
    motionIndex: 1.1,
    painScore: 1.2
  },
  {
    bed_id: 'BED-102',
    bed_number: '102',
    ward: 'NICU Ward A - High Risk',
    status: 'Caution',
    patientName: 'Baby Girl Patel',
    ageWeeks: 29,
    weightGrams: 1210,
    heartRate: 162.0,
    respiratoryRate: 58.0,
    motionIndex: 3.8,
    painScore: 4.5
  },
  {
    bed_id: 'BED-103',
    bed_number: '103',
    ward: 'NICU Ward B - Step-Down',
    status: 'Critical',
    patientName: 'Twin A - Gupta',
    ageWeeks: 28,
    weightGrams: 980,
    heartRate: 92.0,
    respiratoryRate: 22.0,
    motionIndex: 0.2,
    painScore: 6.8
  },
  {
    bed_id: 'BED-104',
    bed_number: '104',
    ward: 'NICU Ward B - Step-Down',
    status: 'Normal',
    patientName: 'Infant of Reddy',
    ageWeeks: 34,
    weightGrams: 1950,
    heartRate: 134.0,
    respiratoryRate: 40.0,
    motionIndex: 1.0,
    painScore: 0.8
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BED_MAP' | 'LIVE_MONITOR' | 'VALIDATION' | 'REPORTS'>('OVERVIEW');
  const [currentRole, setCurrentRole] = useState<RoleType>('NICU Doctor');
  const [beds, setBeds] = useState<BedData[]>(initialBedsData);
  const [selectedBedId, setSelectedBedId] = useState<string>('BED-101');

  const selectedBed = beds.find((b) => b.bed_id === selectedBedId) || beds[0];

  const handleLaunchBedMonitoring = (bedId: string) => {
    setSelectedBedId(bedId);
    setActiveTab('LIVE_MONITOR');
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Clinical Safety Banner */}
      <SafetyBanner />

      {/* Main Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <HeartPulse className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              AROGYA DRISHTI
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono uppercase">
                Neonatal AI
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Contactless rPPG Telemetry & Decision Support</p>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex flex-wrap items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('OVERVIEW')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'OVERVIEW'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('BED_MAP')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'BED_MAP'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Map className="w-4 h-4" />
            Bed Spatial Map
          </button>

          <button
            onClick={() => setActiveTab('LIVE_MONITOR')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'LIVE_MONITOR'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            Live Telemetry
          </button>

          <button
            onClick={() => setActiveTab('VALIDATION')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'VALIDATION'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            Validation
          </button>

          <button
            onClick={() => setActiveTab('REPORTS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'REPORTS'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Reports & Audits
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
        {/* Module 1: Role Selector Component */}
        <RoleSelector currentRole={currentRole} onRoleChange={setCurrentRole} />

        {/* Tab Views */}
        {activeTab === 'OVERVIEW' && (
          <OverviewDashboard beds={beds} onSelectBed={handleLaunchBedMonitoring} userRole={currentRole} />
        )}

        {activeTab === 'BED_MAP' && (
          <DigitalBedManagement beds={beds} onSelectBed={handleLaunchBedMonitoring} userRole={currentRole} />
        )}

        {activeTab === 'LIVE_MONITOR' && (
          <LiveMonitoringView
            bed={selectedBed}
            onBack={() => setActiveTab('OVERVIEW')}
            userRole={currentRole}
          />
        )}

        {activeTab === 'VALIDATION' && <ValidationCompliance userRole={currentRole} />}

        {activeTab === 'REPORTS' && <ReportsAnalytics userRole={currentRole} />}
      </div>

      {/* Clinical Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        <p>© 2026 Arogya Drishti Platform • Contactless Neonatal Monitoring System • IIM Bangalore Innovation Prototype</p>
      </footer>
    </main>
  );
}
