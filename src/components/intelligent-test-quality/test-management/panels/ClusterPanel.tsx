'use client';

import { motion } from 'framer-motion';
import { GitBranch, Loader2, Sparkles } from 'lucide-react';
import type { FailureCluster } from '@/lib/mock/testManagementIntelligenceData';

interface ClusterPanelProps {
  clusters: FailureCluster[];
  totalFailures: number;
  uniqueRootCauses: number;
  insight: string;
  confidence: number;
  loading: boolean;
  onAnalyze: () => void;
}

export default function ClusterPanel({ clusters, totalFailures, uniqueRootCauses, insight, confidence, loading, onAnalyze }: ClusterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-500" />
          <h4 className="text-base font-semibold text-gray-900 dark:text-white">Failure Root Cause Clustering</h4>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">ML</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">NLP</span>
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

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Group failures by shared root cause, not test name</p>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalFailures}</span>
          <p className="text-xs text-gray-500">Total Failures</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{uniqueRootCauses}</span>
          <p className="text-xs text-gray-500">Root Causes</p>
        </div>
      </div>

      {/* Cluster Cards */}
      <div className="space-y-3 flex-1 overflow-auto max-h-56">
        {clusters.map((cluster, i) => (
          <div key={i} className="p-3 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Cluster {i + 1} — {cluster.failureCount} failures
              </span>
              <span className="text-xs text-gray-500">{cluster.affectedSuites} suite{cluster.affectedSuites !== 1 ? 's' : ''}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">{cluster.rootCause}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {cluster.affectedModules.map((mod) => (
                <span key={mod} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {mod}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span className="font-medium">Deployment:</span> {cluster.relatedDeployment}
            </div>
            <div className="p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-xs text-green-700 dark:text-green-300"><span className="font-medium">Fix:</span> {cluster.suggestedFix}</p>
            </div>
          </div>
        ))}
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
