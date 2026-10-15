import React from 'react';
import Link from 'next/link';
import { Compass, Home, BookOpen, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-teal-400 mb-2">
          <Compass className="h-12 w-12 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <p className="text-xs uppercase font-mono tracking-widest text-teal-400">
            404 Error // Coordinate Not Located
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 font-mono">
            Research Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            The requested publication, project dossier, or system endpoint does not exist or has been relocated within the research archive.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-500 text-slate-950 font-semibold text-sm hover:bg-teal-400 transition-all shadow-md shadow-teal-500/20"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Link>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-medium text-sm hover:border-teal-500/40 hover:text-white transition-all"
          >
            <Layers className="h-4 w-4" />
            Research Dossiers
          </Link>
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-medium text-sm hover:border-teal-500/40 hover:text-white transition-all"
          >
            <BookOpen className="h-4 w-4" />
            Publications
          </Link>
        </div>
      </div>
    </div>
  );
}
