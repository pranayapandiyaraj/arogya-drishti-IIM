'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Lock, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortalModal({ isOpen, onClose }: PortalModalProps) {
  const [hospitalId, setHospitalId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-navy-900 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {loggedIn ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">
                  Portal Authentication Success
                </h3>
                <p className="text-xs text-gray-600 mb-6">
                  Redirecting to Hospital Telemetry Command Dashboard...
                </p>
                <button
                  onClick={() => { setLoggedIn(false); onClose(); }}
                  className="px-6 py-2 rounded-full bg-navy-900 text-white font-semibold text-xs hover:bg-emerald-600 transition-colors"
                >
                  Enter Portal
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-navy-900 text-white flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-900">
                    Hospital Partner Access
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-navy-900 mb-1">
                  Hospital Portal Login
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Sign in to view real-time village triage telemetry and referral queues.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hospital / ABHA ID</label>
                    <input
                      type="text"
                      required
                      placeholder="HOSP-DIST-9021"
                      value={hospitalId}
                      onChange={(e) => setHospitalId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-navy-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Security Key / Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-navy-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                    <div className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ABDM Encrypted Session</span>
                    </div>
                    <a href="#" className="text-emerald-600 hover:underline">Forgot Key?</a>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-navy-900 text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Authenticate Hospital Portal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
