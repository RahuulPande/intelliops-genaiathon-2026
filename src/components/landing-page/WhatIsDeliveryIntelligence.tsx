'use client';

import { motion } from 'framer-motion';
import { Brain, Package, BookOpen, Sparkles, CheckCircle, Zap } from 'lucide-react';

const pillars = [
  {
    icon: Brain,
    title: 'Test & Quality Intelligence',
    description: 'Improve quality and reduce defects through AI-powered defect pattern matching, redundancy detection, and coverage gap analysis.',
    gradient: 'from-purple-600 to-indigo-700',
    badge: 'RAG + NLP',
  },
  {
    icon: Package,
    title: 'Release Intelligence',
    description: 'Predict and optimize releases with ML-driven risk scoring, deployment readiness assessment, and rollback decision support.',

    gradient: 'from-blue-600 to-cyan-700',
    badge: 'ML + AI',
  },
  {
    icon: BookOpen,
    title: 'Application Knowledge Base',
    description: 'Capture and reuse knowledge through AI-curated runbooks, onboarding paths, and semantic search across historical data.',
    gradient: 'from-green-600 to-emerald-700',
    badge: 'LLM + RAG',
  },
];

export default function WhatIsDeliveryIntelligence() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="what-is-delivery-intelligence">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">The Concept</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What is Delivery Intelligence?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Delivery Intelligence applies AI, ML, and RAG across the software delivery lifecycle to
            transform how banking teams ship software — faster, smarter, and safer.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Card Header Gradient */}
                <div className={`bg-gradient-to-r ${pillar.gradient} p-5 flex items-center justify-between`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                  </div>
                  <span className="text-xs font-bold bg-white/20 text-white px-2 py-1 rounded-full">
                    {pillar.badge}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Result Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-center"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-300" />
            <h3 className="text-2xl font-bold text-white">The Result</h3>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Faster, smarter, and safer software delivery — powered by AI that learns from your team&apos;s
            historical data to provide actionable intelligence at every stage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Faster defect resolution</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Smarter release decisions</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm">Safer deployments</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
