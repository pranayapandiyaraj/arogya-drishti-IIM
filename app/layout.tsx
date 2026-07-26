import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Arogya Drishti | Contactless AI Neonatal Telemetry Platform',
  description: 'AI-powered, contactless neonatal monitoring platform for NICUs, hospitals, and primary health centers. Live rPPG vitals estimation, XAI decision support, and digital bed management.',
  keywords: ['Neonatal Monitoring', 'rPPG', 'NICU Telemetry', 'Arogya Drishti', 'Contactless Vitals', 'Explainable AI', 'Pediatric Health'],
  authors: [{ name: 'Arogya Drishti Team' }],
  openGraph: {
    title: 'Arogya Drishti - Contactless Neonatal Monitoring Platform',
    description: 'Real-time contactless rPPG telemetry, XAI decision support, and digital NICU bed management.',
    url: 'https://arogyadrishti.ai',
    siteName: 'Arogya Drishti',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased font-sans min-h-screen selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
