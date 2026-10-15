'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Atom,
  FileDown,
  Terminal,
  Layers,
  BookOpen,
  User,
  Send,
  Lock,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Research', href: '/research', icon: Layers },
  { name: 'Publications', href: '/publications', icon: BookOpen },
  { name: 'Arsenal', href: '/arsenal', icon: Terminal },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Send },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
          ? 'bg-[#0B132B]/90 backdrop-blur-md border-b border-[#25616D]/50 shadow-xl shadow-black/20'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1B998B] rounded-lg p-1"
            aria-label="Obed Nyavor Home"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#25616D] to-[#1B998B] flex items-center justify-center p-0.5 shadow-md shadow-[#1B998B]/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B132B] rounded-[7px] flex items-center justify-center">
                <Atom className="w-5 h-5 text-[#1B998B] group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-tight text-white group-hover:text-[#1B998B] transition-colors">
                Obed Nyavor, Ph.D. | A2MD
              </span>
              <span className="font-mono text-[10px] text-[#94A3B8] tracking-widest uppercase">
                POLYMERS // MULTISCALE
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md font-mono text-xs tracking-wider transition-all duration-200 ${isActive
                      ? 'text-[#1B998B] bg-[#25616D]/20 border border-[#1B998B]/40 shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-md font-mono text-xs text-[#94A3B8] hover:text-[#1B998B] hover:bg-white/5 transition-colors"
              title="Researcher Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </Link>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md font-mono text-xs font-semibold text-white bg-[#25616D] hover:bg-[#1B998B] transition-all duration-200 border border-[#1B998B]/30 shadow-md shadow-[#1B998B]/10 focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
            >
              <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
              Curriculum Vitae
            </a>
          </div>

          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#94A3B8] hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-[#25616D]/40 bg-[#0B132B] px-4 pt-2 pb-6 space-y-2 shadow-2xl"
        >
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-mono text-sm tracking-wide ${isActive
                    ? 'text-[#1B998B] bg-[#25616D]/20 border border-[#1B998B]/40'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-4 h-4 text-[#1B998B]" aria-hidden="true" />
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#25616D]/20 flex flex-col gap-2">
            <Link
              href="/admin"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md font-mono text-xs text-[#94A3B8] hover:text-white bg-white/5 border border-white/10"
            >
              <Lock className="w-3.5 h-3.5 text-[#1B998B]" />
              Researcher Portal (Admin)
            </Link>
            <a
              href="/cv.pdf"
              download
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md font-mono text-xs font-semibold text-white bg-[#1B998B] hover:bg-[#1B998B]/90 transition-colors shadow-md"
            >
              <FileDown className="w-4 h-4" aria-hidden="true" />
              Download Full CV (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}