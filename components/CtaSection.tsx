'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldAlert, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CtaSectionProps {
  onAddDemoRequest?: (req: any) => void;
}

export default function CtaSection({ onAddDemoRequest }: CtaSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalType: 'Private',
    city: '',
    state: '',
    nicuLevel: 'Level II',
    bedCount: '12',
    contactPerson: '',
    email: '',
    phone: '',
    deploymentInterest: 'Pilot Program',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onAddDemoRequest) {
      onAddDemoRequest({
        id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toLocaleString(),
        ...formData,
        status: 'PENDING'
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5" /> HOSPITAL DEMO REQUEST
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bring contactless monitoring to your NICU.
            </h2>
            <p className="text-sm text-slate-600 font-normal mt-2">
              Fill out the hospital assessment form to schedule a live technical demo or pilot setup.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 border border-emerald-300 text-center shadow-lg my-6"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Demo Request Submitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Thank you for contacting Arogya Drishti. Our clinical engineering team will review your hospital parameters and reach out within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-emerald-600 transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Hospital Name & Hospital Type */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manipal Hospital / AIIMS NICU"
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hospital Type *
                  </label>
                  <select
                    value={formData.hospitalType}
                    onChange={(e) => setFormData({ ...formData, hospitalType: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
                    <option value="PHC">PHC</option>
                  </select>
                </div>
              </div>

              {/* Row 2: City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karnataka"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Row 3: NICU Level & Bed Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    NICU Level *
                  </label>
                  <select
                    value={formData.nicuLevel}
                    onChange={(e) => setFormData({ ...formData, nicuLevel: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Level I">Level I</option>
                    <option value="Level II">Level II</option>
                    <option value="Level III">Level III</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Bed Count *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 15"
                    value={formData.bedCount}
                    onChange={(e) => setFormData({ ...formData, bedCount: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Row 4: Contact Person, Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Ananya Sharma"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="doctor@hospital.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Row 5: Deployment Interest */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Deployment Interest *
                </label>
                <select
                  value={formData.deploymentInterest}
                  onChange={(e) => setFormData({ ...formData, deploymentInterest: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Pilot Program">Pilot Program</option>
                  <option value="Full Commercial">Full Commercial</option>
                  <option value="Research Collaboration">Research Collaboration</option>
                </select>
              </div>

              {/* Row 6: Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Message / Special Clinical Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your NICU monitoring requirements, existing hardware setup, or rural telemedicine needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>

              {/* Submit Button & Disclaimer Tag */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm rounded-full shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Request Demo
                </button>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-700 bg-amber-100/80 px-3 py-1.5 rounded-md border border-amber-300">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  PROTOTYPE - NOT FOR CLINICAL USE
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
