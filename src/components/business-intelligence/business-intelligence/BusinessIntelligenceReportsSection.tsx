'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  Download, 
  Target,
  Users,
  Clock
} from 'lucide-react';
import ExportReportingSuite from '@/components/dashboard/ExportReportingSuite';
import ROIValueTracking from './ROIValueTracking';

type BusinessTab = 'business-impact' | 'reports' | 'roi-tracking';

interface BusinessIntelligenceReportsSectionProps {
  initialTab?: BusinessTab;
}

// Mock Business Impact Component (using existing structure)
const BusinessImpactAnalysis = () => (
  <div className="p-6 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="font-semibold">Customer Impact</h3>
            <p className="text-sm text-gray-600">User experience metrics</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Customer Satisfaction</span>
            <span className="font-medium text-green-600">4.8/5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">User Retention</span>
            <span className="font-medium">94.2%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Support Tickets</span>
            <span className="font-medium">-23%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Response Quality</span>
            <span className="font-medium text-green-600">96.8%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-8 h-8 text-blue-600" />
          <div>
            <h3 className="font-semibold">SLA Compliance</h3>
            <p className="text-sm text-gray-600">Service level agreements</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Uptime SLA</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">99.97%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Response Time SLA</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">98.5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Resolution Time SLA</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">96.8%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Overall SLA</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">98.4%</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-8 h-8 text-purple-600" />
          <div>
            <h3 className="font-semibold">Operational Efficiency</h3>
            <p className="text-sm text-gray-600">Process improvements</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Mean Time to Resolution</span>
            <span className="font-medium text-green-600">12 min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">First Call Resolution</span>
            <span className="font-medium">87.3%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Automation Rate</span>
            <span className="font-medium">76.5%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Process Efficiency</span>
            <span className="font-medium text-green-600">+18%</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="font-semibold mb-4">Business Impact Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Positive Outcomes</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 25% reduction in incident resolution time</li>
            <li>• 18% improvement in customer satisfaction scores</li>
            <li>• 30% decrease in manual intervention requirements</li>
            <li>• 22% increase in operational efficiency</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Key Achievements</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Exceeded all SLA targets for Q4</li>
            <li>• Reduced support ticket volume by 23%</li>
            <li>• Improved first-call resolution rate to 87.3%</li>
            <li>• Achieved 99.97% system uptime</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default function BusinessIntelligenceReportsSection({ initialTab = 'business-impact' }: BusinessIntelligenceReportsSectionProps) {
  const [activeTab, setActiveTab] = useState<BusinessTab>(initialTab);

  const tabs = [
    { 
      id: 'business-impact', 
      label: 'Business Impact Analysis', 
      icon: TrendingUp,
      description: 'Customer satisfaction and SLA compliance'
    },
    { 
      id: 'reports', 
      label: 'Executive Reports & Dashboards', 
      icon: Download,
      description: 'Automated reporting and data export'
    },
    { 
      id: 'roi-tracking', 
      label: 'ROI & Value Tracking', 
      icon: Target,
      description: 'Return on investment and value metrics'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'business-impact':
        return <BusinessImpactAnalysis />;
      case 'reports':
        return <ExportReportingSuite />;
      case 'roi-tracking':
        return <ROIValueTracking />;
      default:
        return <BusinessImpactAnalysis />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Business Intelligence</h1>
            <p className="text-purple-100">Executive dashboards, business impact analysis, and strategic reporting</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="text-sm text-purple-100">Customer Satisfaction</div>
            <div className="text-xs text-purple-200">↑ 0.2 improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">99.97%</div>
            <div className="text-sm text-purple-100">SLA Compliance</div>
            <div className="text-xs text-purple-200">↑ 0.15% increase</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">12min</div>
            <div className="text-sm text-purple-100">MTTR</div>
            <div className="text-xs text-purple-200">↓ 25% reduction</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">87.3%</div>
            <div className="text-sm text-purple-100">First Call Resolution</div>
            <div className="text-xs text-purple-200">↑ 5% improvement</div>
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
                onClick={() => setActiveTab(tab.id as BusinessTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-4 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-gray-500'}`}>
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
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}