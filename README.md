# Obed Tawiah Nyavor — Academic Research & Deep-Tech Venture Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0009--6711--3281-green?style=flat-square&logo=orcid)](https://orcid.org/0009-0009-6711-3281)

Production-ready research portfolio and venture showcase for **Obed Tawiah Nyavor**, Doctoral Researcher in Materials Science & Mechanical Engineering at Louisiana State University (LSU) and Founder of **A2MD (Advanced Autonomous Materials, Manufacturing and Design)**.

---

## 🔬 Academic Profile & Identity

- **Researcher:** Obed Tawiah Nyavor (Obed Nyavor)
- **Institution:** Louisiana State University (LSU), Department of Mechanical & Industrial Engineering
- **Lab & Affiliation:** Smart Materials & Advanced Manufacturing Lab / Louisiana Materials Design Alliance (LAMDA)
- **Contact:** `onyavol@lsu.edu` | `nyavor.obed@gmail.com`
- **Location:** Baton Rouge, Louisiana, USA
- **ORCID:** [0009-0009-6711-3281](https://orcid.org/0009-0009-6711-3281)
- **Google Scholar:** [Obed T. Nyavor](https://scholar.google.com/citations?user=GuBTPAYAAAAJ)
- **LinkedIn:** [obed-t-nyavor](https://www.linkedin.com/in/obed-t-nyavor/)
- **ASME Member ID:** `22099754409`

---

## 🚀 Venture Showcase — A2MD
**Advanced Autonomous Materials, Manufacturing and Design (A2MD)** — *"Bridging the Lab-to-Fab Gap"*

- **Core Mission:** Uniting predictive computational design (MGI framework, ORCA, LAMMPS) with purpose-built process hardware (custom PLC/Arduino extrusion systems) to solve manufacturing bottlenecks where laboratory chemistries fail.
- **Beachhead Focus:** Lunar and orbital in-situ resource utilization (ISRU)—printing 50–60 wt% lunar regolith vitrimer composites for NASA Moon-to-Mars (LI-7) and commercial spaceflight primes (SpaceX, Blue Origin, Intuitive Machines).
- **Hardware Inventions:**
  - Custom Arduino-integrated high-solids extrusion 3D printer for 50–60 wt% regolith-vitrimer slurries.
  - Custom nanofiber electrospinning chamber for responsive actuators and artificial muscles.
- **Strategic Roadmap:** Target operational launch in 2030, leveraging non-dilutive SBIR/STTR pipelines (NASA, DoD AFWERX/ONR) alongside B2B predictive engineering consulting.

---

## 📚 Key Publications

1. **Nyavor, O., Konlan, J., Gyabaah, K., Mensah, P., Li, G.**, *"Development of A Biodegradable Tapioca Starch-Based Polymeric Composite for Non-Structural Applications"*, **SPE Polymers**, 6(4), e70018 (2025). [DOI: 10.1002/pls2.70018](https://doi.org/10.1002/pls2.70018)
2. **Gyabaah, K., Nyavor, O., Mahoney, B., Jahan, M., Smith, B., Jackson, E., Mensah, P., Li, G.**, *"Extrusion-Based Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composite for Lunar Construction"*, **Journal of Applied Polymer Science** (2026), e71108. [DOI: 10.1002/app.71108](https://doi.org/10.1002/app.71108)
3. **Conference Proceedings:**
   - ASME IMECE 2024 (Portland, OR): High-solids extrusion and vitrimer synthesis.
   - Emerging Researchers National Conference (ERN) 2025 (Atlanta, GA): Stimuli-responsive nanofiber actuators.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router, Server & Client Components)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4 with custom Deep Slate (`#0B132B`) & Teal (`#1B998B`) palette
- **Backend / DB:** Supabase PostgreSQL with Row Level Security (RLS) & Supabase Storage
- **Icons & Motion:** Lucide React & Framer Motion
- **Citation Tooling:** Real-time BibTeX & EndNote (`.enw`) modal generators

---

## 📦 Getting Started

### 1. Environment Configuration
Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Migration & Seed
Run `supabase_patch.sql` in your **Supabase SQL Editor**:
- Relaxes publication type constraints to support both lowercase codes (`'journal'`, `'patent'`, `'conference'`) and user-facing labels.
- Seeds real academic publications, conference proceedings, and patent disclosures.

### 3. Local Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm run start
```
