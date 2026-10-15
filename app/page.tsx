import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { SEED_PROJECTS, SEED_NEWS } from '@/lib/seedData';
import type { Project, NewsItem } from '@/lib/types';
import { ProjectCard } from '@/components/ProjectCard';
import {
  FileText,
  Award,
  BookOpen,
  GraduationCap,
  ArrowRight,
  Download,
  Linkedin,
  ExternalLink,
  Cpu,
  Flame,
  Calendar,
  Sparkles,
  Zap,
  Rocket,
  CheckCircle2,
} from 'lucide-react';

export const revalidate = 60;

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .limit(3);

    if (error || !data || data.length === 0) {
      return SEED_PROJECTS.filter((p) => p.is_featured).slice(0, 3);
    }
    return data as Project[];
  } catch (err) {
    return SEED_PROJECTS.filter((p) => p.is_featured).slice(0, 3);
  }
}

async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
      .limit(4);

    if (error || !data || data.length === 0) {
      return SEED_NEWS.slice(0, 4);
    }
    return data as NewsItem[];
  } catch (err) {
    return SEED_NEWS.slice(0, 4);
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const latestNews = await getLatestNews();

  return (
    <div className="space-y-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#25616D]/30">
        <div
          className="absolute inset-0 pointer-events-none opacity-20 bg-deeptech-grid"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1B998B]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#25616D]/30 text-[#1B998B] border border-[#1B998B]/40">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Dynamic Polymer Networks (Vitrimers)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 text-[#94A3B8] border border-white/10">
                  <Cpu className="w-3.5 h-3.5 text-[#1B998B]" />
                  Multiscale Modeling & Additive Systems
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Bridging Quantum Kinetics to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#1B998B]">
                  Extreme Additive Manufacturing
                </span>.
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                I am <strong>Obed Tawiah Nyavor</strong> — Doctoral Materials Scientist at Louisiana State University
                and Founder of <strong>A2MD</strong>. I pioneer associative vitrimer composites, high-solids (50–60 wt%)
                lunar regolith 3D printing for NASA Moon-to-Mars initiatives, and electrospun artificial muscles.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-mono text-sm font-bold text-[#0B132B] bg-[#1B998B] hover:bg-[#1B998B]/90 transition-all duration-200 shadow-lg shadow-[#1B998B]/20 focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
                >
                  Explore Research <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-mono text-sm font-semibold text-white bg-[#25616D]/40 hover:bg-[#25616D]/70 transition-all duration-200 border border-[#25616D] focus:outline-none focus:ring-2 focus:ring-[#25616D]"
                >
                  <Download className="w-4 h-4 text-[#1B998B]" />
                  Download CV
                </a>

                <div className="flex items-center gap-2 pl-2 border-l border-[#25616D]/40">
                  <a
                    href="https://scholar.google.com/citations?user=GuBTPAYAAAAJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#1B998B]/20 text-[#94A3B8] hover:text-[#1B998B] transition-colors"
                    title="Google Scholar Profile"
                    aria-label="Google Scholar Profile"
                  >
                    <BookOpen className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/obed-t-nyavor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#1B998B]/20 text-[#94A3B8] hover:text-[#1B998B] transition-colors"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://orcid.org/0009-0009-6711-3281"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#1B998B]/20 text-[#94A3B8] hover:text-[#1B998B] transition-colors"
                    title="ORCID Record"
                    aria-label="ORCID Record"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Metrics Counters */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0B132B]/60 border border-[#25616D]/30 backdrop-blur-sm hover:border-[#1B998B]/60 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#94A3B8] uppercase">Publications</span>
                  <FileText className="w-4 h-4 text-[#1B998B]" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">5+</div>
                <p className="text-[11px] text-[#94A3B8] mt-1 font-mono">J. Appl. Polym. Sci, SPE</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B132B]/60 border border-[#25616D]/30 backdrop-blur-sm hover:border-[#1B998B]/60 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#94A3B8] uppercase">GPA / Honors</span>
                  <Award className="w-4 h-4 text-[#1B998B]" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">4.0</div>
                <p className="text-[11px] text-[#94A3B8] mt-1 font-mono">Ph.D. & M.E. Standing</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B132B]/60 border border-[#25616D]/30 backdrop-blur-sm hover:border-[#1B998B]/60 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#94A3B8] uppercase">Grants</span>
                  <Cpu className="w-4 h-4 text-[#1B998B]" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">NSF</div>
                <p className="text-[11px] text-[#94A3B8] mt-1 font-mono">OIA-2418415 / LAMDA</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0B132B]/60 border border-[#25616D]/30 backdrop-blur-sm hover:border-[#1B998B]/60 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-[#94A3B8] uppercase">Role</span>
                  <GraduationCap className="w-4 h-4 text-[#1B998B]" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">Ph.D.</div>
                <p className="text-[11px] text-[#94A3B8] mt-1 font-mono">LSU Mech. Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VENTURE SHOWCASE: A2MD - BRIDGING THE LAB-TO-FAB GAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#0D1E38] to-[#0B132B] border border-[#25616D]/60 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B998B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1B998B]/20 text-[#1B998B] border border-[#1B998B]/40">
                <Rocket className="w-3.5 h-3.5 text-[#1B998B]" />
                Venture Showcase // A2MD
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                A2MD: Bridging the <span className="text-[#1B998B]">Lab-to-Fab Gap</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl">
                Advanced Autonomous Materials, Manufacturing and Design (<strong>A2MD</strong>) overcomes the critical bottleneck
                where laboratory chemistries fail during manufacturing scale-up. We unite predictive computational design
                (MGI framework, ORCA DFT, LAMMPS MD) with tailor-engineered process hardware (custom PLC/Arduino extrusion systems).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-[#F8FAFC]">
                <div className="flex items-center gap-2 bg-[#070D1E]/60 p-3 rounded-lg border border-[#25616D]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#1B998B] shrink-0" />
                  <span>50–60 wt% Lunar Regolith Slurry Extrusion</span>
                </div>
                <div className="flex items-center gap-2 bg-[#070D1E]/60 p-3 rounded-lg border border-[#25616D]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#1B998B] shrink-0" />
                  <span>NASA Moon-to-Mars (LI-7) & Commercial ISRU</span>
                </div>
                <div className="flex items-center gap-2 bg-[#070D1E]/60 p-3 rounded-lg border border-[#25616D]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#1B998B] shrink-0" />
                  <span>Dual Model: SBIR/STTR + B2B Consulting</span>
                </div>
                <div className="flex items-center gap-2 bg-[#070D1E]/60 p-3 rounded-lg border border-[#25616D]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#1B998B] shrink-0" />
                  <span>Target Commercial Launch: 2030</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-4 p-6 rounded-2xl bg-[#070D1E] border border-[#25616D]/50 text-center">
              <Zap className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="text-base font-bold text-white font-mono">Partner with A2MD</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Exploring spaceflight payload integrations, extreme composite scaling, or predictive computational rheology.
              </p>
              <Link
                href="/about#a2md"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B998B] hover:bg-[#1B998B]/90 text-[#0B132B] font-mono text-xs font-bold uppercase transition-colors"
              >
                Read Venture Strategy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BREAKTHROUGHS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#1B998B] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Core Technical Contributions
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Featured Breakthroughs
            </h2>
          </div>
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1B998B] hover:text-[#1B998B]/80 transition-colors"
          >
            View all projects & datasets <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* LATEST NEWS & MILESTONES TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-t border-[#25616D]/30 pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-mono text-[#1B998B] uppercase tracking-wider mb-2">
                Timeline & Announcements
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Latest News & Milestones
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/30 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                    <Calendar className="w-3.5 h-3.5 text-[#1B998B] shrink-0" />
                    <span>{item.date}</span>
                  </div>
                  <span className="inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#25616D]/20 text-[#1B998B] border border-[#1B998B]/30">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {item.external_url && (
                  <div className="pt-2">
                    <a
                      href={item.external_url}
                      target={item.external_url.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#1B998B] hover:underline"
                    >
                      Read full announcement <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}