'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import QualityMetricsDashboard from './QualityMetricsDashboard';
import RiskAssessment from './RiskAssessment';
import QualityTrends from './QualityTrends';
import ReleaseReadinessIndicators from './ReleaseReadinessIndicators';

type QualityInsightsTab = 'quality-metrics' | 'risk-assessment' | 'quality-trends' | 'release-readiness';

interface QualityInsightsSectionProps {
  initialTab?: QualityInsightsTab;
}

export default function QualityInsightsSection({ initialTab = 'quality-metrics' }: QualityInsightsSectionProps) {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<QualityInsightsTab>(initialTab);

  const tabs = [
    { 
      id: 'quality-metrics', 
      label: 'Quality Metrics Dashboard', 
      icon: BarChart3,
      description: 'Comprehensive quality scoring and metrics'
    },
    { 
      id: 'risk-assessment', 
      label: 'Risk Assessment', 
      icon: AlertTriangle,
      description: 'Quality risk analysis and mitigation'
    },
    { 
      id: 'quality-trends', 
      label: 'Quality Trends & Forecasting', 
      icon: TrendingUp,
      description: 'Historical trends and quality forecasting'
    },
    { 
      id: 'release-readiness', 
      label: 'Release Readiness Indicators', 
      icon: Shield,
      description: 'Go/no-go decision support and readiness'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'quality-metrics':
        return <QualityMetricsDashboard />;
      case 'risk-assessment':
        return <RiskAssessment />;
      case 'quality-trends':
        return <QualityTrends />;
      case 'release-readiness':
        return <ReleaseReadinessIndicators />;
      default:
        return <QualityMetricsDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Quality Insights</h1>
            <p className="text-green-100">Predictive quality analytics and release readiness assessment</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">94.2</div>
            <div className="text-sm text-green-100">Quality Score</div>
            <div className="text-xs text-green-200">↑ 2.1 improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">1</div>
            <div className="text-sm text-green-100">Critical Risk</div>
            <div className="text-xs text-green-200">↓ 2 resolved</div>
          </div>
          {!isAdmin && (
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">$5,561</div>
              <div className="text-sm text-green-100">Monthly Savings</div>
              <div className="text-xs text-green-200">↑ 12% increase</div>
            </div>
          )}
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-green-100">Active Alerts</div>
            <div className="text-xs text-green-200">↓ 1 this week</div>
          </div>
        </div>
      </div>

      {/* Quality Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Quality-Driven Decision Making</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Transform your quality assurance with predictive analytics that prevent quality issues before they impact users. 
          Our comprehensive quality scoring system reduces post-release defects by 60% and provides executive-level 
          insights for strategic quality decisions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium">Predictive Quality</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Forecast quality issues early</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <Shield className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="font-medium">Risk Mitigation</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Proactive risk management</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">Release Confidence</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Data-driven go/no-go decisions</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sub-navigation */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as QualityInsightsTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-4 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-[#242424]'
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div className={`text-xs ${isActive ? 'text-green-100' : 'text-gray-500 dark:text-gray-500'}`}>
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
        className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}