import type { Project, Publication, NewsItem } from './types';

export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'lunar-regolith-vitrimer-3d-printing',
    title: 'Extrusion Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composites',
    category: 'Additive Manufacturing & Hardware',
    summary: 'Direct ink writing of 50–60 wt% lunar regolith simulant bound by dynamic covalent polymer networks (vitrimers). Custom Arduino-integrated high-solids extruder developed for NASA Moon-to-Mars (LI-7) in-situ construction.',
    content: `### Executive Overview
In-situ resource utilization (ISRU) for permanent lunar habitats demands materials that survive extreme thermal cycling (-130°C to +120°C) while utilizing indigenous materials. This research pioneers an extrusion-based additive manufacturing pipeline processing 50–60 wt% lunar regolith simulant bound by dynamic covalent epoxy vitrimers.

### Hardware & Additive Processing Architecture
- **Hardware Integration:** Custom Arduino Mega/PLC-controlled high-torque stepper extrusion printhead with closed-loop dual-zone barrel heating.
- **Feedstock Formulation:** JSC-1A lunar regolith simulant homogeneously dispersed into associative transesterification vitrimer precursors without volatile phase separation.
- **Thermal Sintering Protocol:** Stepwise crosslinking schedule relieving internal thermal stresses and promoting covalent bond exchange across the regolith-resin interface.

### Computational & Multiscale Modeling
Molecular dynamics (LAMMPS) and kinetic modeling reveal that associative exchange reactions dissipate residual stresses formed during layer deposition, preventing delamination under vacuum.`,
    hero_image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [],
    tags: ['Additive Manufacturing', 'Lunar Regolith', 'Arduino Hardware', 'Vitrimers', 'NASA LI-7'],
    is_featured: true,
    methodologies: ['High-Shear Direct Ink Writing', 'Dynamic Mechanical Analysis (DMA)', 'TGA Thermal Stability', 'Scanning Electron Microscopy (SEM)'],
    computational_specs: {
      engine: 'LAMMPS',
      md_ensemble: 'NPT (300K, 1bar)',
      simulation_duration: '250 ns',
      hardware: 'HPC Supercomputing Cluster (LAMDA Allocation)'
    },
    linked_publications: ['10.1002/app.71108']
  },
  {
    id: 'proj-2',
    slug: 'artificial-muscles-electrospinning-dft',
    title: 'Artificial Muscles & Multi-Stimuli Actuators via Electrospinning & Computational Modeling',
    category: 'Molecular Dynamics & DFT',
    summary: 'Ph.D. Dissertation research at LSU. Developing electrospun multi-stimuli actuators mimicking biological myofibrils, coupling ORCA density functional theory for photo-crosslinking with mesoscale mechanical testing.',
    content: `### Research Scope & Dissertation Overview
Next-generation soft robotics and biomedical prosthetics demand artificial muscles with rapid actuation strain (>20%), high power density, and resilient self-healing. This investigation couples specialized electrospinning with ab-initio quantum chemical kinetics.

### Quantum Modeling & Computational Framework
- **Computational Suite:** ORCA 5.0 utilizing DLPNO-CCSD(T) and B3LYP/def2-TZVP levels of theory.
- **Reaction Coordinate:** Nudged Elastic Band (NEB) mapping of transition states during free-radical UV crosslinking and bond recombination.
- **Electrospinning Apparatus:** Custom sealed environmental chamber with real-time relative humidity (<15%) and high-voltage precision control (up to 25 kV).`,
    hero_image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [],
    tags: ['DFT (ORCA)', 'Electrospinning', 'Actuators', 'Artificial Muscles', 'Biomimetics'],
    is_featured: true,
    methodologies: ['DFT Reaction Path Modeling', 'Electrospinning Fiber Alignment', 'Tensile Strain Cycling', 'Rheology'],
    computational_specs: {
      engine: 'ORCA 5.0',
      dft_functional: 'B3LYP / def2-TZVP',
      basis_set: 'def2-TZVP',
      simulation_duration: 'NEB 16-replica convergence'
    }
  },
  {
    id: 'proj-3',
    slug: 'a2md-venture-lab-to-fab',
    title: 'A2MD: Advanced Autonomous Materials, Manufacturing and Design',
    category: 'Additive Manufacturing & Hardware',
    summary: 'Deep-tech entrepreneurial venture dedicated to "Bridging the Lab-to-Fab Gap". Coupling predictive computational design (MGI, ORCA, LAMMPS) with purpose-built process hardware to eliminate manufacturing bottlenecks.',
    content: `### The Lab-to-Fab Bottleneck
Novel laboratory chemistries—including self-healing vitrimers, shape-memory polymers, and extreme-environment composites—consistently fail during scale-up because standard industrial equipment cannot accommodate high solid loadings, non-Newtonian rheology, and dynamic crosslinking kinetics.

### The A2MD Solution
A2MD unites predictive materials design with tailor-made manufacturing hardware:
1. **Predictive Computational Screening:** Leveraging high-throughput DFT and coarse-grained molecular dynamics to identify optimal resin formulations before experimental batch synthesis.
2. **Adaptive Process Hardware:** Engineering custom PLC- and microcontroller-integrated extrusion heads capable of processing non-standard rheological slurries (up to 75 wt% solid fillers).
3. **Beachhead Market:** In-situ resource utilization (ISRU) for lunar construction primes (SpaceX, Blue Origin, Intuitive Machines) and NASA Moon-to-Mars Artemis programs.

### Strategic Roadmap
- **2025–2026:** IP protection, SBIR Phase I proposals (NASA & DoD), and validation of 60 wt% regolith-vitrimer slurries.
- **2027–2029:** SBIR Phase II execution, pilot-scale automated additive deposition, and commercial B2B predictive engineering consulting.
- **2030:** Full commercial deployment of autonomous materials manufacturing suites for orbital and terrestrial applications.`,
    hero_image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [],
    tags: ['A2MD', 'Deep-Tech Startup', 'Lab-to-Fab', 'ISRU', 'SBIR/STTR'],
    is_featured: true,
    methodologies: ['Predictive Materials Genome', 'Process Hardware Engineering', 'Techno-Economic Modeling']
  },
  {
    id: 'proj-4',
    slug: 'biodegradable-tapioca-starch-composites',
    title: 'Biodegradable Tapioca Starch-Based Polymeric Composites for Non-Structural Applications',
    category: 'Biopolymers & Composites',
    summary: 'Published in SPE Polymers (2025). Investigating bio-derived starch polymers reinforced with mineral clay dopants for sustainable insulation and dielectric packaging.',
    content: `### Overview & Published Research
Investigating bio-derived starch polymers as renewable alternatives to petroleum-based polymers. Developing modified tapioca starch composites with improved water barrier, thermal stability, and mechanical strength for non-structural packaging and dielectric insulation.

### Experimental Characterization
- **Thermogravimetric Analysis (TGA):** Verifying thermal decomposition shifts under nitrogen and atmospheric conditions.
- **Tensile & Impact Testing:** Characterizing mechanical modulus enhancement achieved through mineral clay cross-interactions.
- **Citation:** SPE Polymers, 6(4), e70018 (2025). DOI: 10.1002/pls2.70018.`,
    hero_image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    gallery_urls: [],
    tags: ['SPE Polymers', 'Biopolymers', 'Tapioca Starch', 'Clay Composites'],
    is_featured: false,
    methodologies: ['Dielectric Spectroscopy', 'TGA & DSC Characterization', 'Tensile Testing'],
    linked_publications: ['10.1002/pls2.70018']
  }
];

export const SEED_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Extrusion-Based Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composite for Lunar Construction',
    authors: ['K. Gyabaah', 'O. Nyavor', 'B. Mahoney', 'M. Jahan', 'B. Smith', 'E. Jackson', 'P. Mensah', 'G. Li'],
    venue: 'Journal of Applied Polymer Science',
    year: 2026,
    pub_type: 'journal',
    doi: '10.1002/app.71108',
    abstract: 'Investigating direct extrusion 3D printing of high-loading lunar regolith-filled shape memory vitrimer composites. The associative dynamic network provides thermal remoldability and crack closure under simulated lunar conditions while achieving structural load-bearing capacity.',
    bibtex: `@article{gyabaah2026japs,
  title = {Extrusion-Based Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composite for Lunar Construction},
  author = {Gyabaah, K. and Nyavor, O. and Mahoney, B. and Jahan, M. and Smith, B. and Jackson, E. and Mensah, P. and Li, G.},
  journal = {Journal of Applied Polymer Science},
  year = {2026},
  doi = {10.1002/app.71108}
}`,
    is_highlighted: true
  },
  {
    id: 'pub-2',
    title: 'Development of A Biodegradable Tapioca Starch-Based Polymeric Composite for Non-Structural Applications',
    authors: ['O. Nyavor', 'J. Konlan', 'K. Gyabaah', 'P. Mensah', 'G. Li'],
    venue: 'SPE Polymers',
    year: 2025,
    pub_type: 'journal',
    doi: '10.1002/pls2.70018',
    abstract: 'A sustainable bio-composite synthesized from modified tapioca starch and mineral fillers. The study demonstrates significant improvements in tensile modulus, thermal degradation thresholds, and dielectric performance for environmentally conscious packaging.',
    bibtex: `@article{nyavor2025spepolymers,
  title = {Development of A Biodegradable Tapioca Starch-Based Polymeric Composite for Non-Structural Applications},
  author = {Nyavor, O. and Konlan, J. and Gyabaah, K. and Mensah, P. and Li, G.},
  journal = {SPE Polymers},
  volume = {6},
  number = {4},
  pages = {e70018},
  year = {2025},
  doi = {10.1002/pls2.70018}
}`,
    is_highlighted: true
  },
  {
    id: 'pub-3',
    title: 'High-Solid Loading Extrusion of Regolith-Vitrimer Composites for Lunar Infrastructure',
    authors: ['O. Nyavor', 'K. Gyabaah', 'P. Mensah', 'G. Li'],
    venue: 'ASME International Mechanical Engineering Congress and Exposition (IMECE 2024)',
    year: 2024,
    pub_type: 'conference',
    doi: '10.1115/IMECE2024-REGOLITH',
    abstract: 'Presented at IMECE 2024 in Portland, Oregon. Detailing printhead torque kinetics, rheological shear-thinning behavior, and sintering protocols for 50-60 wt% regolith thermoset composites.',
    bibtex: `@inproceedings{nyavor2024imece,
  title = {High-Solid Loading Extrusion of Regolith-Vitrimer Composites for Lunar Infrastructure},
  author = {Nyavor, O. and Gyabaah, K. and Mensah, P. and Li, G.},
  booktitle = {ASME International Mechanical Engineering Congress and Exposition (IMECE 2024)},
  year = {2024},
  address = {Portland, OR}
}`,
    is_highlighted: true
  },
  {
    id: 'pub-4',
    title: 'Biopolymer Tapioca Composites with Clay Modifiers for Sustainable Dielectric Applications',
    authors: ['O. Nyavor', 'J. Konlan', 'P. Mensah'],
    venue: 'Emerging Researchers National (ERN) Conference in STEM',
    year: 2025,
    pub_type: 'conference',
    abstract: 'Presented at the 2025 ERN Conference in Atlanta, GA. Investigating the influence of montmorillonite and anthill clay dopants on dielectric breakdown strength and moisture absorption in biopolymers.',
    bibtex: `@inproceedings{nyavor2025ern,
  title = {Biopolymer Tapioca Composites with Clay Modifiers for Sustainable Dielectric Applications},
  author = {Nyavor, O. and Konlan, J. and Mensah, P.},
  booktitle = {Emerging Researchers National (ERN) Conference in STEM},
  year = {2025},
  address = {Atlanta, GA}
}`,
    is_highlighted: false
  },
  {
    id: 'pub-5',
    title: 'Regolith-Filled Associative Dynamic Polymer Slurry Formulation and High-Shear Direct Extrusion System',
    authors: ['O. Nyavor', 'P. Mensah', 'G. Li'],
    venue: 'U.S. Patent Application / Invention Disclosure',
    year: 2025,
    pub_type: 'patent',
    doi: 'US-PROV-2025-A2MD01',
    abstract: 'A self-healing, thermally remoldable vitrimer composite slurry formulated with lunar/Martian regolith simulant and an automated, closed-loop heated extrusion printhead system for vacuum additive manufacturing.',
    bibtex: `@patent{nyavor2025patent,
  title = {Regolith-Filled Associative Dynamic Polymer Slurry Formulation and High-Shear Direct Extrusion System},
  author = {Nyavor, O. and Mensah, P. and Li, G.},
  year = {2025},
  number = {US-PROV-2025-A2MD01}
}`,
    is_highlighted: true
  }
];

export const SEED_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Paper Published in Journal of Applied Polymer Science on Lunar Vitrimer Composites',
    date: '2026-02-15',
    category: 'Publication Breakthrough',
    description: 'Our collaborative paper "Extrusion-Based Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composite for Lunar Construction" is published in J. Appl. Polym. Sci. (DOI: 10.1002/app.71108).',
    external_url: 'https://doi.org/10.1002/app.71108'
  },
  {
    id: 'news-2',
    title: 'Research Supported under NSF OIA-2418415 for Climate-Neutral Polymer Systems',
    date: '2025-10-01',
    category: 'Grant Award',
    description: 'Active doctoral research supported by NSF Grant OIA-2418415, investigating climate-neutral dynamic vitrimers and extreme-environment composite manufacturing at LSU.',
    external_url: 'https://nsf.gov'
  },
  {
    id: 'news-3',
    title: 'A2MD Venture Selected for Deep-Tech Accelerator Pipeline',
    date: '2025-08-20',
    category: 'Entrepreneurship & A2MD',
    description: 'A2MD (Advanced Autonomous Materials, Manufacturing and Design) initiates commercial roadmap for bridging the lab-to-fab gap in lunar and orbital additive manufacturing.',
    external_url: '/about#a2md'
  },
  {
    id: 'news-4',
    title: 'Paper on Biodegradable Tapioca Composites Published in SPE Polymers',
    date: '2025-04-12',
    category: 'Publication Breakthrough',
    description: 'Published "Development of A Biodegradable Tapioca Starch-Based Polymeric Composite for Non-Structural Applications" in SPE Polymers (DOI: 10.1002/pls2.70018).',
    external_url: 'https://doi.org/10.1002/pls2.70018'
  }
];