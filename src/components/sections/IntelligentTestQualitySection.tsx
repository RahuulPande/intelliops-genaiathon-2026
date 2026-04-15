'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Home,
  TestTube,
  BarChart3,
  Zap,
  Sparkles
} from 'lucide-react';
import IntelligentTestQualityLanding from '@/components/intelligent-test-quality/IntelligentTestQualityLanding';
import DefectIntelligenceSection from '@/components/intelligent-test-quality/defect-intelligence/DefectIntelligenceSection';
import TestManagementSection from '@/components/intelligent-test-quality/test-management/TestManagementSection';
import QualityInsightsSection from '@/components/intelligent-test-quality/quality-insights/QualityInsightsSection';
import PerformanceIntelligenceSection from '@/components/intelligent-test-quality/performance-intelligence/PerformanceIntelligenceSection';
import TestAIInsightsPanel from '@/components/intelligent-test-quality/TestAIInsightsPanel';
import FeatureUpgradePrompt from '@/components/ui/FeatureUpgradePrompt';
import TestQualityWorkspace from '@/components/test-intelligence/TestQualityWorkspace';
import useLicenseStore from '@/store/license';
import { useAuth } from '@/context/AuthContext';

type IntelligentTestQualityTab =
  | 'overview'
  | 'defect-intelligence'
  | 'test-management'
  | 'quality-insights'
  | 'performance-intelligence'
  | 'ai-insights'
  // Legacy tab support for direct navigation and backward compatibility
  | 'insights' 
  | 'defects' 
  | 'predictions' 
  | 'analytics'
  | 'defect-matching'
  | 'defect-analytics'
  | 'test-execution'
  | 'test-velocity'
  | 'test-distribution'
  | 'test-cases'
  | 'quality-metrics'
  | 'risk-assessment'
  | 'quality-trends'
  | 'release-readiness'
  | 'performance-testing'
  | 'bottleneck-identification'
  | 'performance-optimization';

export default function IntelligentTestQualitySection() {
  const [activeTab, setActiveTab] = useState<IntelligentTestQualityTab>('overview');
  const { hasFeatureAccess, currentLicense } = useLicenseStore();
  const { isAdmin } = useAuth();

  const mainTabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: Home,
      description: 'Intelligent Test & Quality Management overview'
    },
    { 
      id: 'defect-intelligence', 
      label: 'Defect Intelligence', 
      icon: Brain,
      description: 'AI-powered defect matching and resolution'
    },
    { 
      id: 'test-management', 
      label: 'Test Management', 
      icon: TestTube,
      description: 'Comprehensive test execution and tracking'
    },
    { 
      id: 'quality-insights', 
      label: 'Quality Insights', 
      icon: BarChart3,
      description: 'Predictive quality analytics and assessment'
    },
    {
      id: 'performance-intelligence',
      label: 'Performance Intelligence',
      icon: Zap,
      description: 'Performance testing and optimization'
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: Sparkles,
      description: 'AI-generated test suite analysis'
    }
  ];

  // Handle navigation from landing page and legacy routes
  const handleNavigateToSection = (section: string) => {
    // Map legacy sections and specific actions to new structure
    const sectionMapping: Record<string, IntelligentTestQualityTab> = {
      // Defect Intelligence mappings
      'defect-insights': 'defect-intelligence',
      'defect-matching': 'defect-intelligence',
      'defect-analytics': 'defect-intelligence',
      'insights': 'defect-intelligence',
      'defects': 'defect-intelligence',
      'predictions': 'defect-intelligence',
      'analytics': 'defect-intelligence',
      
      // Test Management mappings
      'test-execution': 'test-management',
      'test-reports': 'test-management',
      'test-velocity': 'test-management',
      'test-distribution': 'test-management',
      'test-cases': 'test-management',
      
      // Quality Insights mappings
      'quality-metrics': 'quality-insights',
      'risk-analysis': 'quality-insights',
      'quality-trends': 'quality-insights',
      'release-readiness': 'quality-insights',
      'risk-assessment': 'quality-insights',
      
      // Performance Intelligence mappings
      'performance-testing': 'performance-intelligence',
      'bottleneck-identification': 'performance-intelligence',
      'performance-optimization': 'performance-intelligence'
    };

    const targetTab = sectionMapping[section] || section as IntelligentTestQualityTab;
    setActiveTab(targetTab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <IntelligentTestQualityLanding onNavigateToSection={handleNavigateToSection} />;
      
      case 'defect-intelligence':
        // Check if user has access to AI Defect Matching feature
        if (!hasFeatureAccess('aiDefectMatching')) {
          return (
            <FeatureUpgradePrompt
              feature="AI Defect Matching"
              currentLicense={currentLicense}
              requiredLicense="enterprise"
              benefits={[
                {
                  icon: Brain,
                  text: '96% accuracy in finding historical solutions',
                  value: 'Saves 75% incident resolution time'
                },
                {
                  icon: Zap,
                  text: 'Automated defect pattern recognition',
                  value: 'Prevents $2.3M annually in repeated issues'
                },
                {
                  icon: BarChart3,
                  text: 'Institutional knowledge retention',
                  value: '40% faster new team member onboarding'
                }
              ]}
              description="AI-powered defect matching analyzes patterns across 5 years of data to find historical solutions and prevent recurring issues."
            />
          );
        }
        
        // Determine initial sub-tab based on specific navigation
        const defectInitialTab = (['insights'].includes(activeTab)) ? 'insights' :
                                (['defects', 'defect-matching'].includes(activeTab)) ? 'defect-matching' :
                                (['analytics', 'defect-analytics'].includes(activeTab)) ? 'defect-analytics' :
                                (['predictions'].includes(activeTab)) ? 'predictions' :
                                'defect-matching';
        return <DefectIntelligenceSection initialTab={defectInitialTab as any} />;
      
      case 'test-management':
        // Determine initial sub-tab based on specific navigation
        const testInitialTab = (['test-execution'].includes(activeTab)) ? 'test-execution' :
                              (['test-velocity'].includes(activeTab)) ? 'test-velocity' :
                              (['test-distribution'].includes(activeTab)) ? 'test-distribution' :
                              (['test-cases'].includes(activeTab)) ? 'test-cases' :
                              'test-execution';
        return <TestManagementSection initialTab={testInitialTab as any} />;
      
      case 'quality-insights':
        // Determine initial sub-tab based on specific navigation
        const qualityInitialTab = (['quality-metrics'].includes(activeTab)) ? 'quality-metrics' :
                                 (['risk-assessment', 'risk-analysis'].includes(activeTab)) ? 'risk-assessment' :
                                 (['quality-trends'].includes(activeTab)) ? 'quality-trends' :
                                 (['release-readiness'].includes(activeTab)) ? 'release-readiness' :
                                 'quality-metrics';
        return <QualityInsightsSection initialTab={qualityInitialTab as any} />;
      
      case 'performance-intelligence':
        // Determine initial sub-tab based on specific navigation
        const performanceInitialTab = (['performance-testing'].includes(activeTab)) ? 'performance-testing' :
                                     (['bottleneck-identification'].includes(activeTab)) ? 'bottleneck-identification' :
                                     (['performance-optimization'].includes(activeTab)) ? 'optimization' :
                                     'performance-testing';
        return <PerformanceIntelligenceSection initialTab={performanceInitialTab as any} />;

      case 'ai-insights':
        return <TestAIInsightsPanel />;

      // Legacy direct navigation support
      case 'insights':
      case 'defects':
      case 'predictions':
      case 'analytics':
      case 'defect-matching':
      case 'defect-analytics':
        setActiveTab('defect-intelligence');
        return <DefectIntelligenceSection initialTab={activeTab === 'insights' ? 'insights' : 
                                                   activeTab === 'defects' || activeTab === 'defect-matching' ? 'defect-matching' : 
                                                   activeTab === 'analytics' || activeTab === 'defect-analytics' ? 'defect-analytics' : 'predictions'} />;
      
      case 'test-execution':
      case 'test-velocity':
      case 'test-distribution':
      case 'test-cases':
        setActiveTab('test-management');
        return <TestManagementSection initialTab={activeTab as any} />;
      
      case 'quality-metrics':
      case 'risk-assessment':
      case 'quality-trends':
      case 'release-readiness':
        setActiveTab('quality-insights');
        return <QualityInsightsSection initialTab={activeTab as any} />;
      
      case 'performance-testing':
      case 'bottleneck-identification':
      case 'performance-optimization':
        setActiveTab('performance-intelligence');
        return <PerformanceIntelligenceSection initialTab={activeTab === 'performance-optimization' ? 'optimization' : activeTab as any} />;
      
      default:
        return <IntelligentTestQualityLanding onNavigateToSection={handleNavigateToSection} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <p className="text-sm font-medium text-purple-200 dark:text-purple-300 mb-1">Delivery Intelligence</p>
            <h1 className="text-3xl font-bold">Test & Quality Intelligence</h1>
            <p className="text-purple-100 dark:text-purple-200 text-lg">AI-powered quality assurance across the entire software delivery lifecycle</p>
          </div>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">3,247</div>
            <div className="text-sm text-purple-100 dark:text-purple-200">Defect Matches</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">96%</div>
            <div className="text-sm text-purple-100 dark:text-purple-200">AI Accuracy</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">94.2</div>
            <div className="text-sm text-purple-100 dark:text-purple-200">Quality Score</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">75%</div>
            <div className="text-sm text-purple-100 dark:text-purple-200">Time Saved</div>
          </div>
        </div>
      </div>

      {/* Interactive Test Explorer — Admin Only */}
      {isAdmin && activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Interactive Test Suite Explorer</h3>
            <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">Dev Mode</span>
          </div>
          <TestQualityWorkspace />
        </div>
      )}

      {/* Main Navigation */}
      {activeTab !== 'overview' && (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-1">
          <div className="flex flex-wrap gap-1">
            {mainTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as IntelligentTestQualityTab)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-[#242424]'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <div className="text-left">
                    <div className="font-medium">{tab.label}</div>
                    <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-gray-500 dark:text-gray-500'}`}>
                      {tab.description}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}