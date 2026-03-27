'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Activity,
  BarChart3,
  BookOpen,
  Package,
  Monitor,
  AlertTriangle,
  Search,
  Zap,
  DollarSign,
  TrendingUp,
  Target,
  Shield,
  CheckCircle,
  ArrowRight,
  GitBranch,
  Users,
  Layers,
  Lock
} from 'lucide-react';

interface ThreeLayerPlatformOverviewProps {
  onNavigateToSection: (section: string) => void;
}

export default function ThreeLayerPlatformOverview({ onNavigateToSection }: ThreeLayerPlatformOverviewProps) {
  const layers = [
    {
      layerNumber: 1,
      id: 'delivery-intelligence',
      title: 'Delivery Intelligence',
      subtitle: 'Software Delivery Quality Insights',
      description: 'Transform historical defect, test execution, and release data into AI-driven insights about software delivery quality. Connect the tools your teams already use and see value within weeks.',
      gradient: 'from-purple-600 to-indigo-700',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-700',
      accentBorder: 'border-purple-500',
      lightBg: 'bg-purple-50',
      integrations: ['JIRA', 'XRAY', 'TestRail', 'Confluence', 'GitHub', 'GitLab', 'Jenkins'],
      accessLevel: 'Easiest to access',
      timeToValue: '2-4 weeks',
      annualSavings: '~$88K',
      modules: [
        {
          id: 'test-quality-intelligence',
          name: 'Test & Quality Intelligence',
          icon: Brain,
          metrics: { accuracy: '96%', timeSaved: '75%', qualityScore: '94.3' },
          features: ['AI defect pattern matching', 'Predictive quality analytics', 'Automated test optimization', 'Cross-release quality tracking']
        },
        {
          id: 'release-intelligence',
          name: 'Release Intelligence',
          icon: Package,
          metrics: { successRate: '98.2%', riskPrevention: '75%', deployScore: '87.3' },
          features: ['Smart release orchestration', 'Deployment risk prediction', 'Automated rollback decisions', 'Cross-branch fix tracking']
        },
        {
          id: 'knowledge-base',
          name: 'Application Knowledge Base',
          icon: BookOpen,
          metrics: { onboarding: '40%', articles: '1000+', retention: '95%' },
          features: ['AI-generated runbooks', 'Defect pattern knowledge', 'New joiner onboarding paths', 'System dependency mapping']
        }
      ]
    },
    {
      layerNumber: 2,
      id: 'operations-intelligence',
      title: 'Operations Intelligence',
      subtitle: 'Predictive Operational Monitoring',
      description: 'Turn production monitoring noise into predictive operational intelligence. Integrate Splunk and ServiceNow to detect incidents before they impact users and automate response workflows.',
      gradient: 'from-blue-600 to-cyan-700',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-700',
      accentBorder: 'border-blue-500',
      lightBg: 'bg-blue-50',
      integrations: ['Splunk', 'ServiceNow', 'Dynatrace', 'AppDynamics', 'PagerDuty'],
      accessLevel: 'Moderate access',
      timeToValue: '1-2 months',
      annualSavings: '~$160K',
      modules: [
        {
          id: 'service-health-intelligence',
          name: 'Service Health & Incident Intelligence',
          icon: Activity,
          metrics: { services: '150+', prevention: '94%', mttr: '12 min' },
          features: ['Real-time service monitoring', 'Predictive degradation alerts', 'AI incident classification', 'Automated resolution suggestions']
        }
      ]
    },
    {
      layerNumber: 3,
      id: 'enterprise-intelligence',
      title: 'Enterprise Intelligence',
      subtitle: 'Strategic Cost & Business Analytics',
      description: 'Enable enterprise-level cost optimization and strategic analytics. Connect SAP and cloud cost APIs to unlock financial intelligence that turns operational data into executive decisions.',
      gradient: 'from-orange-500 to-red-600',
      badgeBg: 'bg-orange-100',
      badgeText: 'text-orange-700',
      accentBorder: 'border-orange-500',
      lightBg: 'bg-orange-50',
      integrations: ['SAP', 'Flexera', 'AWS Cost Explorer', 'Azure Cost Mgmt', 'Workday'],
      accessLevel: 'Advanced access',
      timeToValue: '2-3 months',
      annualSavings: '~$255K',
      modules: [
        {
          id: 'business-intelligence',
          name: 'Business Intelligence & Analytics',
          icon: BarChart3,
          metrics: { costOpt: '~$95K', efficiency: '15%', roi: '~325%' },
          features: ['Financial intelligence dashboards', 'Software license optimization', 'Cloud cost intelligence', 'Executive strategic analytics']
        }
      ]
    }
  ];

  return (
    <section id="intelligence-layers" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
            <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Platform Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Three Intelligence Layers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            IntelliOps organizes operational intelligence into three progressive layers, each integrating with
            different enterprise systems. Adopt one layer at a time based on your integration readiness.
          </p>
        </motion.div>

        {/* Layer Cards */}
        <div className="space-y-8">
          {layers.map((layer, layerIndex) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: layerIndex * 0.15 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border ${layer.accentBorder} border-l-4 overflow-hidden`}
            >
              {/* Layer Header */}
              <div className={`bg-gradient-to-r ${layer.gradient} p-6 md:p-8 text-white`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm font-bold">
                        L{layer.layerNumber}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold">{layer.title}</h3>
                    </div>
                    <p className="text-white/90 text-lg mb-3">{layer.subtitle}</p>
                    <p className="text-white/80 text-sm max-w-3xl">{layer.description}</p>
                  </div>

                  {/* Layer Stats */}
                  <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 text-center flex-shrink-0">
                    <div>
                      <div className="text-3xl md:text-4xl font-bold">{layer.annualSavings}</div>
                      <div className="text-white/80 text-xs">Cumulative Annual Savings</div>
                    </div>
                    <div className="hidden md:block h-px w-16 bg-white/30 my-1" />
                    <div>
                      <div className="text-lg font-semibold">{layer.timeToValue}</div>
                      <div className="text-white/80 text-xs">Time to Value</div>
                    </div>
                  </div>
                </div>

                {/* Integration Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {layer.integrations.map(tool => (
                    <span key={tool} className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules within this layer */}
              <div className="p-6 md:p-8">
                <div className={`grid ${layer.modules.length > 1 ? 'md:grid-cols-3' : 'md:grid-cols-1 max-w-2xl'} gap-6`}>
                  {layer.modules.map((module) => {
                    const ModuleIcon = module.icon;
                    return (
                      <div key={module.id} className={`${layer.lightBg} dark:bg-gray-700/50 rounded-xl p-5`}>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`p-2 rounded-lg ${layer.badgeBg} dark:bg-gray-600`}>
                            <ModuleIcon className={`w-5 h-5 ${layer.badgeText} dark:text-gray-300`} />
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{module.name}</h4>
                        </div>

                        {/* Module Metrics */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {Object.entries(module.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
                              <div className="text-[10px] text-gray-500 dark:text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Features */}
                        <ul className="space-y-1.5 mb-4">
                          {module.features.map((feature, i) => (
                            <li key={i} className="flex items-start space-x-2 text-xs">
                              <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {layer.layerNumber === 1 ? (
                          <button
                            onClick={() => onNavigateToSection(module.id)}
                            className="w-full flex items-center justify-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 px-4 py-2 rounded-lg transition-colors"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div className="w-full flex flex-col items-center space-y-1 text-sm font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg cursor-not-allowed">
                            <div className="flex items-center space-x-2">
                              <Lock className="w-3.5 h-3.5" />
                              <span>{layer.layerNumber === 2 ? 'Coming Soon' : 'Future Vision'}</span>
                            </div>
                            <span className="text-[10px] text-gray-400">Preview of upcoming capabilities</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
