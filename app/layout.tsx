import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Arogya Drishti | AI Healthcare Platform for Rural Communities',
  description: 'Arogya Drishti is an AI-powered healthcare platform enabling early disease prediction, maternal & child health monitoring, multilingual voice assistance, offline AI, and smart hospital integration.',
  keywords: ['AI Healthcare', 'Rural Health', 'Disease Prediction', 'Maternal Health', 'Arogya Drishti', 'Telemedicine', 'India AI'],
  authors: [{ name: 'Arogya Drishti Team' }],
  openGraph: {
    title: 'Arogya Drishti - Revolutionizing Rural Healthcare with AI',
    description: 'AI-powered diagnostic and preventive healthcare platform designed for rural communities.',
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
      <body className="bg-white text-navy-900 antialiased font-sans bg-grid-overlay min-h-screen selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
