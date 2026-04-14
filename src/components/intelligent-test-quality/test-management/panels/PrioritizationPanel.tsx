'use client';

import { motion } from 'framer-motion';
import { ListOrdered, Loader2, Sparkles } from 'lucide-react';
import type { PrioritizedTest, PrioritizationCoverage } from '@/lib/mock/testManagementIntelligenceData';

interface PrioritizationPanelProps {
  tests: PrioritizedTest[];
  coverage: PrioritizationCoverage;
  insight: string;
  confidence: number;
  loading: boolean;
  onAnalyze: () => void;
}

function riskColor(score: number) {
  if (score >= 80) return 'bg-red-500';
  if (score >= 60) return 'bg-amber-500';
  if (score >= 40) return 'bg-yellow-400';
  return 'bg-green-500';
}

function riskTextColor(score: number) {
  if (score >= 80) return 'text-red-600 dark:text-red-400';
  if (score >= 60) return 'text-amber-600 dark:text-amber-400';
  return 'text-green-600 dark:text-green-400';
}

export default function PrioritizationPanel({ tests, coverage, insight, confidence, loading, onAnalyze }: PrioritizationPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListOrdered className="w-5 h-5 text-purple-500" />
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">Smart Test Prioritization</h4>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">ML</span>
        </div>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Rank tests by failure probability, code change impact, and module risk</p>

      {/* Test List */}
      <div className="space-y-2 flex-1 overflow-auto max-h-72">
        {tests.map((test, i) => (
          <div key={test.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <span className="text-xs font-bold text-gray-400 w-5 text-right">#{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{test.name}</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{test.module}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{test.reason}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${riskColor(test.riskScore)}`} style={{ width: `${test.riskScore}%` }} />
              </div>
              <span className={`text-xs font-bold w-8 text-right ${riskTextColor(test.riskScore)}`}>{test.riskScore}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Coverage Insight */}
      <div className="mt-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-purple-700 dark:text-purple-300 font-medium">Top 20% catch {coverage.top20PercentCatches}% of bugs</span>
          <span className="text-purple-600 dark:text-purple-400 font-bold">⏱ {coverage.estimatedTimeSaved} saved</span>
        </div>
        <p className="text-xs text-purple-600 dark:text-purple-400">{insight}</p>
      </div>

      <div className="mt-2 text-right">
        <span className="text-[10px] text-gray-400">Confidence: {Math.round(confidence * 100)}%</span>
      </div>
    </motion.div>
  );
}
