'use client';

import { motion } from 'framer-motion';
import { Route, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import type { SmartFailureTriageData } from '@/lib/mock/testManagementIntelligenceData';

interface TriagePanelProps {
  data: SmartFailureTriageData;
  loading: boolean;
  onAnalyze: () => void;
}

function similarityColor(score: number) {
  if (score >= 85) return 'text-green-600 dark:text-green-400';
  if (score >= 70) return 'text-amber-600 dark:text-amber-400';
  return 'text-gray-600 dark:text-gray-400';
}

export default function TriagePanel({ data, loading, onAnalyze }: TriagePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Route className="w-5 h-5 text-purple-500" />
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">Smart Failure Triage</h4>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">LLM</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">RAG</span>
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

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Match failures to known defects, suggest fix, route to team</p>

      {/* Failed Test Info */}
      <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-red-800 dark:text-red-200">{data.failedTest}</span>
          <span className="text-[10px] text-red-600 dark:text-red-400">{data.module}</span>
        </div>
        <p className="text-xs text-red-700 dark:text-red-300 font-mono">{data.error}</p>
      </div>

      {/* Similar Defects */}
      <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Similar Resolved Defects</h5>
      <div className="space-y-2 flex-1 overflow-auto max-h-40">
        {data.similarDefects.map((defect) => (
          <div key={defect.id} className="flex items-start gap-3 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col items-center flex-shrink-0">
              <span className={`text-lg font-bold ${similarityColor(defect.similarity)}`}>{defect.similarity}%</span>
              <span className="text-[10px] text-gray-400">match</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  {defect.id} <ExternalLink className="w-3 h-3" />
                </span>
                <span className="text-[10px] text-gray-400">{defect.resolvedDate}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{defect.resolution}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Action */}
      <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <h5 className="text-xs font-semibold text-blue-800 dark:text-blue-200 mb-1">Suggested Action</h5>
        <p className="text-xs text-blue-700 dark:text-blue-300">{data.suggestedAction}</p>
      </div>

      {/* Route To */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Route to: <span className="font-medium text-purple-600 dark:text-purple-400">{data.routeTo}</span>
        </span>
        <span className="text-[10px] text-gray-400">Confidence: {Math.round(data.confidence * 100)}%</span>
      </div>
    </motion.div>
  );
}
