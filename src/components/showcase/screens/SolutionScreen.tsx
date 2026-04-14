'use client';

import { motion } from 'framer-motion';
import { Brain, TestTube, Rocket, BookOpen, Cpu, Database, MessageSquare, BarChart3 } from 'lucide-react';

const pillars = [
  {
    title: 'Defect Intelligence',
    technique: 'RAG',
    stat: '96%',
    statLabel: 'matching accuracy',
    description: 'RAG-powered defect matching across 3,247 historical defects. Industry-first resolution recommendations.',
    icon: Brain,
    gradient: 'from-blue-500 to-indigo-600',
    techniqueBg: 'bg-green-100',
    techniqueText: 'text-green-700',
  },
  {
    title: 'Test Intelligence',
    technique: 'ML',
    stat: '6',
    statLabel: 'AI capabilities',
    description: 'ML-powered test prioritization, flaky detection, gap analysis, failure clustering, readiness prediction, and smart triage.',
    icon: TestTube,
    gradient: 'from-purple-500 to-pink-600',
    techniqueBg: 'bg-amber-100',
    techniqueText: 'text-amber-700',
  },
  {
    title: 'Release Intelligence',
    technique: 'ML',
    stat: '87.3',
    statLabel: 'AI health score',
    description: 'Predictive release risk scoring, deployment readiness analysis, and go/no-go recommendations backed by data.',
    icon: Rocket,
    gradient: 'from-teal-500 to-cyan-600',
    techniqueBg: 'bg-amber-100',
    techniqueText: 'text-amber-700',
  },
  {
    title: 'Knowledge Curation',
    technique: 'RAG+LLM',
    stat: '40%',
    statLabel: 'faster onboarding',
    description: 'Self-building knowledge base that captures tribal knowledge. Every defect and incident becomes a learning asset.',
    icon: BookOpen,
    gradient: 'from-orange-500 to-red-600',
    techniqueBg: 'bg-blue-100',
    techniqueText: 'text-blue-700',
  },
];

const techBadges = [
  { label: 'ML', icon: BarChart3, bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  { label: 'RAG', icon: Database, bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
  { label: 'LLM', icon: Cpu, bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  { label: 'NLP', icon: MessageSquare, bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
];

export default function SolutionScreen() {
  return (
    <div className="relative text-center">
      {/* Section Label */}
      <div className="absolute top-0 left-0 -mt-16 ml-2">
        <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-500">OUR APPROACH</div>
        <div className="text-[10px] text-gray-400 mt-0.5 font-medium">Four pillars of delivery intelligence</div>
      </div>

      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 -mt-24 h-[2px] bg-teal-500/60" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          IntelliOps AI — Where Operations Become{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-600">
            Intelligent
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          One platform. Four pillars of intelligence. The brain of the software lifecycle.
        </p>
      </motion.div>

      {/* Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-12 max-w-6xl mx-auto">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.gradient}`} />

              <div className="flex items-center gap-3 mb-4 mt-1">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${pillar.gradient}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${pillar.techniqueBg} ${pillar.techniqueText}`}>
                  {pillar.technique}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{pillar.title}</h3>

              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-bold text-teal-700">{pillar.stat}</span>
                <span className="text-xs text-gray-500">{pillar.statLabel}</span>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Powered By */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex items-center justify-center gap-3 mt-8"
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
