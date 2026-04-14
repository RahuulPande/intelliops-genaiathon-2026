'use client';

import ScrollReveal from './ScrollReveal';

const problemStats = [
  { value: '8-12', description: 'Disconnected tools across the SDLC' },
  { value: '6.2 hrs', description: 'Avg incident resolution time' },
  { value: '$2.4M', description: 'Annual context-switching cost' },
  { value: '180 min', description: 'Mean detection time (MTTD)' },
];

const solutionPoints = [
  'One unified intelligence layer across L0-L5',
  'AI-powered correlation — 2.3s root cause analysis',
  'Automated audit trail for every AI decision',
  'Pluggable connectors — works with your existing stack',
];

export default function ProblemSolution() {
  return (
    <section id="platform" className="py-24 md:py-32 bg-[#0D1220]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Problem */}
          <ScrollReveal delay={0}>
            <div>
              <p className="font-[family-name:var(--font-mono-jb)] text-[#0AEFCF] text-xs tracking-[0.2em] uppercase mb-8">
                The Challenge
              </p>
              <div className="grid grid-cols-2 gap-4">
                {problemStats.map((stat) => (
                  <div
                    key={stat.value}
                    className="bg-[#0A0E1A] border border-white/5 rounded-xl p-6"
                  >
                    <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-2">
                      {stat.value}
                    </p>
                    <p className="font-[family-name:var(--font-body)] text-sm text-[#94A3B8] leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Solution */}
          <ScrollReveal delay={0.15}>
            <div>
              <p className="font-[family-name:var(--font-mono-jb)] text-[#0AEFCF] text-xs tracking-[0.2em] uppercase mb-8">
                The IntelliOps Approach
              </p>
              <div className="flex flex-col gap-6">
                {solutionPoints.map((point) => (
                  <div key={point} className="flex items-start gap-4">
                    <span className="mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[#0AEFCF]" />
                    <p className="font-[family-name:var(--font-body)] text-base text-[#CBD5E1] leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
