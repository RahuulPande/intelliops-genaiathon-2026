'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Home,
  DollarSign,
  Zap,
  TrendingUp
} from 'lucide-react';
import BusinessIntelligenceLanding from '@/components/business-intelligence/BusinessIntelligenceLanding';
import FinancialIntelligenceSection from '@/components/business-intelligence/financial-intelligence/FinancialIntelligenceSection';
import OperationalIntelligenceSection from '@/components/business-intelligence/operational-intelligence/OperationalIntelligenceSection';
import BusinessIntelligenceReportsSection from '@/components/business-intelligence/business-intelligence/BusinessIntelligenceReportsSection';

// Legacy imports for backward compatibility
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

type BusinessIntelligenceTab = 
  | 'overview' 
  | 'financial' 
  | 'operational' 
  | 'business-intelligence'
  // Legacy tab support for direct navigation
  | 'performance' 
  | 'logs' 
  | 'costs' 
  | 'business' 
  | 'reports' 
  | 'monitoring' 
  | 'cost-analytics'
  | 'budget-tracking'
  | 'license-management'
  | 'business-impact'
  | 'roi-tracking';

export default function BusinessIntelligenceSection() {
  const [activeTab, setActiveTab] = useState<BusinessIntelligenceTab>('overview');

  const mainTabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: Home,
      description: 'Business Intelligence & Analytics overview'
    },
    { 
      id: 'financial', 
      label: 'Financial Intelligence', 
      icon: DollarSign,
      description: 'Cost optimization and budget tracking'
    },
    { 
      id: 'operational', 
      label: 'Operational Intelligence', 
      icon: Zap,
      description: 'Performance monitoring and system health'
    },
    { 
      id: 'business-intelligence', 
      label: 'Business Intelligence', 
      icon: TrendingUp,
      description: 'Executive reports and ROI tracking'
    }
  ];

  // Handle navigation from landing page and legacy routes
  const handleNavigateToSection = (section: string) => {
    // Map legacy sections to new structure
    const sectionMapping: Record<string, BusinessIntelligenceTab> = {
      // Financial Intelligence mappings
      'cost-analytics': 'financial',
      'costs': 'financial',
      'budget-tracking': 'financial',
      'license-management': 'financial',
      
      // Operational Intelligence mappings
      'performance': 'operational',
      'monitoring': 'operational',
      'logs': 'operational',
      
      // Business Intelligence mappings
      'business': 'business-intelligence',
      'business-impact': 'business-intelligence',
      'reports': 'business-intelligence',
      'roi-tracking': 'business-intelligence'
    };

    const targetTab = sectionMapping[section] || section as BusinessIntelligenceTab;
    setActiveTab(targetTab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <BusinessIntelligenceLanding onNavigateToSection={handleNavigateToSection} />;
      
      case 'financial':
        // Determine initial sub-tab based on specific navigation
        const financialInitialTab = (['cost-analytics', 'costs'].includes(activeTab)) ? 'cost-analytics' :
                                  (['budget-tracking'].includes(activeTab)) ? 'budget-tracking' :
                                  (['license-management'].includes(activeTab)) ? 'license-management' :
                                  'cost-analytics';
        return <FinancialIntelligenceSection initialTab={financialInitialTab as any} />;
      
      case 'operational':
        // Determine initial sub-tab based on specific navigation
        const operationalInitialTab = (['performance'].includes(activeTab)) ? 'performance' :
                                     (['monitoring'].includes(activeTab)) ? 'monitoring' :
                                     (['logs'].includes(activeTab)) ? 'logs' :
                                     'performance';
        return <OperationalIntelligenceSection initialTab={operationalInitialTab as any} />;
      
      case 'business-intelligence':
        // Determine initial sub-tab based on specific navigation
        const businessInitialTab = (['business', 'business-impact'].includes(activeTab)) ? 'business-impact' :
                                  (['reports'].includes(activeTab)) ? 'reports' :
                                  (['roi-tracking'].includes(activeTab)) ? 'roi-tracking' :
                                  'business-impact';
        return <BusinessIntelligenceReportsSection initialTab={businessInitialTab as any} />;
      
      // Legacy direct navigation support
      case 'performance':
      case 'logs':
      case 'monitoring':
        setActiveTab('operational');
        return <OperationalIntelligenceSection initialTab={activeTab as any} />;
      
      case 'costs':
      case 'cost-analytics':
      case 'budget-tracking':
      case 'license-management':
        setActiveTab('financial');
        return <FinancialIntelligenceSection initialTab={activeTab === 'costs' ? 'cost-analytics' : activeTab as any} />;
      
      case 'business':
      case 'business-impact':
      case 'reports':
      case 'roi-tracking':
        setActiveTab('business-intelligence');
        return <BusinessIntelligenceReportsSection initialTab={activeTab === 'business' ? 'business-impact' : activeTab as any} />;
      
      default:
        return <BusinessIntelligenceLanding onNavigateToSection={handleNavigateToSection} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="w-8 h-8" />
          <div>
            <p className="text-sm font-medium text-orange-200 mb-1">Enterprise Intelligence</p>
            <h1 className="text-3xl font-bold">Enterprise Business Intelligence & Analytics</h1>
            <p className="text-blue-100 text-lg">Transform operational data into strategic business insights</p>
          </div>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">$2.7M</div>
            <div className="text-sm text-blue-100">Total Value Created</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">2,122%</div>
            <div className="text-sm text-blue-100">ROI Achieved</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">87%</div>
            <div className="text-sm text-blue-100">Efficiency Gains</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">97.2%</div>
            <div className="text-sm text-blue-100">System Health</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      {activeTab !== 'overview' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <div className="flex flex-wrap gap-1">
            {mainTabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as BusinessIntelligenceTab)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <div className="text-left">
                    <div className="font-medium">{tab.label}</div>
                    <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
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