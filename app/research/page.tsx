'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SEED_PROJECTS } from '@/lib/seedData';
import type { Project, ProjectCategory } from '@/lib/types';
import { ProjectCard } from '@/components/ProjectCard';
import { Layers } from 'lucide-react';

const CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Additive Manufacturing & Hardware',
  'Vitrimers & Smart Polymers',
  'Molecular Dynamics & DFT',
  'Biopolymers & Composites',
];

export default function ResearchPage() {
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');

  useEffect(() => {
    async function loadProjects() {
      try {
        const { data, error } = await supabase.from('projects').select('*');
        if (!error && data && data.length > 0) {
          setProjects(data as Project[]);
        }
      } catch (err) {
        console.warn('Falling back to seed project data');
      }
    }
    loadProjects();
  }, []);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#25616D]/30 text-[#1B998B] border border-[#1B998B]/40">
          <Layers className="w-3.5 h-3.5" />
          Research Initiatives & Experimental Campaigns
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Dynamic Polymers, Quantum Mechanics & Additive Manufacturing
        </h1>
        <p className="text-base text-[#94A3B8] leading-relaxed">
          Bridging associative network dynamics with high-solid loading extrusion systems,
          supported by NASA, NSF, and the Louisiana Alliance for Simulation-Guided
          Materials Applications (LAMDA).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-[#25616D]/30 pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-[#1B998B] text-[#0B132B] font-bold shadow-md shadow-[#1B998B]/20'
                : 'bg-[#0B132B] text-[#94A3B8] hover:text-white border border-[#25616D]/30 hover:border-[#1B998B]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-sm font-mono text-[#94A3B8]">
          No research projects matched the selected category.
        </div>
      )}
    </div>
  );
}