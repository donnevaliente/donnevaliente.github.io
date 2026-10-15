'use client';

import React, { useState, useEffect } from 'react';
import { supabase, generateEndnote } from '@/lib/supabase';
import { SEED_PUBLICATIONS } from '@/lib/seedData';
import type { Publication } from '@/lib/types';
import { BibtexModal } from '@/components/BibtexModal';
import {
  BookOpen,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Code2,
  Sparkles,
  Award,
} from 'lucide-react';

type FilterTab = 'All' | 'Peer-Reviewed Articles' | 'Patents / Inventions' | 'Conference Proceedings';

const FILTER_TABS: FilterTab[] = [
  'All',
  'Peer-Reviewed Articles',
  'Patents / Inventions',
  'Conference Proceedings',
];

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>(SEED_PUBLICATIONS);
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [selectedBibtexPub, setSelectedBibtexPub] = useState<Publication | null>(null);

  useEffect(() => {
    async function loadPublications() {
      try {
        const { data, error } = await supabase
          .from('publications')
          .select('*')
          .order('year', { ascending: false });

        if (!error && data && data.length > 0) {
          setPublications(data as Publication[]);
        }
      } catch (err) {
        console.warn('Falling back to seed publications data');
      }
    }
    loadPublications();
  }, []);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownloadEndnote = (pub: Publication) => {
    const content = generateEndnote(pub);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pub.title.slice(0, 15).replace(/[^a-zA-Z0-9]/g, '_')}.enw`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const matchesCategory = (pub: Publication, tab: FilterTab) => {
    if (tab === 'All') return true;
    const t = String(pub.pub_type).toLowerCase();
    if (tab === 'Peer-Reviewed Articles') return t === 'journal' || t.includes('article') || t.includes('peer');
    if (tab === 'Patents / Inventions') return t === 'patent' || t.includes('patent') || t.includes('invention');
    if (tab === 'Conference Proceedings') return t === 'conference' || t.includes('proceeding') || t.includes('inproceedings');
    return true;
  };

  const filteredPubs = publications.filter((p) => matchesCategory(p, activeTab));

  const formatBadgeLabel = (type: string) => {
    const t = String(type).toLowerCase();
    if (t === 'journal' || t.includes('article')) return 'Peer-Reviewed Journal';
    if (t === 'patent' || t.includes('patent')) return 'Patent / Disclosure';
    if (t === 'conference' || t.includes('conference')) return 'Conference Proceeding';
    return type;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#25616D]/30 text-[#1B998B] border border-[#1B998B]/40">
          <BookOpen className="w-3.5 h-3.5" />
          Intellectual Property & Peer-Reviewed Literature
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Publications & Patents
        </h1>
        <p className="text-base text-[#94A3B8] leading-relaxed">
          Peer-reviewed articles, patent disclosures, and conference proceedings by <strong>Obed Tawiah Nyavor</strong> and collaborators.
          Focusing on high-solids regolith vitrimers, biodegradable starch composites, and artificial muscle actuators.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#94A3B8] pt-1">
          <a
            href="https://scholar.google.com/citations?user=GuBTPAYAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#25616D]/20 text-[#1B998B] border border-[#1B998B]/30 hover:bg-[#1B998B]/20 transition-colors"
          >
            <Award className="w-3.5 h-3.5" /> Google Scholar Profile
          </a>
          <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
            ORCID: 0009-0009-6711-3281
          </span>
          <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
            ASME ID: 22099754409
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-[#25616D]/30 pb-4">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#1B998B] text-[#0B132B] font-bold shadow-md shadow-[#1B998B]/20'
                : 'bg-[#0B132B] text-[#94A3B8] hover:text-white border border-[#25616D]/30 hover:border-[#1B998B]/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredPubs.map((pub) => {
          const isExpanded = !!expandedAbstracts[pub.id];

          return (
            <article
              key={pub.id}
              className="p-6 rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/30 hover:border-[#1B998B]/50 transition-all duration-200 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-[#25616D]/20 text-[#1B998B] border border-[#1B998B]/30">
                    {formatBadgeLabel(pub.pub_type)}
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">{pub.year}</span>
                </div>
                {pub.is_highlighted && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                    <Sparkles className="w-3 h-3" /> Featured Work
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-white leading-snug">{pub.title}</h2>
                <p className="text-xs font-mono text-[#94A3B8] mt-1.5">
                  {pub.authors.join(', ')}
                </p>
                <p className="text-xs font-mono text-[#1B998B] mt-0.5 font-semibold">
                  {pub.venue}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#25616D]/20">
                <div className="flex flex-wrap items-center gap-2">
                  {pub.abstract && (
                    <button
                      type="button"
                      onClick={() => toggleAbstract(pub.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs bg-white/5 hover:bg-white/10 text-white transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          Hide Abstract <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          View Abstract <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedBibtexPub(pub)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#1B998B]" />
                    Copy BibTeX
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadEndnote(pub)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#1B998B]" />
                    EndNote (.enw)
                  </button>
                </div>

                {pub.doi && (
                  <a
                    href={pub.doi.startsWith('10.') ? `https://doi.org/${pub.doi}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#1B998B] hover:underline"
                  >
                    DOI: {pub.doi} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {isExpanded && pub.abstract && (
                <div className="p-4 rounded-xl bg-[#070D1E] border border-[#25616D]/30 text-xs text-[#94A3B8] leading-relaxed">
                  <span className="block font-mono text-[10px] uppercase text-[#1B998B] mb-1 font-bold">
                    Executive Abstract
                  </span>
                  {pub.abstract}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <BibtexModal
        isOpen={!!selectedBibtexPub}
        publication={selectedBibtexPub}
        onClose={() => setSelectedBibtexPub(null)}
      />
    </div>
  );
}