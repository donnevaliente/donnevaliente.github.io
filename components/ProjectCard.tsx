import React from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { ArrowUpRight, Cpu } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/30 hover:border-[#1B998B]/60 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[#1B998B]/10">
      <div className="p-6 pb-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border bg-[#1B998B]/10 border-[#1B998B]/30 text-[#1B998B]">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#1B998B] transition-colors leading-snug">
            <Link href={`/research/${project.slug}`} className="focus:outline-none focus:underline">
              <span className="absolute inset-0" aria-hidden="true" />
              {project.title}
            </Link>
          </h3>
        </div>

        <p className="text-sm text-[#94A3B8] line-clamp-3 leading-relaxed flex-1">
          {project.summary}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="pt-2 border-t border-[#25616D]/30 flex flex-wrap gap-1.5 text-[10px] font-mono text-[#94A3B8]">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 bg-[#25616D]/20 px-2 py-0.5 rounded border border-[#25616D]/40"
              >
                <Cpu className="w-3 h-3 text-[#1B998B]" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 text-xs font-mono font-medium text-[#1B998B]">
          <span>Explore Methodology & Data</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}