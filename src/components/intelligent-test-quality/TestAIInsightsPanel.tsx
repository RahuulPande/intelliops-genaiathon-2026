'use client';

import { motion } from 'framer-motion';
import {
  Brain, AlertTriangle, BarChart3, Shield, TrendingUp, CheckCircle,
  Clock, Sparkles, Zap
} from 'lucide-react';
import { generateTestInsights, type AIInsightItem } from '@/services/aiService';

const iconMap: Record<string, React.ComponentType<any>> = {
  AlertTriangle, BarChart: BarChart3, Shield, TrendingUp, CheckCircle, Clock, Brain, Zap,
};

const insightTypeStyles: Record<string, { border: string; bg: string; iconColor: string }> = {
  critical: { border: 'border-red-300 dark:border-red-800', bg: 'bg-red-50 dark:bg-red-900/20', iconColor: 'text-red-500' },
  warning: { border: 'border-yellow-300 dark:border-yellow-800', bg: 'bg-yellow-50 dark:bg-yellow-900/20', iconColor: 'text-yellow-500' },
  info: { border: 'border-blue-300 dark:border-blue-800', bg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-500' },
  success: { border: 'border-green-300 dark:border-green-800', bg: 'bg-green-50 dark:bg-green-900/20', iconColor: 'text-green-500' },
};

export default function TestAIInsightsPanel() {
  const insights = generateTestInsights();

  const criticalCount = insights.filter(i => i.type === 'critical').length;
  const warningCount = insights.filter(i => i.type === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Brain className="w-7 h-7" />
          <h2 className="text-2xl font-bold">AI Test Insights</h2>
          <span className="ml-auto text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
            Powered by ML + RAG + NLP
          </span>
        </div>
        <p className="text-purple-100">
          AI-generated insights analyzing test suite effectiveness, coverage gaps, and optimization opportunities.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{insights.length}</div>
            <div className="text-xs text-purple-200">Total Insights</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-300">{criticalCount}</div>
            <div className="text-xs text-purple-200">Critical</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-300">{warningCount}</div>
            <div className="text-xs text-purple-200">Warnings</div>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const style = insightTypeStyles[insight.type] || insightTypeStyles.info;
          const IconComp = iconMap[insight.icon] || AlertTriangle;

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className={`border ${style.border} ${style.bg} rounded-xl p-5 transition-all hover:shadow-md`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`p-2 rounded-lg ${style.bg}`}>
                    <IconComp className={`w-5 h-5 ${style.iconColor}`} />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{insight.text}</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <span className="inline-flex items-center space-x-1 text-xs font-bold bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      <span>{insight.source}</span>
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Confidence: {(insight.confidence * 100).toFixed(0)}%
                    </span>
                    <span className={`text-xs font-medium capitalize px-2 py-0.5 rounded-full ${
                      insight.type === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      insight.type === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      insight.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {insight.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
