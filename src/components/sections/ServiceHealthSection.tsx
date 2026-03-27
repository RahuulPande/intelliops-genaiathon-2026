'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Brain,
  Bell,
  BarChart3,
  Zap,
  Home,
  Search,
  AlertTriangle,
  Shield,
  BrainCircuit,
  TrendingUp,
  Network,
  Code,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ServiceHealthIncidentLanding from '@/components/service-health-incident-management/ServiceHealthIncidentLanding';
import ContinuousLogAnalysis from '@/components/service-health-incident-management/real-time-monitoring/ContinuousLogAnalysis';
import AutoIncidentGeneration from '@/components/service-health-incident-management/incident-orchestration/AutoIncidentGeneration';
import IntelligentAlertManagement from '@/components/service-health-incident-management/intelligent-alert-management/IntelligentAlertManagement';
import IncidentExplorerWorkspace from '@/components/operations/IncidentExplorerWorkspace';

// Import available dashboard components
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import PerformanceMonitoring from '@/components/dashboard/PerformanceMonitoring';
import PredictiveAnalytics from '@/components/dashboard/PredictiveAnalytics';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import SystemDependenciesSection from '@/components/application-knowledge-base/SystemDependenciesSection';
import CodeHealthInsightsSection from '@/components/application-knowledge-base/CodeHealthInsightsSection';

type ServiceHealthTab =
  | 'overview'
  | 'real-time-monitoring'
  | 'incident-orchestration'
  | 'intelligent-alert-management'
  | 'operations-intelligence'
  | 'predictive-analytics'
  | 'ai-insights'
  | 'system-dependencies'
  | 'code-health'
  // Legacy support for direct navigation
  | 'service-health'
  | 'incidents-alerts'
  | 'continuous-log-analysis'
  | 'auto-incident-generation';

export default function ServiceHealthSection() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<ServiceHealthTab>('overview');

  const mainTabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: Home,
      description: 'Service Health & Incident Management overview'
    },
    { 
      id: 'real-time-monitoring', 
      label: 'Real-Time Monitoring', 
      icon: Activity,
      description: 'Continuous Splunk integration and service health'
    },
    { 
      id: 'incident-orchestration', 
      label: 'Incident Orchestration', 
      icon: Zap,
      description: 'Automated incident workflows and AI resolution'
    },
    { 
      id: 'intelligent-alert-management', 
      label: 'Intelligent Alert Management', 
      icon: BrainCircuit,
      description: 'AI-powered alert fatigue management and noise reduction'
    },
    {
      id: 'operations-intelligence',
      label: 'Operations Intelligence',
      icon: BarChart3,
      description: 'Service health trends and predictive analytics'
    },
    {
      id: 'predictive-analytics',
      label: 'Predictive Analytics',
      icon: TrendingUp,
      description: 'Service failure predictions and capacity planning'
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: Lightbulb,
      description: 'Real-time AI-generated operational insights'
    },
    {
      id: 'system-dependencies',
      label: 'System Dependencies',
      icon: Network,
      description: 'Service interaction and dependency mapping'
    },
    {
      id: 'code-health',
      label: 'Code Health',
      icon: Code,
      description: 'Quality metrics and improvement recommendations'
    }
  ];

  // Handle navigation from landing page and legacy routes
  const handleNavigateToSection = (section: string) => {
    // Map legacy sections and specific actions to new structure
    const sectionMapping: Record<string, ServiceHealthTab> = {
      // Real-Time Monitoring mappings
      'service-health': 'real-time-monitoring',
      'continuous-log-analysis': 'real-time-monitoring',
      'service-dashboard': 'real-time-monitoring',
      'splunk-integration': 'real-time-monitoring',
      
      // Intelligent Alert Management mappings
      'incidents-alerts': 'intelligent-alert-management',
      'smart-alerts': 'intelligent-alert-management',
      'alert-correlation': 'intelligent-alert-management',
      'automated-alerting': 'intelligent-alert-management',
      
      // Incident Orchestration mappings
      'auto-incident-generation': 'incident-orchestration',
      'incident-workflows': 'incident-orchestration',
      'ai-resolution': 'incident-orchestration',
      'incident-automation': 'incident-orchestration',
      
      // Operations Intelligence mappings
      'service-analytics': 'operations-intelligence',
      'health-trends': 'operations-intelligence',
      'predictive-analytics': 'predictive-analytics',
      'cost-impact': 'operations-intelligence',
      'system-dependencies': 'system-dependencies',
      'code-health': 'code-health',
      'ai-insights': 'ai-insights'
    };

    const targetTab = sectionMapping[section] || section as ServiceHealthTab;
    setActiveTab(targetTab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return isAdmin ? (
          <IncidentExplorerWorkspace />
        ) : (
          <ServiceHealthIncidentLanding onNavigateToSection={handleNavigateToSection} />
        );
      
      case 'real-time-monitoring':
        return (
          <div className="space-y-6">
            <ContinuousLogAnalysis />
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Enhanced Service Health Dashboard</h4>
              <PerformanceMonitoring />
            </div>
          </div>
        );
      

      
      case 'incident-orchestration':
        return <AutoIncidentGeneration />;
      
      case 'intelligent-alert-management':
        return <IntelligentAlertManagement />;
      
      case 'operations-intelligence':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Operations Intelligence Overview</h3>
              <p className="text-gray-700 mb-4">
                Advanced service health analytics and predictive incident intelligence powered by Splunk, ServiceNow, and Dynatrace integrations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">$1.49M</div>
                  <div className="text-sm text-gray-600">Annual Savings</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">99.7%</div>
                  <div className="text-sm text-gray-600">Service Uptime</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-purple-600">12min</div>
                  <div className="text-sm text-gray-600">Average MTTR</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl font-bold text-orange-600">89</div>
                  <div className="text-sm text-gray-600">Patterns Identified</div>
                </div>
              </div>
            </div>
            <PredictiveAnalytics />
            <AIInsightsPanel />
          </div>
        );

      case 'predictive-analytics':
        return <PredictiveAnalytics />;

      case 'ai-insights':
        return <AIInsightsPanel />;

      case 'system-dependencies':
        return <SystemDependenciesSection />;

      case 'code-health':
        return <CodeHealthInsightsSection />;
      
      // Legacy direct navigation support
      case 'service-health':
      case 'continuous-log-analysis':
        setActiveTab('real-time-monitoring');
        return renderContent();
      
      case 'incidents-alerts':
        setActiveTab('intelligent-alert-management');
        return renderContent();
      
      case 'auto-incident-generation':
        setActiveTab('incident-orchestration');
        return renderContent();
      
      default:
        return <ServiceHealthIncidentLanding onNavigateToSection={handleNavigateToSection} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="w-8 h-8" />
          <div>
            <p className="text-sm font-medium text-blue-200 mb-1">Operations Intelligence</p>
            <h1 className="text-3xl font-bold">Service Health & Incident Intelligence</h1>
            <p className="text-blue-100 text-lg">Real-time service monitoring with AI-powered incident detection and automated response workflows</p>
          </div>
        </div>
        
        {/* Navigation Hint */}
        <div className="mt-6 text-center">
          {isAdmin ? (
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-white/20 border border-white/30 text-white">
                <Activity className="w-3 h-3" />
                Interactive AI Simulation — Development Mode
              </span>
            </div>
          ) : (
            <p className="text-blue-100 text-sm">
              Navigate through tabs below to explore real-time monitoring, intelligent alerting, incident orchestration, and operations intelligence
            </p>
          )}
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
                  onClick={() => setActiveTab(tab.id as ServiceHealthTab)}
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