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
import LoginView from '@/components/LoginView';
import RoleSelector, { RoleType } from '@/components/RoleSelector';
import OverviewDashboard, { BedData } from '@/components/OverviewDashboard';
import PatientsTable from '@/components/PatientsTable';
import DigitalBedManagement from '@/components/DigitalBedManagement';
import LiveMonitoringView from '@/components/LiveMonitoringView';
import AlertCenter from '@/components/AlertCenter';
import AnalyticsView from '@/components/AnalyticsView';
import ValidationCompliance from '@/components/ValidationCompliance';
import ReportsAnalytics from '@/components/ReportsAnalytics';
import SystemHealthView from '@/components/SystemHealthView';
import GovernanceView from '@/components/GovernanceView';
import OnboardingView, { DemoRequestItem } from '@/components/OnboardingView';

import {
  LayoutDashboard,
  Users,
  Map,
  Eye,
  Bell,
  BarChart3,
  FileText,
  Activity,
  ShieldCheck,
  Building2,
  HeartPulse,
  ArrowLeft,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Lock,
  Heart
} from 'lucide-react';

const initialBedsData: BedData[] = [
  {
    bed_id: 'BED-101',
    bed_number: '101',
    mrn: 'MRN-1041',
    ward: 'NICU Ward A - High Risk',
    status: 'Normal',
    patientName: 'Infant of Sharma',
    ageWeeks: 32,
    weightGrams: 1650,
    heartRate: 128.5,
    respiratoryRate: 44.0,
    motionIndex: 1.1,
    painScore: 1.2,
    assignedDoctorId: 'doc-01',
    parentEmail: 'parent@arogya.health'
  },
  {
    bed_id: 'BED-102',
    bed_number: '102',
    mrn: 'MRN-1042',
    ward: 'NICU Ward A - High Risk',
    status: 'Caution',
    patientName: 'Baby Girl Patel',
    ageWeeks: 29,
    weightGrams: 1210,
    heartRate: 162.0,
    respiratoryRate: 58.0,
    motionIndex: 3.8,
    painScore: 4.5,
    assignedDoctorId: 'doc-02',
    parentEmail: 'patel.parent@gmail.com'
  },
  {
    bed_id: 'BED-103',
    bed_number: '103',
    mrn: 'MRN-1043',
    ward: 'NICU Ward B - Step-Down',
    status: 'Critical',
    patientName: 'Twin A - Gupta',
    ageWeeks: 28,
    weightGrams: 980,
    heartRate: 92.0,
    respiratoryRate: 22.0,
    motionIndex: 0.2,
    painScore: 6.8,
    assignedDoctorId: 'doc-01',
    parentEmail: 'gupta.parent@gmail.com'
  },
  {
    bed_id: 'BED-104',
    bed_number: '104',
    mrn: 'MRN-1044',
    ward: 'NICU Ward B - Step-Down',
    status: 'Normal',
    patientName: 'Infant of Reddy',
    ageWeeks: 34,
    weightGrams: 1950,
    heartRate: 134.0,
    respiratoryRate: 40.0,
    motionIndex: 1.0,
    painScore: 0.8,
    assignedDoctorId: 'doc-02',
    parentEmail: 'reddy.parent@gmail.com'
  }
];

const initialDemoRequests: DemoRequestItem[] = [
  {
    id: 'REQ-101',
    timestamp: '2026-07-29 10:15:00',
    hospitalName: 'Manipal Hospital NICU Wing',
    hospitalType: 'Private',
    city: 'Bengaluru',
    state: 'Karnataka',
    nicuLevel: 'Level III',
    bedCount: '24',
    contactPerson: 'Dr. Ramesh Rao',
    email: 'ramesh.rao@manipal.edu',
    phone: '+91 98450 12345',
    deploymentInterest: 'Pilot Program',
    message: 'Interested in contactless overhead rPPG camera trial for 6 high-risk incubator beds.',
    status: 'PENDING'
  },
  {
    id: 'REQ-102',
    timestamp: '2026-07-28 16:40:22',
    hospitalName: 'District Civil Hospital NICU',
    hospitalType: 'Government',
    city: 'Mysuru',
    state: 'Karnataka',
    nicuLevel: 'Level II',
    bedCount: '16',
    contactPerson: 'Dr. Sunita K.',
    email: 'sunita.k@karnataka.gov.in',
    phone: '+91 94480 67890',
    deploymentInterest: 'Research Collaboration',
    message: 'Seeking low-cost webcam monitoring setup for step-down neonatal ward.',
    status: 'SCHEDULED'
  }
];

export default function Home() {
  const [viewMode, setViewMode] = useState<'LANDING' | 'LOGIN' | 'PORTAL'>('LANDING');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Hospital Portal & Auth State
  const [portalTab, setPortalTab] = useState<
    'OVERVIEW' | 'PATIENTS' | 'BED_MAP' | 'LIVE_MONITOR' | 'ALERTS' | 'ANALYTICS' | 'REPORTS' | 'SYSTEM_HEALTH' | 'GOVERNANCE' | 'ONBOARDING'
  >('OVERVIEW');

  const [currentRole, setCurrentRole] = useState<RoleType>('NICU Doctor');
  const [assignedBabyIds, setAssignedBabyIds] = useState<string[]>(['BED-101', 'BED-103']); // Dr. Ananya Roy assigned beds
  const [linkedBabyId, setLinkedBabyId] = useState<string>('BED-101'); // Parent linked baby

  const [beds, setBeds] = useState<BedData[]>(initialBedsData);
  const [selectedBedId, setSelectedBedId] = useState<string>('BED-101');
  const [demoRequests, setDemoRequests] = useState<DemoRequestItem[]>(initialDemoRequests);

  const selectedBed = beds.find((b) => b.bed_id === selectedBedId) || beds[0];

  const handleLaunchBedMonitoring = (bedId: string) => {
    setSelectedBedId(bedId);
    setPortalTab('LIVE_MONITOR');
  };

  const handleAddDemoRequest = (newReq: DemoRequestItem) => {
    setDemoRequests((prev) => [newReq, ...prev]);
  };

  const handleLoginSuccess = (role: RoleType, babyIdInput?: string) => {
    setCurrentRole(role);
    setViewMode('PORTAL');

    if (babyIdInput) {
      const normalized = babyIdInput.trim().toUpperCase();
      if (normalized.includes('102')) setLinkedBabyId('BED-102');
      else if (normalized.includes('103')) setLinkedBabyId('BED-103');
      else if (normalized.includes('104')) setLinkedBabyId('BED-104');
      else setLinkedBabyId('BED-101');
    }

    if (role === 'Parent / Guardian') {
      const targetId = babyIdInput ? (babyIdInput.includes('102') ? 'BED-102' : babyIdInput.includes('103') ? 'BED-103' : babyIdInput.includes('104') ? 'BED-104' : 'BED-101') : 'BED-101';
      setSelectedBedId(targetId);
      setPortalTab('OVERVIEW');
    } else {
      setPortalTab('OVERVIEW');
    }
  };

  const scrollToContact = () => {
    setViewMode('LANDING');
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Build menu items based on role-based access control (RBAC)
  const isParent = currentRole === 'Parent / Guardian';
  const isDoctor = currentRole === 'NICU Doctor';

  const allNavMenuItems = [
    { id: 'OVERVIEW', label: isParent ? 'My Infant Status' : 'Overview', icon: LayoutDashboard, badge: null, parentAllowed: true },
    { id: 'PATIENTS', label: 'Patients Directory', icon: Users, badge: isDoctor ? '2 Assigned' : `${beds.length}`, parentAllowed: false },
    { id: 'BED_MAP', label: 'NICU Bed Map', icon: Map, badge: '4/4', parentAllowed: false },
    { id: 'LIVE_MONITOR', label: isParent ? 'My Infant Live Feed' : 'Live Telemetry', icon: Eye, badge: '10 HZ', badgeColor: 'bg-cyan-500/20 text-cyan-400', parentAllowed: true },
    { id: 'ALERTS', label: isParent ? 'My Infant Alerts' : 'Alert Center', icon: Bell, badge: '1 Active', badgeColor: 'bg-rose-500/20 text-rose-400', parentAllowed: true },
    { id: 'ANALYTICS', label: 'Clinical Analytics', icon: BarChart3, badge: null, parentAllowed: false },
    { id: 'REPORTS', label: isParent ? 'My Infant Reports' : 'Reports & Audits', icon: FileText, badge: 'PDF', parentAllowed: true },
    { id: 'SYSTEM_HEALTH', label: 'System Health', icon: Activity, badge: 'OK', badgeColor: 'bg-emerald-500/20 text-emerald-400', parentAllowed: false },
    { id: 'GOVERNANCE', label: 'Governance Logs', icon: ShieldCheck, badge: null, parentAllowed: false },
    { id: 'ONBOARDING', label: 'Hospital Onboarding', icon: Building2, badge: `${demoRequests.length}`, badgeColor: 'bg-amber-500/20 text-amber-400', parentAllowed: false },
  ];

  const navMenuItems = isParent ? allNavMenuItems.filter(item => item.parentAllowed) : allNavMenuItems;

  if (viewMode === 'LOGIN') {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setViewMode('LANDING')}
      />
    );
  }

  if (viewMode === 'PORTAL') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex selection:bg-emerald-500 selection:text-white pb-20">
        {/* Persistent Bottom Safety Banner */}
        <SafetyBanner />

        {/* Persistent Desktop Left Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-col justify-between shrink-0 hidden lg:flex sticky top-0 h-screen z-40 p-4">
          <div className="space-y-6 overflow-y-auto pr-1">
            {/* App Brand Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg">
                <HeartPulse className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                  AROGYA DRISHTI
                </h1>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono uppercase font-bold">
                  {isParent ? 'PARENT PORTAL' : 'HOSPITAL PORTAL'}
                </span>
              </div>
            </div>

            {/* Current Logged-in User Role Badge */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Logged-in User Role</span>
              <strong className="text-emerald-400 text-xs font-extrabold flex items-center gap-1">
                {isParent ? <Heart className="w-3.5 h-3.5 text-cyan-400" /> : <Lock className="w-3.5 h-3.5 text-emerald-400" />}
                {currentRole}
              </strong>
              {isParent && (
                <span className="text-[10px] text-cyan-300 font-mono block font-bold pt-0.5">
                  Linked Infant: Bed 101 (Sharma)
                </span>
              )}
              {isDoctor && (
                <span className="text-[10px] text-emerald-300 font-mono block font-bold pt-0.5">
                  Assigned Beds: BED-101, BED-103
                </span>
              )}
            </div>

            {/* Left Sidebar Navigation Links */}
            <nav className="space-y-1">
              {navMenuItems.map((item) => {
                const IconComp = item.icon;
                const isActive = portalTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setPortalTab(item.id as any)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComp className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400')
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Actions */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => setViewMode('LOGIN')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors flex items-center justify-between border border-slate-700"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-amber-400" />
                Switch User / Logout
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>

            <button
              onClick={() => setViewMode('LANDING')}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-bold transition-colors flex items-center justify-between border border-slate-800"
            >
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Landing Page
              </span>
            </button>
          </div>
        </aside>

        {/* Main Application Workspace */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top Bar for Mobile & Quick Navigation */}
          <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 lg:hidden"
              >
                {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4 animate-pulse" />
                </div>
                <span className="text-xs font-black tracking-tight text-white">
                  AROGYA DRISHTI <span className="text-slate-400 font-normal">| {isParent ? 'Parent Portal' : 'Command Center'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                Active Role: <strong className="text-emerald-400">{currentRole}</strong>
              </span>
              <button
                onClick={() => setViewMode('LOGIN')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
              >
                <LogOut className="w-3.5 h-3.5 text-amber-400" />
                Logout
              </button>
            </div>
          </header>

          {/* Mobile Drawer Menu */}
          {mobileSidebarOpen && (
            <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
              <div className="text-xs text-slate-400 font-bold mb-2">PORTAL NAVIGATION</div>
              <div className="grid grid-cols-2 gap-2">
                {navMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPortalTab(item.id as any);
                      setMobileSidebarOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left ${
                      portalTab === item.id ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main View Container */}
          <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            <RoleSelector currentRole={currentRole} onRoleChange={(r) => setCurrentRole(r)} />

            {portalTab === 'OVERVIEW' && (
              <OverviewDashboard
                beds={beds}
                onSelectBed={handleLaunchBedMonitoring}
                userRole={currentRole}
                assignedBabyIds={assignedBabyIds}
                linkedBabyId={linkedBabyId}
              />
            )}

            {portalTab === 'PATIENTS' && (
              <PatientsTable
                beds={beds}
                onSelectBed={handleLaunchBedMonitoring}
                userRole={currentRole}
                assignedBabyIds={assignedBabyIds}
                linkedBabyId={linkedBabyId}
              />
            )}

            {portalTab === 'BED_MAP' && (
              <DigitalBedManagement beds={beds} onSelectBed={handleLaunchBedMonitoring} userRole={currentRole} />
            )}

            {portalTab === 'LIVE_MONITOR' && (
              <LiveMonitoringView
                bed={selectedBed}
                onBack={() => setPortalTab('OVERVIEW')}
                userRole={currentRole}
                assignedBabyIds={assignedBabyIds}
                linkedBabyId={linkedBabyId}
              />
            )}

            {portalTab === 'ALERTS' && (
              <AlertCenter
                userRole={currentRole}
                assignedBabyIds={assignedBabyIds}
                linkedBabyId={linkedBabyId}
              />
            )}

            {portalTab === 'ANALYTICS' && <AnalyticsView userRole={currentRole} />}

            {portalTab === 'REPORTS' && (
              <ReportsAnalytics
                userRole={currentRole}
                assignedBabyIds={assignedBabyIds}
                linkedBabyId={linkedBabyId}
              />
            )}

            {portalTab === 'SYSTEM_HEALTH' && <SystemHealthView userRole={currentRole} />}

            {portalTab === 'GOVERNANCE' && <GovernanceView userRole={currentRole} />}

            {portalTab === 'ONBOARDING' && <OnboardingView demoRequests={demoRequests} userRole={currentRole} />}
          </main>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white relative pb-20">
      {/* Persistent Bottom Safety Banner */}
      <SafetyBanner />

      {/* Top Header Navigation Bar */}
      <Navbar
        onOpenDemo={scrollToContact}
        onOpenPortal={() => setViewMode('LOGIN')}
      />

      {/* Section 1: Hero Section */}
      <Hero
        onOpenDemo={scrollToContact}
        onOpenPortal={() => setViewMode('LOGIN')}
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
      <CtaSection onAddDemoRequest={handleAddDemoRequest} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
