'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, BarChart3, Target, AlertTriangle, Brain, Activity,
  CheckCircle, Clock, TrendingUp, Database, Sparkles
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  generatePerformanceInsights,
  generatePerformanceAnomalies,
  generatePerformanceTrendData,
  type AIInsightItem,
  type PerformanceAnomaly,
} from '@/services/aiService';

type PerformanceTab = 'performance-testing' | 'bottleneck-identification' | 'optimization' | 'predictions';

interface PerformanceIntelligenceSectionProps {
  initialTab?: PerformanceTab;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Zap, Database, TrendingUp, Activity, CheckCircle, AlertTriangle,
};

const insightStyles: Record<string, { border: string; bg: string; iconColor: string }> = {
  critical: { border: 'border-red-300', bg: 'bg-red-50 dark:bg-red-900/20', iconColor: 'text-red-500' },
  warning: { border: 'border-yellow-300', bg: 'bg-yellow-50 dark:bg-yellow-900/20', iconColor: 'text-yellow-500' },
  info: { border: 'border-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20', iconColor: 'text-blue-500' },
  success: { border: 'border-green-300', bg: 'bg-green-50 dark:bg-green-900/20', iconColor: 'text-green-500' },
};

const severityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
};

export default function PerformanceIntelligenceSection({ initialTab = 'performance-testing' }: PerformanceIntelligenceSectionProps) {
  const [activeTab, setActiveTab] = useState<PerformanceTab>(initialTab);

  const insights = generatePerformanceInsights();
  const anomalies = generatePerformanceAnomalies();
  const trendData = generatePerformanceTrendData();

  const tabs = [
    { id: 'performance-testing', label: 'Performance Trends', icon: BarChart3, description: 'Response time & throughput trends' },
    { id: 'bottleneck-identification', label: 'Anomaly Detection', icon: AlertTriangle, description: 'ML-powered anomaly detection' },
    { id: 'optimization', label: 'Root Cause Insights', icon: Brain, description: 'AI root cause analysis' },
    { id: 'predictions', label: 'Performance Predictions', icon: TrendingUp, description: 'ML-based performance forecasting' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'performance-testing':
        return (
          <div className="p-6 space-y-6">
            {/* Response Time */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Response Time (ms) — Last 24h</span>
              </h4>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="responseTime" stroke="#3b82f6" fill="#3b82f680" name="Response Time (ms)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Throughput */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-600" />
                <span>Throughput (req/min) — Last 24h</span>
              </h4>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="throughput" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} name="Throughput (req/min)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Error Rate + CPU */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Error Rate (%)</span>
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="errorRate" stroke="#ef4444" fill="#ef444440" name="Error Rate %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span>CPU Usage (%)</span>
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="cpuUsage" stroke="#8b5cf6" fill="#8b5cf640" name="CPU Usage %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'bottleneck-identification':
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">ML-Powered Anomaly Detection</h3>
              <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">ML Model</span>
            </div>
            {anomalies.map((anomaly, i) => (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Activity className={`w-5 h-5 ${anomaly.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'}`} />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{anomaly.service}</h4>
                      <p className="text-xs text-gray-500">{anomaly.metric}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${severityColors[anomaly.severity]}`}>
                    {anomaly.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{anomaly.description}</p>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-start space-x-2">
                    <Database className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Root Cause:</span>
                      <p className="text-xs text-gray-700 dark:text-gray-300">{anomaly.rootCause}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Prediction:</span>
                      <p className="text-xs text-gray-700 dark:text-gray-300">{anomaly.prediction}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'optimization':
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Root Cause Insights</h3>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">RAG + ML</span>
            </div>
            {insights.filter(i => i.type === 'critical' || i.type === 'warning').map((insight, i) => {
              const style = insightStyles[insight.type];
              const IconComp = iconMap[insight.icon] || AlertTriangle;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`border ${style.border} ${style.bg} rounded-xl p-5`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComp className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{insight.text}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-xs font-bold bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">{insight.source}</span>
                        <span className="text-xs text-gray-500">Confidence: {(insight.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        );

      case 'predictions':
        return (
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">ML Performance Predictions</h3>
              <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">ML Prediction</span>
            </div>
            {insights.map((insight, i) => {
              const style = insightStyles[insight.type];
              const IconComp = iconMap[insight.icon] || AlertTriangle;
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`border ${style.border} ${style.bg} rounded-xl p-5`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComp className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{insight.text}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-xs font-bold bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">{insight.source}</span>
                        <span className="text-xs text-gray-500">Confidence: {(insight.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">AI-Powered Performance Intelligence</h1>
            <p className="text-orange-100">Real-time performance monitoring, ML anomaly detection, and AI root cause analysis</p>
          </div>
          <span className="ml-auto text-xs font-bold bg-white/20 px-3 py-1 rounded-full hidden md:inline-flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>ML + RAG</span>
          </span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">142ms</div>
            <div className="text-sm text-orange-100">Avg Response Time</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">1,480</div>
            <div className="text-sm text-orange-100">Req/min Throughput</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-300">{anomalies.length}</div>
            <div className="text-sm text-orange-100">Active Anomalies</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-300">99.7%</div>
            <div className="text-sm text-orange-100">Service Uptime</div>
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PerformanceTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-4 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div className={`text-xs ${isActive ? 'text-orange-100' : 'text-gray-500 dark:text-gray-500'}`}>
                    {tab.description}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
