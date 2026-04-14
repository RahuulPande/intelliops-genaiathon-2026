'use client';

import { motion } from 'framer-motion';
import { Brain, TestTube, Rocket, BookOpen, BarChart3, Database, Cpu, MessageSquare } from 'lucide-react';
import { DEMO_METRICS } from '@/lib/constants/demo-metrics';

interface DemoLandingPageProps {
  onNavigate: (sectionId: string) => void;
}

const pillars = [
  {
    id: 'demo-defect-intelligence',
    title: 'Defect Intelligence',
    icon: Brain,
    technique: 'RAG',
    techniqueBg: 'bg-green-500/20',
    techniqueText: 'text-green-300',
    gradient: 'from-blue-500 to-indigo-600',
    hoverBorder: 'hover:border-blue-500/50',
    hoverShadow: 'hover:shadow-blue-500/10',
    primaryStat: DEMO_METRICS.defect.accuracy,
    primaryLabel: 'matching accuracy',
    secondaryStat: `${DEMO_METRICS.defect.resolutionBefore} → ${DEMO_METRICS.defect.resolutionAfter}`,
    secondaryLabel: 'resolution time',
    description: 'RAG-powered defect matching across 3,247 historical defects with resolution recommendations.',
  },
  {
    id: 'demo-test-management',
    title: 'Test Intelligence',
    icon: TestTube,
    technique: 'ML',
    techniqueBg: 'bg-amber-500/20',
    techniqueText: 'text-amber-300',
    gradient: 'from-purple-500 to-pink-600',
    hoverBorder: 'hover:border-purple-500/50',
    hoverShadow: 'hover:shadow-purple-500/10',
    primaryStat: DEMO_METRICS.test.releaseConfidence,
    primaryLabel: 'release confidence',
    secondaryStat: `${DEMO_METRICS.test.flakyQuarantined} flaky tests quarantined`,
    secondaryLabel: '',
    description: '6 AI capabilities: prioritization, flaky detection, gap analysis, clustering, readiness, triage.',
  },
  {
    id: 'release-intelligence',
    title: 'Release Intelligence',
    icon: Rocket,
    technique: 'ML',
    techniqueBg: 'bg-amber-500/20',
    techniqueText: 'text-amber-300',
    gradient: 'from-teal-500 to-cyan-600',
    hoverBorder: 'hover:border-teal-500/50',
    hoverShadow: 'hover:shadow-teal-500/10',
    primaryStat: String(DEMO_METRICS.release.aiHealthScore),
    primaryLabel: 'AI health score',
    secondaryStat: 'Go / No-Go decisions',
    secondaryLabel: '',
    description: 'Predictive release risk scoring, deployment readiness, and AI-powered go/no-go recommendations.',
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    icon: BookOpen,
    technique: 'LLM',
    techniqueBg: 'bg-blue-500/20',
    techniqueText: 'text-blue-300',
    gradient: 'from-orange-500 to-red-600',
    hoverBorder: 'hover:border-orange-500/50',
    hoverShadow: 'hover:shadow-orange-500/10',
    primaryStat: DEMO_METRICS.knowledge.defectsAnalyzedLabel,
    primaryLabel: 'defects analyzed',
    secondaryStat: `${DEMO_METRICS.knowledge.onboardingReduction} faster onboarding`,
    secondaryLabel: '',
    description: 'Self-building knowledge base that captures tribal knowledge from every defect and incident.',
  },
];

const techBadges = [
  { label: 'ML', icon: BarChart3, bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/20' },
  { label: 'RAG', icon: Database, bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/20' },
  { label: 'LLM', icon: Cpu, bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/20' },
  { label: 'NLP', icon: MessageSquare, bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/20' },
];

export default function DemoLandingPage({ onNavigate }: DemoLandingPageProps) {
  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-120px)] px-6 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          AI-Powered Delivery Intelligence
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Enterprise delivery teams use 8–12 disconnected tools.
          IntelliOps brings AI intelligence to defect resolution,
          test management, release decisions, and knowledge curation —{' '}
          <span className="text-purple-600 dark:text-[#0AEFCF] font-medium">reducing resolution time by 87%</span>.
        </p>
      </motion.div>

      {/* 4 Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.button
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              onClick={() => onNavigate(pillar.id)}
              className={`relative text-left bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 transition-all duration-300 ${pillar.hoverBorder} ${pillar.hoverShadow} hover:shadow-xl hover:-translate-y-1 group`}
            >
              {/* Gradient accent top */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${pillar.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div className="flex items-center gap-3 mb-4 mt-1">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${pillar.gradient}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${pillar.techniqueBg} ${pillar.techniqueText}`}>
                  {pillar.technique}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{pillar.title}</h3>

              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-2xl font-bold text-purple-600 dark:text-[#0AEFCF]">{pillar.primaryStat}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{pillar.primaryLabel}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{pillar.secondaryStat}</div>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{pillar.description}</p>

              <span className="inline-flex items-center text-sm font-medium text-purple-600 dark:text-[#0AEFCF] group-hover:gap-2 transition-all">
                Explore →
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Row: Powered By + Attribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Tech Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-1">Powered by</span>
          {techBadges.map((badge) => {
            const BadgeIcon = badge.icon;
            return (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text} border ${badge.border}`}
              >
                <BadgeIcon className="w-3 h-3" />
                {badge.label}
              </span>
            );
          })}
        </div>

        {/* Attribution */}
        <div className="text-xs text-gray-400 dark:text-gray-500 text-center md:text-right">
          <span>Built by <span className="text-gray-600 dark:text-gray-300 font-medium">Rahuul Pande</span></span>
          <span className="mx-2">·</span>
          <span>19+ years Swiss banking engineering</span>
          <span className="mx-2">·</span>
          <span>GenAIathon 2026</span>
        </div>
      </motion.div>
    </div>
  );
}
