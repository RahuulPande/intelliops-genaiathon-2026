'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  Brain, 
  Rocket, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Clock,
  Shield,
  Search,
  Bell
} from 'lucide-react';

interface PlatformCapabilitiesProps {
  onNavigateToSection: (section: string) => void;
}

export default function PlatformCapabilities({ onNavigateToSection }: PlatformCapabilitiesProps) {
  const capabilities = [
    {
      id: 'service-health-intelligence',
      icon: Activity,
      iconColor: 'text-blue-600',
      bgGradient: 'from-blue-500 to-cyan-600',
      title: 'Service Health & Incident Management',
      description: 'Real-time Splunk integration monitoring 150+ services with AI-powered incident prediction and automated response workflows',
      features: [
        'Continuous log analysis (10.2M daily events)',
        'Predictive service degradation alerts', 
        'Auto-incident creation and routing',
        'AI-suggested resolutions (96% accuracy)'
      ],
      keyMetrics: [
        { label: 'Services Monitored', value: '150+' },
        { label: 'Prevention Rate', value: '94%' },
        { label: 'MTTR', value: '12 min' }
      ],
      savings: 'Saves: $4.84M annually',
      businessImpact: 'Eliminates reactive firefighting through predictive intelligence',
      integrationBadge: '🔍 Splunk Integration Active'
    },
    {
      id: 'test-quality-intelligence',
      icon: Brain,
      iconColor: 'text-purple-600',
      bgGradient: 'from-purple-500 to-indigo-600',
      title: 'Intelligent Test & Quality Management',
      description: 'AI-driven defect matching and quality assurance with predictive analytics and comprehensive test management',
      features: [
        'Historical defect pattern matching',
        'Predictive quality analytics',
        'Automated test management',
        'Cross-release quality tracking'
      ],
      keyMetrics: [
        { label: 'AI Accuracy', value: '96%' },
        { label: 'Time Saved', value: '75%' },
        { label: 'Quality Score', value: '94.3' }
      ],
      savings: 'Saves: $136K annually',
      businessImpact: 'Transforms reactive debugging into predictive quality assurance',
      integrationBadge: '🧠 AI-Powered Intelligence'
    },
    {
      id: 'release-intelligence',
      icon: Rocket,
      iconColor: 'text-green-600',
      bgGradient: 'from-green-500 to-emerald-600',
      title: 'Release Management with AI Intelligence',
      description: 'Prevent costly branch merge issues and deployment failures with AI-powered release orchestration and risk assessment',
      features: [
        'Cross-branch merge tracking',
        'Deployment risk prediction',
        'Automated release readiness',
        'Cost impact analysis'
      ],
      keyMetrics: [
        { label: 'Deploy Success', value: '98.2%' },
        { label: 'Risk Prevention', value: '75%' },
        { label: 'Health Score', value: '87.3' }
      ],
      savings: 'Prevents: $500K in deployment issues',
      businessImpact: 'Eliminates expensive production failures through intelligent orchestration',
      integrationBadge: '🚀 Release Automation'
    },
    {
      id: 'business-intelligence',
      icon: BarChart3,
      iconColor: 'text-orange-600',
      bgGradient: 'from-orange-500 to-red-600',
      title: 'Business Intelligence & Analytics',
      description: 'Executive-level insights combining operational metrics with financial analytics for strategic decision-making',
      features: [
        'Cost optimization analytics',
        'Performance intelligence',
        'ROI tracking and reporting',
        'Executive dashboards'
      ],
      keyMetrics: [
        { label: 'Cost Optimization', value: '$1.14M' },
        { label: 'Efficiency Gain', value: '25%' },
        { label: 'ROI Tracking', value: '1,232%' }
      ],
      savings: 'Optimizes: $1.14M in operational efficiency',
      businessImpact: 'Provides strategic insights for data-driven operational decisions',
      integrationBadge: '📊 Executive Intelligence'
    }
  ];

  const platformStats = [
    { icon: CheckCircle, label: 'Features', value: '20+', description: 'Complete AI-powered platform' },
    { icon: Zap, label: 'Automation', value: '94%', description: 'Incident response automation' },
    { icon: Target, label: 'Accuracy', value: '96%', description: 'AI defect matching precision' },
    { icon: Clock, label: 'MTTR', value: '12min', description: 'Average resolution time' }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Complete AI-Powered Operations Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Three intelligence layers working together to transform reactive operations
            into predictive, automated, and cost-effective workflows.
          </p>
          
          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {platformStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200"
              >
                <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capability Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${capability.bgGradient} p-6 text-white relative overflow-hidden`}>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                      <capability.icon className={`w-6 h-6 text-white`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{capability.title}</h3>
                      <div className="text-xs bg-white/20 rounded px-2 py-1 mt-1 inline-block">
                        {capability.integrationBadge}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 leading-relaxed">{capability.description}</p>
                </div>
                
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="w-full h-full bg-white rounded-full transform translate-x-8 -translate-y-8"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Key Metrics */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Current Performance</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {capability.keyMetrics.map((metric) => (
                      <div key={metric.label} className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                        <div className="text-xs text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Capabilities</h4>
                  <div className="space-y-2">
                    {capability.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Business Impact */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-green-800 font-medium mb-1">{capability.businessImpact}</p>
                      <p className="text-sm text-green-700 font-semibold">{capability.savings}</p>
                    </div>
                  </div>
                </div>

                {/* Explore Button */}
                <motion.button
                  onClick={() => onNavigateToSection(capability.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all group"
                >
                  <span className="font-medium">Explore {capability.title.split(' ')[0]} Platform</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Integrated Intelligence Advantage</h3>
          <p className="text-blue-100 mb-6 max-w-3xl mx-auto">
            Unlike point solutions, IntelliOps AI's integrated platform creates exponential value. 
            Service health data improves defect matching accuracy. Release intelligence prevents deployment issues. 
            Business analytics optimize resource allocation. Everything works together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Shield className="w-8 h-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">Unified Intelligence</div>
              <div className="text-sm text-blue-100">
                AI learns across all modules, improving accuracy and reducing false positives
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Zap className="w-8 h-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">Exponential ROI</div>
              <div className="text-sm text-blue-100">
                Integrated workflows create compound savings beyond individual module benefits
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <Target className="w-8 h-8 mx-auto mb-3" />
              <div className="font-semibold mb-2">Strategic Advantage</div>
              <div className="text-sm text-blue-100">
                Complete operational intelligence platform, not disconnected tools
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}