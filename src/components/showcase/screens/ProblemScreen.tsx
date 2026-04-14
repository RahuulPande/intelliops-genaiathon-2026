'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, BrainCircuit } from 'lucide-react';

function AnimatedCounter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
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
      {value}
      {suffix}
    </span>
  );
}

const painPoints = [
  {
    icon: AlertTriangle,
    stat: 12,
    suffix: '',
    prefix: '8–',
    label: 'tools, zero shared intelligence',
    description: 'Jira, Jenkins, Slack, ServiceNow, Confluence, Git, SonarQube, Splunk — all siloed.',
    color: 'text-red-600',
    borderColor: 'border-l-red-500',
  },
  {
    icon: Clock,
    stat: 6,
    suffix: '+',
    prefix: '',
    label: 'hours: average defect resolution time',
    description: 'Context-switching across systems, manual triage, tribal knowledge bottlenecks.',
    color: 'text-amber-600',
    borderColor: 'border-l-amber-500',
  },
  {
    icon: BrainCircuit,
    stat: 0,
    suffix: '',
    prefix: '',
    label: '',
    displayLabel: 'Reactive by default — no AI, no predictions',
    description: 'Teams react to failures instead of preventing them. No learning loop. No feedback.',
    color: 'text-purple-600',
    borderColor: 'border-l-purple-500',
  },
];

export default function ProblemScreen() {
  return (
    <div className="relative text-center">
      {/* Section Label */}
      <div className="absolute top-0 left-0 -mt-16 ml-2">
        <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-500">THE CHALLENGE</div>
        <div className="text-[10px] text-gray-400 mt-0.5 font-medium">What enterprise teams face today</div>
      </div>

      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 -mt-24 h-[2px] bg-red-400/60" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          The hidden cost of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
            disconnected delivery
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enterprise teams rely on 8-12 siloed tools with no shared intelligence.
          The result: slow defect resolution, blind release decisions, and knowledge that walks out the door.
        </p>
      </motion.div>

      {/* Pain Point Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
        {painPoints.map((point, i) => {
          const Icon = point.icon;
          const displayLabel = (point as Record<string, unknown>).displayLabel as string | undefined;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className={`bg-white rounded-2xl p-6 text-left border border-gray-200 border-l-4 ${point.borderColor} shadow-sm`}
            >
              <Icon className={`w-8 h-8 ${point.color} mb-4`} />
              {displayLabel ? (
                <div className={`text-lg font-bold ${point.color} mb-2`}>{displayLabel}</div>
              ) : (
                <>
                  <div className={`text-4xl font-bold ${point.color} mb-2`}>
                    {point.prefix}
                    <AnimatedCounter target={point.stat} />
                    {point.suffix}
                  </div>
                  <p className="text-gray-800 font-semibold mb-2">{point.label}</p>
                </>
              )}
              <p className="text-sm text-gray-600">{point.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
