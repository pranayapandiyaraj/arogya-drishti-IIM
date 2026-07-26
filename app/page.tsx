'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Platform from '@/components/Platform';
import Features from '@/components/Features';
import Workflow from '@/components/Workflow';
import Technology from '@/components/Technology';
import Validation from '@/components/Validation';
import Deployment from '@/components/Deployment';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import SafetyBanner from '@/components/SafetyBanner';

// Hospital Portal Components
import RoleSelector, { RoleType } from '@/components/RoleSelector';
import OverviewDashboard, { BedData } from '@/components/OverviewDashboard';
import DigitalBedManagement from '@/components/DigitalBedManagement';
import LiveMonitoringView from '@/components/LiveMonitoringView';
import ValidationCompliance from '@/components/ValidationCompliance';
import ReportsAnalytics from '@/components/ReportsAnalytics';
import { LayoutDashboard, Map, Eye, Award, FileText, HeartPulse, ArrowLeft } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'LANDING' | 'PORTAL'>('LANDING');

  // Hospital Portal State
  const [portalTab, setPortalTab] = useState<'OVERVIEW' | 'BED_MAP' | 'LIVE_MONITOR' | 'VALIDATION' | 'REPORTS'>('OVERVIEW');
  const [currentRole, setCurrentRole] = useState<RoleType>('NICU Doctor');
  const [beds, setBeds] = useState<BedData[]>(initialBedsData);
  const [selectedBedId, setSelectedBedId] = useState<string>('BED-101');

  const selectedBed = beds.find((b) => b.bed_id === selectedBedId) || beds[0];

  const handleLaunchBedMonitoring = (bedId: string) => {
    setSelectedBedId(bedId);
    setPortalTab('LIVE_MONITOR');
  };

  const scrollToContact = () => {
    setViewMode('LANDING');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (viewMode === 'PORTAL') {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white pb-20">
        {/* Persistent Bottom Safety Banner */}
        <SafetyBanner />

        {/* Portal Header */}
        <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('LANDING')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Landing Page
            </button>
            <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <HeartPulse className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-2">
                  AROGYA DRISHTI
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono uppercase">
                    HOSPITAL PORTAL
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Portal Navigation Menu */}
          <nav className="flex flex-wrap items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setPortalTab('OVERVIEW')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                portalTab === 'OVERVIEW'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Overview
            </button>

            <button
              onClick={() => setPortalTab('BED_MAP')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                portalTab === 'BED_MAP'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              Bed Spatial Map
            </button>

            <button
              onClick={() => setPortalTab('LIVE_MONITOR')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                portalTab === 'LIVE_MONITOR'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              Live Telemetry
            </button>

            <button
              onClick={() => setPortalTab('VALIDATION')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                portalTab === 'VALIDATION'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Validation
            </button>

            <button
              onClick={() => setPortalTab('REPORTS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                portalTab === 'REPORTS'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Reports & Audits
            </button>
          </nav>
        </header>

        {/* Main Portal View */}
        <div className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <RoleSelector currentRole={currentRole} onRoleChange={setCurrentRole} />

          {portalTab === 'OVERVIEW' && (
            <OverviewDashboard beds={beds} onSelectBed={handleLaunchBedMonitoring} userRole={currentRole} />
          )}

          {portalTab === 'BED_MAP' && (
            <DigitalBedManagement beds={beds} onSelectBed={handleLaunchBedMonitoring} userRole={currentRole} />
          )}

          {portalTab === 'LIVE_MONITOR' && (
            <LiveMonitoringView
              bed={selectedBed}
              onBack={() => setPortalTab('OVERVIEW')}
              userRole={currentRole}
            />
          )}

          {portalTab === 'VALIDATION' && <ValidationCompliance userRole={currentRole} />}

          {portalTab === 'REPORTS' && <ReportsAnalytics userRole={currentRole} />}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white relative pb-20">
      {/* Persistent Bottom Safety Banner */}
      <SafetyBanner />

      {/* Top Header Navigation Bar */}
      <Navbar
        onOpenDemo={scrollToContact}
        onOpenPortal={() => setViewMode('PORTAL')}
      />

      {/* Section 1: Hero Section */}
      <Hero
        onOpenDemo={scrollToContact}
        onOpenPortal={() => setViewMode('PORTAL')}
      />

      {/* Section 2: Problem vs. Solution Comparison */}
      <Platform />

      {/* Section 3: Feature Grid */}
      <Features />

      {/* Section 4: Workflow Stepper */}
      <Workflow />

      {/* Section 5: Technology Stack */}
      <Technology />

      {/* Section 6: Clinical Validation */}
      <Validation />

      {/* Section 7: Deployment Models */}
      <Deployment />

      {/* Section 8: Demo Request Form */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
