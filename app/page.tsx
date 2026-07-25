'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Platform from '@/components/Platform';
import Technology from '@/components/Technology';
import Workflow from '@/components/Workflow';
import Features from '@/components/Features';
import Validation from '@/components/Validation';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import DemoModal from '@/components/DemoModal';
import VideoModal from '@/components/VideoModal';
import PortalModal from '@/components/PortalModal';

export default function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  return (
    <main className="min-h-screen relative selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenVideo={() => setIsVideoOpen(true)}
      />

      {/* Statistics Section */}
      <Stats />

      {/* Platform Capabilities Section */}
      <Platform />

      {/* Technology Dark Section */}
      <Technology />

      {/* Workflow Timeline Section */}
      <Workflow />

      {/* Alternating Features Section */}
      <Features
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {/* Clinical Validation Section */}
      <Validation />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Accordion Section */}
      <Faq />

      {/* CTA Section */}
      <CtaSection
        onOpenDemo={() => setIsDemoOpen(true)}
        onOpenContact={() => setIsDemoOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Interactive Dialog Modals */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <PortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
      />
    </main>
  );
}
