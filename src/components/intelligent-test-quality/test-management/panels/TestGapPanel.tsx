'use client';

import { motion } from 'framer-motion';
import { FileSearch, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import type { TestGap } from '@/lib/mock/testManagementIntelligenceData';

interface TestGapPanelProps {
  gaps: TestGap[];
  overallCoverage: number;
  targetCoverage: number;
  insight: string;
  confidence: number;
  loading: boolean;
  onAnalyze: () => void;
}

const riskBadge = {
  HIGH: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
  MEDIUM: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  LOW: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
};

export default function TestGapPanel({ gaps, overallCoverage, targetCoverage, insight, confidence, loading, onAnalyze }: TestGapPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-purple-500" />
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">Test Gap Analysis</h4>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">RAG</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">LLM</span>
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

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Compare requirements vs test coverage, surface untested paths</p>

      {/* Coverage Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-600 dark:text-gray-400">Overall Coverage</span>
          <span className="font-bold text-gray-900 dark:text-white">{overallCoverage}% / {targetCoverage}% target</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative">
          <div className="h-2 rounded-full bg-purple-500" style={{ width: `${overallCoverage}%` }} />
          <div className="absolute top-0 h-2 w-0.5 bg-gray-900 dark:bg-white" style={{ left: `${targetCoverage}%` }} />
        </div>
      </div>

      {/* Gap List */}
      <div className="space-y-3 flex-1 overflow-auto max-h-64">
        {gaps.map((gap) => {
          const badge = riskBadge[gap.risk];
          return (
            <div key={gap.requirement} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{gap.requirement}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.text}`}>
                  {gap.risk}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-12 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${gap.currentCoverage === 0 ? 'bg-red-500' : gap.currentCoverage < 50 ? 'bg-amber-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.max(gap.currentCoverage, 2)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{gap.currentCoverage}%</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <AlertTriangle className="w-3 h-3" />
                  {gap.defectHistory} defects
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{gap.details}</p>
            </div>
          );
        })}
      </div>

      {/* Insight */}
      <div className="mt-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
        <p className="text-xs text-purple-600 dark:text-purple-400">{insight}</p>
      </div>

      <div className="mt-2 text-right">
        <span className="text-[10px] text-gray-400">Confidence: {Math.round(confidence * 100)}%</span>
      </div>
    </motion.div>
  );
}
