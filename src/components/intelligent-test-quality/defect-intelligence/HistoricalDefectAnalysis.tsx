'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BarChart3,
  Calendar,
  Target,
  RefreshCw,
  Layers,
  Bug,
  Clock,
  ArrowRight,
  Brain,
  Shield,
  Zap
} from 'lucide-react';

// Mock defect trend data
const monthlyDefectTrends = [
  { month: 'Oct 2025', total: 142, critical: 18, high: 35, medium: 52, low: 37, resolved: 128, mttr: 4.2 },
  { month: 'Nov 2025', total: 156, critical: 22, high: 41, medium: 55, low: 38, resolved: 139, mttr: 3.8 },
  { month: 'Dec 2025', total: 131, critical: 15, high: 30, medium: 48, low: 38, resolved: 125, mttr: 3.5 },
  { month: 'Jan 2026', total: 168, critical: 25, high: 44, medium: 59, low: 40, resolved: 152, mttr: 3.9 },
  { month: 'Feb 2026', total: 147, critical: 19, high: 38, medium: 53, low: 37, resolved: 141, mttr: 3.3 },
  { month: 'Mar 2026', total: 89, critical: 12, high: 22, medium: 33, low: 22, resolved: 78, mttr: 2.9 },
];

const recurringDefects = [
  {
    id: 'RD-001',
    title: 'Payment Gateway Timeout on Peak Load',
    module: 'Payment Gateway',
    occurrences: 23,
    lastSeen: '2 days ago',
    trend: 'increasing',
    severity: 'Critical',
    regressionRisk: 82,
    rootCause: 'Connection pool exhaustion under concurrent requests > 500/s',
    suggestedFix: 'Implement dynamic connection pool scaling with circuit breaker pattern'
  },
  {
    id: 'RD-002',
    title: 'User Session Invalidation During Token Refresh',
    module: 'Authentication',
    occurrences: 18,
    lastSeen: '5 days ago',
    trend: 'stable',
    severity: 'High',
    regressionRisk: 65,
    rootCause: 'Race condition between token refresh and session validation middleware',
    suggestedFix: 'Implement token refresh queue with optimistic session extension'
  },
  {
    id: 'RD-003',
    title: 'Transaction Reconciliation Mismatch in Batch Processing',
    module: 'Transaction Processing',
    occurrences: 15,
    lastSeen: '1 day ago',
    trend: 'increasing',
    severity: 'Critical',
    regressionRisk: 78,
    rootCause: 'Decimal precision loss during currency conversion in batch aggregation',
    suggestedFix: 'Migrate to BigDecimal with 8-digit precision for all monetary calculations'
  },
  {
    id: 'RD-004',
    title: 'Report Generation OOM for Large Date Ranges',
    module: 'Reporting Engine',
    occurrences: 12,
    lastSeen: '3 days ago',
    trend: 'decreasing',
    severity: 'High',
    regressionRisk: 45,
    rootCause: 'Unbounded data loading without pagination for reports > 100K rows',
    suggestedFix: 'Implement streaming report generation with chunked data processing'
  },
  {
    id: 'RD-005',
    title: 'LDAP Sync Failure on Special Characters in DN',
    module: 'User Management',
    occurrences: 9,
    lastSeen: '1 week ago',
    trend: 'stable',
    severity: 'Medium',
    regressionRisk: 35,
    rootCause: 'Missing DN escaping for commas and plus signs in user attributes',
    suggestedFix: 'Apply RFC 2253 DN escaping in LDAP sync adapter'
  }
];

const moduleDistribution = [
  { module: 'Payment Gateway', defects: 187, percentage: 22, risk: 'High', trend: 'up', color: 'bg-red-500' },
  { module: 'Authentication', defects: 156, percentage: 18, risk: 'High', trend: 'stable', color: 'bg-orange-500' },
  { module: 'Transaction Processing', defects: 134, percentage: 16, risk: 'Critical', trend: 'up', color: 'bg-red-600' },
  { module: 'Reporting Engine', defects: 98, percentage: 12, risk: 'Medium', trend: 'down', color: 'bg-yellow-500' },
  { module: 'User Management', defects: 76, percentage: 9, risk: 'Low', trend: 'down', color: 'bg-green-500' },
  { module: 'API Gateway', defects: 68, percentage: 8, risk: 'Medium', trend: 'stable', color: 'bg-blue-500' },
  { module: 'Notification Service', defects: 52, percentage: 6, risk: 'Low', trend: 'down', color: 'bg-indigo-500' },
  { module: 'Audit & Compliance', defects: 42, percentage: 5, risk: 'Low', trend: 'stable', color: 'bg-purple-500' },
  { module: 'Other Modules', defects: 34, percentage: 4, risk: 'Low', trend: 'stable', color: 'bg-gray-400' },
];

const predictiveInsights = [
  {
    module: 'Payment Gateway',
    prediction: 'Payment module shows 68% regression risk in next sprint',
    confidence: 92,
    basis: 'Based on 23 recurring defects and increasing trend over last 3 sprints',
    recommendation: 'Prioritize payment gateway load testing and connection pool optimization',
    severity: 'critical',
    timeframe: 'Next 2 weeks'
  },
  {
    module: 'Transaction Processing',
    prediction: 'Transaction reconciliation failures likely to increase by 40% during month-end',
    confidence: 87,
    basis: 'Historical pattern: batch volume increases 3x during month-end, precision errors scale linearly',
    recommendation: 'Deploy BigDecimal migration before March 31 batch cycle',
    severity: 'high',
    timeframe: 'Next 10 days'
  },
  {
    module: 'Authentication',
    prediction: 'Session management defects stable but token refresh issues may spike after OAuth provider update',
    confidence: 74,
    basis: 'Scheduled OAuth2 provider migration on March 25 affects token refresh flow',
    recommendation: 'Add comprehensive integration tests for token lifecycle before migration',
    severity: 'medium',
    timeframe: 'March 25-30'
  },
  {
    module: 'Reporting Engine',
    prediction: 'OOM defects trending down, 85% likely to meet quality gate by April',
    confidence: 85,
    basis: 'Streaming implementation reducing memory footprint; 3 of 5 report types already migrated',
    recommendation: 'Continue migration for remaining 2 report types to fully resolve',
    severity: 'improving',
    timeframe: 'By April 15'
  }
];

export default function HistoricalDefectAnalysis() {
  const [selectedView, setSelectedView] = useState<'trends' | 'recurring' | 'distribution' | 'predictions'>('trends');

  const maxDefects = Math.max(...monthlyDefectTrends.map(d => d.total));

  return (
    <div className="p-6 space-y-6">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <TrendingUp className="w-7 h-7" />
          <div>
            <h2 className="text-2xl font-bold">Historical Defect Analysis & Predictions</h2>
            <p className="text-indigo-200">Data-driven defect trend analysis with ML-powered regression predictions</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">833</div>
            <div className="text-xs text-indigo-200">Total Defects (6 months)</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">763</div>
            <div className="text-xs text-indigo-200">Resolved</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">3.3 hrs</div>
            <div className="text-xs text-indigo-200">Current MTTR</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">91.6%</div>
            <div className="text-xs text-indigo-200">Resolution Rate</div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'trends', label: 'Defect Trends', icon: BarChart3 },
          { id: 'recurring', label: 'Recurring Defects', icon: RefreshCw },
          { id: 'distribution', label: 'Module Distribution', icon: Layers },
          { id: 'predictions', label: 'ML Predictions', icon: Brain },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id as typeof selectedView)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedView === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-[#242424] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2A2A2A]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Trends View */}
      {selectedView === 'trends' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Monthly Defect Trend (Last 6 Months)</span>
            </h3>

            <div className="space-y-4">
              {monthlyDefectTrends.map((month, index) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300 w-24">{month.month}</span>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="text-red-600 font-medium">Critical: {month.critical}</span>
                      <span className="text-orange-600 font-medium">High: {month.high}</span>
                      <span className="text-yellow-600 font-medium">Medium: {month.medium}</span>
                      <span className="text-green-600 font-medium">Low: {month.low}</span>
                      <span className="text-gray-500 dark:text-gray-400">MTTR: {month.mttr}h</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 dark:bg-[#242424] rounded-full h-6 overflow-hidden flex">
                      <div className="bg-red-500 h-full" style={{ width: `${(month.critical / month.total) * 100}%` }} />
                      <div className="bg-orange-500 h-full" style={{ width: `${(month.high / month.total) * 100}%` }} />
                      <div className="bg-yellow-400 h-full" style={{ width: `${(month.medium / month.total) * 100}%` }} />
                      <div className="bg-green-400 h-full" style={{ width: `${(month.low / month.total) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-10 text-right">{month.total}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex-1 bg-gray-50 dark:bg-[#141414] rounded-full h-2">
                      <div className="bg-green-500 rounded-full h-2" style={{ width: `${(month.resolved / month.total) * 100}%` }} />
                    </div>
                    <span>{month.resolved}/{month.total} resolved</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
              <div className="flex items-start space-x-2">
                <TrendingDown className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Positive Trend Detected</p>
                  <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                    MTTR has decreased from 4.2h to 2.9h over 6 months (31% improvement). Critical defect ratio
                    has dropped from 12.7% to 13.5%, but absolute counts are declining as the AI matching system
                    identifies root causes faster.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recurring Defects View */}
      {selectedView === 'recurring' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <RefreshCw className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-900 dark:text-amber-100">Recurring Defect Detection</h3>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-200">
              AI has identified {recurringDefects.length} recurring defect patterns across modules.
              Recurring defects account for 37% of total defect volume.
            </p>
          </div>

          {recurringDefects.map((defect, index) => (
            <motion.div
              key={defect.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md dark:hover:shadow-none transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-mono text-gray-500 dark:text-gray-400">{defect.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      defect.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      defect.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {defect.severity}
                    </span>
                    <span className={`flex items-center space-x-1 text-xs ${
                      defect.trend === 'increasing' ? 'text-red-600' :
                      defect.trend === 'decreasing' ? 'text-green-600' :
                      'text-gray-500'
                    }`}>
                      {defect.trend === 'increasing' && <TrendingUp className="w-3 h-3" />}
                      {defect.trend === 'decreasing' && <TrendingDown className="w-3 h-3" />}
                      <span className="capitalize">{defect.trend}</span>
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{defect.title}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Layers className="w-3 h-3" />
                      <span>{defect.module}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <RefreshCw className="w-3 h-3" />
                      <span>{defect.occurrences} occurrences</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Last: {defect.lastSeen}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Regression Risk</div>
                  <div className={`text-2xl font-bold ${
                    defect.regressionRisk >= 70 ? 'text-red-600' :
                    defect.regressionRisk >= 50 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {defect.regressionRisk}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-100 dark:border-red-900">
                  <div className="text-xs font-medium text-red-800 dark:text-red-200 mb-1 flex items-center space-x-1">
                    <Bug className="w-3 h-3" />
                    <span>Root Cause</span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-200">{defect.rootCause}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-100 dark:border-green-900">
                  <div className="text-xs font-medium text-green-800 dark:text-green-200 mb-1 flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>Suggested Fix</span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-200">{defect.suggestedFix}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Module Distribution View */}
      {selectedView === 'distribution' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>Module-wise Defect Distribution</span>
            </h3>

            <div className="space-y-4">
              {moduleDistribution.map((mod, index) => (
                <motion.div
                  key={mod.module}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-44 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{mod.module}</div>
                  <div className="flex-1 relative">
                    <div className="bg-gray-100 dark:bg-[#242424] rounded-full h-8">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${mod.percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className={`${mod.color} rounded-full h-8 flex items-center justify-end pr-3`}
                      >
                        {mod.percentage > 8 && (
                          <span className="text-white text-xs font-bold">{mod.defects}</span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm font-bold text-gray-700 dark:text-gray-300">{mod.percentage}%</div>
                  <div className={`w-20 text-center px-2 py-1 rounded text-xs font-medium ${
                    mod.risk === 'Critical' ? 'bg-red-100 text-red-700' :
                    mod.risk === 'High' ? 'bg-orange-100 text-orange-700' :
                    mod.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {mod.risk}
                  </div>
                  <div className="w-8">
                    {mod.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                    {mod.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-500" />}
                    {mod.trend === 'stable' && <ArrowRight className="w-4 h-4 text-gray-400" />}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                <strong>Key Insight:</strong> Payment Gateway and Transaction Processing together account for 38% of all defects
                and both show increasing trends. Focus testing effort on these modules to achieve maximum defect reduction.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ML Predictions View */}
      {selectedView === 'predictions' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-1">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">ML-Powered Defect Predictions</h3>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-200">
              Predictions generated from analysis of 5 years of defect data, sprint velocity, code change frequency,
              and historical regression patterns using ensemble ML models.
            </p>
          </div>

          {predictiveInsights.map((insight, index) => (
            <motion.div
              key={insight.module}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md dark:hover:shadow-none transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      insight.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      insight.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      insight.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {insight.severity === 'improving' ? 'Improving' : insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1) + ' Risk'}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{insight.timeframe}</span>
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{insight.module}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{insight.prediction}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Confidence</div>
                  <div className={`text-xl font-bold ${
                    insight.confidence >= 85 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {insight.confidence}%
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#141414] rounded-lg p-3 mb-3">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Analysis Basis</div>
                <p className="text-xs text-gray-700 dark:text-gray-300">{insight.basis}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-900">
                <div className="flex items-start space-x-2">
                  <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-xs font-medium text-blue-800 dark:text-blue-200">Recommended Action</div>
                    <p className="text-xs text-blue-700 dark:text-blue-200 mt-0.5">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}