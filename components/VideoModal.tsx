'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Activity, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-navy-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 z-10"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-navy-950">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-white">
                  Arogya Drishti Platform Overview Video
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video container preview */}
            <div className="relative aspect-video bg-navy-950 flex flex-col items-center justify-center p-8 text-center group">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer shadow-emerald-glow">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Empowering Rural Healthcare Workers with AI
              </h3>
              <p className="text-sm text-gray-400 max-w-md">
                Watch how Arogya Drishti operates offline on tablets to deliver early disease prediction in remote village health posts across India.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" /> 4K Product Showcase Walkthrough (2:30 Min)
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
