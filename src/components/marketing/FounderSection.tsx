'use client';

import { ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FounderSection() {
  return (
    <section className="bg-[#0A0E1A] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="font-[family-name:var(--font-mono-jb)] text-[#0AEFCF] text-xs tracking-[0.2em] uppercase mb-6">
            Built by an Engineer, for Engineers
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-white mb-6">
            Rahuul Pande
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-lg leading-relaxed mb-8">
            19 years of Swiss banking engineering at Credit Suisse and UBS.
            Currently building the tool he wished existed &mdash; an AI brain
            that connects every stage of the software lifecycle. Based in
            Zurich, Switzerland.
          </p>
          <a
            href="https://linkedin.com/in/rahuulpande"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-[#0AEFCF] text-sm hover:underline transition-colors"
          >
            LinkedIn
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
