'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface LayerData {
  id: string;
  label: string;
  name: string;
  color: string;
  capabilities: string[];
  metric: string;
}

const layers: LayerData[] = [
  {
    id: 'plan',
    label: 'L0 PLAN',
    name: 'Requirement Intelligence',
    color: '#14B8A6',
    capabilities: [
      'Requirement gap detection with NLP-based parsing',
      'Acceptance criteria quality scoring',
      'AI-powered test case generation from requirements',
    ],
    metric: 'Catch 47% more conflicts before sprint planning',
  },
  {
    id: 'build',
    label: 'L1 BUILD',
    name: 'Change Intelligence',
    color: '#6366F1',
    capabilities: [
      'PR risk scoring with multi-signal analysis',
      'Security vulnerability detection in code changes',
      'Requirement traceability for every commit',
    ],
    metric: 'Every PR traced to its originating requirement',
  },
  {
    id: 'test',
    label: 'L2 TEST',
    name: 'Test Intelligence',
    color: '#A855F7',
    capabilities: [
      'Test suite analysis and optimization',
      'Defect pattern matching across 6 months of history',
      'Coverage gap detection with AI recommendations',
    ],
    metric: 'AI identifies recurring defect patterns across 6 months',
  },
  {
    id: 'release',
    label: 'L3 RELEASE',
    name: 'Release Intelligence',
    color: '#F43F5E',
    capabilities: [
      'DORA metrics dashboard with trend analysis',
      'Deployment risk scoring using ML models',
      'CAB package generation with full audit trail',
    ],
    metric: 'Generate CAB packages in 30 seconds',
  },
  {
    id: 'operate',
    label: 'L4 OPERATE',
    name: 'Operations Intelligence',
    color: '#3B82F6',
    capabilities: [
      'Incident root cause analysis with LLM reasoning',
      'Cross-system evidence chains (PRs, logs, Slack)',
      'Predictive failure signals from production telemetry',
    ],
    metric: '2.3s root cause analysis with cross-system evidence',
  },
  {
    id: 'learn',
    label: 'L5 LEARN',
    name: 'Learning Intelligence',
    color: '#10B981',
    capabilities: [
      'Automated feedback loops from production to planning',
      'Institutional knowledge base that grows with every incident',
      'AI usage audit trail for EU AI Act compliance',
    ],
    metric: 'Full AI audit trail for EU AI Act compliance',
  },
];

function LayerContent({ layer }: { layer: LayerData }) {
  return (
    <div className="py-8">
      <p
        className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-6"
        style={{ color: layer.color }}
      >
        {layer.name}
      </p>
      <div className="flex flex-col gap-4 mb-8">
        {layer.capabilities.map((cap) => (
          <div key={cap} className="flex items-start gap-3">
            <span
              className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full"
              style={{ backgroundColor: layer.color }}
            />
            <p className="font-[family-name:var(--font-body)] text-[#CBD5E1] text-base leading-relaxed">
              {cap}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white/5 border border-white/5 rounded-lg px-6 py-4 inline-block">
        <p className="font-[family-name:var(--font-mono-jb)] text-sm" style={{ color: layer.color }}>
          {layer.metric}
        </p>
      </div>
    </div>
  );
}

export default function SixLayers() {
  const [activeTab, setActiveTab] = useState('plan');
  const [mobileOpen, setMobileOpen] = useState<string | null>('plan');

  const activeLayer = layers.find((l) => l.id === activeTab) ?? layers[0];

  return (
    <section id="capabilities" className="bg-[#0A0E1A] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-white mb-4">
              Six Layers of Intelligence
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[#94A3B8] text-lg max-w-2xl mx-auto">
              A unified intelligence layer that spans your entire software
              delivery lifecycle — from planning through production and back.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop tabs */}
        <div className="hidden md:block">
          <div className="flex items-center border-b border-white/10 mb-2">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveTab(layer.id)}
                className="flex-1 text-center pb-3 text-sm font-medium transition-colors relative"
                style={{
                  color: activeTab === layer.id ? layer.color : '#94A3B8',
                }}
              >
                <span className="font-[family-name:var(--font-mono-jb)] text-xs block mb-1">
                  {layer.label}
                </span>
                {activeTab === layer.id && (
                  <motion.div
                    layoutId="activeLayerTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: layer.color }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <LayerContent layer={activeLayer} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col gap-2">
          {layers.map((layer) => {
            const isOpen = mobileOpen === layer.id;
            return (
              <div key={layer.id} className="border border-white/5 rounded-lg overflow-hidden">
                <button
                  onClick={() => setMobileOpen(isOpen ? null : layer.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                  style={{ color: isOpen ? layer.color : '#94A3B8' }}
                >
                  <span className="font-[family-name:var(--font-mono-jb)] text-sm">
                    {layer.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden px-4"
                    >
                      <LayerContent layer={layer} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
