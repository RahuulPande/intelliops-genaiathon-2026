'use client';

import ScrollReveal from './ScrollReveal';

const steps = [
  {
    number: '1',
    title: 'Connect',
    description:
      'Plug in your existing tools via our connector framework. GitHub today \u2014 Jira, Jenkins, and ServiceNow connectors shipping Q3 2026.',
  },
  {
    number: '2',
    title: 'Analyze',
    description:
      'AI correlates data across all lifecycle stages. Cross-layer intelligence surfaces risks, patterns, and opportunities that humans miss.',
  },
  {
    number: '3',
    title: 'Act',
    description:
      'Engineering leaders get actionable intelligence delivered in context. Know where to focus, what\u2019s at risk, and what to learn from.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#0D1220] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-white mb-4">
              From Chaos to Intelligence
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-lg max-w-2xl mx-auto">
              Three steps to transform your software delivery.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-[#0AEFCF]/10" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="w-12 h-12 rounded-full bg-[#0AEFCF]/10 border border-[#0AEFCF]/30 flex items-center justify-center text-[#0AEFCF] font-[family-name:var(--font-mono-jb)] text-lg font-bold mb-6 relative z-10">
                  {step.number}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-white mb-3">
                  {step.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
