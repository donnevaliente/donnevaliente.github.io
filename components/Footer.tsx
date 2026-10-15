import React from 'react';
import Link from 'next/link';
import { Atom, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#25616D]/30 bg-[#070D1E] py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Atom className="w-6 h-6 text-[#1B998B]" aria-hidden="true" />
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              Obed Nyavor | A2MD
            </span>
          </div>
          <p className="text-sm text-[#94A3B8] max-w-md leading-relaxed">
            Bridging the Lab-to-Fab gap through predictive multiscale simulations (DFT/MD),
            associative dynamic polymer networks (vitrimers), and custom hardware additive manufacturing.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#94A3B8]">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#25616D]/20 text-[#1B998B] border border-[#1B998B]/30">
              Louisiana State University (LSU)
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
              ORCID: 0009-0009-6711-3281
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              NSF OIA-2418415 & OIA-1946231
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
            Core Domains
          </h3>
          <ul className="space-y-2 text-sm text-[#94A3B8]">
            <li>
              <Link href="/research" className="hover:text-[#1B998B] transition-colors">
                Regolith-Vitrimer Additive Mfg
              </Link>
            </li>
            <li>
              <Link href="/arsenal" className="hover:text-[#1B998B] transition-colors">
                Computational Modeling (ORCA & LAMMPS)
              </Link>
            </li>
            <li>
              <Link href="/about#a2md" className="hover:text-[#1B998B] transition-colors">
                A2MD Deep-Tech Venture
              </Link>
            </li>
            <li>
              <Link href="/publications" className="hover:text-[#1B998B] transition-colors">
                Publications & Patents
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
            Navigation & Portal
          </h3>
          <ul className="space-y-2 text-sm text-[#94A3B8]">
            <li>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 text-[#1B998B] hover:text-[#1B998B]/80 font-mono text-xs transition-colors"
              >
                Researcher Admin Portal <ArrowUpRight className="w-3 h-3" />
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                Biography & Academic Trajectory
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Collaborate / Inquiries
              </Link>
            </li>
            <li className="pt-2 text-xs font-mono text-[#94A3B8]/60">
              &copy; {new Date().getFullYear()} Obed Tawiah Nyavor. All rights reserved.
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}