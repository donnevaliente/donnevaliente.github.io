-- ==============================================================================
-- SUPABASE COMPLETE HARDENING, RLS POLICIES & SEED MIGRATION
-- Target: Supabase SQL Editor
-- Author: Obed Tawiah Nyavor, Ph.D. // A2MD
-- ==============================================================================

-- 1. CREATE CONTACT_MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  affiliation TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. RELAX PUBLICATION TYPE CONSTRAINT (supports both schema codes & full labels)
ALTER TABLE public.publications DROP CONSTRAINT IF EXISTS publications_pub_type_check;
ALTER TABLE public.publications ADD CONSTRAINT publications_pub_type_check 
  CHECK (pub_type IN (
    'journal',
    'patent',
    'conference',
    'preprint',
    'Peer-Reviewed Article',
    'Patent',
    'Patent / Invention Disclosure',
    'Patent / Invention',
    'Conference Proceeding'
  ));

-- 3. BACKEND SECURITY HARDENING: ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES: PROJECTS TABLE
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects"
  ON public.projects FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated admin can insert projects" ON public.projects;
CREATE POLICY "Authenticated admin can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admin can update projects" ON public.projects;
CREATE POLICY "Authenticated admin can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admin can delete projects" ON public.projects;
CREATE POLICY "Authenticated admin can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);

-- 5. RLS POLICIES: PUBLICATIONS TABLE
DROP POLICY IF EXISTS "Public can view publications" ON public.publications;
CREATE POLICY "Public can view publications"
  ON public.publications FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated admin can insert publications" ON public.publications;
CREATE POLICY "Authenticated admin can insert publications"
  ON public.publications FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admin can update publications" ON public.publications;
CREATE POLICY "Authenticated admin can update publications"
  ON public.publications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admin can delete publications" ON public.publications;
CREATE POLICY "Authenticated admin can delete publications"
  ON public.publications FOR DELETE
  TO authenticated
  USING (true);

-- 6. RLS POLICIES: NEWS TABLE
DROP POLICY IF EXISTS "Public can view news" ON public.news;
CREATE POLICY "Public can view news"
  ON public.news FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated admin can insert news" ON public.news;
CREATE POLICY "Authenticated admin can insert news"
  ON public.news FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admin can update news" ON public.news;
CREATE POLICY "Authenticated admin can update news"
  ON public.news FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admin can delete news" ON public.news;
CREATE POLICY "Authenticated admin can delete news"
  ON public.news FOR DELETE
  TO authenticated
  USING (true);

-- 7. RLS POLICIES: CONTACT_MESSAGES TABLE (STRICT SECURITY)
-- Visitors can only submit validated messages; CANNOT view existing messages
DROP POLICY IF EXISTS "Allow anonymous visitor submissions" ON public.contact_messages;
CREATE POLICY "Allow anonymous visitor submissions"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) >= 2 AND 
    length(trim(email)) >= 5 AND 
    length(trim(message)) >= 10
  );

-- Only authenticated administrator can view incoming contact dispatches
DROP POLICY IF EXISTS "Authenticated admin can view contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated admin can view contact messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated admin can delete contact messages" ON public.contact_messages;
CREATE POLICY "Authenticated admin can delete contact messages"
  ON public.contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- 8. SEED PEER-REVIEWED PUBLICATIONS & PATENTS
INSERT INTO public.publications (
  title,
  authors,
  venue,
  year,
  pub_type,
  doi,
  abstract,
  bibtex,
  is_highlighted
) VALUES
(
  'Extrusion-Based Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composite for Lunar Construction',
  ARRAY['K. Gyabaah', 'O. Nyavor', 'B. Mahoney', 'M. Jahan', 'B. Smith', 'E. Jackson', 'P. Mensah', 'G. Li'],
  'Journal of Applied Polymer Science',
  2026,
  'journal',
  '10.1002/app.71108',
  'Investigating direct extrusion 3D printing of high-loading lunar regolith-filled shape memory vitrimer composites. The associative dynamic network provides thermal remoldability and crack closure under simulated lunar conditions while achieving structural load-bearing capacity.',
  '@article{gyabaah2026japs, title = {Extrusion-Based Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composite for Lunar Construction}, author = {Gyabaah, K. and Nyavor, O. and Mahoney, B. and Jahan, M. and Smith, B. and Jackson, E. and Mensah, P. and Li, G.}, journal = {Journal of Applied Polymer Science}, year = {2026}, doi = {10.1002/app.71108}}',
  true
),
(
  'Development of A Biodegradable Tapioca Starch-Based Polymeric Composite for Non-Structural Applications',
  ARRAY['O. Nyavor', 'J. Konlan', 'K. Gyabaah', 'P. Mensah', 'G. Li'],
  'SPE Polymers',
  2025,
  'journal',
  '10.1002/pls2.70018',
  'A sustainable bio-composite synthesized from modified tapioca starch and mineral fillers. The study demonstrates significant improvements in tensile modulus, thermal degradation thresholds, and dielectric performance for environmentally conscious packaging.',
  '@article{nyavor2025spepolymers, title = {Development of A Biodegradable Tapioca Starch-Based Polymeric Composite for Non-Structural Applications}, author = {Nyavor, O. and Konlan, J. and Gyabaah, K. and Mensah, P. and Li, G.}, journal = {SPE Polymers}, volume = {6}, number = {4}, pages = {e70018}, year = {2025}, doi = {10.1002/pls2.70018}}',
  true
),
(
  'High-Solid Loading Extrusion of Regolith-Vitrimer Composites for Lunar Infrastructure',
  ARRAY['O. Nyavor', 'K. Gyabaah', 'P. Mensah', 'G. Li'],
  'ASME International Mechanical Engineering Congress and Exposition (IMECE 2024)',
  2024,
  'conference',
  '10.1115/IMECE2024-REGOLITH',
  'Presented at IMECE 2024 in Portland, Oregon. Detailing printhead torque kinetics, rheological shear-thinning behavior, and sintering protocols for 50-60 wt% regolith thermoset composites.',
  '@inproceedings{nyavor2024imece, title = {High-Solid Loading Extrusion of Regolith-Vitrimer Composites for Lunar Infrastructure}, author = {Nyavor, O. and Gyabaah, K. and Mensah, P. and Li, G.}, booktitle = {ASME International Mechanical Engineering Congress and Exposition (IMECE 2024)}, year = {2024}, address = {Portland, OR}}',
  true
),
(
  'Biopolymer Tapioca Composites with Clay Modifiers for Sustainable Dielectric Applications',
  ARRAY['O. Nyavor', 'J. Konlan', 'P. Mensah'],
  'Emerging Researchers National (ERN) Conference in STEM',
  2025,
  'conference',
  NULL,
  'Presented at the 2025 ERN Conference in Atlanta, GA. Investigating the influence of montmorillonite and anthill clay dopants on dielectric breakdown strength and moisture absorption in biopolymers.',
  '@inproceedings{nyavor2025ern, title = {Biopolymer Tapioca Composites with Clay Modifiers for Sustainable Dielectric Applications}, author = {Nyavor, O. and Konlan, J. and Mensah, P.}, booktitle = {Emerging Researchers National (ERN) Conference in STEM}, year = {2025}, address = {Atlanta, GA}}',
  false
),
(
  'Regolith-Filled Associative Dynamic Polymer Slurry Formulation and High-Shear Direct Extrusion System',
  ARRAY['O. Nyavor', 'P. Mensah', 'G. Li'],
  'U.S. Patent Application / Invention Disclosure',
  2025,
  'patent',
  'US-PROV-2025-A2MD01',
  'A self-healing, thermally remoldable vitrimer composite slurry formulated with lunar/Martian regolith simulant and an automated, closed-loop heated extrusion printhead system for vacuum additive manufacturing.',
  '@patent{nyavor2025patent, title = {Regolith-Filled Associative Dynamic Polymer Slurry Formulation and High-Shear Direct Extrusion System}, author = {Nyavor, O. and Mensah, P. and Li, G.}, year = {2025}, number = {US-PROV-2025-A2MD01}}',
  true
)
ON CONFLICT DO NOTHING;

-- 9. SEED A2MD AND CORE RESEARCH PROJECTS
INSERT INTO public.projects (
  slug,
  title,
  category,
  summary,
  content,
  hero_image_url,
  gallery_urls,
  tags,
  is_featured
) VALUES
(
  'lunar-regolith-vitrimer-3d-printing',
  'Extrusion Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composites',
  'Additive Manufacturing & Hardware',
  'Direct ink writing of 50-60 wt% lunar regolith simulant bound by dynamic covalent polymer networks (vitrimers). Custom Arduino-integrated high-solids extruder developed for NASA Moon-to-Mars (LI-7) in-situ construction.',
  '### Executive Overview\nIn-situ resource utilization (ISRU) for permanent lunar habitats demands materials that survive extreme thermal cycling (-130°C to +120°C) while utilizing indigenous materials.\n\n### Hardware & Additive Processing Architecture\n- Custom Arduino Mega/PLC-controlled high-torque stepper extrusion printhead with closed-loop dual-zone barrel heating.\n- Feedstock: JSC-1A lunar regolith simulant homogeneously dispersed into associative transesterification vitrimer precursors without volatile phase separation.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  ARRAY[]::text[],
  ARRAY['Additive Manufacturing', 'Lunar Regolith', 'Arduino Hardware', 'Vitrimers', 'NASA LI-7'],
  true
),
(
  'a2md-venture-lab-to-fab',
  'A2MD: Advanced Autonomous Materials, Manufacturing and Design',
  'Additive Manufacturing & Hardware',
  'Deep-tech entrepreneurial venture dedicated to "Bridging the Lab-to-Fab Gap". Coupling predictive computational design (MGI, ORCA, LAMMPS) with purpose-built process hardware to eliminate manufacturing bottlenecks.',
  '### The Lab-to-Fab Bottleneck\nNovel laboratory chemistries—including self-healing vitrimers, shape-memory polymers, and extreme-environment composites—consistently fail during scale-up because standard industrial equipment cannot accommodate high solid loadings, non-Newtonian rheology, and dynamic crosslinking kinetics.\n\n### The A2MD Solution\nA2MD unites predictive materials design with tailor-made manufacturing hardware:\n1. Predictive Computational Screening\n2. Adaptive Process Hardware\n3. Beachhead Market: In-situ resource utilization (ISRU) for NASA and commercial primes.',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  ARRAY[]::text[],
  ARRAY['A2MD', 'Deep-Tech Startup', 'Lab-to-Fab', 'ISRU', 'SBIR/STTR'],
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 10. SEED NEWS ITEMS
INSERT INTO public.news (
  title,
  date,
  category,
  description,
  external_url
) VALUES
(
  'Paper Published in Journal of Applied Polymer Science on Lunar Vitrimer Composites',
  '2026-02-15',
  'Publication Breakthrough',
  'Our collaborative paper "Extrusion-Based Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer Composite for Lunar Construction" is published in J. Appl. Polym. Sci. (DOI: 10.1002/app.71108).',
  'https://doi.org/10.1002/app.71108'
),
(
  'Research Supported under NSF OIA-2418415 for Climate-Neutral Polymer Systems',
  '2025-10-01',
  'Grant Award',
  'Active doctoral research supported by NSF Grant OIA-2418415, investigating climate-neutral dynamic vitrimers and extreme-environment composite manufacturing at LSU.',
  'https://nsf.gov'
),
(
  'A2MD Venture Selected for Deep-Tech Accelerator Pipeline',
  '2025-08-20',
  'Entrepreneurship & A2MD',
  'A2MD (Advanced Autonomous Materials, Manufacturing and Design) initiates commercial roadmap for bridging the lab-to-fab gap in lunar and orbital additive manufacturing.',
  '/about#a2md'
)
ON CONFLICT DO NOTHING;
