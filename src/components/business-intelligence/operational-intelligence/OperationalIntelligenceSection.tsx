'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Activity, 
  Server, 
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';
import PerformanceMonitoring from '@/components/dashboard/PerformanceMonitoring';
import LogStreamDashboard from '@/components/dashboard/LogStreamDashboard';

type OperationalTab = 'performance' | 'monitoring' | 'logs';

interface OperationalIntelligenceSectionProps {
  initialTab?: OperationalTab;
}

// Mock API Monitoring Component (since we're using existing PerformanceMonitoring for now)
const APIMonitoring = () => (
  <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Server className="w-8 h-8 text-blue-600" />
          <div>
            <h3 className="font-semibold">API Performance</h3>
            <p className="text-sm text-gray-600">Real-time API monitoring</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Average Response Time</span>
            <span className="font-medium">245ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Requests per Second</span>
            <span className="font-medium">2,206</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Error Rate</span>
            <span className="font-medium text-green-600">0.02%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Uptime</span>
            <span className="font-medium text-green-600">99.97%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="w-8 h-8 text-green-600" />
          <div>
            <h3 className="font-semibold">Endpoint Health</h3>
            <p className="text-sm text-gray-600">API endpoint status</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">/api/auth</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Healthy</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">/api/payments</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Healthy</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">/api/notifications</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Degraded</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">/api/reports</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Healthy</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-8 h-8 text-purple-600" />
          <div>
            <h3 className="font-semibold">Performance Trends</h3>
            <p className="text-sm text-gray-600">24-hour overview</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Peak Response Time</span>
            <span className="font-medium">456ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Peak RPS</span>
            <span className="font-medium">3,421</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Total Requests</span>
            <span className="font-medium">190.6K</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Cache Hit Rate</span>
            <span className="font-medium text-green-600">94.2%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function OperationalIntelligenceSection({ initialTab = 'performance' }: OperationalIntelligenceSectionProps) {
  const [activeTab, setActiveTab] = useState<OperationalTab>(initialTab);

  const tabs = [
    { 
      id: 'performance', 
      label: 'Performance Monitoring', 
      icon: Activity,
      description: 'Real-time system performance metrics'
    },
    { 
      id: 'monitoring', 
      label: 'API Monitoring', 
      icon: Server,
      description: 'API endpoint health and analytics'
    },
    { 
      id: 'logs', 
      label: 'System Logs & Analysis', 
      icon: FileText,
      description: 'Log aggregation and analysis'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'performance':
        return <PerformanceMonitoring />;
      case 'monitoring':
        return <APIMonitoring />;
      case 'logs':
        return <LogStreamDashboard />;
      default:
        return <PerformanceMonitoring />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Operational Intelligence</h1>
            <p className="text-blue-100">Real-time performance monitoring, API analytics, and system health tracking</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">200ms</div>
            <div className="text-sm text-blue-100">Response Time</div>
            <div className="text-xs text-blue-200">↓ 5% improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">2,206</div>
            <div className="text-sm text-blue-100">Requests/sec</div>
            <div className="text-xs text-blue-200">↑ 12% increase</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">99.97%</div>
            <div className="text-sm text-blue-100">Uptime</div>
            <div className="text-xs text-blue-200">↑ 0.02% improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">150+</div>
            <div className="text-sm text-blue-100">Services</div>
            <div className="text-xs text-blue-200">Real-time monitoring</div>
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
                onClick={() => setActiveTab(tab.id as OperationalTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-4 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{tab.label}</div>
                  <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
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