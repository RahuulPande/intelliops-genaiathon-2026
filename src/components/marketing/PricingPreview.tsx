'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

type BillingCycle = 'monthly' | 'annual';
type CtaStyle = 'teal-outline' | 'teal-solid' | 'amber-outline';

function ctaClasses(style: CtaStyle): string {
  switch (style) {
    case 'teal-outline':
      return 'border border-[#0AEFCF]/30 text-[#0AEFCF] hover:bg-[#0AEFCF]/5';
    case 'teal-solid':
      return 'bg-[#0AEFCF] text-[#0A0E1A] font-semibold hover:bg-[#2FF8DD]';
    case 'amber-outline':
      return 'border border-[#D4A843]/30 text-[#D4A843] hover:bg-[#D4A843]/5';
  }
}

function scrollToDemo() {
  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
}

export default function PricingPreview() {
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [contributors, setContributors] = useState(50);

  // Team pricing
  const teamMonthly = 39;
  const teamAnnual = 33;
  const teamPerContrib = billing === 'annual' ? teamAnnual : teamMonthly;
  const teamTotal = contributors * teamPerContrib;
  const teamYearly = teamTotal * 12;

  // Business pricing
  const bizPlatformMonthly = 2000;
  const bizPlatformAnnual = 1660;
  const bizPerContribMonthly = 29;
  const bizPerContribAnnual = 24;
  const bizPlatform = billing === 'annual' ? bizPlatformAnnual : bizPlatformMonthly;
  const bizPerContrib = billing === 'annual' ? bizPerContribAnnual : bizPerContribMonthly;
  const bizTotal = bizPlatform + contributors * bizPerContrib;
  const bizYearly = bizTotal * 12;

  return (
    <section className="bg-[#0D1220] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-lg max-w-2xl mx-auto">
              All plans include a 30-day evaluation with full feature access. No surprises.
            </p>
          </div>
        </ScrollReveal>

        {/* Billing Toggle */}
        <ScrollReveal delay={0.05}>
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-1 bg-[#111827] border border-white/10 rounded-full p-1">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  billing === 'monthly'
                    ? 'bg-[#0AEFCF]/10 text-[#0AEFCF] border border-[#0AEFCF]/30'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  billing === 'annual'
                    ? 'bg-[#0AEFCF]/10 text-[#0AEFCF] border border-[#0AEFCF]/30'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Annual
              </button>
            </div>
            {billing === 'annual' && (
              <span className="font-[family-name:var(--font-mono-jb)] text-[10px] font-bold uppercase tracking-wider bg-[#0AEFCF]/10 text-[#0AEFCF] border border-[#0AEFCF]/20 px-3 py-1 rounded-full">
                Save 17%
              </span>
            )}
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Tier 1: Evaluation */}
          <ScrollReveal delay={0.0}>
            <div className="relative bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col h-full">
              <h3 className="font-[family-name:var(--font-body)] text-white text-lg font-semibold mb-1">
                Evaluation
              </h3>
              <div className="mb-1">
                <span className="font-[family-name:var(--font-display)] text-4xl text-white">
                  Free
                </span>
              </div>
              <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-sm mb-6">
                30-day full access
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Up to 10 contributors',
                  'All 6 layers (L0–L5)',
                  '1 tool connector',
                  'Community support',
                  'No credit card required',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 font-[family-name:var(--font-body)] text-[#94A3B8] text-sm">
                    <Check className="w-4 h-4 text-[#0AEFCF] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToDemo}
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${ctaClasses('teal-outline')}`}
              >
                Start Free Evaluation
              </button>
            </div>
          </ScrollReveal>

          {/* Tier 2: Team (Most Popular) */}
          <ScrollReveal delay={0.1}>
            <div className="relative bg-[#111827] border border-[#0AEFCF]/30 rounded-2xl p-6 flex flex-col h-full">
              {/* Most Popular Badge */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0AEFCF] text-[#0A0E1A] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </span>
              <h3 className="font-[family-name:var(--font-body)] text-white text-lg font-semibold mb-1 mt-2">
                Team
              </h3>
              <div className="mb-1 flex items-end gap-1">
                <span className="font-[family-name:var(--font-mono-jb)] text-4xl text-white">
                  ${billing === 'annual' ? '33' : '39'}
                </span>
                <span className="text-[#94A3B8] text-sm mb-1">/contributor/mo</span>
              </div>
              {billing === 'annual' && (
                <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-xs mb-1">
                  (billed annually)
                </p>
              )}
              <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-sm mb-6">
                Up to 50 contributors
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Up to 50 contributors',
                  'All 6 layers (L0–L5)',
                  '3 tool connectors',
                  'DORA metrics',
                  'Email support',
                  'Quarterly review',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 font-[family-name:var(--font-body)] text-[#94A3B8] text-sm">
                    <Check className="w-4 h-4 text-[#0AEFCF] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToDemo}
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${ctaClasses('teal-solid')}`}
              >
                Start Evaluation
              </button>
            </div>
          </ScrollReveal>

          {/* Tier 3: Business */}
          <ScrollReveal delay={0.2}>
            <div className="relative bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col h-full">
              <h3 className="font-[family-name:var(--font-body)] text-white text-lg font-semibold mb-1">
                Business
              </h3>
              <div className="mb-0.5 flex items-end gap-1 flex-wrap">
                <span className="font-[family-name:var(--font-mono-jb)] text-[#94A3B8] text-base font-medium">
                  ${billing === 'annual' ? '1,660' : '2,000'} platform +
                </span>
              </div>
              <div className="mb-1 flex items-end gap-1">
                <span className="font-[family-name:var(--font-mono-jb)] text-4xl text-white">
                  ${billing === 'annual' ? '24' : '29'}
                </span>
                <span className="text-[#94A3B8] text-sm mb-1">/contributor/mo</span>
              </div>
              {billing === 'annual' && (
                <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-xs mb-1">
                  (billed annually)
                </p>
              )}
              <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-sm mb-6">
                Up to 200 contributors
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Up to 200 contributors',
                  'Unlimited connectors',
                  'Compliance scoring',
                  'CAB generation',
                  'AI audit trail',
                  'Priority support',
                  'Dedicated CSM',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 font-[family-name:var(--font-body)] text-[#94A3B8] text-sm">
                    <Check className="w-4 h-4 text-[#0AEFCF] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToDemo}
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${ctaClasses('teal-outline')}`}
              >
                Contact Sales
              </button>
            </div>
          </ScrollReveal>

          {/* Tier 4: Enterprise */}
          <ScrollReveal delay={0.3}>
            <div className="relative bg-[#111827] border border-white/5 rounded-2xl p-6 flex flex-col h-full">
              <h3 className="font-[family-name:var(--font-body)] text-white text-lg font-semibold mb-1">
                Enterprise
              </h3>
              <div className="mb-1">
                <span className="font-[family-name:var(--font-display)] text-4xl text-white">
                  Custom
                </span>
              </div>
              <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-sm mb-6">
                For regulated institutions
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Unlimited contributors',
                  'On-premise / private cloud',
                  'SSO (SAML/OIDC)',
                  'SOC 2 reporting',
                  'Custom SLA',
                  'Dedicated engineering',
                  'EU AI Act compliance',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 font-[family-name:var(--font-body)] text-[#94A3B8] text-sm">
                    <Check className="w-4 h-4 text-[#0AEFCF] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={scrollToDemo}
                className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${ctaClasses('amber-outline')}`}
              >
                Contact Sales
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Cost Calculator */}
        <ScrollReveal delay={0.15}>
          <div className="mt-16 bg-[#111827] border border-white/5 rounded-2xl p-8">
            <h3 className="font-[family-name:var(--font-display)] text-2xl text-white mb-2">
              Estimate Your Cost
            </h3>
            <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-sm mb-8">
              Drag the slider to see how pricing scales with your team size.
            </p>

            {/* Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-[family-name:var(--font-body)] text-sm text-[#94A3B8]">Contributors</span>
                <span className="font-[family-name:var(--font-mono-jb)] text-[#0AEFCF] font-semibold text-sm">
                  {contributors} contributors
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={contributors}
                onChange={(e) => setContributors(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#0AEFCF] bg-white/10"
              />
              <div className="flex justify-between mt-1">
                <span className="font-[family-name:var(--font-body)] text-xs text-[#94A3B8]/60">5</span>
                <span className="font-[family-name:var(--font-body)] text-xs text-[#94A3B8]/60">500</span>
              </div>
            </div>

            {/* Estimate Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team estimate */}
              <div className="bg-[#0D1220] border border-[#0AEFCF]/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-white">Team Plan</span>
                  <span className="font-[family-name:var(--font-mono-jb)] text-[10px] font-bold uppercase tracking-wider bg-[#0AEFCF]/10 text-[#0AEFCF] px-2 py-0.5 rounded-full">
                    {billing === 'annual' ? '$33/contrib' : '$39/contrib'}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-xs mb-3">
                  {contributors} × ${teamPerContrib}
                </p>
                <div className="font-[family-name:var(--font-mono-jb)] text-2xl text-white font-semibold">
                  ${teamTotal.toLocaleString()}
                  <span className="text-[#94A3B8] text-sm font-normal">/mo</span>
                </div>
                {billing === 'annual' && (
                  <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-xs mt-1">
                    (${teamYearly.toLocaleString()}/yr)
                  </p>
                )}
              </div>

              {/* Business estimate */}
              <div className="bg-[#0D1220] border border-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-white">Business Plan</span>
                  <span className="font-[family-name:var(--font-mono-jb)] text-[10px] font-bold uppercase tracking-wider bg-white/5 text-[#94A3B8] px-2 py-0.5 rounded-full">
                    Platform + per-contrib
                  </span>
                </div>
                <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-xs mb-3">
                  ${bizPlatform.toLocaleString()} + {contributors} × ${bizPerContrib}
                </p>
                <div className="font-[family-name:var(--font-mono-jb)] text-2xl text-white font-semibold">
                  ${bizTotal.toLocaleString()}
                  <span className="text-[#94A3B8] text-sm font-normal">/mo</span>
                </div>
                {billing === 'annual' && (
                  <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-xs mt-1">
                    (${bizYearly.toLocaleString()}/yr)
                  </p>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
