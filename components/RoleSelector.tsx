'use client';

import React from 'react';
import { UserCheck, Shield, Stethoscope, HeartPulse, Lock } from 'lucide-react';

export type RoleType = 'NICU Doctor' | 'NICU Nurse' | 'Hospital Administrator' | 'Researcher/Auditor';

interface RoleSelectorProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
}

const roles: { role: RoleType; icon: any; color: string; desc: string }[] = [
  {
    role: 'NICU Doctor',
    icon: Stethoscope,
    color: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
    desc: 'Full clinical access, live override, reports & XAI'
  },
  {
    role: 'NICU Nurse',
    icon: HeartPulse,
    color: 'border-teal-500 bg-teal-500/10 text-teal-400',
    desc: 'Bed management, patient vitals, alert resolution'
  },
  {
    role: 'Hospital Administrator',
    icon: Shield,
    color: 'border-cyan-500 bg-cyan-500/10 text-cyan-400',
    desc: 'User management, audit logs, bed layout setup'
  },
  {
    role: 'Researcher/Auditor',
    icon: Lock,
    color: 'border-amber-500 bg-amber-500/10 text-amber-400',
    desc: 'Validation metadata & model benchmarks'
  }
];

export default function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  return (
    <div className="bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 mb-6 text-white shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-wide text-white uppercase flex items-center gap-2">
              Role-Based Access Control (RBAC)
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">JWT Verified</span>
            </h2>
            <p className="text-xs text-slate-400">Current Role: <strong className="text-emerald-400">{currentRole}</strong></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {roles.map((item) => {
          const Icon = item.icon;
          const isActive = currentRole === item.role;
          return (
            <button
              key={item.role}
              onClick={() => onRoleChange(item.role)}
              className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                isActive
                  ? `${item.color} shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50`
                  : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-bold">{item.role}</span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
              </div>
              <p className="text-[11px] opacity-80 leading-snug">{item.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
