'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Clock, Shield, Users, DollarSign, Zap,
  Code2, Database, Cloud, Brain, ExternalLink,
} from 'lucide-react';

function AnimatedCounter({ target, duration = 2000, prefix = '', suffix = '' }: { target: number; duration?: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    startRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return (
    <span>
      {prefix}{value}{suffix}
    </span>
  );
}

const metrics = [
  { icon: Clock, label: 'Defect Resolution', before: '6+ hours', after: '< 45 min', color: 'text-blue-600', improvement: '87% faster' },
  { icon: Shield, label: 'Release Confidence', before: 'Manual gut feel', after: 'AI-scored 87.3', color: 'text-teal-600', improvement: 'Data-driven' },
  { icon: TrendingUp, label: 'Test Efficiency', before: 'Run everything', after: 'Smart prioritization', color: 'text-purple-600', improvement: '3.2h saved/cycle' },
  { icon: Users, label: 'Onboarding Time', before: '5 weeks', after: '3 weeks', color: 'text-orange-600', improvement: '40% faster' },
  { icon: Zap, label: 'Flaky Test Triage', before: 'Manual investigation', after: 'Auto-quarantine', color: 'text-amber-600', improvement: '2.1h saved/sprint' },
  { icon: DollarSign, label: 'Cost per Hire', before: '$20K ramp-up', after: '$12K ramp-up', color: 'text-green-600', improvement: '$8K saved' },
];

const techStack = [
  { icon: Code2, label: 'Next.js 15 + TypeScript', detail: 'Turbopack, React 19' },
  { icon: Brain, label: 'Claude AI (Anthropic)', detail: 'LLM + RAG simulation' },
  { icon: Database, label: 'Prisma + PostgreSQL', detail: 'AI audit logging' },
  { icon: Cloud, label: 'Vercel Edge', detail: 'Global deployment' },
];

export default function ImpactScreen() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTryPlatform = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      // User is already logged in (came here from login) — go to dashboard
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-[#F8FAFC] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-gray-900 mb-2">IntelliOps AI</div>
              <p className="text-gray-500 mb-6">Entering the full platform...</p>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Label */}
      <div className="absolute top-0 left-0 -mt-16 ml-2">
        <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-500">IMPACT &amp; ROI</div>
        <div className="text-[10px] text-gray-400 mt-0.5 font-medium">Measurable business outcomes</div>
      </div>

      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 -mt-24 h-[2px] bg-green-500/60" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Impact & <span className="text-amber-600">ROI</span>
        </h1>
        <p className="text-gray-600">Measurable improvements across the software delivery lifecycle.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Left: Impact Metrics */}
        <div className="space-y-3">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center gap-4"
              >
                <Icon className={`w-6 h-6 ${metric.color} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{metric.label}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400 line-through">{metric.before}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-teal-700 font-medium">{metric.after}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-full flex-shrink-0 border border-teal-200">
                  {metric.improvement}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Right: ROI + Tech */}
        <div className="space-y-6">
          {/* 3-Layer ROI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="text-sm font-semibold text-gray-700 mb-1">Total Business Impact</div>
            <div className="text-3xl font-bold text-teal-700 mb-1">
              ~$<AnimatedCounter target={300} suffix="K" />–$400K/year
            </div>
            <div className="text-xs text-gray-500 mb-4">For a 50-developer delivery team (conservative estimate)</div>

            {/* Layer 1: Direct Savings */}
            <div className="rounded-lg p-3 mb-2 bg-teal-50 border-l-[3px] border-teal-500">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-gray-800">Layer 1: Direct Savings</span>
                <span className="text-xs font-bold text-teal-700">~$89K/year</span>
              </div>
              <div className="space-y-0.5 text-[11px] text-gray-600">
                <div className="flex justify-between">
                  <span>Defect resolution (680h × $85/hr)</span>
                  <span className="font-medium text-gray-700">$57,800</span>
                </div>
                <div className="flex justify-between">
                  <span>Test cycle optimization (83h × $85/hr)</span>
                  <span className="font-medium text-gray-700">$7,055</span>
                </div>
                <div className="flex justify-between">
                  <span>Faster onboarding (3 hires × $8K)</span>
                  <span className="font-medium text-gray-700">$24,000</span>
                </div>
              </div>
            </div>

            {/* Layer 2: Productivity Gains */}
            <div className="rounded-lg p-3 mb-2 bg-blue-50 border-l-[3px] border-blue-500">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-gray-800">Layer 2: Productivity Gains</span>
                <span className="text-xs font-bold text-blue-700">~$140K/year</span>
              </div>
              <div className="space-y-0.5 text-[11px] text-gray-600">
                <div>Faster release cycles with AI-driven confidence</div>
                <div>Smart test prioritization (run 20%, catch 80%)</div>
              </div>
              <div className="text-[10px] text-gray-400 italic mt-1">Based on 20% productivity capture across team</div>
            </div>

            {/* Layer 3: Risk Reduction */}
            <div className="rounded-lg p-3 mb-3 bg-amber-50 border-l-[3px] border-amber-500">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-semibold text-gray-800">Layer 3: Risk Reduction</span>
                <span className="text-xs font-bold text-amber-700">~$100K/year</span>
              </div>
              <div className="space-y-0.5 text-[11px] text-gray-600">
                <div>Avoided production incidents (1–2/year × $50K–$100K each)</div>
                <div>Compliance cost avoidance (audit preparation reduction)</div>
              </div>
              <div className="text-[10px] text-gray-400 italic mt-1">Based on 30% risk realization</div>
            </div>

            <p className="text-[10px] text-gray-400 italic leading-snug">
              * Conservative assumptions based on industry benchmarks for enterprise banking delivery teams. Actual impact varies by team size and tool adoption.
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-xl p-4 border border-gray-200"
          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Technology Stack</h3>
            <div className="space-y-2">
              {techStack.map((tech) => {
                const TechIcon = tech.icon;
                return (
                  <div key={tech.label} className="flex items-center gap-3">
                    <TechIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 font-medium">{tech.label}</span>
                    <span className="text-xs text-gray-500">{tech.detail}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* AI Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 rounded-xl p-4 border border-gray-200"
          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">AI Pipeline</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">Rate Limit</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-amber-100 text-amber-700">Cost Guard</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-green-100 text-green-700">Claude API</span>
              <span>→</span>
              <span className="px-2 py-1 rounded bg-purple-100 text-purple-700">Audit Log</span>
            </div>
          </motion.div>

          {/* Author & CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-3"
          >
            <div className="text-center text-xs text-gray-500">
              Built by{' '}
              <a
                href="https://www.linkedin.com/in/rahuulpande/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:underline font-semibold"
              >
                Rahuul Pande
              </a>
              {' '}· 19+ years Swiss banking engineering · GenAIathon 2026
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="text-center">
                <button
                  onClick={handleTryPlatform}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  Try the Full Platform
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-gray-500 mt-1.5">
                  Step into the full platform and explore each intelligence pillar in depth
                </p>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0 })}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← View Showcase Again
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
