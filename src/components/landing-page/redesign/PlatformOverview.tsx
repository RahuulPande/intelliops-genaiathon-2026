'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  Brain, 
  GitBranch, 
  BarChart3, 
  Monitor, 
  Search, 
  Shield, 
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  Users,
  DollarSign,
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface PlatformOverviewProps {
  onNavigateToSection: (section: string) => void;
}

export default function PlatformOverview({ onNavigateToSection }: PlatformOverviewProps) {
  const platformModules = [
    {
      id: 'service-health-intelligence',
      title: 'Service Health & Incident Management',
      subtitle: 'Continuous Monitoring & Intelligent Response',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      metrics: {
        services: '150+',
        uptime: '94%',
        mttr: '12min',
        accuracy: '90%'
      },
      capabilities: [
        'Continuous log analysis across all services',
        'Predictive service degradation alerts',
        'Auto-incident creation with AI categorization',
        'AI-supported resolution recommendations'
      ],
      keyFeatures: [
        { icon: Monitor, label: 'Real-time Service Monitoring' },
        { icon: AlertTriangle, label: 'Intelligent Alert Management' },
        { icon: Search, label: 'Advanced Log Analysis' },
        { icon: Zap, label: 'Automated Incident Response' }
      ],
      businessValue: 'Reduces MTTR by 75% and prevents 90% of potential service outages'
    },
    {
      id: 'intelligent-test-quality',
      title: 'Intelligent Test & Quality Management',
      subtitle: 'AI-Driven Quality Assurance & Testing',
      icon: Brain,
      color: 'from-purple-500 to-violet-500',
      metrics: {
        accuracy: '96%',
        timeSaved: '75%',
        qualityScore: '94.3',
        defectsMatched: '50K+'
      },
      capabilities: [
        'Historical defect pattern matching',
        'Predictive quality analytics and forecasting',
        'Automated test management and optimization',
        'Cross-release quality tracking and insights'
      ],
      keyFeatures: [
        { icon: Brain, label: 'AI Defect Pattern Recognition' },
        { icon: TrendingUp, label: 'Predictive Quality Analytics' },
        { icon: Target, label: 'Automated Test Optimization' },
        { icon: CheckCircle, label: 'Quality Score Tracking' }
      ],
      businessValue: 'Improves defect detection by 96% accuracy and reduces testing time by 75%'
    },
    {
      id: 'release-intelligence',
      title: 'Release Management with AI Intelligence',
      subtitle: 'Smart Deployment & Risk Assessment',
      icon: GitBranch,
      color: 'from-green-500 to-emerald-500',
      metrics: {
        successRate: '98.2%',
        riskPrevention: '75%',
        deploymentScore: '87.3',
        releases: '200+/month'
      },
      capabilities: [
        'Smart release orchestration and planning',
        'Predictive failure analysis before deployment',
        'Automated rollback decisions and execution',
        'Cross-team impact assessment and coordination'
      ],
      keyFeatures: [
        { icon: GitBranch, label: 'Smart Release Orchestration' },
        { icon: Shield, label: 'Predictive Risk Analysis' },
        { icon: Zap, label: 'Automated Rollback Management' },
        { icon: Users, label: 'Cross-team Coordination' }
      ],
      businessValue: 'Prevents 75% of deployment failures and reduces release risk by 60%'
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence & Analytics',
      subtitle: 'Executive Insights & Strategic Analytics',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      metrics: {
        costOptimization: '$1.14M',
        efficiencyGain: '25%',
        roi: '1,232%',
        insights: '500+'
      },
      capabilities: [
        'Executive-level insights and dashboards',
        'Operational metrics correlation and analysis',
        'Cost optimization recommendations',
        'Strategic decision support with data backing'
      ],
      keyFeatures: [
        { icon: BarChart3, label: 'Executive Dashboards' },
        { icon: DollarSign, label: 'Cost Optimization Analysis' },
        { icon: TrendingUp, label: 'Performance Correlation' },
        { icon: Target, label: 'Strategic Decision Support' }
      ],
      businessValue: 'Delivers $1.14M in cost optimization and 25% operational efficiency gains'
    }
  ];

  return (
    <section id="platform-overview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete AI-Powered Operations Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Three intelligence layers transforming reactive operations into proactive,
            data-driven excellence across your entire IT infrastructure
          </p>
        </motion.div>

        {/* Platform Modules Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {platformModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Module Header */}
              <div className={`bg-gradient-to-r ${module.color} p-6 text-white`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <module.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{module.title}</h3>
                    <p className="text-white/90">{module.subtitle}</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(module.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold">{value}</div>
                      <div className="text-white/80 text-xs capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Content */}
              <div className="p-6">
                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {module.keyFeatures.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <feature.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Capabilities</h4>
                  <ul className="space-y-2">
                    {module.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Value */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Value</h4>
                  <p className="text-gray-600 text-sm">{module.businessValue}</p>
                </div>

                {/* Explore Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigateToSection(module.id)}
                  className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${module.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all`}
                >
                  <span>Explore Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Integrated Platform Benefits</h3>
          
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">20+</div>
              <div className="text-blue-200">Integrated Features</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">Single</div>
              <div className="text-blue-200">Unified Interface</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-blue-200">Autonomous Operation</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">99.99%</div>
              <div className="text-blue-200">Platform Reliability</div>
            </div>
          </div>

          <p className="text-blue-100 max-w-4xl mx-auto mb-6">
            Unlike point solutions, IntelliOps AI provides a unified platform where all modules 
            share intelligence, creating compound benefits that exceed the sum of individual capabilities.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigateToSection('roi-calculator')}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Calculate Your Platform ROI
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}