'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles,
  Layers,
  Settings,
  Clock,
  Zap,
} from 'lucide-react';

interface FeatureAboutProps {
  pillarName: string;
  pillarColor: string;
  overview: string;
  aiTechniques: { name: string; description: string }[];
  capabilities: {
    name: string;
    howItWorks: string;
    prerequisites: string;
    realWorldUsage: string;
    expectedBenefits: string;
  }[];
  integrationRequirements: string[];
  setupTime: string;
  prototypeStatus: string;
  differentiators: string;
}

const techniqueBadgeColors: Record<string, string> = {
  ML: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  RAG: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  NLP: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  LLM: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
};

function getTechniqueColor(name: string): string {
  const upper = name.toUpperCase();
  for (const key of Object.keys(techniqueBadgeColors)) {
    if (upper.includes(key)) {
      return techniqueBadgeColors[key];
    }
  }
  return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
}

function SectionHeader({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
    </div>
  );
}

function CapabilityCard({
  capability,
  isExpanded,
  onToggle,
}: {
  capability: FeatureAboutProps['capabilities'][number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <span className="text-base font-semibold text-gray-900 dark:text-white">
          {capability.name}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pt-2 pb-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <DetailBlock label="How it works" content={capability.howItWorks} />
              <DetailBlock label="Prerequisites" content={capability.prerequisites} />
              <DetailBlock label="Real-world usage" content={capability.realWorldUsage} />
              <DetailBlock label="Expected benefits" content={capability.expectedBenefits} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailBlock({ label, content }: { label: string; content: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
        {label}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{content}</p>
    </div>
  );
}

export default function FeatureAboutTab({
  pillarName,
  overview,
  aiTechniques,
  capabilities,
  integrationRequirements,
  setupTime,
  prototypeStatus,
  differentiators,
}: FeatureAboutProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="px-6 py-4 md:px-8 md:py-6 space-y-8">
      {/* Overview */}
      <section>
        <SectionHeader title="Overview" icon={Layers} />
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed px-2">{overview}</p>

        {aiTechniques.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {aiTechniques.map((tech) => (
              <span
                key={tech.name}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getTechniqueColor(tech.name)}`}
                title={tech.description}
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}

        {aiTechniques.length > 0 && (
          <div className="mt-3 flex flex-col gap-1.5 pl-2">
            {aiTechniques.map((tech) => (
              <p key={tech.name} className="text-xs text-gray-500 dark:text-gray-500">
                <span className="font-medium text-gray-700 dark:text-gray-300">{tech.name}:</span>{' '}
                {tech.description}
              </p>
            ))}
          </div>
        )}
      </section>

      {/* Capabilities */}
      <section>
        <SectionHeader title="Capabilities" icon={Sparkles} />
        <div className="space-y-3">
          {capabilities.map((cap, index) => (
            <CapabilityCard
              key={cap.name}
              capability={cap}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </section>

      {/* Integration Requirements */}
      <section>
        <SectionHeader title="Integration Requirements" icon={Settings} />
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <ul className="space-y-2">
            {integrationRequirements.map((req, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated setup time: {setupTime}</span>
          </div>
        </div>
      </section>

      {/* Prototype Status */}
      <section>
        <SectionHeader title="Prototype Status" icon={Info} />
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              {prototypeStatus}
            </p>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section>
        <SectionHeader title="Differentiators" icon={Zap} />
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {differentiators}
          </p>
        </div>
      </section>
    </div>
  );
}
