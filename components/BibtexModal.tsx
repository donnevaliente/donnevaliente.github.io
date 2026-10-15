'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Publication } from '@/lib/types';
import { generateBibTeX, generateEndnote } from '@/lib/supabase';
import { X, Check, Copy, FileText, Code2 } from 'lucide-react';

interface BibtexModalProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BibtexModal({ publication, isOpen, onClose }: BibtexModalProps) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !publication) return null;

  const bibtexCode = generateBibTeX(publication);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtexCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleDownloadEndNote = () => {
    const content = generateEndnote(publication);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${publication.title.slice(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}.enw`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bibtex-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-2xl bg-[#0B132B] border border-[#25616D] p-6 shadow-2xl space-y-5"
      >
        <div className="flex items-center justify-between border-b border-[#25616D]/40 pb-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#1B998B]" aria-hidden="true" />
            <h2 id="bibtex-modal-title" className="text-lg font-bold text-white font-mono">
              Export Citation
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
            aria-label="Close citation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <p className="text-xs font-mono text-[#94A3B8] uppercase">Target Publication</p>
          <p className="text-sm font-medium text-white line-clamp-1 mt-0.5">
            {publication.title}
          </p>
        </div>

        <div className="relative rounded-lg bg-[#070D1E] border border-[#25616D]/30 p-4 overflow-x-auto">
          <pre className="font-mono text-xs text-[#F8FAFC] leading-relaxed">
            <code>{bibtexCode}</code>
          </pre>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleDownloadEndNote}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-medium text-[#F8FAFC] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FileText className="w-4 h-4 text-[#1B998B]" />
            Download EndNote (.enw)
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all duration-200 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1B998B] hover:bg-[#1B998B]/90 text-[#0B132B]'
            } focus:outline-none focus:ring-2 focus:ring-[#1B998B]`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied BibTeX!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy BibTeX
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}