import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  Users,
  Compass,
  FileDown,
  CheckCircle2,
  Rocket,
  Cpu,
  Zap,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Linkedin,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Bio Header */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#25616D]/30 text-[#1B998B] border border-[#1B998B]/40">
          <GraduationCap className="w-3.5 h-3.5" />
          Academic Trajectory & Deep-Tech Venture
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Obed Tawiah Nyavor
        </h1>
        <p className="text-xl text-[#1B998B] font-mono">
          Doctoral Materials Scientist & Mechanical Engineer // Founder, A2MD
        </p>
        <p className="text-base text-[#94A3B8] leading-relaxed">
          I am a doctoral researcher in the Department of Mechanical & Industrial Engineering at{' '}
          <strong className="text-white">Louisiana State University (LSU)</strong> and founder of{' '}
          <strong className="text-white">A2MD</strong> (Advanced Autonomous Materials, Manufacturing and Design).
          My work investigates the predictive kinetics of dynamic covalent networks (vitrimers), multiscale DFT/MD modeling,
          and robotic additive manufacturing of extreme-environment composites for terrestrial sustainability and lunar habitation.
        </p>

        {/* Verified Profile Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
          <a
            href="https://scholar.google.com/citations?user=GuBTPAYAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#25616D]/20 text-[#1B998B] border border-[#1B998B]/40 hover:bg-[#1B998B]/20 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" /> Google Scholar
          </a>
          <a
            href="https://www.linkedin.com/in/obed-t-nyavor/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#25616D]/20 text-[#1B998B] border border-[#1B998B]/40 hover:bg-[#1B998B]/20 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <a
            href="https://orcid.org/0009-0009-6711-3281"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> ORCID: 0009-0009-6711-3281
          </a>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
            ASME Member ID: 22099754409
          </span>
        </div>

        <div className="pt-2">
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs font-bold text-[#0B132B] bg-[#1B998B] hover:bg-[#1B998B]/90 transition-colors shadow-lg shadow-[#1B998B]/20"
          >
            <FileDown className="w-4 h-4" /> Download Curriculum Vitae (PDF)
          </a>
        </div>
      </div>

      {/* VENTURE SHOWCASE: A2MD */}
      <div id="a2md" className="scroll-mt-24 p-8 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#0E2038] to-[#0B132B] border border-[#25616D] space-y-6 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1B998B] tracking-wider">
          <Rocket className="w-4 h-4 text-[#1B998B]" />
          Deep-Tech Entrepreneurship
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            A2MD: Advanced Autonomous Materials, Manufacturing and Design
          </h2>
          <p className="text-sm font-mono text-[#1B998B] mt-1">
            Bridging the Lab-to-Fab Gap in Advanced Composites & Extreme Manufacturing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#94A3B8] leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-mono text-white">The Industry Dilemma</h3>
            <p>
              Breakthrough polymers, self-healing vitrimers, and multi-stimuli responsive materials frequently fail during commercial scale-up.
              Conventional industrial processing equipment cannot handle extreme solid loadings (50–75 wt%), complex non-Newtonian shear thinning,
              and non-equilibrium crosslinking kinetics.
            </p>
            <p>
              Laboratory chemists lack custom industrial hardware, while equipment manufacturers design for legacy thermoplastics and thermosets.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold font-mono text-white">The A2MD Methodology</h3>
            <p>
              A2MD integrates predictive computational modeling (Materials Genome Initiative, ORCA DFT, LAMMPS MD) with tailor-built automated process hardware.
              We formulate non-Newtonian dynamic polymer slurries alongside the exact micro-extrusion systems required to print them under atmospheric or vacuum conditions.
            </p>
            <p>
              <strong>Beachhead Focus:</strong> Lunar and orbital in-situ resource utilization (ISRU) — printing 50–60 wt% lunar regolith vitrimer composites
              for NASA Moon-to-Mars (LI-7) and commercial spaceflight primes (SpaceX, Blue Origin, Intuitive Machines).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#070D1E] border border-[#25616D]/40 space-y-2">
          <span className="text-xs font-mono font-bold text-white uppercase block">Strategic Commercialization Roadmap</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono text-[#94A3B8]">
            <div className="p-2.5 rounded bg-white/5 border border-white/5">
              <span className="text-[#1B998B] block font-bold">Phase 1 (2025–2026)</span>
              IP protection, 60 wt% regolith-vitrimer validation, NASA/DoD SBIR Phase I proposals.
            </div>
            <div className="p-2.5 rounded bg-white/5 border border-white/5">
              <span className="text-[#1B998B] block font-bold">Phase 2 (2027–2029)</span>
              SBIR Phase II pilot demonstrations & B2B predictive engineering consulting.
            </div>
            <div className="p-2.5 rounded bg-white/5 border border-white/5">
              <span className="text-[#1B998B] block font-bold">Phase 3 (2030)</span>
              Full operational deployment of autonomous manufacturing suites for lunar & terrestrial infrastructure.
            </div>
          </div>
        </div>
      </div>

      {/* Academic Trajectory Timeline */}
      <div className="space-y-6 border-t border-[#25616D]/30 pt-10">
        <h2 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
          <Award className="w-5 h-5 text-[#1B998B]" />
          Academic Trajectory & Education
        </h2>

        <div className="space-y-8 border-l-2 border-[#25616D]/40 pl-6 ml-3">
          <div className="relative space-y-1">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#1B998B]" />
            <div className="text-xs font-mono text-[#1B998B]">2025 – Present | GPA: 4.0 / 4.0</div>
            <h3 className="text-lg font-bold text-white">Ph.D. in Mechanical Engineering (Materials Science Track)</h3>
            <p className="text-xs font-mono text-[#94A3B8]">Louisiana State University (LSU), Baton Rouge, LA</p>
            <p className="text-xs text-[#94A3B8] pt-1">
              Dissertation: <em>Artificial muscles and multi-stimuli actuators via electrospinning and computational modeling</em>.
              Coupling ORCA density functional theory (DFT) with molecular dynamics (LAMMPS) and experimental rheological characterization.
            </p>
          </div>

          <div className="relative space-y-1">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#25616D]" />
            <div className="text-xs font-mono text-[#1B998B]">2024 – 2025 | GPA: 4.0 / 4.0</div>
            <h3 className="text-lg font-bold text-white">Master of Engineering (M.E.) in Materials Science & Mechanical Engineering</h3>
            <p className="text-xs font-mono text-[#94A3B8]">Southern University and A&M College / LSU Joint Framework</p>
            <p className="text-xs text-[#94A3B8] pt-1">
              Focus: High-solids extrusion additive manufacturing of regolith-filled shape memory vitrimer composites.
              Supported under NSF Grants OIA-2418415 and OIA-1946231 (LAMDA).
            </p>
          </div>

          <div className="relative space-y-1">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#25616D]" />
            <div className="text-xs font-mono text-[#1B998B]">2018 – 2022</div>
            <h3 className="text-lg font-bold text-white">B.Sc. in Materials Engineering</h3>
            <p className="text-xs font-mono text-[#94A3B8]">Kwame Nkrumah University of Science and Technology (KNUST)</p>
            <p className="text-xs text-[#94A3B8] pt-1">
              Undergraduate investigation into bio-derived starches, natural mineral clays, and capacitive dielectric charge dissipation.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Hardware Inventions & Lab Suites */}
      <div className="space-y-6 border-t border-[#25616D]/30 pt-10">
        <h2 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Featured Hardware Inventions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/40 space-y-3">
            <div className="text-xs font-mono text-[#1B998B] uppercase">Custom Additive System</div>
            <h3 className="text-lg font-bold text-white font-mono">Arduino-Integrated High-Solids 3D Printer</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Designed and built a custom direct ink writing (DIW) printhead featuring closed-loop Arduino Mega/PLC control,
              a high-torque dual-drive stepper system, and active heated barrel zones capable of extruding 50–60 wt% lunar regolith vitrimer slurries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/40 space-y-3">
            <div className="text-xs font-mono text-[#1B998B] uppercase">Custom Environmental Chamber</div>
            <h3 className="text-lg font-bold text-white font-mono">Nanofiber Electrospinning Apparatus</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Developed a specialized sealed environmental electrospinning chamber with real-time relative humidity control (&lt;15%)
              and precision high-voltage regulation (up to 25 kV) for producing aligned, responsive artificial muscle myofibrils.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Strategic Direction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#25616D]/30 pt-10">
        <div className="p-6 rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/40 space-y-4">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-lg">
            <Users className="w-5 h-5 text-[#1B998B]" />
            Consortium Leadership
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Serving as the <strong className="text-white">LAMDA Graduate Student Liaison</strong> for the Louisiana Alliance
            for Simulation-Guided Materials Applications (NSF OIA-1946231). Coordinating supercomputing resource allocations,
            multidisciplinary academic workshops, and student mentorship initiatives across Louisiana research universities.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0B132B]/80 border border-[#25616D]/40 space-y-4">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-lg">
            <Compass className="w-5 h-5 text-[#1B998B]" />
            Gallup Certified Strategic Leader
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Formally certified in strategic leadership methodologies, applying structured ideation, execution, and analytical rigor
            to cross-functional research teams, deep-tech grant administration, and industrial commercialization partnerships.
          </p>
        </div>
      </div>
    </div>
  );
}