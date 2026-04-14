'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Info } from 'lucide-react';
import TestManagementIntelligence from '@/components/intelligent-test-quality/test-management/TestManagementIntelligence';
import FeatureAboutTab from '@/components/demo/FeatureAboutTab';
import { testIntelligenceAbout } from '@/lib/content/aboutContent';

type TestTab = 'dashboard' | 'about';

const tabs = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'about' as const, label: 'About', icon: Info },
];

export default function DemoTestManagementSection() {
  const [activeTab, setActiveTab] = useState<TestTab>('dashboard');

  return (
    <div className="space-y-4">
      {/* Tab Bar */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 p-1">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg dark:shadow-none'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'dashboard' && <TestManagementIntelligence />}
        {activeTab === 'about' && <FeatureAboutTab {...testIntelligenceAbout} />}
      </motion.div>
    </div>
  );
}
