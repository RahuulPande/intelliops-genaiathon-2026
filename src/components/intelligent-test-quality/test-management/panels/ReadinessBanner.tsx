'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Info, Loader2, Sparkles } from 'lucide-react';
import type { ReleaseReadinessData } from '@/lib/mock/testManagementIntelligenceData';

interface ReadinessBannerProps {
  data: ReleaseReadinessData;
  loading: boolean;
  onAnalyze: () => void;
}

const recommendationStyles = {
  GO: { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500', label: 'GO' },
  CONDITIONAL_GO: { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500', label: 'CONDITIONAL GO' },
  NO_GO: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', label: 'NO GO' },
};

const severityIcons = {
  critical: { icon: AlertTriangle, color: 'text-red-400' },
  warning: { icon: AlertTriangle, color: 'text-amber-400' },
  info: { icon: Info, color: 'text-blue-400' },
};

export default function ReadinessBanner({ data, loading, onAnalyze }: ReadinessBannerProps) {
  const style = recommendationStyles[data.recommendation];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Release Readiness Prediction</h3>
            <p className="text-xs text-gray-500">Predict release confidence from partial test results + history</p>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
            ML
          </span>
        </div>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Recommendation Badge */}
        <div className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${style.border} bg-gray-50 dark:bg-gray-900/50`}>
          <CheckCircle className={`w-8 h-8 ${style.text} mb-2`} />
          <span className={`text-lg font-bold ${style.text}`}>{style.label}</span>
          <span className="text-xs text-gray-500 mt-1">Recommendation</span>
        </div>

        {/* Confidence Gauge */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <div className="relative w-16 h-16 mb-2">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-200 dark:text-gray-700"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${data.confidence * 100}, 100`}
                className={style.text}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">
              {Math.round(data.confidence * 100)}%
            </span>
          </div>
          <span className="text-xs text-gray-500">Confidence</span>
        </div>

        {/* Test Completion */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{data.completionPercentage}%</span>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div className={`h-2 rounded-full ${style.bg}`} style={{ width: `${data.completionPercentage}%` }} />
          </div>
          <span className="text-xs text-gray-500 mt-1">Test Completion</span>
        </div>

        {/* Historical */}
        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{data.historicalSuccessRate}%</span>
          <span className="text-xs text-gray-500 mt-1">Historical Success</span>
          <span className="text-[10px] text-gray-400">{data.historicalSampleSize} releases</span>
        </div>
      </div>

      {/* Remaining Risks */}
      <div className="mt-4 space-y-2">
        {data.remainingRisks.map((risk, i) => {
          const sev = severityIcons[risk.severity];
          const SevIcon = sev.icon;
          return (
            <div key={i} className="flex items-center gap-3 text-sm">
              <SevIcon className={`w-4 h-4 flex-shrink-0 ${sev.color}`} />
              <span className="font-medium text-gray-700 dark:text-gray-300">{risk.module}:</span>
              <span className="text-gray-600 dark:text-gray-400">{risk.risk}</span>
            </div>
          );
        })}
      </div>

      {/* Recommendation Text */}
      <div className="mt-4 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
        <p className="text-sm text-purple-800 dark:text-purple-200">{data.recommendationText}</p>
      </div>
    </motion.div>
  );
}
