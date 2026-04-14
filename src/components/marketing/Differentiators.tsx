'use client';

import { Shield, Layers, Plug } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const cards = [
  {
    icon: Shield,
    title: 'Banking-Grade Compliance',
    description:
      'PCI-DSS, GDPR, and SOX compliance flags on every PR. CAB package generation for change advisory boards. Full AI audit trail for EU AI Act readiness.',
    metric: 'The only SDLC platform with built-in regulatory scoring',
  },
  {
    icon: Layers,
    title: 'Full Lifecycle Coverage',
    description:
      'Competitors cover L1\u2013L3. IntelliOps spans L0 Plan through L5 Learn \u2014 six layers of intelligence with cross-layer correlation.',
    metric: '6 layers, 16 workspaces, one intelligence platform',
  },
  {
    icon: Plug,
    title: 'Tool-Agnostic Intelligence',
    description:
      'Pluggable connector architecture. Works with your existing GitHub, Jira, Jenkins, ServiceNow, SonarQube stack. No vendor lock-in.',
    metric: 'Connect your stack in minutes, not months',
  },
];

export default function Differentiators() {
  return (
    <section className="bg-[#0A0E1A] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-white mb-4">
              Why IntelliOps
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-lg max-w-2xl mx-auto">
              Purpose-built for engineering leaders at regulated institutions who need more than dashboards.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 hover:border-[#0AEFCF]/20 transition-colors h-full flex flex-col">
                <card.icon className="w-8 h-8 text-[#0AEFCF] mb-6" strokeWidth={1.5} />
                <h3 className="font-[family-name:var(--font-display)] text-xl text-white mb-3">
                  {card.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-sm leading-relaxed mb-6 flex-1">
                  {card.description}
                </p>
                <p className="font-[family-name:var(--font-mono-jb)] text-[#0AEFCF] text-xs leading-relaxed">
                  {card.metric}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
