'use client';

import { type FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, ChevronDown, Mail } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const CONSUMER_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

const ROLE_OPTIONS = [
  { value: '', label: 'Select your role' },
  { value: 'CTO', label: 'CTO' },
  { value: 'VP Engineering', label: 'VP Engineering' },
  { value: 'Engineering Manager', label: 'Engineering Manager' },
  { value: 'SRE Lead', label: 'SRE Lead' },
  { value: 'DevOps Lead', label: 'DevOps Lead' },
  { value: 'Other', label: 'Other' },
];

const TEAM_SIZE_OPTIONS = [
  { value: '', label: 'Select team size' },
  { value: 'Under 25', label: 'Under 25' },
  { value: '25-100', label: '25–100' },
  { value: '100-500', label: '100–500' },
  { value: '500+', label: '500+' },
];

const inputClass =
  'w-full bg-[#111827] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#475569] ' +
  'focus:outline-none focus:border-[#0AEFCF]/50 focus:ring-1 focus:ring-[#0AEFCF]/30 transition-colors ' +
  'font-[family-name:var(--font-body)] text-sm';

const labelClass = 'text-sm font-medium text-[#94A3B8] mb-1.5 block';

export default function DemoRequestForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const domain = email.split('@')[1]?.toLowerCase();
    if (CONSUMER_DOMAINS.includes(domain)) {
      setEmailError('Please use your work email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, role, teamSize, message }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo-request" className="bg-[#0D1220] py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6">
        <ScrollReveal>
          {/* Section header */}
          <div className="text-center mb-12">
            {/* Eyebrow */}
            <p className="font-[family-name:var(--font-mono-jb)] text-[#0AEFCF] text-xs tracking-[0.2em] uppercase mb-4">
              Get Started
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-white leading-tight mb-4">
              Request Your Demo
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              See how IntelliOps transforms your SDLC intelligence. We&apos;ll set up a personalized
              demo for your team.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-[#111827] border border-white/10 rounded-2xl p-10 text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#0AEFCF]/10 border border-[#0AEFCF]/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#0AEFCF]" />
                  </div>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl text-white mb-3">
                  Demo Request Received
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-base mb-6 leading-relaxed">
                  We&apos;ll be in touch within 24 hours to schedule your personalized walkthrough.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-[#64748B]">
                  <Mail className="w-4 h-4 text-[#D4A843]" />
                  <span className="font-[family-name:var(--font-body)]">
                    Email us directly:{' '}
                    <a
                      href="mailto:rahuul.pande@gmail.com"
                      className="text-[#D4A843] hover:text-[#E5B954] transition-colors underline underline-offset-2"
                    >
                      rahuul.pande@gmail.com
                    </a>
                  </span>
                </div>
              </motion.div>
            ) : (
              /* ── Form state ── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111827] border border-white/10 rounded-2xl p-8 md:p-10"
              >
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="demo-name" className={labelClass}>
                      Name <span className="text-[#0AEFCF]">*</span>
                    </label>
                    <input
                      id="demo-name"
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label htmlFor="demo-email" className={labelClass}>
                      Work Email <span className="text-[#0AEFCF]">*</span>
                    </label>
                    <input
                      id="demo-email"
                      type="email"
                      required
                      placeholder="jane@yourcompany.com"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      className={`${inputClass} ${emailError ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : ''}`}
                    />
                    {emailError && (
                      <p className="mt-1.5 text-xs text-red-400 font-[family-name:var(--font-body)]">
                        {emailError}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="demo-company" className={labelClass}>
                      Company <span className="text-[#0AEFCF]">*</span>
                    </label>
                    <input
                      id="demo-company"
                      type="text"
                      required
                      placeholder="Acme Financial"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  {/* Role + Team Size (side by side on md+) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Role */}
                    <div>
                      <label htmlFor="demo-role" className={labelClass}>
                        Role <span className="text-[#0AEFCF]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="demo-role"
                          required
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          {ROLE_OPTIONS.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              disabled={opt.value === ''}
                              className="bg-[#111827] text-white"
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] pointer-events-none" />
                      </div>
                    </div>

                    {/* Team Size */}
                    <div>
                      <label htmlFor="demo-team-size" className={labelClass}>
                        Team Size <span className="text-[#0AEFCF]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="demo-team-size"
                          required
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className={`${inputClass} appearance-none cursor-pointer`}
                        >
                          {TEAM_SIZE_OPTIONS.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              disabled={opt.value === ''}
                              className="bg-[#111827] text-white"
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="demo-message" className={labelClass}>
                      Message{' '}
                      <span className="text-[#475569] font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="demo-message"
                      rows={3}
                      placeholder="Tell us about your team, your current SDLC challenges, or specific features you'd like to see…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Error banner */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 font-[family-name:var(--font-body)]"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !email || !company || !role || !teamSize}
                    className="bg-[#D4A843] text-[#0A0E1A] font-semibold w-full py-3.5 rounded-lg text-base hover:bg-[#E5B954] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(212,168,67,0.25)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting…</span>
                      </>
                    ) : (
                      'Request a Demo'
                    )}
                  </button>

                  <p className="text-center text-xs text-[#475569] font-[family-name:var(--font-body)]">
                    No spam. We&apos;ll only reach out to schedule your demo.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
