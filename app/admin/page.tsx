'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { PublicationType, ProjectCategory } from '@/lib/types';
import {
  Lock,
  Upload,
  BookOpen,
  Calendar,
  Layers,
  LogOut,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  FileUp,
  Copy,
} from 'lucide-react';

const PUB_TYPE_MAP: Record<string, string> = {
  'Peer-Reviewed Article': 'journal',
  'Patent / Invention Disclosure': 'patent',
  'Patent / Invention': 'patent',
  'Patent': 'patent',
  'Conference Proceeding': 'conference',
  'Preprint': 'preprint',
  'journal': 'journal',
  'patent': 'patent',
  'conference': 'conference',
  'preprint': 'preprint',
};

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'publications' | 'projects' | 'media' | 'news'>('publications');

  // Publication Form States
  const [pubTitle, setPubTitle] = useState('');
  const [pubAuthors, setPubAuthors] = useState('');
  const [pubVenue, setPubVenue] = useState('');
  const [pubYear, setPubYear] = useState<number | string>(new Date().getFullYear());
  const [pubDoi, setPubDoi] = useState('');
  const [pubType, setPubType] = useState<string>('journal');
  const [pubAbstract, setPubAbstract] = useState('');
  const [pubBibtex, setPubBibtex] = useState('');
  const [pubPdfUrl, setPubPdfUrl] = useState('');
  const [pubHighlighted, setPubHighlighted] = useState(false);
  const [pubStatus, setPubStatus] = useState<string | null>(null);
  const [pubError, setPubError] = useState<string | null>(null);

  // Project Form States
  const [projTitle, setProjTitle] = useState('');
  const [projSlug, setProjSlug] = useState('');
  const [projCategory, setProjCategory] = useState<ProjectCategory>('Vitrimers & Smart Polymers');
  const [projSummary, setProjSummary] = useState('');
  const [projContent, setProjContent] = useState('');
  const [projHeroImage, setProjHeroImage] = useState('');
  const [projGalleryUrls, setProjGalleryUrls] = useState('');
  const [projTags, setProjTags] = useState('');
  const [projFeatured, setProjFeatured] = useState(true);
  const [projStatus, setProjStatus] = useState<string | null>(null);
  const [projError, setProjError] = useState<string | null>(null);

  // Storage Upload States
  const [selectedBucket, setSelectedBucket] = useState<'portfolio-media' | 'documents'>('portfolio-media');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  // News Form States
  const [newsTitle, setNewsTitle] = useState('');
  const [newsDate, setNewsDate] = useState(new Date().toISOString().split('T')[0]);
  const [newsCategory, setNewsCategory] = useState('Research Milestone');
  const [newsDescription, setNewsDescription] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [newsStatus, setNewsStatus] = useState<string | null>(null);
  const [newsError, setNewsError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handlePublicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPubStatus(null);
    setPubError(null);

    const authorArray = pubAuthors.split(',').map((a) => a.trim()).filter(Boolean);
    const normalizedType = PUB_TYPE_MAP[pubType] || 'journal';
    const parsedYear = pubYear ? parseInt(String(pubYear), 10) : null;

    const payload = {
      title: pubTitle.trim(),
      authors: authorArray,
      venue: pubVenue.trim(),
      year: parsedYear,
      doi: pubDoi.trim() || null,
      pub_type: normalizedType,
      abstract: pubAbstract.trim() || null,
      bibtex: pubBibtex.trim() || null,
      pdf_url: pubPdfUrl.trim() || null,
      is_highlighted: pubHighlighted,
    };

    const { error } = await (supabase.from('publications') as any).insert(payload);

    if (error) {
      const detailed = error.details ? `${error.message} (${error.details})` : error.message;
      setPubError(`Database Error: ${detailed}`);
    } else {
      setPubStatus('Publication registered and verified in Supabase.');
      setPubTitle('');
      setPubAuthors('');
      setPubVenue('');
      setPubDoi('');
      setPubAbstract('');
      setPubBibtex('');
      setPubPdfUrl('');
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjStatus(null);
    setProjError(null);

    const tagArray = projTags.split(',').map((t) => t.trim()).filter(Boolean);
    const galleryArray = projGalleryUrls.split(',').map((u) => u.trim()).filter(Boolean);
    const cleanSlug = projSlug.trim() || projTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      title: projTitle.trim(),
      slug: cleanSlug,
      category: projCategory,
      summary: projSummary.trim(),
      content: projContent.trim(),
      hero_image_url: projHeroImage.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      gallery_urls: galleryArray,
      tags: tagArray,
      is_featured: projFeatured,
    };

    const { error } = await (supabase.from('projects') as any).insert(payload);

    if (error) {
      const detailed = error.details ? `${error.message} (${error.details})` : error.message;
      setProjError(`Database Error: ${detailed}`);
    } else {
      setProjStatus('Project created and active in Supabase.');
      setProjTitle('');
      setProjSlug('');
      setProjSummary('');
      setProjContent('');
      setProjHeroImage('');
      setProjGalleryUrls('');
      setProjTags('');
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileToUpload) return;
    setUploadProgress(true);
    setUploadedUrl(null);

    const cleanFileName = `${Date.now()}_${fileToUpload.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    const { error } = await supabase.storage.from(selectedBucket).upload(cleanFileName, fileToUpload);

    if (error) {
      alert(`Storage upload error: ${error.message}`);
    } else {
      const { data } = supabase.storage.from(selectedBucket).getPublicUrl(cleanFileName);
      setUploadedUrl(data.publicUrl);
      if (selectedBucket === 'portfolio-media') {
        setProjHeroImage(data.publicUrl);
      } else {
        setPubPdfUrl(data.publicUrl);
      }
      setFileToUpload(null);
    }
    setUploadProgress(false);
  };

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsStatus(null);
    setNewsError(null);

    const payload = {
      title: newsTitle.trim(),
      date: newsDate,
      category: newsCategory.trim(),
      description: newsDescription.trim(),
      external_url: newsUrl.trim() || null,
    };

    const { error } = await (supabase.from('news') as any).insert(payload);

    if (error) {
      const detailed = error.details ? `${error.message} (${error.details})` : error.message;
      setNewsError(`Database Error: ${detailed}`);
    } else {
      setNewsStatus('Milestone announcement published to news feed.');
      setNewsTitle('');
      setNewsDescription('');
      setNewsUrl('');
    }
  };
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-mono text-sm text-[#94A3B8]">
        Authenticating Researcher Access...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="rounded-2xl bg-[#0B132B] border border-[#25616D] p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-[#25616D]/30 border border-[#1B998B]/40">
              <Lock className="w-5 h-5 text-[#1B998B]" />
            </div>
            <div>
              <h1 className="font-mono text-lg font-bold text-white">Researcher Gateway</h1>
              <p className="font-mono text-xs text-[#94A3B8]">Authenticated Operations Console</p>
            </div>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Academic Identity / Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
                placeholder="nyavor.obed@gmail.com"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Access Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#1B998B] hover:bg-[#1B998B]/90 text-[#0B132B] font-mono text-xs font-bold tracking-wider uppercase transition-colors"
            >
              Sign In to Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#0B132B] border border-[#25616D]">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <h1 className="text-xl font-bold font-mono text-white">Laboratory Admin Portal</h1>
            <p className="text-xs font-mono text-[#94A3B8]">
              Active Researcher Session: <span className="text-[#1B998B]">{session.user.email}</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-xs font-mono text-[#94A3B8] hover:text-rose-400 border border-white/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>

      <div className="flex flex-wrap border-b border-[#25616D]/40 gap-2">
        <button
          onClick={() => setActiveTab('publications')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-medium border-b-2 transition-all ${
            activeTab === 'publications'
              ? 'border-[#1B998B] text-[#1B998B]'
              : 'border-transparent text-[#94A3B8] hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Manage Publications
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-medium border-b-2 transition-all ${
            activeTab === 'projects'
              ? 'border-[#1B998B] text-[#1B998B]'
              : 'border-transparent text-[#94A3B8] hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          Manage Projects
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-medium border-b-2 transition-all ${
            activeTab === 'media'
              ? 'border-[#1B998B] text-[#1B998B]'
              : 'border-transparent text-[#94A3B8] hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4" />
          Bucket Uploader
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-medium border-b-2 transition-all ${
            activeTab === 'news'
              ? 'border-[#1B998B] text-[#1B998B]'
              : 'border-transparent text-[#94A3B8] hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          News & Milestones
        </button>
      </div>
      {activeTab === 'publications' && (
        <div className="rounded-2xl bg-[#0B132B] border border-[#25616D]/40 p-6">
          <h2 className="text-base font-bold font-mono text-white mb-4">
            Register New Academic Publication or Patent
          </h2>
          {pubStatus && (
            <div className="mb-4 p-3 rounded-lg bg-[#25616D]/30 border border-[#1B998B]/40 text-[#1B998B] text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {pubStatus}
            </div>
          )}
          {pubError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {pubError}
            </div>
          )}
          <form onSubmit={handlePublicationSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Paper / Patent Title *
              </label>
              <input
                type="text"
                required
                value={pubTitle}
                onChange={(e) => setPubTitle(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:ring-1 focus:ring-[#1B998B]"
                placeholder="Extrusion-Based Additive Manufacturing of Regolith-Filled Shape Memory Vitrimer..."
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Authors (comma-separated) *
              </label>
              <input
                type="text"
                required
                value={pubAuthors}
                onChange={(e) => setPubAuthors(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="O. Nyavor, K. Gyabaah, P. Mensah, G. Li"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Journal / Venue / Patent Office *
              </label>
              <input
                type="text"
                required
                value={pubVenue}
                onChange={(e) => setPubVenue(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="Journal of Applied Polymer Science / SPE Polymers / USPTO"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Publication Year *
              </label>
              <input
                type="number"
                required
                value={pubYear}
                onChange={(e) => setPubYear(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Publication Type (Schema Constraint Mapped) *
              </label>
              <select
                value={pubType}
                onChange={(e) => setPubType(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
              >
                <option value="journal">Peer-Reviewed Article (journal)</option>
                <option value="patent">Patent / Invention Disclosure (patent)</option>
                <option value="conference">Conference Proceeding (conference)</option>
                <option value="preprint">Preprint (preprint)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                DOI / Patent Reference Number
              </label>
              <input
                type="text"
                value={pubDoi}
                onChange={(e) => setPubDoi(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="10.1002/app.71108"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                PDF Document URL (from Bucket)
              </label>
              <input
                type="url"
                value={pubPdfUrl}
                onChange={(e) => setPubPdfUrl(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="https://.../documents/paper.pdf"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">Abstract</label>
              <textarea
                rows={3}
                value={pubAbstract}
                onChange={(e) => setPubAbstract(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="Executive synopsis of the methodology, regolith kinetics, and results..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Custom BibTeX Block (Optional - auto-generated if blank)
              </label>
              <textarea
                rows={3}
                value={pubBibtex}
                onChange={(e) => setPubBibtex(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-xs text-[#F8FAFC] font-mono"
                placeholder="@article{nyavor2026,...}"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="highlight"
                checked={pubHighlighted}
                onChange={(e) => setPubHighlighted(e.target.checked)}
                className="rounded border-[#25616D] text-[#1B998B] focus:ring-[#1B998B]"
              />
              <label htmlFor="highlight" className="text-xs font-mono text-[#94A3B8]">
                Feature prominently on publications index
              </label>
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#1B998B] hover:bg-[#1B998B]/90 text-[#0B132B] font-mono text-xs font-bold uppercase transition-colors"
              >
                Publish Publication
              </button>
            </div>
          </form>
        </div>
      )}
      {activeTab === 'projects' && (
        <div className="rounded-2xl bg-[#0B132B] border border-[#25616D]/40 p-6">
          <h2 className="text-base font-bold font-mono text-white mb-4">
            Create or Update Research Initiative
          </h2>
          {projStatus && (
            <div className="mb-4 p-3 rounded-lg bg-[#25616D]/30 border border-[#1B998B]/40 text-[#1B998B] text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {projStatus}
            </div>
          )}
          {projError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {projError}
            </div>
          )}
          <form onSubmit={handleProjectSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={projTitle}
                onChange={(e) => setProjTitle(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="A2MD: Advanced Autonomous Materials Manufacturing..."
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                URL Slug (Optional - auto generated)
              </label>
              <input
                type="text"
                value={projSlug}
                onChange={(e) => setProjSlug(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="a2md-autonomous-materials-manufacturing"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Primary Category (Schema Audited) *
              </label>
              <select
                value={projCategory}
                onChange={(e) => setProjCategory(e.target.value as ProjectCategory)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
              >
                <option value="Additive Manufacturing & Hardware">Additive Manufacturing & Hardware</option>
                <option value="Vitrimers & Smart Polymers">Vitrimers & Smart Polymers</option>
                <option value="Molecular Dynamics & DFT">Molecular Dynamics & DFT</option>
                <option value="Biopolymers & Composites">Biopolymers & Composites</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Cover Media Image URL
              </label>
              <input
                type="url"
                value={projHeroImage}
                onChange={(e) => setProjHeroImage(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="https://.../portfolio-media/cover.png"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Gallery Image URLs (comma-separated)
              </label>
              <input
                type="text"
                value={projGalleryUrls}
                onChange={(e) => setProjGalleryUrls(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="https://.../img1.png, https://.../img2.png"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Executive Summary *
              </label>
              <textarea
                rows={2}
                required
                value={projSummary}
                onChange={(e) => setProjSummary(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="Concise overview for research cards..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Technical Content / Methodology (Markdown) *
              </label>
              <textarea
                rows={4}
                required
                value={projContent}
                onChange={(e) => setProjContent(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-xs font-mono text-white"
                placeholder="### Experimental Hardware&#10;- Custom Arduino extruder...&#10;### Computational Framework&#10;- LAMMPS NPT ensemble..."
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={projTags}
                onChange={(e) => setProjTags(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="Arduino, LAMMPS, Lunar Regolith, 3D Printing, A2MD"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="featured"
                checked={projFeatured}
                onChange={(e) => setProjFeatured(e.target.checked)}
                className="rounded border-[#25616D] text-[#1B998B] focus:ring-[#1B998B]"
              />
              <label htmlFor="featured" className="text-xs font-mono text-[#94A3B8]">
                Feature as Breakthrough on Homepage
              </label>
            </div>
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#1B998B] hover:bg-[#1B998B]/90 text-[#0B132B] font-mono text-xs font-bold uppercase transition-colors"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="rounded-2xl bg-[#0B132B] border border-[#25616D]/40 p-6 space-y-6">
          <h2 className="text-base font-bold font-mono text-white">
            Upload to Supabase Storage Buckets
          </h2>
          <form onSubmit={handleFileUpload} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Target Bucket *
              </label>
              <select
                value={selectedBucket}
                onChange={(e) => setSelectedBucket(e.target.value as any)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
              >
                <option value="portfolio-media">portfolio-media (Images, Schematics, Diagrams)</option>
                <option value="documents">documents (PDF Preprints, Manuscripts, CV)</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-[#25616D]/60 rounded-xl p-8 text-center bg-[#070D1E]/60">
              <FileUp className="w-10 h-10 text-[#1B998B] mx-auto mb-3" />
              <input
                type="file"
                required
                onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
                className="text-xs text-[#94A3B8] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-mono file:bg-[#1B998B] file:text-[#0B132B] hover:file:bg-[#1B998B]/80 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={uploadProgress || !fileToUpload}
              className="px-6 py-2.5 rounded-lg bg-[#1B998B] disabled:opacity-50 text-[#0B132B] font-mono text-xs font-bold uppercase transition-colors"
            >
              {uploadProgress ? 'Transmitting to Supabase...' : 'Confirm Upload'}
            </button>
          </form>

          {uploadedUrl && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                <FileCheck className="w-4 h-4 shrink-0" />
                Asset deployed. Public URL auto-populated:
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={uploadedUrl}
                  className="w-full bg-[#070D1E] text-xs font-mono text-[#F8FAFC] p-2 rounded border border-emerald-500/30"
                />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(uploadedUrl)}
                  className="p-2 rounded bg-white/10 hover:bg-white/20 text-white"
                  title="Copy CDN Link"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'news' && (
        <div className="rounded-2xl bg-[#0B132B] border border-[#25616D]/40 p-6">
          <h2 className="text-base font-bold font-mono text-white mb-4">
            Post Milestone or News Bulletin
          </h2>
          {newsStatus && (
            <div className="mb-4 p-3 rounded-lg bg-[#25616D]/30 border border-[#1B998B]/40 text-[#1B998B] text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {newsStatus}
            </div>
          )}
          {newsError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {newsError}
            </div>
          )}
          <form onSubmit={handleNewsSubmit} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Headline *
              </label>
              <input
                type="text"
                required
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="A2MD Deep-Tech Pipeline Announced..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={newsDate}
                  onChange={(e) => setNewsDate(e.target.value)}
                  className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Category *</label>
                <input
                  type="text"
                  required
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value)}
                  className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                  placeholder="Keynote / Fellowship / Grant / A2MD"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                Description *
              </label>
              <textarea
                rows={3}
                required
                value={newsDescription}
                onChange={(e) => setNewsDescription(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="Details of the symposium, keynote, or grant..."
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                External Link (Optional)
              </label>
              <input
                type="url"
                value={newsUrl}
                onChange={(e) => setNewsUrl(e.target.value)}
                className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono"
                placeholder="https://doi.org/10.1002/..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#1B998B] hover:bg-[#1B998B]/90 text-[#0B132B] font-mono text-xs font-bold uppercase transition-colors"
            >
              Broadcast Milestone
            </button>
          </form>
        </div>
      )}
    </div>
  );
}