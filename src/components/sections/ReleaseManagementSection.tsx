'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, BarChart3, Brain, Shield, Home, Sparkles, Info } from 'lucide-react';
import ReleaseManagementLanding from '@/components/release-management/ReleaseManagementLanding';
import AIReleaseHealthScore from '@/components/release-management/release-readiness/AIReleaseHealthScore';
import AIBranchManager from '@/components/release-management/deployment-intelligence/AIBranchManager';
import ReleaseReadinessDashboard from '@/components/dashboard/ReleaseReadinessDashboard';
import ReleaseAnalyticsDashboard from '@/components/release-management/ReleaseAnalyticsDashboard';
import ReleaseExplorerWorkspace from '@/components/release-intelligence/ReleaseExplorerWorkspace';
import { useAuth } from '@/context/AuthContext';
import FeatureAboutTab from '@/components/demo/FeatureAboutTab';
import { releaseIntelligenceAbout } from '@/lib/content/aboutContent';

type ReleaseTab = 'overview' | 'release-readiness' | 'deployment-intelligence' | 'release-analytics' | 'about';
type DemoReleaseTab = 'overview' | 'deployment-intelligence' | 'release-analytics' | 'about';

export default function ReleaseManagementSection() {
  const [activeTab, setActiveTab] = useState<ReleaseTab>('overview');
  const { isAdmin } = useAuth();

  // Handle navigation from landing page
  const handleNavigateToSection = (section: string) => {
    setActiveTab(section as ReleaseTab);
  };

  const allTabs = [
    { id: 'overview', label: 'Release Overview', icon: Home },
    { id: 'release-readiness', label: 'Release Readiness', icon: Shield },
    { id: 'deployment-intelligence', label: 'Deployment Intelligence', icon: Brain },
    { id: 'release-analytics', label: 'Release Analytics', icon: BarChart3 },
    { id: 'about', label: 'About', icon: Info }
  ];

  // Demo mode: 3 tabs (no Release Readiness — now in Test Intelligence)
  const tabs = isAdmin ? allTabs : allTabs.filter(t => t.id !== 'release-readiness');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Delivery Intelligence</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Release Intelligence</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">AI-powered release orchestration preventing costly deployment issues and ensuring seamless delivery</p>
      </div>

      {/* Interactive Release Explorer — Admin Only */}
      {isAdmin && activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Interactive Release Explorer</h3>
            <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300">Dev Mode</span>
          </div>
          <ReleaseExplorerWorkspace />
        </div>
      )}

      {/* Main Navigation */}
      {activeTab !== 'overview' && (
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-1">
          <div className="flex flex-wrap gap-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ReleaseTab)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg dark:shadow-none'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
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
        {activeTab === 'overview' && <ReleaseManagementLanding onNavigateToSection={handleNavigateToSection} />}
        {activeTab === 'release-readiness' && (
          <div className="space-y-6">
            <AIReleaseHealthScore />
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Traditional Release Readiness</h4>
              <ReleaseReadinessDashboard />
            </div>
          </div>
        )}
        {activeTab === 'deployment-intelligence' && <AIBranchManager />}
        {activeTab === 'release-analytics' && <ReleaseAnalyticsDashboard />}
        {activeTab === 'about' && <FeatureAboutTab {...releaseIntelligenceAbout} />}
      </motion.div>
    </div>
  );
} 