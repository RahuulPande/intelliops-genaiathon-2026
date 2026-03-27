'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Brain, AlertTriangle, Rocket, BarChart3, Settings, Monitor, Smartphone, Shield, Database, Cpu, GitBranch, Layers, Zap, Users, Globe, Clock, CheckCircle } from 'lucide-react';

interface FeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeatureCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  features: {
    name: string;
    description: string;
    icon: React.ElementType;
  }[];
}

const featureCategories: FeatureCategory[] = [
  {
    id: 'monitoring',
    title: 'Real-Time Monitoring',
    icon: Monitor,
    color: 'blue',
    features: [
      { name: 'Service Health Dashboard', description: '150+ services monitored continuously', icon: Activity },
      { name: 'Performance Metrics', description: 'Real-time response time and throughput', icon: BarChart3 },
      { name: 'Resource Utilization', description: 'CPU, memory, and disk monitoring', icon: Cpu },
      { name: 'Database Performance', description: 'Query performance and connection pools', icon: Database }
    ]
  },
  {
    id: 'ai-intelligence',
    title: 'AI Intelligence',
    icon: Brain,
    color: 'purple',
    features: [
      { name: 'Defect Pattern Matching', description: '96% accuracy in defect identification', icon: Brain },
      { name: 'Predictive Analytics', description: 'Forecast issues 24 hours in advance', icon: Zap },
      { name: 'Anomaly Detection', description: 'ML-powered behavior analysis', icon: Shield },
      { name: 'Root Cause Analysis', description: 'Automated issue diagnosis', icon: Settings },
      { name: 'Smart Alerting', description: 'Context-aware notifications', icon: AlertTriangle }
    ]
  },
  {
    id: 'incident-management',
    title: 'Incident Management',
    icon: AlertTriangle,
    color: 'red',
    features: [
      { name: 'Live Alert Dashboard', description: 'Real-time incident tracking', icon: AlertTriangle },
      { name: 'Automated Escalation', description: 'Smart routing based on severity', icon: Users },
      { name: 'Resolution Tracking', description: 'From detection to resolution', icon: CheckCircle },
      { name: 'Post-Incident Analysis', description: 'Learn from every incident', icon: BarChart3 }
    ]
  },
  {
    id: 'release-management',
    title: 'Release Management',
    icon: Rocket,
    color: 'green',
    features: [
      { name: 'Release Readiness', description: 'Automated go/no-go decisions', icon: Rocket },
      { name: 'Test Management', description: 'Comprehensive test tracking', icon: CheckCircle },
      { name: 'Deployment Pipeline', description: 'CI/CD integration and monitoring', icon: GitBranch }
    ]
  },
  {
    id: 'analytics-reports',
    title: 'Analytics & Reports',
    icon: BarChart3,
    color: 'indigo',
    features: [
      { name: 'Executive Dashboard', description: 'High-level KPIs and trends', icon: BarChart3 },
      { name: 'Cost Analytics', description: 'Operational cost tracking', icon: BarChart3 },
      { name: 'Performance Reports', description: 'Detailed performance analysis', icon: Clock },
      { name: 'Export Suite', description: 'PDF, Excel, and CSV exports', icon: Settings }
    ]
  },
  {
    id: 'platform-features',
    title: 'Platform Features',
    icon: Layers,
    color: 'gray',
    features: [
      { name: 'Mobile Responsive', description: 'Works on all devices', icon: Smartphone },
      { name: 'Global Search', description: 'Find anything instantly', icon: Settings },
      { name: 'Demo Control Panel', description: 'Perfect for presentations', icon: Settings },
      { name: 'Security & Compliance', description: 'Enterprise-grade security', icon: Shield }
    ]
  }
];

const colorVariants = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  indigo: 'bg-indigo-500',
  gray: 'bg-gray-500'
};

export default function FeaturesModal({ isOpen, onClose }: FeaturesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <Layers className="w-6 h-6 mr-2" />
                    20+ Enterprise Features
                  </h2>
                  <p className="text-blue-100 mt-1">
                    Complete platform covering every aspect of IT operations
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid gap-8">
                {featureCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                    className="space-y-4"
                  >
                    {/* Category Header */}
                    <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                      <div className={`p-2 rounded-lg ${colorVariants[category.color as keyof typeof colorVariants]} text-white`}>
                        <category.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.features.length} features
                        </p>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.features.map((feature, featureIndex) => (
                        <motion.div
                          key={`${category.id}-${feature.name}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: categoryIndex * 0.1 + featureIndex * 0.05 
                          }}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                              <feature.icon className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">
                                {feature.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🏆 Complete Enterprise Platform
                    </h3>
                    <p className="text-gray-600 mb-4">
                      All 3 intelligence layers work together to deliver up to ~$255K in cumulative annual savings
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">150+</div>
                        <div className="text-sm text-gray-600">Services Monitored</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">96%</div>
                        <div className="text-sm text-gray-600">AI Accuracy</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">4,500+</div>
                        <div className="text-sm text-gray-600">Banks Can Benefit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}