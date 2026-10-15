export type ProjectCategory =
  | 'Additive Manufacturing & Hardware'
  | 'Vitrimers & Smart Polymers'
  | 'Molecular Dynamics & DFT'
  | 'Biopolymers & Composites';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  content: string;
  hero_image_url: string;
  gallery_urls: string[];
  tags: string[];
  is_featured: boolean;
  created_at?: string;
  methodologies?: string[];
  computational_specs?: {
    engine?: string;
    dft_functional?: string;
    basis_set?: string;
    md_ensemble?: string;
    hardware?: string;
    simulation_duration?: string;
  };
  linked_publications?: string[];
}

export type PublicationType =
  | 'journal'
  | 'patent'
  | 'conference'
  | 'preprint'
  | 'Peer-Reviewed Article'
  | 'Patent / Invention Disclosure'
  | 'Patent / Invention'
  | 'Conference Proceeding'
  | 'Preprint';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  pub_type: PublicationType;
  doi?: string;
  abstract?: string;
  bibtex?: string;
  pdf_url?: string;
  is_highlighted: boolean;
  created_at?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  external_url?: string;
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  affiliation?: string | null;
  subject?: string | null;
  message: string;
  created_at?: string;
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Partial<Project> & { title: string; category: ProjectCategory };
        Update: Partial<Project>;
        Relationships: [];
      };
      publications: {
        Row: Publication;
        Insert: Partial<Publication> & { title: string; venue: string; year: number };
        Update: Partial<Publication>;
        Relationships: [];
      };
      news: {
        Row: NewsItem;
        Insert: Partial<NewsItem> & { title: string; description: string };
        Update: Partial<NewsItem>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Partial<ContactMessage> & { name: string; email: string; message: string };
        Update: Partial<ContactMessage>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
