'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Activity,
  BarChart3,
  BookOpen,
  Package,
  Lock,
  AlertTriangle,
  DollarSign,
  Shield,
  PieChart,
  CheckCircle,
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  Eye,
  TrendingUp
} from 'lucide-react';
import IncidentIntelligencePreview from '@/components/release-management/IncidentIntelligencePreview';
import { useAuth } from '@/context/AuthContext';

interface ProductRoadmapSectionProps {
  onNavigateToSection: (section: string) => void;
}

interface LayerModule {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  metrics: Record<string, string>;
  features: string[];
}

interface LayerData {
  layerNumber: number;
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusColor: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
  lightBg: string;
  description: string;
  integrations: string[];
  timeToValue: string;
  annualSavings: string;
  modules: LayerModule[];
}

// L1 and L3 layer data (unchanged)
const l1Layer: LayerData = {
  layerNumber: 1,
  id: 'delivery-intelligence',
  title: 'Delivery Intelligence',
  subtitle: 'Software Delivery Quality Insights',
  status: 'Available Now',
  statusColor: 'bg-green-100 text-green-700 border-green-200',
  gradient: 'from-purple-600 to-indigo-700',
  badgeBg: 'bg-purple-100',
  badgeText: 'text-purple-700',
  accentBorder: 'border-purple-500',
  lightBg: 'bg-purple-50',
  description: 'Transform historical defect, test execution, and release data into AI-driven insights. Connect the tools your teams already use and see value within weeks.',
  integrations: ['JIRA', 'XRAY', 'TestRail', 'Confluence', 'GitHub', 'GitLab', 'Jenkins'],
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
};

const l3Layer: LayerData = {
  layerNumber: 3,
  id: 'enterprise-intelligence',
  title: 'Enterprise Intelligence',
  subtitle: 'Strategic Cost & Business Analytics',
  status: 'Future Vision',
  statusColor: 'bg-gray-100 text-gray-600 border-gray-200',
  gradient: 'from-gray-500 to-gray-600',
  badgeBg: 'bg-gray-100',
  badgeText: 'text-gray-700',
  accentBorder: 'border-gray-400',
  lightBg: 'bg-gray-50',
  description: 'Enable enterprise-level cost optimization and strategic analytics. Connect SAP and cloud cost APIs to unlock financial intelligence for executive decisions.',
  integrations: ['SAP', 'Flexera', 'AWS Cost Explorer', 'Azure Cost Mgmt', 'Workday'],
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
};

// Standard layer card renderer for L1 and L3
function StandardLayerCard({
  layer,
  layerIndex,
  onNavigateToSection,
  isAdmin = false,
}: {
  layer: LayerData;
  layerIndex: number;
  onNavigateToSection: (section: string) => void;
  isAdmin?: boolean;
}) {
  return (
    <motion.div
      key={layer.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: layerIndex * 0.15 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border ${layer.accentBorder} border-l-4 overflow-hidden hover:shadow-xl transition-shadow`}
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
              {(isAdmin && layer.layerNumber === 3) ? (
                <span className="text-xs font-bold px-3 py-1 rounded-full border bg-green-100 text-green-700 border-green-200">
                  Unlocked
                </span>
              ) : (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${layer.statusColor}`}>
                  {layer.status}
                </span>
              )}
            </div>
            <p className="text-white/90 text-lg mb-2">{layer.subtitle}</p>
            <p className="text-white/80 text-sm max-w-3xl">{layer.description}</p>
          </div>
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
        <div className="flex flex-wrap gap-2 mt-4">
          {layer.integrations.map(tool => (
            <span key={tool} className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-full">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="p-6 md:p-8">
        <div className={`grid ${layer.modules.length > 1 ? 'md:grid-cols-3' : 'md:grid-cols-1 max-w-2xl'} gap-6`}>
          {layer.modules.map((module) => {
            const ModuleIcon = module.icon;
            return (
              <div key={module.id} className={`${layer.lightBg} dark:bg-gray-700/50 rounded-xl p-5 hover:shadow-md transition-shadow`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${layer.badgeBg} dark:bg-gray-600`}>
                    <ModuleIcon className={`w-5 h-5 ${layer.badgeText} dark:text-gray-300`} />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{module.name}</h4>
                </div>
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
                <ul className="space-y-1.5 mb-4">
                  {module.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                {(layer.layerNumber === 1 || (isAdmin && layer.layerNumber === 3)) ? (
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
                      <span>{layer.status}</span>
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
  );
}

export default function ProductRoadmapSection({ onNavigateToSection }: ProductRoadmapSectionProps) {
  const { isAdmin } = useAuth();
  return (
    <section id="product-roadmap" className="py-20 bg-gray-50 dark:bg-gray-900">
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
            Product Roadmap & Intelligence Layers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            IntelliOps organizes operational intelligence into three progressive layers. Adopt one layer at a time
            based on your integration readiness — from delivery insights today to enterprise analytics tomorrow.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* ═══════════════════════════════════════════════════════ */}
          {/* L1 — Delivery Intelligence (standard card)            */}
          {/* ═══════════════════════════════════════════════════════ */}
          <StandardLayerCard
            layer={l1Layer}
            layerIndex={0}
            onNavigateToSection={onNavigateToSection}
          />

          {/* ═══════════════════════════════════════════════════════ */}
          {/* L2 — Operations Intelligence (PREVIEW — expanded)     */}
          {/* ═══════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-orange-400 border-l-4 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* L2 Header */}
            <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm font-bold">
                      L2
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold">Operations Intelligence</h3>
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border bg-green-400/30 border-green-300/50 text-white">
                        <CheckCircle className="w-3 h-3" />
                        Active — Live Intelligence
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border bg-white/20 border-white/30 text-white">
                        <Lock className="w-3 h-3" />
                        Preview
                      </span>
                    )}
                  </div>
                  <p className="text-white/90 text-lg mb-2">AI-powered production intelligence across logs, PRs, and collaboration signals</p>
                  <p className="text-white/80 text-sm max-w-3xl">
                    Turn production monitoring noise into predictive operational intelligence. Integrate Splunk and ServiceNow to detect incidents before they impact users.
                  </p>
                </div>
                <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 text-center flex-shrink-0">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold">~$160K</div>
                    <div className="text-white/80 text-xs">Cumulative Annual Savings</div>
                  </div>
                  <div className="hidden md:block h-px w-16 bg-white/30 my-1" />
                  <div>
                    <div className="text-lg font-semibold">1-2 months</div>
                    <div className="text-white/80 text-xs">Time to Value</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {['Splunk', 'ServiceNow', 'Dynatrace', 'AppDynamics', 'PagerDuty'].map(tool => (
                  <span key={tool} className="inline-block px-3 py-1 text-xs font-medium bg-white/20 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* L2 Body — Narrative + Incident Intelligence + Roadmap */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Incident Intelligence Preview Component */}
              <IncidentIntelligencePreview />

              {/* Predictive Operations Intelligence — Roadmap Card */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50 via-indigo-50/30 to-blue-50 dark:from-gray-700/50 dark:to-gray-700/30 rounded-xl border border-blue-200 dark:border-gray-600 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Predictive Operations Intelligence</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Proactive detection before impact</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {[
                    'Predict incidents before they occur using ML models trained on historical patterns',
                    'Identify high-risk services and configurations across the deployment pipeline',
                    'Detect recurring failure patterns and correlate across environments',
                    'Recommend preventive actions automatically based on operational intelligence',
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 bg-white/70 dark:bg-gray-600/50 rounded-lg border border-blue-100 dark:border-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700">
                    <Sparkles className="w-3.5 h-3.5" />
                    Next Phase — L2 Expansion
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* L3 — Enterprise Intelligence (admin only)              */}
          {/* ═══════════════════════════════════════════════════════ */}
          {isAdmin && (
            <StandardLayerCard
              layer={l3Layer}
              layerIndex={2}
              onNavigateToSection={onNavigateToSection}
              isAdmin={isAdmin}
            />
          )}
        </div>

        {/* Roadmap Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-5 py-3 border border-gray-200 dark:border-gray-700 shadow-sm">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isAdmin
                ? 'All intelligence layers active — full platform access enabled'
                : 'L2 Operations Intelligence is now in preview with live incident intelligence'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
