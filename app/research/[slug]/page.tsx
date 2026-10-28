import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { SEED_PROJECTS } from '@/lib/seedData';
import type { Project } from '@/lib/types';
import { ArrowLeft, Terminal } from 'lucide-react';

interface ProjectSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const { data } = await (supabase.from('projects') as any).select('slug');
    if (data && data.length > 0) {
      return data.map((p: any) => ({ slug: String(p.slug) }));
    }
  } catch (err) {
    // fallback to SEED_PROJECTS
  }
  return SEED_PROJECTS.map((p) => ({ slug: p.slug }));
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return data as Project;
    }
  } catch (err) {
    // fallback
  }
  return SEED_PROJECTS.find((p) => p.slug === slug) || null;
}

export default async function ProjectDetailPage({ params }: ProjectSlugProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div>
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#1B998B] hover:text-[#1B998B]/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Research Portfolio
        </Link>
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-md text-xs font-mono font-medium border bg-[#1B998B]/10 border-[#1B998B]/30 text-[#1B998B]">
          {project.category}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>
        <p className="text-lg text-[#94A3B8] leading-relaxed max-w-3xl">
          {project.summary}
        </p>
      </div>

      {project.computational_specs && (
        <div className="rounded-2xl bg-[#0B132B] border border-[#25616D] p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#25616D]/40 pb-3">
            <Terminal className="w-5 h-5 text-[#1B998B]" />
            <h2 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
              Computational Arsenal &amp; Simulation Parameters
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            {project.computational_specs.engine && (
              <div className="p-3 rounded-lg bg-[#070D1E] border border-[#25616D]/30">
                <span className="text-[#94A3B8] block text-[10px] uppercase">Engine</span>
                <span className="text-white font-bold">{project.computational_specs.engine}</span>
              </div>
            )}
            {project.computational_specs.dft_functional && (
              <div className="p-3 rounded-lg bg-[#070D1E] border border-[#25616D]/30">
                <span className="text-[#94A3B8] block text-[10px] uppercase">Functional</span>
                <span className="text-white font-bold">{project.computational_specs.dft_functional}</span>
              </div>
            )}
            {project.computational_specs.md_ensemble && (
              <div className="p-3 rounded-lg bg-[#070D1E] border border-[#25616D]/30">
                <span className="text-[#94A3B8] block text-[10px] uppercase">MD Ensemble</span>
                <span className="text-white font-bold">{project.computational_specs.md_ensemble}</span>
              </div>
            )}
            {project.computational_specs.hardware && (
              <div className="p-3 rounded-lg bg-[#070D1E] border border-[#25616D]/30">
                <span className="text-[#94A3B8] block text-[10px] uppercase">Hardware Setup</span>
                <span className="text-white font-bold">{project.computational_specs.hardware}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {project.methodologies && project.methodologies.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-mono font-bold uppercase text-[#94A3B8] tracking-wider">
            Experimental Methodologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.methodologies.map((method) => (
              <span
                key={method}
                className="px-3 py-1 rounded-md text-xs font-mono bg-[#25616D]/20 text-[#1B998B] border border-[#1B998B]/30"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="prose prose-invert max-w-none text-[#94A3B8] space-y-6 leading-relaxed">
        <div
          dangerouslySetInnerHTML={{
            __html: project.content
              .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-white mt-6 mb-3 font-mono">$1</h3>')
              .replace(/- (.*)/g, '<li class="text-sm text-[#94A3B8] ml-4 list-disc">$1</li>')
              .replace(/\n\n/g, '<p class="text-sm text-[#94A3B8] leading-relaxed mb-4"></p>'),
          }}
        />
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="pt-8 border-t border-[#25616D]/30 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded text-xs font-mono bg-white/5 text-[#94A3B8] border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
