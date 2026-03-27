'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Brain, 
  GitBranch, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Zap,
  DollarSign,
  Clock,
  Target,
  Shield,
  Users,
  ArrowRight,
  Star,
  Cpu,
  BarChart3,
  Calendar,
  GitMerge,
  Activity
} from 'lucide-react';

export interface ReleaseManagementLandingProps {
  onNavigateToSection: (section: string) => void;
}

export default function ReleaseManagementLanding({ onNavigateToSection }: ReleaseManagementLandingProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const releaseMetrics = [
    { icon: GitBranch, label: 'Branch Consistency', value: '94%', color: 'text-green-600' },
    { icon: Brain, label: 'AI Health Score', value: '87.3', color: 'text-blue-600' },
    { icon: Shield, label: 'Deployment Success', value: '98.2%', color: 'text-purple-600' },
    { icon: DollarSign, label: 'Cost Savings', value: '$180K', color: 'text-emerald-600' }
  ];

  const releaseIntelligenceSections = [
    {
      id: 'release-readiness',
      title: 'Release Readiness',
      description: 'AI-powered release health scoring and intelligent go/no-go decisions',
      icon: Shield,
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      aiFeatures: [
        'AI Release Health Score (87.3/100)',
        'Cross-Branch Dependency Analysis',
        'Intelligent Go/No-Go Decisions',
        'Predictive Risk Assessment'
      ],
      metrics: [
        { label: 'Health Score', value: '87.3', change: '+3.2' },
        { label: 'Risk Level', value: 'Low', change: '↓ Medium' },
        { label: 'Readiness', value: '94%', change: '+6%' }
      ],
      businessValue: 'Reduce deployment risks by 75% through AI-powered release assessment',
      costSavings: '$45,000 monthly from prevented production issues'
    },
    {
      id: 'deployment-intelligence',
      title: 'Deployment Intelligence',
      description: 'AI branch management and smart merge conflict prevention',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      aiFeatures: [
        'AI Branch Management System',
        'Smart Merge Conflict Prevention',
        'Deployment Risk Prediction',
        'Environment Readiness Analytics'
      ],
      metrics: [
        { label: 'Missing Merges', value: '3', change: '↓ 7' },
        { label: 'Conflicts Prevented', value: '12', change: '+5' },
        { label: 'Deploy Success', value: '98%', change: '+4%' }
      ],
      businessValue: 'Prevent costly merge issues that can cost $45K per incident',
      costSavings: '$127,000 annually from automated branch management'
    },
    {
      id: 'release-analytics',
      title: 'Release Analytics',
      description: 'Comprehensive release performance and cost impact analysis',
      icon: BarChart3,
      gradient: 'from-green-500 to-teal-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      aiFeatures: [
        'Release Performance Intelligence',
        'Deployment Success Patterns',
        'Cross-Release Impact Analysis',
        'Cost of Issues Analytics'
      ],
      metrics: [
        { label: 'Cycle Time', value: '14 days', change: '↓ 3 days' },
        { label: 'Success Rate', value: '98%', change: '+4%' },
        { label: 'Cost Impact', value: '$8K', change: '↓ $15K' }
      ],
      businessValue: 'Optimize release cycles and reduce time-to-market by 25%',
      costSavings: '$89,000 annually from improved release efficiency'
    }
  ];

  const realWorldProblem = {
    title: "The $45,000 Merge Problem",
    scenario: "Developer fixes critical defect for August release but forgets to merge to October branch.",
    consequences: [
      "Same defect appears in October production",
      "Emergency hotfix required ($15,000)",
      "Regression testing across all modules ($20,000)",
      "Customer impact and reputation damage ($10,000)"
    ],
    aiSolution: "AI Branch Intelligence automatically detects missing merges and prevents costly oversights"
  };

  const aiCapabilities = [
    {
      icon: GitBranch,
      title: 'Cross-Branch Fix Tracking',
      description: 'AI monitors all defect fixes across release branches',
      impact: '90% reduction in missing merges'
    },
    {
      icon: Brain,
      title: 'Predictive Risk Assessment',
      description: 'ML models predict deployment risks before they occur',
      impact: '75% fewer production incidents'
    },
    {
      icon: GitMerge,
      title: 'Smart Merge Recommendations',
      description: 'AI suggests optimal merge strategies and conflict resolution',
      impact: '60% faster merge conflict resolution'
    },
    {
      icon: Target,
      title: 'Release Optimization',
      description: 'AI optimizes deployment schedules and resource allocation',
      impact: '25% faster release cycles'
    }
  ];

  const achievementStats = [
    { icon: DollarSign, label: 'Annual Savings', value: '$180K', description: 'From prevented issues' },
    { icon: Clock, label: 'Time Reduction', value: '75%', description: 'Faster issue resolution' },
    { icon: Shield, label: 'Success Rate', value: '98.2%', description: 'Deployment success' },
    { icon: TrendingUp, label: 'Efficiency Gain', value: '340%', description: 'ROI improvement' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold">Release Management with AI Intelligence</h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Prevent costly branch management issues and deployment risks with AI-powered release orchestration. 
          From intelligent branch tracking to automated merge conflict prevention, ensure seamless delivery 
          while saving hundreds of thousands in development costs.
        </p>

        {/* Key Release Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {releaseMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Real-World Problem Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 border-l-4 border-red-500"
      >
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{realWorldProblem.title}</h2>
            <p className="text-lg text-gray-700 mb-4 font-medium">{realWorldProblem.scenario}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-red-900 mb-3">Costly Consequences:</h3>
                <ul className="space-y-2">
                  {realWorldProblem.consequences.map((consequence, index) => (
                    <li key={index} className="flex items-center space-x-2 text-red-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{consequence}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>AI Solution:</span>
                </h3>
                <p className="text-green-700">{realWorldProblem.aiSolution}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Capabilities Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">AI-Powered Release Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <capability.icon className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{capability.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{capability.description}</p>
              <div className="text-xs font-medium text-purple-700 bg-purple-50 rounded px-2 py-1">
                {capability.impact}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Three Main Release Intelligence Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid md:grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {releaseIntelligenceSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            onMouseEnter={() => setHoveredCard(section.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${section.gradient} p-6 text-white`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 ${section.iconBg} rounded-lg`}>
                  <section.icon className={`w-6 h-6 ${section.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
              </div>
              <p className="text-white/90">{section.description}</p>
            </div>

            {/* Metrics Preview */}
            <div className="p-6 space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3">Current Metrics</h4>
              <div className="grid grid-cols-3 gap-3">
                {section.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                    <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                  </div>
                ))}
              </div>

              {/* AI Features */}
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">AI Features</h5>
                <div className="space-y-1">
                  {section.aiFeatures.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Brain className="w-3 h-3 text-purple-500" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                  <div className="text-xs text-purple-600 font-medium">+{section.aiFeatures.length - 3} more features</div>
                </div>
              </div>

              {/* Business Value */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium mb-1">{section.businessValue}</p>
                <p className="text-xs text-green-600">{section.costSavings}</p>
              </div>

              {/* Quick Action */}
              <motion.button
                onClick={() => onNavigateToSection(section.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mt-4"
              >
                <span className="text-gray-700 font-medium">Explore {section.title}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </motion.button>
            </div>

            {/* Hover Effect Indicator */}
            {hoveredCard === section.id && (
              <motion.div
                layoutId="card-hover"
                className="absolute inset-0 border-2 border-purple-400 rounded-xl pointer-events-none"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Release Management Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievementStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Transform Your Release Operations</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Stop losing money to preventable deployment issues. Let AI intelligence guide your release decisions 
          and save hundreds of thousands in development costs while ensuring seamless deployments.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            onClick={() => onNavigateToSection('deployment-intelligence')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <Brain className="w-5 h-5" />
            <span>AI Branch Management</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigateToSection('release-readiness')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <Shield className="w-5 h-5" />
            <span>Release Health Score</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigateToSection('release-analytics')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-green-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Cost Impact Analysis</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}