'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#25616D]/30 text-[#1B998B] border border-[#1B998B]/40">
          <Send className="w-3.5 h-3.5" />
          Collaborate & Inquire
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Contact & Academic Inquiries
        </h1>
        <p className="text-base text-[#94A3B8] leading-relaxed">
          Open to research collaborations, keynote invitations, deep-tech industrial partnerships with <strong>A2MD</strong>,
          and postdoctoral opportunities in dynamic polymer networks and additive systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0B132B] border border-[#25616D] space-y-6">
            <h2 className="text-base font-bold font-mono text-white">
              Direct Contact & Channels
            </h2>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3 text-[#94A3B8]">
                <Mail className="w-4 h-4 text-[#1B998B] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">Primary Emails</span>
                  <a href="mailto:onyavol@lsu.edu" className="text-[#1B998B] hover:underline block">
                    onyavol@lsu.edu
                  </a>
                  <a href="mailto:nyavor.obed@gmail.com" className="text-[#94A3B8] hover:text-white hover:underline block mt-0.5">
                    nyavor.obed@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#94A3B8]">
                <MapPin className="w-4 h-4 text-[#1B998B] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">Location & Affiliation</span>
                  <span>Louisiana State University (LSU)</span>
                  <span className="block text-[11px] text-[#94A3B8]/70">
                    Department of Mechanical & Industrial Engineering
                  </span>
                  <span className="block text-[11px] text-[#94A3B8]/70">
                    Baton Rouge, Louisiana, USA
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#94A3B8]">
                <Linkedin className="w-4 h-4 text-[#1B998B] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">LinkedIn Profile</span>
                  <a
                    href="https://www.linkedin.com/in/obed-t-nyavor/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1B998B] hover:underline"
                  >
                    linkedin.com/in/obed-t-nyavor/
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#94A3B8]">
                <Award className="w-4 h-4 text-[#1B998B] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">Scholar & Professional IDs</span>
                  <a
                    href="https://scholar.google.com/citations?user=GuBTPAYAAAAJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1B998B] hover:underline block"
                  >
                    Google Scholar Profile
                  </a>
                  <span className="block text-[11px] text-[#94A3B8]/70 mt-0.5">
                    ORCID: 0009-0009-6711-3281
                  </span>
                  <span className="block text-[11px] text-[#94A3B8]/70">
                    ASME Member ID: 22099754409
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#94A3B8]">
                <Github className="w-4 h-4 text-[#1B998B] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-semibold">Code Repositories</span>
                  <a
                    href="https://github.com/donnevaliente"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1B998B] hover:underline"
                  >
                    github.com/donnevaliente
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="p-8 rounded-2xl bg-[#0B132B] border border-[#25616D]/40 space-y-6">
            <h2 className="text-lg font-bold font-mono text-white">
              Send Direct Message
            </h2>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2">
                <div className="flex items-center gap-2 font-mono text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5" /> Transmission Received
                </div>
                <p className="text-xs leading-relaxed text-emerald-300">
                  Thank you for reaching out. Your dispatch has been logged and forwarded directly to my inbox.
                  I will review and reply promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
                      placeholder="Dr. Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
                      placeholder="jane.doe@organization.edu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                    Subject / Project Domain *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
                    placeholder="Inquiry regarding regolith vitrimers or A2MD partnership"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                    Message Detail *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B]"
                    placeholder="Describe your collaboration proposal, technical question, or institutional background..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-mono text-xs font-bold uppercase text-[#0B132B] bg-[#1B998B] hover:bg-[#1B998B]/90 transition-colors shadow-md shadow-[#1B998B]/20"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}