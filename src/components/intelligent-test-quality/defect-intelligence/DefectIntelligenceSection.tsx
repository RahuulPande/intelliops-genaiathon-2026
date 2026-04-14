'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Lightbulb,
  BarChart3,
  History,
  TestTube,
  FileText,
  Sparkles,
  Info
} from 'lucide-react';
import AIDefectMatcher from '@/components/dashboard/AIDefectMatcher';
import DefectAnalytics from '@/components/dashboard/DefectAnalytics';
import HistoricalDefectAnalysis from './HistoricalDefectAnalysis';
import RAGSolutionRecommendations from './RAGSolutionRecommendations';
import TestReexecutionMonitor from './TestReexecutionMonitor';
import DocumentationQualityMonitor from './DocumentationQualityMonitor';
import AIDocumentationAssistant from './AIDocumentationAssistant';
import FeatureAboutTab from '@/components/demo/FeatureAboutTab';
import { defectIntelligenceAbout } from '@/lib/content/aboutContent';

type DefectIntelligenceTab = 'defect-matching' | 'defect-analytics' | 'predictions' | 'insights' | 'test-reexecution' | 'documentation-quality' | 'ai-learning' | 'about';

interface DefectIntelligenceSectionProps {
  initialTab?: DefectIntelligenceTab;
}

export default function DefectIntelligenceSection({ initialTab = 'defect-matching' }: DefectIntelligenceSectionProps) {
  const [activeTab, setActiveTab] = useState<DefectIntelligenceTab>(initialTab);

  const tabs = [
    {
      id: 'defect-matching',
      label: 'AI Defect Matching',
      icon: Brain,
      description: 'RAG Match · Industry-first defect matching with 96% accuracy'
    },
    { 
      id: 'test-reexecution', 
      label: 'Test Re-execution Monitor', 
      icon: TestTube,
      description: 'Smart detection of test gaps after defect fixes'
    },
    { 
      id: 'documentation-quality', 
      label: 'Documentation Quality', 
      icon: FileText,
      description: 'AI-powered analysis of documentation completeness'
    },
    { 
      id: 'ai-learning', 
      label: 'AI Learning Optimization', 
      icon: Sparkles,
      description: 'Documentation enhancement for improved AI accuracy'
    },
    { 
      id: 'defect-analytics', 
      label: 'Defect Analytics & Patterns', 
      icon: BarChart3,
      description: 'Pattern analysis and defect trend insights'
    },
    {
      id: 'predictions',
      label: 'Historical Analysis & Predictions',
      icon: TrendingUp,
      description: 'ML Prediction · Defect trends and regression forecasting'
    },
    {
      id: 'insights',
      label: 'Solution Recommendations',
      icon: Lightbulb,
      description: 'LLM Insight · RAG-powered resolution recommendations'
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      description: 'How Defect Intelligence works and what it needs'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'defect-matching':
        return <AIDefectMatcher />;
      case 'test-reexecution':
        return <TestReexecutionMonitor />;
      case 'documentation-quality':
        return <DocumentationQualityMonitor />;
      case 'ai-learning':
        return <AIDocumentationAssistant />;
      case 'defect-analytics':
        return <DefectAnalytics />;
      case 'predictions':
        return <HistoricalDefectAnalysis />;
      case 'insights':
        return <RAGSolutionRecommendations />;
      case 'about':
        return <FeatureAboutTab {...defectIntelligenceAbout} />;
      default:
        return <AIDefectMatcher />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Defect Intelligence</h1>
            <p className="text-purple-100">AI-powered defect matching and resolution with industry-leading accuracy</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">3,247</div>
            <div className="text-sm text-purple-100">Matches Found</div>
            <div className="text-xs text-purple-200">↑ 23% this month</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">680h</div>
            <div className="text-sm text-purple-100">Time Saved</div>
            <div className="text-xs text-purple-200">↑ 18% efficiency</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">96%</div>
            <div className="text-sm text-purple-100">Success Rate</div>
            <div className="text-xs text-purple-200">↑ 2% improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">5 Years</div>
            <div className="text-sm text-purple-100">Data Analysis</div>
            <div className="text-xs text-purple-200">Historical patterns</div>
          </div>
        </div>
      </div>

      {/* Industry First Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 shadow-2xl border-2 border-amber-300/50">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl blur-lg opacity-30 -z-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Target className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    ⭐ Industry First: AI-Powered Defect Matching
                  </h3>
                  <p className="text-orange-100 text-sm mt-1">
                    Revolutionary pattern recognition technology with 96% accuracy
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-2">3,247</div>
                <div className="text-orange-100 text-sm">Successful Matches</div>
                <div className="text-orange-200 text-xs mt-1">Across 5 years of data</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-2">6h → 45min</div>
                <div className="text-orange-100 text-sm">Resolution Time</div>
                <div className="text-orange-200 text-xs mt-1">87.5% time reduction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-2">Real-time</div>
                <div className="text-orange-100 text-sm">Pattern Analysis</div>
                <div className="text-orange-200 text-xs mt-1">Instant recommendations</div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-white text-sm leading-relaxed">
                <strong>Why it's revolutionary:</strong> Traditional defect resolution relies on manual searching through documentation and tribal knowledge. 
                Our AI analyzes patterns across millions of historical incidents, system logs, and resolution data to instantly 
                match new defects with proven solutions, dramatically reducing Mean Time to Resolution (MTTR).
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sub-navigation */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as DefectIntelligenceTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-[#242424]'
                }`}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs">{tab.label}</div>
                  <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-gray-500'} truncate`}>
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