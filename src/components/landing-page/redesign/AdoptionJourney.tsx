'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Rocket,
  Expand,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  Layers
} from 'lucide-react';

interface AdoptionJourneyProps {
  onNavigateToSection: (section: string) => void;
}

export default function AdoptionJourney({ onNavigateToSection }: AdoptionJourneyProps) {
  const stages = [
    {
      phase: 'Start',
      timeline: 'Week 1-4',
      layer: 'Delivery Intelligence',
      layerNumber: 1,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      bgLight: 'bg-purple-50',
      borderColor: 'border-purple-400',
      textColor: 'text-purple-700',
      roi: '~$88K',
      description: 'Connect JIRA, GitHub, and TestRail. Start generating AI-driven insights on defect patterns, test quality, and release readiness from data your teams already produce.',
      integrations: ['JIRA', 'GitHub', 'Jenkins'],
      milestones: [
        'Defect pattern intelligence active',
        'Release risk scoring operational',
        'Knowledge base auto-generating'
      ],
      navigateTo: 'test-quality-intelligence'
    },
    {
      phase: 'Expand',
      timeline: 'Month 2-3',
      layer: 'Operations Intelligence',
      layerNumber: 2,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      bgLight: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-700',
      roi: '~$160K',
      description: 'Integrate Splunk and ServiceNow. Transform production monitoring data into predictive intelligence that detects incidents before they impact users.',
      integrations: ['Splunk', 'ServiceNow', 'Dynatrace'],
      milestones: [
        'Predictive alerting operational',
        'Automated incident workflows',
        'Cross-layer AI correlation active'
      ],
      navigateTo: 'service-health-intelligence'
    },
    {
      phase: 'Elevate',
      timeline: 'Month 4+',
      layer: 'Enterprise Intelligence',
      layerNumber: 3,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      bgLight: 'bg-orange-50',
      borderColor: 'border-orange-400',
      textColor: 'text-orange-700',
      roi: '~$255K',
      description: 'Connect SAP and cloud cost APIs. Unlock financial intelligence, license optimization, and executive dashboards that demonstrate full platform ROI.',
      integrations: ['SAP', 'Flexera', 'Cloud APIs'],
      milestones: [
        'Financial dashboards live',
        'License optimization active',
        'Full executive reporting enabled'
      ],
      navigateTo: 'business-intelligence'
    }
  ];

  return (
    <section id="adoption-journey" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full mb-6">
            <Rocket className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Adoption Model</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Progressive Enterprise Adoption
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            IntelliOps is designed for progressive adoption. Start with the integrations your teams
            already have access to and expand as the platform proves value at each stage.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector Line (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0" />
          <div className="hidden lg:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-orange-500 -translate-y-1/2 z-0" style={{ width: '100%' }} />

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-t-4 ${stage.borderColor} p-6 relative`}
              >
                {/* Phase Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center space-x-2 ${stage.bgLight} dark:bg-gray-700 px-3 py-1.5 rounded-full`}>
                    <span className={`font-bold text-sm ${stage.textColor} dark:text-gray-200`}>{stage.phase}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{stage.timeline}</span>
                  </div>
                </div>

                {/* Layer Title */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded text-[10px] font-bold bg-gradient-to-r ${stage.gradient} text-white`}>
                    L{stage.layerNumber}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{stage.layer}</h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {stage.description}
                </p>

                {/* ROI */}
                <div className={`${stage.bgLight} dark:bg-gray-700 rounded-lg p-3 mb-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className={`w-4 h-4 ${stage.textColor} dark:text-gray-300`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cumulative Annual ROI</span>
                    </div>
                    <span className={`text-xl font-bold ${stage.textColor} dark:text-white`}>{stage.roi}</span>
                  </div>
                </div>

                {/* Integration Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {stage.integrations.map(tool => (
                    <span key={tool} className="inline-block px-2 py-0.5 text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Milestones */}
                <div className="space-y-2 mb-5">
                  {stage.milestones.map((milestone, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{milestone}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => onNavigateToSection(stage.navigateTo)}
                  className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${stage.gradient} text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:shadow-lg transition-all`}
                >
                  <span>Explore {stage.layer}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Each layer is independently valuable. Organizations typically begin with Delivery Intelligence
            and expand to Operations and Enterprise Intelligence as integration access is approved.
            The platform delivers ROI at every stage.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
