'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Loader2, Sparkles, ShieldAlert, Search, Wrench } from 'lucide-react';
import type { FlakyTest } from '@/lib/mock/testManagementIntelligenceData';

interface FlakyTestPanelProps {
  tests: FlakyTest[];
  totalQuarantined: number;
  timeSaved: string;
  impact: string;
  confidence: number;
  loading: boolean;
  onAnalyze: () => void;
}

const recBadge = {
  quarantine: { icon: ShieldAlert, bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Quarantine' },
  investigate: { icon: Search, bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Investigate' },
  fix: { icon: Wrench, bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Fix' },
};

export default function FlakyTestPanel({ tests, totalQuarantined, timeSaved, impact, confidence, loading, onAnalyze }: FlakyTestPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-purple-500" />
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">Flaky Test Detection</h4>
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

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Identify inconsistent pass/fail patterns and environment sensitivity</p>

      {/* Flaky Test List */}
      <div className="space-y-3 flex-1 overflow-auto max-h-72">
        {tests.map((test) => {
          const rec = recBadge[test.recommendation];
          const RecIcon = rec.icon;
          return (
            <div key={test.name} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{test.name}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${rec.bg} ${rec.text}`}>
                  <RecIcon className="w-3 h-3" />
                  {rec.label}
                </span>
              </div>
              {/* Run History */}
              <div className="flex items-center gap-0.5 mb-1.5">
                {test.runHistory.split('').map((ch, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-sm text-[8px] flex items-center justify-center font-bold ${
                      ch === '✓' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}
                  >
                    {ch}
                  </span>
                ))}
                <span className="ml-2 text-xs font-bold text-gray-600 dark:text-gray-400">{test.flakinessScore}%</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{test.rootCause}</p>
            </div>
          );
        })}
      </div>

      {/* Impact */}
      <div className="mt-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-purple-700 dark:text-purple-300 font-medium">{totalQuarantined} tests quarantined</span>
          <span className="text-purple-600 dark:text-purple-400 font-bold">⏱ {timeSaved}</span>
        </div>
        <p className="text-xs text-purple-600 dark:text-purple-400">{impact}</p>
      </div>

      <div className="mt-2 text-right">
        <span className="text-[10px] text-gray-400">Confidence: {Math.round(confidence * 100)}%</span>
      </div>
    </motion.div>
  );
}
