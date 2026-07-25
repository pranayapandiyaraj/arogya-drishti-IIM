'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Menu, X, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenDemo: () => void;
  onOpenPortal: () => void;
}

export default function Navbar({ onOpenDemo, onOpenPortal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Platform', href: '#platform' },
    { name: 'Technology', href: '#technology' },
    { name: 'Features', href: '#features' },
    { name: 'Validation', href: '#validation' },
    { name: 'Deployment', href: '#workflow' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav border-b border-gray-200/80 py-3.5 shadow-sm'
          : 'bg-white/60 backdrop-blur-md py-5 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left Logo Section */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-emerald-glow group-hover:scale-105 transition-transform duration-300">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-navy-900 tracking-tight leading-none group-hover:text-emerald-600 transition-colors">
                Arogya Drishti
              </span>
              <span className="text-[11px] font-medium text-emerald-600 tracking-wider uppercase mt-0.5">
                AI Healthcare Platform
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-100/70 p-1.5 rounded-full border border-gray-200/60 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-navy-900 hover:bg-white rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenPortal}
              className="px-4 py-2 text-sm font-semibold text-navy-900 bg-white border border-gray-300 rounded-full hover:bg-gray-50 hover:border-navy-900 transition-all duration-200 shadow-sm"
            >
              Hospital Portal
            </button>
            <button
              onClick={onOpenDemo}
              className="px-5 py-2 text-sm font-semibold text-white bg-navy-900 rounded-full hover:bg-emerald-600 transition-all duration-200 shadow-md hover:shadow-emerald-glow flex items-center gap-1.5 group"
            >
              Request Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-navy-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all flex items-center justify-between"
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-navy-900 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Hospital Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-navy-900 rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
