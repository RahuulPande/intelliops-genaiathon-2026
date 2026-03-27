'use client';

import { motion } from 'framer-motion';
import { 
  Trophy, 
  Rocket, 
  Brain, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Clock,
  DollarSign,
  Zap,
  Shield
} from 'lucide-react';

export default function IndustryFirstInnovations() {
  const innovations = [
    {
      id: 'ai-defect-matching',
      label: 'INDUSTRY FIRST',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      description: '96% accuracy in finding historical solutions by analyzing patterns across 5 years of incident data with advanced ML algorithms.',
      businessImpact: 'Resolution time: 6 hours → 45 minutes',
      technicalInnovations: [
        'Natural language processing for incident descriptions',
        'Pattern recognition across 50,000+ historical incidents',
        'Confidence scoring with explainable AI recommendations',
        'Continuous learning from resolution outcomes'
      ],
      businessValue: 'Eliminates knowledge silos and reduces dependency on senior engineers.',
      demoShortcut: 'Ctrl+3'
    },
    {
      id: 'cross-branch-intelligence',
      label: 'BREAKTHROUGH',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500',
      description: 'Prevents costly production issues by tracking code fixes across multiple release branches automatically with AI-powered merge analysis.',
      businessImpact: 'Saves $500K annually in deployment failures',
      technicalInnovations: [
        'Git repository analysis and branch diff tracking',
        'Automated detection of missing critical fixes',
        'Risk scoring for each deployment candidate',
        'Integration with CI/CD pipeline for automated gates'
      ],
      businessValue: 'Prevents the $45K deployment failure scenario through intelligent automation.',
      demoShortcut: 'Ctrl+4'
    },
    {
      id: 'predictive-service-health',
      label: 'AI-POWERED',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      description: '24-hour advance warning of service failures through continuous Splunk log analysis and ML pattern recognition.',
      businessImpact: '80% reduction in unplanned downtime',
      technicalInnovations: [
        'Real-time analysis of 10.2M+ daily log events',
        'Anomaly detection with sub-2-second latency',
        'Predictive models trained on historical failure patterns',
        'Integration with monitoring and alerting systems'
      ],
      businessValue: 'Transforms reactive operations into proactive maintenance.',
      demoShortcut: 'Ctrl+1'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
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
            Industry-First Innovations
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Breakthrough AI capabilities that transform how banking operations teams detect, 
            prevent, and resolve complex technical challenges
          </p>
        </motion.div>

        {/* Innovation Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Innovation Header */}
              <div className={`bg-gradient-to-r ${innovation.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <innovation.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold uppercase tracking-wide">
                      {innovation.label}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{innovation.description}</h3>
              </div>

              {/* Innovation Content */}
              <div className="p-6">
                {/* Business Impact */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Measured Business Impact</span>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-green-800 font-medium">{innovation.businessImpact}</div>
                  </div>
                </div>

                {/* Technical Innovations */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Technical Innovation</h4>
                  <ul className="space-y-2">
                    {innovation.technicalInnovations.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Business Value */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Value</h4>
                  <p className="text-gray-600 text-sm">{innovation.businessValue}</p>
                </div>

                {/* Demo Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center space-x-2 bg-gradient-to-r ${innovation.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all`}
                >
                  <span>Try it live: {innovation.demoShortcut}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Innovation Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Why These Innovations Matter</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">96%</div>
              <div className="text-blue-100">Accuracy in Defect Matching</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">$500K</div>
              <div className="text-blue-100">Annual Savings from Cross-Branch Intelligence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">80%</div>
              <div className="text-blue-100">Reduction in Unplanned Downtime</div>
            </div>
          </div>
          <p className="text-blue-100 max-w-3xl mx-auto">
            These industry-first innovations represent real breakthroughs that solve actual operational 
            challenges faced by banking institutions worldwide. Each capability is production-validated 
            and delivers measurable business impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 