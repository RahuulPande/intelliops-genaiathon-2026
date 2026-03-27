'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Shield, Server, Users, Plug } from 'lucide-react';
import SecurityComplianceDashboard from '@/components/dashboard/SecurityComplianceDashboard';
import EnvironmentDashboard from '@/components/dashboard/EnvironmentDashboard';
import CollaborationHub from '@/components/dashboard/CollaborationHub';
import SettingsConfiguration from '@/components/dashboard/SettingsConfiguration';
import IntegrationConfigPanel from '@/components/settings/IntegrationConfigPanel';

type SettingsTab = 'general' | 'integrations' | 'security' | 'environments' | 'collaboration';

export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const tabs = [
    { id: 'general', label: 'General Settings', icon: SettingsIcon },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
    { id: 'environments', label: 'Environment Management', icon: Server },
    { id: 'collaboration', label: 'Team Collaboration', icon: Users }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Configuration, administration, and security</p>
      </div>

      {/* Sub-navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 overflow-x-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'general' && <SettingsConfiguration />}

        {activeTab === 'integrations' && <IntegrationConfigPanel />}

        {activeTab === 'security' && <SecurityComplianceDashboard />}

        {activeTab === 'environments' && <EnvironmentDashboard />}

        {activeTab === 'collaboration' && <CollaborationHub />}
      </motion.div>
    </div>
  );
}
