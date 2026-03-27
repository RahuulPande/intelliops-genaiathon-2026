'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, BarChart3, Brain, Shield, Home, Sparkles } from 'lucide-react';
import ReleaseManagementLanding from '@/components/release-management/ReleaseManagementLanding';
import AIReleaseHealthScore from '@/components/release-management/release-readiness/AIReleaseHealthScore';
import AIBranchManager from '@/components/release-management/deployment-intelligence/AIBranchManager';
import ReleaseReadinessDashboard from '@/components/dashboard/ReleaseReadinessDashboard';
import ReleaseAnalyticsDashboard from '@/components/release-management/ReleaseAnalyticsDashboard';
import ReleaseExplorerWorkspace from '@/components/release-intelligence/ReleaseExplorerWorkspace';
import { useAuth } from '@/context/AuthContext';

type ReleaseTab = 'overview' | 'release-readiness' | 'deployment-intelligence' | 'release-analytics';

export default function ReleaseManagementSection() {
  const [activeTab, setActiveTab] = useState<ReleaseTab>('overview');
  const { isAdmin } = useAuth();

  // Handle navigation from landing page
  const handleNavigateToSection = (section: string) => {
    setActiveTab(section as ReleaseTab);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'release-readiness', label: 'Release Readiness', icon: Shield },
    { id: 'deployment-intelligence', label: 'Deployment Intelligence', icon: Brain },
    { id: 'release-analytics', label: 'Release Analytics', icon: BarChart3 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">Delivery Intelligence</p>
        <h1 className="text-2xl font-bold text-gray-900">Release Intelligence</h1>
        <p className="text-gray-600 mt-1">AI-powered release orchestration preventing costly deployment issues and ensuring seamless delivery</p>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
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
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
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
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Traditional Release Readiness</h4>
              <ReleaseReadinessDashboard />
            </div>
          </div>
        )}
        {activeTab === 'deployment-intelligence' && <AIBranchManager />}
        {activeTab === 'release-analytics' && <ReleaseAnalyticsDashboard />}
      </motion.div>
    </div>
  );
} 