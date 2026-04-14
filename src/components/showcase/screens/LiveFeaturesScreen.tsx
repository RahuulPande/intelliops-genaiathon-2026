'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, Shield, Clock, BarChart3, Cpu, MessageSquare } from 'lucide-react';

function AnimatedCounter({ target, duration = 2000, suffix = '', prefix = '' }: { target: number; duration?: number; suffix?: string; prefix?: string }) {
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
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}

const credibilityStats = [
  { value: 3247, suffix: '', label: 'defects analyzed', icon: Database, color: 'text-teal-700' },
  { value: 680, suffix: 'h', label: 'saved', icon: Clock, color: 'text-teal-700' },
  { value: 96, suffix: '%', label: 'accuracy', icon: Shield, color: 'text-teal-700' },
  { value: 5, suffix: '', label: 'years of project patterns modeled', icon: BarChart3, color: 'text-teal-700' },
];

const modeledOn = [
  'Historical defect records & resolution patterns',
  'Incident logs & post-mortem analysis',
  'System dependency graphs & service maps',
  'Release history & deployment outcomes',
];

const usedAcross = [
  'Defect triage',
  'Test prioritization',
  'Release risk scoring',
  'Knowledge base generation',
];

const techBadges = [
  { label: 'ML', icon: BarChart3, bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  { label: 'RAG', icon: Database, bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  { label: 'LLM', icon: Cpu, bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  { label: 'NLP', icon: MessageSquare, bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
];

export default function LiveFeaturesScreen() {
  return (
    <div className="relative">
      {/* Section Label */}
      <div className="absolute top-0 left-0 -mt-16 ml-2">
        <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-500">PROOF OF SCALE</div>
        <div className="text-[10px] text-gray-400 mt-0.5 font-medium">Modeled on real project experience</div>
      </div>

      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 -mt-24 h-[2px] bg-amber-500/60" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Designed for enterprise delivery — <span className="text-teal-700">modeled on real project patterns</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          IntelliOps demonstrates how AI transforms enterprise delivery workflows.
          All metrics are modeled on patterns from real banking project experience.
        </p>
      </motion.div>

      {/* Big Credibility Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
        {credibilityStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center"
            >
              <Icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Context Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto mb-6"
      >
        <div className="bg-white rounded-2xl p-6 border border-teal-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-teal-700" />
            <span className="text-sm font-semibold text-gray-900">Enterprise-Grade AI</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            RAG-based defect matching across 3,247 historical defects with 96% accuracy.
            Pattern recognition that turns every past incident into prevention intelligence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Modeled on</h4>
              <ul className="space-y-1.5">
                {modeledOn.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-teal-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Used across</h4>
              <ul className="space-y-1.5">
                {usedAcross.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Powered By */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-3"
      >
        <span className="text-xs text-gray-400 uppercase tracking-wider">Powered by</span>
        {techBadges.map((badge) => {
          const BadgeIcon = badge.icon;
          return (
            <span
              key={badge.label}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} border ${badge.border}`}
            >
              <BadgeIcon className="w-3.5 h-3.5" />
              {badge.label}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
