'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, AlertCircle, Award, Loader2, ArrowRight } from 'lucide-react';
import { sendContactMessage } from '@/app/actions/contact';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    deliveredVia?: 'resend' | 'database';
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await sendContactMessage({
        fullName,
        email,
        affiliation,
        subject,
        message,
        honeypot,
      });

      if (res.success) {
        setSubmitResult({
          success: true,
          message: res.message || 'Your inquiry has been successfully transmitted and forwarded to the researcher inbox.',
          deliveredVia: res.deliveredVia,
        });
        setFullName('');
        setEmail('');
        setAffiliation('');
        setSubject('');
        setMessage('');
        setHoneypot('');
      } else {
        setSubmitResult({
          success: false,
          message: res.error || 'Unable to deliver message at this time. Please retry or contact directly via email.',
        });
      }
    } catch (err: any) {
      setSubmitResult({
        success: false,
        message: err?.message || 'An unexpected error occurred. Please contact onyavol@lsu.edu directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#25616D]/30 text-[#1B998B] border border-[#1B998B]/40">
          <Send className="w-3.5 h-3.5" />
          Collaborate &amp; Inquire
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Contact &amp; Academic Inquiries
        </h1>
        <p className="text-base text-[#94A3B8] leading-relaxed">
          Open to research collaborations, keynote invitations, deep-tech industrial partnerships with <strong>A2MD</strong>,
          and postdoctoral opportunities in dynamic polymer networks and additive manufacturing systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0B132B] border border-[#25616D] space-y-6">
            <h2 className="text-base font-bold font-mono text-white">
              Direct Contact &amp; Channels
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
                  <span className="block text-white font-semibold">Location &amp; Affiliation</span>
                  <span>Louisiana State University (LSU)</span>
                  <span className="block text-[11px] text-[#94A3B8]/70">
                    Department of Mechanical &amp; Industrial Engineering
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
                  <span className="block text-white font-semibold">Scholar &amp; Professional IDs</span>
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
            <div>
              <h2 className="text-lg font-bold font-mono text-white">
                Send Direct Message
              </h2>
              <p className="text-xs font-mono text-[#94A3B8] mt-1">
                Delivers directly to the principal investigator inbox with automated archive redundancy.
              </p>
            </div>

            {submitResult?.success ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-3">
                <div className="flex items-center gap-2 font-mono text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Transmission Confirmed
                </div>
                <p className="text-xs leading-relaxed text-emerald-200">
                  {submitResult.message}
                </p>
                {submitResult.deliveredVia && (
                  <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                    Channel: {submitResult.deliveredVia === 'resend' ? 'Direct Resend Forwarding (donnevaliente@gmail.com)' : 'Encrypted Supabase Archive'}
                  </span>
                )}
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                  >
                    Send another dispatch <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-bot spam verification */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="_company_honeypot">Leave blank</label>
                  <input
                    type="text"
                    id="_company_honeypot"
                    name="_company_honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {submitResult && !submitResult.success && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-rose-200 block">Dispatch Unsuccessful</span>
                      <p>{submitResult.message}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B] disabled:opacity-50"
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
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B] disabled:opacity-50"
                      placeholder="jane.doe@organization.edu"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#94A3B8] mb-1">
                      Institutional Affiliation
                    </label>
                    <input
                      type="text"
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B] disabled:opacity-50"
                      placeholder="MIT / NASA JPL / Industry Partner"
                    />
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
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B] disabled:opacity-50"
                      placeholder="Inquiry: Lunar Regolith Vitrimers / A2MD"
                    />
                  </div>
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
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[#070D1E] border border-[#25616D]/40 px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#1B998B] disabled:opacity-50"
                    placeholder="Describe your technical inquiry, collaboration proposal, or institutional scope..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-mono text-xs font-bold uppercase text-[#0B132B] bg-[#1B998B] hover:bg-[#1B998B]/90 transition-colors shadow-md shadow-[#1B998B]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0B132B]" />
                      Transmitting Dispatch...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
