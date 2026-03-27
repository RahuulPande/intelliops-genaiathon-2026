'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TestTube, 
  TrendingUp, 
  Zap, 
  CheckCircle,
  Target,
  BarChart3,
  Activity,
  AlertTriangle,
  Clock,
  Users,
  Star,
  ArrowRight,
  Award,
  ShieldCheck,
  Cpu,
  TrendingDown
} from 'lucide-react';

export interface IntelligentTestQualityLandingProps {
  onNavigateToSection: (section: string) => void;
}

export default function IntelligentTestQualityLanding({ onNavigateToSection }: IntelligentTestQualityLandingProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const qualityMetrics = [
    { icon: Target, label: 'Defect Match Accuracy', value: '96%', color: 'text-green-600' },
    { icon: Clock, label: 'Resolution Time Saved', value: '2,340h', color: 'text-blue-600' },
    { icon: TestTube, label: 'Tests Executed', value: '1,247', color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Quality Score', value: '94.2', color: 'text-emerald-600' }
  ];

  const qualitySections = [
    {
      id: 'defect-intelligence',
      title: 'Defect Intelligence',
      description: 'AI-powered defect matching and resolution with 96% accuracy',
      icon: Brain,
      gradient: 'from-purple-500 to-indigo-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      metrics: [
        { label: 'Matches Found', value: '12,847', change: '+23%' },
        { label: 'Time Saved', value: '2,340h', change: '+18%' },
        { label: 'Success Rate', value: '96%', change: '+2%' }
      ],
      quickActions: [
        { label: 'View AI Insights', action: 'defect-insights' },
        { label: 'Match Defects', action: 'defect-matching' },
        { label: 'Analyze Patterns', action: 'defect-analytics' }
      ],
      features: ['AI Pattern Recognition', 'Historical Analysis', 'Solution Recommendations', 'Predictive Insights'],
      businessValue: 'Reduce incident resolution time by 75% through intelligent defect matching'
    },
    {
      id: 'test-management',
      title: 'Test Management',
      description: 'Comprehensive test execution tracking and team performance metrics',
      icon: TestTube,
      gradient: 'from-blue-500 to-cyan-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      metrics: [
        { label: 'Total Cases', value: '15', change: '+3' },
        { label: 'Pass Rate', value: '70%', change: '+5%' },
        { label: 'Velocity', value: '1/day', change: '+0.2' }
      ],
      quickActions: [
        { label: 'Test Dashboard', action: 'test-execution' },
        { label: 'Execution Reports', action: 'test-reports' },
        { label: 'Velocity Analysis', action: 'test-velocity' }
      ],
      features: ['Test Execution Tracking', 'Team Performance', 'Velocity Metrics', 'Status Distribution'],
      businessValue: 'Streamline test processes and improve team productivity by 40%'
    },
    {
      id: 'quality-insights',
      title: 'Quality Insights',
      description: 'Predictive quality analytics and release readiness assessment',
      icon: BarChart3,
      gradient: 'from-green-500 to-teal-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      metrics: [
        { label: 'Critical Risks', value: '1', change: '-2' },
        { label: 'Monthly Savings', value: '$5,561', change: '+12%' },
        { label: 'Active Alerts', value: '3', change: '-1' }
      ],
      quickActions: [
        { label: 'Quality Dashboard', action: 'quality-metrics' },
        { label: 'Risk Assessment', action: 'risk-analysis' },
        { label: 'Trend Analysis', action: 'quality-trends' }
      ],
      features: ['Quality Scoring', 'Risk Assessment', 'Trend Analysis', 'Release Readiness'],
      businessValue: 'Prevent quality issues and reduce post-release defects by 60%'
    },
    {
      id: 'performance-intelligence',
      title: 'Performance Intelligence',
      description: 'Performance testing analytics and bottleneck identification',
      icon: Zap,
      gradient: 'from-orange-500 to-red-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      metrics: [
        { label: 'Performance Score', value: 'Coming Soon', change: '' },
        { label: 'Load Tests', value: 'Advanced', change: '' },
        { label: 'Optimization', value: 'Analytics', change: '' }
      ],
      quickActions: [
        { label: 'Performance Dashboard', action: 'performance-testing' },
        { label: 'Bottleneck Analysis', action: 'bottleneck-identification' },
        { label: 'Optimization', action: 'performance-optimization' }
      ],
      features: ['Performance Testing', 'Load Analysis', 'Bottleneck Detection', 'Optimization Insights'],
      businessValue: 'Identify performance bottlenecks before they impact users'
    }
  ];

  const achievementStats = [
    { icon: Award, label: 'Quality Achievements', value: '15', description: 'Major milestones reached' },
    { icon: ShieldCheck, label: 'Defects Prevented', value: '1,247', description: 'Issues caught early' },
    { icon: Cpu, label: 'AI Predictions', value: '3,421', description: 'Accurate forecasts made' },
    { icon: TrendingDown, label: 'Bug Escape Rate', value: '0.02%', description: 'Industry leading quality' }
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
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          <Brain className="w-8 h-8 text-purple-600" />
          <h1 className="text-4xl font-bold">Intelligent Test & Quality Management</h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Transform your quality management with AI-driven defect resolution, predictive testing insights, 
          and comprehensive quality analytics. From intelligent defect matching to performance optimization, 
          ensure exceptional software quality while reducing time-to-resolution by 75%.
        </p>

        {/* Key Quality Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {qualityMetrics.map((metric, index) => (
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

      {/* Platform Purpose */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI-Powered Quality Assurance Platform</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our comprehensive platform combines intelligent defect resolution, advanced test management, 
          predictive quality analytics, and performance intelligence to deliver exceptional software quality. 
          Move beyond traditional testing to a predictive, AI-driven approach that prevents issues before they impact users.
        </p>
      </motion.div>

      {/* Four Main Quality Management Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {qualitySections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
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
              <h4 className="font-semibold text-gray-900 mb-3">Key Metrics</h4>
              <div className="grid grid-cols-3 gap-3">
                {section.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                    {metric.change && (
                      <div className={`text-xs ${
                        metric.change.startsWith('+') ? 'text-green-600' : 
                        metric.change.startsWith('-') && metric.label !== 'Critical Risks' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {metric.change}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Key Features</h5>
                <div className="grid grid-cols-2 gap-1">
                  {section.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Value */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">{section.businessValue}</p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 mt-4">
                <h5 className="text-sm font-medium text-gray-700">Quick Actions</h5>
                {section.quickActions.map((action) => (
                  <motion.button
                    key={action.action}
                    onClick={() => onNavigateToSection(action.action)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span className="text-gray-700">{action.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </motion.button>
                ))}
              </div>
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
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Quality Management Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievementStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                  <stat.icon className="w-6 h-6 text-purple-600" />
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
        transition={{ duration: 0.6, delay: 1.0 }}
        className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Quality Management?</h3>
        <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
          Select any quality management section above to begin leveraging AI-powered insights, 
          comprehensive test management, and predictive analytics for exceptional software quality.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            onClick={() => onNavigateToSection('defect-matching')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <Brain className="w-5 h-5" />
            <span>Start with Defect Intelligence</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigateToSection('test-execution')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <TestTube className="w-5 h-5" />
            <span>Explore Test Management</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigateToSection('quality-metrics')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-green-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <BarChart3 className="w-5 h-5" />
            <span>View Quality Insights</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}