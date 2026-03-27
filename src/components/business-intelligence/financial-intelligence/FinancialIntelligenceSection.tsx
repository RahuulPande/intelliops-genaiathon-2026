'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingDown, 
  PieChart, 
  Target,
  CreditCard,
  BarChart3
} from 'lucide-react';
import CostAnalytics from '@/components/dashboard/CostAnalytics';
import BudgetTrackingOptimization from './BudgetTrackingOptimization';
import LicenseManagement from './LicenseManagement';

type FinancialTab = 'cost-analytics' | 'budget-tracking' | 'license-management';

interface FinancialIntelligenceSectionProps {
  initialTab?: FinancialTab;
}

export default function FinancialIntelligenceSection({ initialTab = 'cost-analytics' }: FinancialIntelligenceSectionProps) {
  const [activeTab, setActiveTab] = useState<FinancialTab>(initialTab);

  const tabs = [
    { 
      id: 'cost-analytics', 
      label: 'Cost Analytics', 
      icon: DollarSign,
      description: 'Real-time cost tracking and optimization'
    },
    { 
      id: 'budget-tracking', 
      label: 'Budget Tracking & Optimization', 
      icon: Target,
      description: 'Budget planning and variance analysis'
    },
    { 
      id: 'license-management', 
      label: 'License Management & Utilization', 
      icon: CreditCard,
      description: 'Software license optimization and compliance'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'cost-analytics':
        return <CostAnalytics />;
      case 'budget-tracking':
        return <BudgetTrackingOptimization />;
      case 'license-management':
        return <LicenseManagement />;
      default:
        return <CostAnalytics />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Financial Intelligence</h1>
            <p className="text-green-100">Cost optimization, budget tracking, and license utilization analysis</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">$48K</div>
            <div className="text-sm text-green-100">Monthly Spend</div>
            <div className="text-xs text-green-200">↓ 12% from last month</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">$13K</div>
            <div className="text-sm text-green-100">Savings Identified</div>
            <div className="text-xs text-green-200">↑ 8% potential</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">1,900%</div>
            <div className="text-sm text-green-100">ROI</div>
            <div className="text-xs text-green-200">↑ 15% improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">87%</div>
            <div className="text-sm text-green-100">Budget Utilization</div>
            <div className="text-xs text-green-200">↑ 3% efficiency</div>
          </div>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as FinancialTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-4 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div className={`text-xs ${isActive ? 'text-green-100' : 'text-gray-500'}`}>
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
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}