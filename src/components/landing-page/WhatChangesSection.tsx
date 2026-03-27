'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock, Zap, Users, Brain, Sparkles } from 'lucide-react';

const outcomes = [
  {
    before: 'Hours-long defect triage with manual JIRA searches',
    after: '60–70% faster triage with RAG-based defect matching',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
  },
  {
    before: 'Manual release go/no-go based on gut feeling',
    after: '50% less release coordination with ML risk scoring',
    icon: Zap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
  },
  {
    before: 'Months for new joiners to become productive',
    after: '40% faster onboarding via AI-curated knowledge paths',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
  },
  {
    before: 'Critical tribal knowledge locked in senior engineers',
    after: 'Institutional knowledge codified and searchable via RAG',
    icon: Brain,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-700',
  },
];

export default function WhatChangesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800" id="what-changes">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-700 dark:text-indigo-300 text-sm font-medium">Before &amp; After</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Changes with IntelliOps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Concrete delivery workflow improvements that teams experience within weeks of adoption.
          </p>
        </motion.div>

        {/* Before → After Cards */}
        <div className="space-y-5">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] gap-4 items-stretch"
              >
                {/* Before */}
                <div className="flex items-center space-x-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
                  <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{outcome.before}</span>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex md:hidden items-center justify-center py-1">
                  <ArrowRight className="w-5 h-5 text-gray-400 rotate-90" />
                </div>

                {/* After */}
                <div className={`flex items-center space-x-4 ${outcome.bgColor} border ${outcome.borderColor} rounded-xl p-5`}>
                  <div className={`p-2 ${outcome.bgColor} rounded-lg flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${outcome.color}`} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{outcome.after}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
