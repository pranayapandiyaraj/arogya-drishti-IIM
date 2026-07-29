'use client';

import React, { useState } from 'react';
import { Eye, Shield, Lock, UserCheck, ArrowRight, Activity, Stethoscope, HeartPulse, ShieldAlert, Sparkles, Heart, AlertTriangle } from 'lucide-react';
import { RoleType } from './RoleSelector';

interface LoginViewProps {
  onLoginSuccess: (role: RoleType, babyId?: string) => void;
  onBackToLanding: () => void;
}

const quickDemoProfiles: {
  role: RoleType;
  email: string;
  name: string;
  title: string;
  badge: string;
  color: string;
  babyId?: string;
}[] = [
  {
    role: 'NICU Doctor',
    email: 'doctor@arogya.health',
    name: 'Dr. Ananya Roy',
    title: 'Senior Neonatologist',
    badge: 'ASSIGNED BEDS ONLY',
    color: 'emerald'
  },
  {
    role: 'NICU Nurse',
    email: 'nurse@arogya.health',
    name: 'Nurse Priya Nair',
    title: 'Charge Nurse — NICU Ward A',
    badge: 'UNRESTRICTED HOSPITAL VIEW',
    color: 'teal'
  },
  {
    role: 'Hospital Administrator',
    email: 'admin@arogya.health',
    name: 'Admin R. Kapoor',
    title: 'Chief Medical Officer',
    badge: 'UNRESTRICTED GOVERNANCE',
    color: 'indigo'
  },
  {
    role: 'ASHA Worker',
    email: 'asha@arogya.health',
    name: 'Sunita Devi (ASHA)',
    title: 'Rural Maternal Field Officer',
    badge: 'COMMUNITY TELE-MONITORING',
    color: 'amber'
  },
  {
    role: 'Parent / Guardian',
    email: 'parent@arogya.health',
    name: 'Vikram & Meera Sharma',
    title: 'Infant Parents (Bed 101)',
    badge: 'ISOLATED SINGLE BABY VIEW',
    color: 'cyan',
    babyId: 'MRN-1041'
  }
];

// Valid Baby ID / MRN codes mapped in mock database
const validParentBabyIds = ['MRN-1041', 'BED-101', 'PAT-9081', 'MRN-1042', 'BED-102', 'MRN-1043', 'BED-103', 'MRN-1044', 'BED-104'];

export default function LoginView({ onLoginSuccess, onBackToLanding }: LoginViewProps) {
  const [email, setEmail] = useState('doctor@arogya.health');
  const [password, setPassword] = useState('••••••••••••');
  const [babyId, setBabyId] = useState('MRN-1041');
  const [selectedRole, setSelectedRole] = useState<RoleType>('NICU Doctor');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSelectQuickDemo = (profile: typeof quickDemoProfiles[0]) => {
    setEmail(profile.email);
    setSelectedRole(profile.role);
    setLoginError(null);

    const targetBabyId = profile.babyId || 'MRN-1041';
    if (profile.role === 'Parent / Guardian') {
      setBabyId(targetBabyId);
    }
    onLoginSuccess(profile.role, targetBabyId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (selectedRole === 'Parent / Guardian') {
      const normalizedInput = babyId.trim().toUpperCase();
      const isValid = validParentBabyIds.some(id => id.toUpperCase() === normalizedInput);
      if (!isValid && normalizedInput !== '101' && normalizedInput !== '102' && normalizedInput !== '103' && normalizedInput !== '104') {
        setLoginError('Invalid Baby ID / MRN for this parent account. Please verify your infant\'s hospital registration code (e.g. MRN-1041 or BED-101).');
        return;
      }
    }

    onLoginSuccess(selectedRole, babyId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen w-full">
        
        {/* Left Panel: Feature Summary & Prototype Badge */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 p-8 lg:p-12 flex flex-col justify-between border-r border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Header */}
          <div className="space-y-6 z-10">
            <button
              onClick={onBackToLanding}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800"
            >
              ← Return to Landing Page
            </button>

            <div className="flex items-center gap-3 pt-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                  AROGYA DRISHTI
                </h1>
                <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
                  AI NEONATAL VISION PLATFORM
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                Role-Based Clinical Portal &amp; Isolated Patient Access
              </h2>
              <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
                Multi-tier Role-Based Access Control (RBAC) enforcing strict patient data isolation. Doctors access assigned patients, nurses &amp; admins view full hospital status, while parents access single-baby views.
              </p>
            </div>

            {/* Feature Bullet Summary */}
            <div className="space-y-2.5 pt-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  ✓
                </div>
                <span>Strict Doctor Triage: Filtered to assigned care team baby MRNs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  ✓
                </div>
                <span>Isolated Parent Portal: Single Baby ID/MRN authentication</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  ✓
                </div>
                <span>Unrestricted Hospital View for Charge Nurses &amp; Administrators</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  ✓
                </div>
                <span>ISO 14971-aligned Explainable AI (XAI) &amp; AES-256 encrypted telemetry</span>
              </div>
            </div>
          </div>

          {/* Prototype Badge Footer */}
          <div className="z-10 pt-8 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              V1.0 • PROTOTYPE BUILD
            </span>
            <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 font-mono text-slate-400">
              RBAC PROTECTED
            </span>
          </div>
        </div>

        {/* Right Panel: Login Form & Quick Demo Switcher Cards */}
        <div className="lg:col-span-7 bg-slate-950 p-8 lg:p-12 flex flex-col justify-center max-w-2xl mx-auto w-full space-y-6">
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">Hospital Portal Authentication</h3>
            <p className="text-xs text-slate-400 mt-1">
              Select a clinical demo role below or enter credentials to sign in.
            </p>
          </div>

          {/* Login Error Notification */}
          {loginError && (
            <div className="bg-rose-950/80 border border-rose-500/60 text-rose-200 p-4 rounded-2xl text-xs flex items-start gap-3 animate-pulse shadow-xl">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-white mb-0.5">Authentication Failed</strong>
                {loginError}
              </div>
            </div>
          )}

          {/* Quick Demo Switcher Cards */}
          <div className="space-y-2.5">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
              Quick Role Switcher (1-Click Demo Sign-In)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {quickDemoProfiles.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => handleSelectQuickDemo(p)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 group ${
                    selectedRole === p.role
                      ? 'bg-slate-900 border-emerald-500/80 shadow-lg ring-1 ring-emerald-500/50'
                      : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      {p.role}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono font-bold">
                      {p.badge}
                    </span>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-200">{p.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.email}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">User Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="name@arogya.health"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Security Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder="••••••••••••"
              />
            </div>

            {/* MANDATORY BABY ID / MRN FIELD FOR PARENTS */}
            {selectedRole === 'Parent / Guardian' && (
              <div className="bg-slate-900 p-4 rounded-2xl border border-cyan-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-cyan-400 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-cyan-400" />
                    Baby ID / Hospital MRN *
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">REQUIRED FOR PARENTS</span>
                </div>
                <input
                  type="text"
                  value={babyId}
                  onChange={(e) => setBabyId(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="e.g. MRN-1041 or BED-101"
                />
                <p className="text-[11px] text-slate-400 leading-snug">
                  Enter your newborn&apos;s assigned hospital MRN or Bed Code to unlock their isolated telemetry portal.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              Sign In ({selectedRole})
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
