import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const viewport: Viewport = {
  themeColor: '#0B132B',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Dr. Obed Nyavor, Ph.D. | Advanced Polymer Networks & Multiscale Mechanics',
  description:
    'Research portfolio of Dr. Obed Nyavor, P.hD. Specializing in dynamic polymer networks (vitrimers), multiscale computational modeling (DFT/MD), and advanced additive manufacturing.',
  keywords: [
    'Obed Nyavor',
    'Vitrimers',
    'Dynamic Polymer Networks',
    'DFT',
    'Molecular Dynamics',
    'LAMMPS',
    'ORCA',
    'Additive Manufacturing',
    'Shape Memory Polymers',
    'Lunar Regolith',
  ],
  authors: [{ name: 'Obed Nyavor, Ph.D.' }],
  openGraph: {
    title: 'Obed Nyavor, Ph.D. | Materials Scientist & Mechanical Engineer',
    description:
      'Pioneering sustainable vitrimers, high-performance thermoset recycling, and high-fidelity DFT/MD simulations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0B132B] text-[#F8FAFC] min-h-screen flex flex-col selection:bg-[#1B998B] selection:text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#1B998B] text-white px-4 py-2 rounded-md font-mono text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}