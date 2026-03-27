'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TestTube, 
  Activity, 
  BarChart3, 
  CheckCircle,
  Clock,
  Users,
  Target
} from 'lucide-react';
import TestManagementDashboard from '@/components/dashboard/TestManagementDashboard';
import TestProgressVelocity from './TestProgressVelocity';
import TestStatusDistribution from './TestStatusDistribution';
import TestCaseManagement from './TestCaseManagement';

type TestManagementTab = 'test-execution' | 'test-velocity' | 'test-distribution' | 'test-cases';

interface TestManagementSectionProps {
  initialTab?: TestManagementTab;
}

export default function TestManagementSection({ initialTab = 'test-execution' }: TestManagementSectionProps) {
  const [activeTab, setActiveTab] = useState<TestManagementTab>(initialTab);

  const tabs = [
    { 
      id: 'test-execution', 
      label: 'Test Execution Dashboard', 
      icon: Activity,
      description: 'Comprehensive test execution tracking and team metrics'
    },
    { 
      id: 'test-velocity', 
      label: 'Test Progress & Velocity', 
      icon: BarChart3,
      description: 'Team velocity tracking and progress analytics'
    },
    { 
      id: 'test-distribution', 
      label: 'Test Status Distribution', 
      icon: Target,
      description: 'Test status breakdown and module progress'
    },
    { 
      id: 'test-cases', 
      label: 'Test Case Management', 
      icon: CheckCircle,
      description: 'Test case organization and management'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'test-execution':
        return <TestManagementDashboard />;
      case 'test-velocity':
        return <TestProgressVelocity />;
      case 'test-distribution':
        return <TestStatusDistribution />;
      case 'test-cases':
        return <TestCaseManagement />;
      default:
        return <TestManagementDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <TestTube className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Test Management</h1>
            <p className="text-blue-100">Comprehensive test execution tracking and team performance metrics</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm text-blue-100">Total Cases</div>
            <div className="text-xs text-blue-200">↑ 3 new cases</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">70%</div>
            <div className="text-sm text-blue-100">Pass Rate</div>
            <div className="text-xs text-blue-200">↑ 5% improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">1/day</div>
            <div className="text-sm text-blue-100">Velocity</div>
            <div className="text-xs text-blue-200">↑ 0.2 increase</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">2</div>
            <div className="text-sm text-blue-100">Active Blockers</div>
            <div className="text-xs text-blue-200">↓ 1 resolved</div>
          </div>
        </div>
      </div>

      {/* Test Management Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Streamlined Test Operations</h3>
        <p className="text-gray-700 leading-relaxed">
          Transform your testing workflow with comprehensive execution tracking, real-time team performance metrics, 
          and intelligent test distribution analytics. Increase team productivity by 40% through data-driven insights 
          and streamlined test case management.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">Real-time Tracking</div>
              <div className="text-sm text-gray-600">Live test execution monitoring</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Users className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <div className="font-medium">Team Performance</div>
              <div className="text-sm text-gray-600">Individual and team metrics</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium">Quality Focus</div>
              <div className="text-sm text-gray-600">Quality-driven test execution</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sub-navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TestManagementTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-3 p-4 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
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