'use client';

import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Bug,
  GitBranch,
  FileSearch,
  BookOpen,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';

interface ProblemSolutionPair {
  problem: string;
  solution: string;
  problemIcon: React.ComponentType<any>;
  solutionIcon: React.ComponentType<any>;
}

interface IntelligenceLayer {
  id: string;
  layerNumber: number;
  title: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  lightBg: string;
  problemBg: string;
  pairs: ProblemSolutionPair[];
}

const layers: IntelligenceLayer[] = [
  {
    id: 'delivery',
    layerNumber: 1,
    title: 'Delivery Intelligence',
    gradient: 'from-purple-600 to-indigo-700',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/40',
    badgeText: 'text-purple-700 dark:text-purple-300',
    borderColor: 'border-purple-300 dark:border-purple-700',
    lightBg: 'bg-purple-50 dark:bg-purple-900/20',
    problemBg: 'bg-red-50 dark:bg-red-900/20',
    pairs: [
      {
        problem: 'Defect triage meetings consume hours with no pattern visibility',
        solution: 'AI defect pattern matching across historical defects',
        problemIcon: Bug,
        solutionIcon: Brain,
      },
      {
        problem: 'Release go/no-go calls rely on manual data gathering',
        solution: 'Release readiness scoring using delivery data',
        problemIcon: GitBranch,
        solutionIcon: Target,
      },
      {
        problem: 'Test re-execution tracking after fixes is manual',
        solution: 'Automated test impact analysis and re-run tracking',
        problemIcon: FileSearch,
        solutionIcon: Zap,
      },
      {
        problem: 'Historical defects contain valuable knowledge but remain unused',
        solution: 'Knowledge base auto-generated from defect history',
        problemIcon: BookOpen,
        solutionIcon: Sparkles,
      },
    ],
  },
];

export default function ProblemStatement() {
  return (
    <section id="problem-statement" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-red-50 dark:bg-red-900/30 px-4 py-2 rounded-full mb-6">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">The Core Challenge</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The Delivery Intelligence Gap
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Banking delivery teams manage defects, releases, and knowledge across JIRA, TestRail, Confluence and more.
            Data exists in every tool — but actionable intelligence is missing.
          </p>
        </motion.div>

        {/* Column Headers — desktop only */}
        <div className="hidden md:grid md:grid-cols-[1fr_40px_1fr] gap-4 mb-6 px-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Current Reality</span>
          </div>
          <div />
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-green-500" />
            <span className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">IntelliOps AI Intelligence</span>
          </div>
        </div>

        {/* Layer Groups */}
        <div className="space-y-10">
          {layers.map((layer, layerIndex) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: layerIndex * 0.1 }}
            >
              {/* Layer Group Header */}
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${layer.gradient} text-white text-sm font-bold`}>
                  L{layer.layerNumber}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{layer.title}</h3>
              </div>

              {/* Problem → Solution Rows */}
              <div className="space-y-3">
                {layer.pairs.map((pair, pairIndex) => {
                  const ProblemIcon = pair.problemIcon;
                  const SolutionIcon = pair.solutionIcon;

                  return (
                    <motion.div
                      key={pairIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: layerIndex * 0.05 + pairIndex * 0.06 }}
                      className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-3 md:gap-4 items-stretch"
                    >
                      {/* Problem Card */}
                      <div className={`flex items-start space-x-3 p-4 rounded-xl border border-red-200 dark:border-red-800 ${layer.problemBg}`}>
                        <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg flex-shrink-0">
                          <ProblemIcon className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{pair.problem}</span>
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div className="flex md:hidden items-center justify-center py-1">
                        <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                      </div>

                      {/* Solution Card */}
                      <div className={`flex items-start space-x-3 p-4 rounded-xl border ${layer.borderColor} ${layer.lightBg}`}>
                        <div className={`p-2 ${layer.badgeBg} rounded-lg flex-shrink-0`}>
                          <SolutionIcon className={`w-4 h-4 ${layer.badgeText}`} />
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{pair.solution}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
