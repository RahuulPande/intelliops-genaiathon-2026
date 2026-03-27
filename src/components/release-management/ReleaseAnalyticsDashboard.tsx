'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, TrendingUp, AlertTriangle, CheckCircle, Clock,
  Shield, GitBranch, Zap, Brain, ChevronRight, ArrowUp, ArrowDown,
  Lightbulb, Target, PieChart, Activity
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';
import {
  generateReleaseInsights,
  generateReleaseRiskBreakdown,
  generateRecommendations,
  generateReleaseTrendData,
  type AIInsightItem,
  type RecommendedAction,
} from '@/services/aiService';

// ---------- Icon resolver ----------
const iconMap: Record<string, React.ComponentType<any>> = {
  AlertTriangle, GitBranch, Shield, TrendingUp, CheckCircle, Clock,
};

// ---------- KPI Cards ----------
const kpiCards = [
  { label: 'Annual Savings from AI', value: '$180K', change: '+12%', positive: true, icon: TrendingUp, color: 'text-green-600' },
  { label: 'Faster Release Cycles', value: '25%', change: '+8%', positive: true, icon: Zap, color: 'text-blue-600' },
  { label: 'Deployment Success Rate', value: '98.2%', change: '+4.1%', positive: true, icon: CheckCircle, color: 'text-purple-600' },
];

// ---------- Risk colors ----------
const RISK_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6'];
const riskLabels: Record<string, string> = {
  defects: 'Open Defects',
  codeChurn: 'Code Churn',
  mergeConflicts: 'Merge Conflicts',
  infra: 'Infra Issues',
};

export default function ReleaseAnalyticsDashboard() {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  // Load data from AI service
  const insights = generateReleaseInsights();
  const riskBreakdown = generateReleaseRiskBreakdown();
  const recommendations = generateRecommendations();
  const trendData = generateReleaseTrendData();

  // Pie data for risk
  const pieData = Object.entries(riskBreakdown).map(([key, value]) => ({
    name: riskLabels[key] || key,
    value,
  }));

  const insightTypeStyles: Record<string, string> = {
    critical: 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
    warning: 'border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20',
    info: 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20',
    success: 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20',
  };

  const insightIconColors: Record<string, string> = {
    critical: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
    success: 'text-green-500',
  };

  const priorityStyles: Record<string, string> = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };

  return (
    <div className="space-y-6">
      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpiCards.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <span className={`text-xs font-bold flex items-center space-x-1 ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{kpi.change}</span>
                </span>
              </div>
              <div className={`text-3xl font-bold ${kpi.color} mb-1`}>{kpi.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{kpi.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* ── AI Insights Panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-5 flex items-center space-x-3">
          <Brain className="w-6 h-6 text-white" />
          <h3 className="text-lg font-bold text-white">AI Insights Panel</h3>
          <span className="text-xs font-medium bg-white/20 text-white px-2 py-1 rounded-full ml-auto">
            {insights.length} insights
          </span>
        </div>
        <div className="p-4 space-y-3">
          {insights.map((insight) => {
            const IconComp = iconMap[insight.icon] || AlertTriangle;
            return (
              <motion.div
                key={insight.id}
                layout
                className={`border rounded-xl p-4 cursor-pointer transition-all ${insightTypeStyles[insight.type]}`}
                onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                whileHover={{ scale: 1.005 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <IconComp className={`w-5 h-5 ${insightIconColors[insight.type]}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{insight.text}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                        {insight.source}
                      </span>
                      <span className="text-xs text-gray-500">
                        Confidence: {(insight.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Release Trends ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cycle Time Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Cycle Time Trend (days)</span>
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="cycleTime" stroke="#3b82f6" fill="#3b82f680" name="Cycle Time" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Deployment Success Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Deployment Success Rate (%)</span>
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="successRate" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Success Rate" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Release Frequency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <span>Release Frequency</span>
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="deployments" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Deployments" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Change Failure Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Change Failure Rate (%)</span>
          </h4>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="failureRate" stroke="#ef4444" fill="#ef444440" name="Failure Rate" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ── Risk Breakdown + Recommendations ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <PieChart className="w-4 h-4 text-orange-600" />
            <span>Release Risk Breakdown</span>
          </h4>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <RechartsPieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={RISK_COLORS[index % RISK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: RISK_COLORS[i] }} />
                <span className="text-xs text-gray-600 dark:text-gray-400">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-5 flex items-center space-x-3">
            <Lightbulb className="w-5 h-5 text-white" />
            <h4 className="font-bold text-white">AI Recommended Actions</h4>
          </div>
          <div className="p-4 space-y-3">
            {recommendations.map((rec) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${priorityStyles[rec.priority]}`}>
                    {rec.priority}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{rec.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{rec.reason}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">{rec.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Drill-down Placeholders ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
      >
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Target className="w-4 h-4 text-indigo-600" />
          <span>Quick Drill-Downs</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'View Failed Deployments', count: 3, icon: AlertTriangle, color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
            { label: 'View Risky Commits', count: 7, icon: GitBranch, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
            { label: 'View Critical Defects', count: 4, icon: Shield, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all ${item.color}`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{item.count}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
