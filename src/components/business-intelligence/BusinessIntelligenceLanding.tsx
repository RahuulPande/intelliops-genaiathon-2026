'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Server, 
  FileText, 
  Download,
  Target,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Building,
  PieChart
} from 'lucide-react';

export interface BusinessIntelligenceLandingProps {
  onNavigateToSection: (section: string) => void;
}

export default function BusinessIntelligenceLanding({ onNavigateToSection }: BusinessIntelligenceLandingProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const intelligenceSections = [
    {
      id: 'financial',
      title: 'Financial Intelligence',
      description: 'Cost optimization, budget tracking, and license utilization analysis',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      metrics: [
        { label: 'Monthly Spend', value: '$48K', change: '-12%' },
        { label: 'Savings Identified', value: '$13K', change: '+8%' },
        { label: 'ROI', value: '1,900%', change: '+15%' }
      ],
      quickActions: [
        { label: 'View Cost Dashboard', action: 'cost-analytics' },
        { label: 'License Optimization', action: 'license-management' },
        { label: 'Budget Reports', action: 'budget-tracking' }
      ],
      features: ['Real-time cost tracking', 'License utilization', 'Budget optimization', 'Spend forecasting']
    },
    {
      id: 'operational',
      title: 'Operational Intelligence',
      description: 'Real-time performance monitoring, API analytics, and system health tracking',
      icon: Zap,
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      metrics: [
        { label: 'Response Time', value: '200ms', change: '-5%' },
        { label: 'Throughput', value: '2,206/sec', change: '+12%' },
        { label: 'Uptime', value: '99.97%', change: '+0.02%' }
      ],
      quickActions: [
        { label: 'Performance Dashboard', action: 'performance' },
        { label: 'API Monitoring', action: 'monitoring' },
        { label: 'System Logs', action: 'logs' }
      ],
      features: ['Real-time monitoring', 'API analytics', 'Performance metrics', 'System health']
    },
    {
      id: 'business',
      title: 'Business Intelligence',
      description: 'Executive dashboards, business impact analysis, and strategic reporting',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-violet-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      metrics: [
        { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2' },
        { label: 'SLA Compliance', value: '99.97%', change: '+0.15%' },
        { label: 'MTTR', value: '12min', change: '-25%' }
      ],
      quickActions: [
        { label: 'Executive Dashboard', action: 'business' },
        { label: 'Impact Analysis', action: 'business-impact' },
        { label: 'Generate Reports', action: 'reports' }
      ],
      features: ['Executive reporting', 'Business metrics', 'Impact analysis', 'Strategic insights']
    }
  ];

  const overallStats = [
    { icon: Building, label: 'Services Monitored', value: '150+', color: 'text-blue-600' },
    { icon: Users, label: 'Daily Active Users', value: '12.5K', color: 'text-green-600' },
    { icon: CheckCircle, label: 'System Health', value: '97.2%', color: 'text-emerald-600' },
    { icon: Clock, label: 'Average Response', value: '200ms', color: 'text-purple-600' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold">Business Intelligence & Analytics</h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Transform operational data into strategic business insights through comprehensive financial, 
          operational, and business intelligence platforms for executive-level decision-making.
        </p>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {overallStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Purpose Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Platform Purpose</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          This comprehensive business intelligence platform combines technical monitoring data with financial 
          analytics to provide executive-level insights for strategic decision-making. Track operational 
          performance, optimize costs, and demonstrate business value through integrated dashboards and 
          automated reporting.
        </p>
      </motion.div>

      {/* Three Main Intelligence Section Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {intelligenceSections.map((section, index) => (
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
                    <div className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : metric.change.startsWith('-') && metric.label !== 'MTTR' ? 'text-red-600' : 'text-green-600'}`}>
                      {metric.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Features</h5>
                <div className="grid grid-cols-2 gap-1">
                  {section.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
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
                className="absolute inset-0 border-2 border-blue-400 rounded-xl pointer-events-none"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center bg-white rounded-xl p-8 shadow-sm border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Operations?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Select any intelligence section above to begin exploring your data and generating actionable insights 
          for strategic decision-making.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            onClick={() => onNavigateToSection('cost-analytics')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            <DollarSign className="w-5 h-5" />
            <span>Start with Financial Intelligence</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigateToSection('performance')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            <Activity className="w-5 h-5" />
            <span>View Operational Intelligence</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigateToSection('business')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Access Business Intelligence</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}