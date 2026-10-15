import React from 'react';
import {
  Terminal,
  Cpu,
  Layers,
  Zap,
  Flame,
  Sliders,
  Eye,
  Microscope,
  RotateCw,
  Box,
} from 'lucide-react';

interface ArsenalTool {
  name: string;
  focus: string;
  description: string;
  badge: string;
  icon: React.ElementType;
}

const COMPUTATIONAL_TOOLS: ArsenalTool[] = [
  {
    name: 'ORCA 5.0 / 6.0',
    focus: 'DLPNO-CCSD(T), NEB, Reaction Kinetics',
    description: 'Quantum chemical calculations investigating UV-initiated radical polymerization, transesterification activation barriers, and transition-state geometries.',
    badge: 'DFT & Ab-Initio',
    icon: Terminal,
  },
  {
    name: 'LAMMPS',
    focus: 'AIMD, ReaxFF, Coarse-Grained MD',
    description: 'Mesoscale polymer physics simulations evaluating shape-memory entropic recovery, stress relaxation, and bond topological exchanges.',
    badge: 'Molecular Dynamics',
    icon: Layers,
  },
  {
    name: 'VASP & Gaussian',
    focus: 'Periodic Band Structures & Gas-Phase Thermochemistry',
    description: 'Investigating crystal surface adsorption of vitrimer monomers on lunar regolith mineral facets (anorthite, basalt).',
    badge: 'Solid State DFT',
    icon: Cpu,
  },
  {
    name: 'VESTA & Avogadro',
    focus: 'Structural Crystallography & Molecular Visualization',
    description: 'Visualizing unit cells, bond length distortions, and high-dimensional reaction pathways for publications and conferences.',
    badge: 'Visualization',
    icon: Eye,
  },
];

const EXPERIMENTAL_HARDWARE: ArsenalTool[] = [
  {
    name: 'Custom High-Shear 3D Extrusion Printer',
    focus: 'Arduino Mega Integrated // Dual-Zone Heated Barrel',
    description: 'Custom-built direct ink writing (DIW) system designed specifically for highly viscous regolith thermoset composites and dynamic vitrimer filaments.',
    badge: 'Additive Hardware',
    icon: Zap,
  },
  {
    name: 'Dynamic Mechanical Analyzer (DMA / TA Instruments)',
    focus: 'Temperature Sweeps (-100C to 300C) // Frequency Response',
    description: 'Characterization of storage modulus (E-prime), loss modulus (E-double-prime), glass transition temperatures (Tg), and rubbery plateau behavior.',
    badge: 'Thermomechanics',
    icon: Sliders,
  },
  {
    name: 'Rotational Rheometer (DHR-2)',
    focus: 'Stress Relaxation & Oscillatory Shear',
    description: 'Determining topological network reorganization rates, Arrhenius activation energies, and vitrimer topology freezing temperatures (Tv).',
    badge: 'Rheology',
    icon: RotateCw,
  },
  {
    name: 'FE-SEM / EDS & EBSD',
    focus: 'High-Resolution Micrographs & Elemental Mapping',
    description: 'Surface topology analysis, fracture surface inspection, and filler-matrix interface validation for lunar regolith composites.',
    badge: 'Microscopy',
    icon: Microscope,
  },
  {
    name: 'TGA & DSC Testing Suite',
    focus: 'Thermogravimetric & Heat Flow Analysis',
    description: 'Evaluating decomposition profiles under nitrogen/air atmospheres and polymer crystallization enthalpies.',
    badge: 'Thermal Characterization',
    icon: Flame,
  },
  {
    name: 'MTS Mechanical Universal Test System',
    focus: 'Tensile, 3-Point Bending & Cyclic Fatigue',
    description: 'Measurement of ultimate tensile strength, fracture toughness, and shape-memory cyclic repeatability.',
    badge: 'Mechanical Testing',
    icon: Box,
  },
];

export default function ArsenalPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#25616D]/30 text-[#1B998B] border border-[#1B998B]/40">
          <Terminal className="w-3.5 h-3.5" />
          Hardware Systems & High-Performance Computing
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Computational Arsenal & Laboratory Hardware
        </h1>
        <p className="text-base text-[#94A3B8] leading-relaxed">
          A coupled experimental-computational paradigm combining supercomputing simulation
          clusters (LAMMPS, ORCA) with precision materials characterization instrumentation.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#25616D]/30 pb-3">
          <Cpu className="w-5 h-5 text-[#1B998B]" />
          <h2 className="text-xl font-bold text-white font-mono">
            Computational Modeling Suites & Codes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPUTATIONAL_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="p-6 rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/30 hover:border-[#1B998B]/60 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#25616D]/30 text-[#1B998B]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-mono">{tool.name}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded bg-[#1B998B]/10 text-[#1B998B] border border-[#1B998B]/30">
                    {tool.badge}
                  </span>
                </div>
                <div className="text-xs font-mono text-[#1B998B]">{tool.focus}</div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{tool.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#25616D]/30 pb-3">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white font-mono">
            Experimental Additive & Characterization Lab
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPERIMENTAL_HARDWARE.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="p-6 rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/30 hover:border-[#1B998B]/60 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-white/5 text-[#1B998B]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-mono">{tool.name}</h3>
                  <div className="text-[11px] font-mono text-[#1B998B]">{tool.focus}</div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{tool.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}