import { createClient } from '@supabase/supabase-js';
import type { Database, Publication } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl && typeof window !== 'undefined') {
  console.warn('Supabase URL missing from environment variables (NEXT_PUBLIC_SUPABASE_URL).');
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export function generateEndnote(pub: Publication): string {
  const authorLines = pub.authors.map((a) => `%A ${a}`).join('\n');
  return [
    '%0 Journal Article',
    `%T ${pub.title}`,
    authorLines,
    `%J ${pub.venue}`,
    `%D ${pub.year}`,
    pub.doi ? `%R ${pub.doi}` : '',
    pub.abstract ? `%X ${pub.abstract}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

export function generateBibTeX(pub: Publication): string {
  if (pub.bibtex && pub.bibtex.trim().length > 0) {
    return pub.bibtex.trim();
  }
  const firstAuthor = pub.authors[0]?.split(' ').pop()?.toLowerCase() || 'nyavor';
  const citeKey = `${firstAuthor}${pub.year}${pub.title.slice(0, 6).replace(/[^a-zA-Z]/g, '')}`;
  const authorsBib = pub.authors.join(' and ');

  return `@article{${citeKey},
  title = {${pub.title}},
  author = {${authorsBib}},
  journal = {${pub.venue}},
  year = {${pub.year}}${pub.doi ? `,\n  doi = {${pub.doi}}` : ''}
}`;
}