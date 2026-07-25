'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Activity, ArrowRight } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    orgType: 'Hospital Network',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-navy-900 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-2">
                  Demo Request Received!
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Thank you, <span className="font-semibold text-navy-900">{formData.name}</span>. Our healthcare AI solutions team will contact you within 24 hours to schedule a custom demonstration.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-navy-900 text-white font-semibold text-sm hover:bg-emerald-600 transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Schedule Live Demonstration
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-navy-900 mb-1">
                  Request Arogya Drishti Demo
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  See how our offline AI platform operates in rural clinical settings.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Ananya Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-navy-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@health.gov.in"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-navy-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-navy-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Organization Name</label>
                      <input
                        type="text"
                        required
                        placeholder="District Civil Hospital"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-navy-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Organization Type</label>
                      <select
                        value={formData.orgType}
                        onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-navy-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Hospital Network">Hospital Network</option>
                        <option value="Government Department">State/District Health Dept</option>
                        <option value="NGO / Non-Profit">Healthcare NGO</option>
                        <option value="Primary Health Center">Primary Health Center</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Deployment Requirements (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Number of primary health centers or tablets needed..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-navy-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-navy-900 text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Submit Demo Request
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
