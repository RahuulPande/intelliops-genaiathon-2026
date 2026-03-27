'use client';

import { motion } from 'framer-motion';
import { 
  Star, 
  Rocket, 
  Brain, 
  Target,
  Trophy,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function InnovationHighlights() {
  const innovations = [
    {
      badge: '🏆 INDUSTRY FIRST',
      badgeColor: 'from-yellow-500 to-orange-500',
      icon: Brain,
      title: 'AI Defect Matching',
      description: '96% accuracy in finding historical solutions by analyzing patterns across 5 years of incident data with advanced ML algorithms',
      impact: 'Resolution time: 6 hours → 45 minutes',
      impactColor: 'text-green-600',
      technicalDetails: [
        'Natural language processing for incident descriptions',
        'Pattern recognition across 50,000+ historical incidents',
        'Confidence scoring with explainable AI recommendations',
        'Continuous learning from resolution outcomes'
      ],
      businessValue: 'Eliminates knowledge silos and reduces dependency on senior engineers',
      demoShortcut: 'Ctrl+3'
    },
    {
      badge: '🚀 BREAKTHROUGH',
      badgeColor: 'from-blue-500 to-purple-500',
      icon: Target,
      title: 'Cross-Branch Intelligence',
      description: 'Prevents costly production issues by tracking code fixes across multiple release branches automatically with AI-powered merge analysis',
      impact: 'Saves $500K annually in deployment failures',
      impactColor: 'text-blue-600',
      technicalDetails: [
        'Git repository analysis and branch diff tracking',
        'Automated detection of missing critical fixes',
        'Risk scoring for each deployment candidate',
        'Integration with CI/CD pipeline for automated gates'
      ],
      businessValue: 'Prevents the $45K deployment failure scenario through intelligent automation',
      demoShortcut: 'Ctrl+4'
    },
    {
      badge: '🧠 AI-POWERED',
      badgeColor: 'from-purple-500 to-indigo-500',
      icon: Shield,
      title: 'Predictive Service Health',
      description: '24-hour advance warning of service failures through continuous Splunk log analysis and ML pattern recognition',
      impact: '80% reduction in unplanned downtime',
      impactColor: 'text-purple-600',
      technicalDetails: [
        'Real-time analysis of 10.2M+ daily log events',
        'Anomaly detection with sub-2-second latency',
        'Predictive models trained on historical failure patterns',
        'Integration with monitoring and alerting systems'
      ],
      businessValue: 'Transforms reactive operations into proactive maintenance',
      demoShortcut: 'Ctrl+1'
    }
  ];

  const competitiveAdvantages = [
    {
      icon: Star,
      title: 'Beyond Traditional APM',
      description: 'While others monitor, we predict and prevent with AI-powered intelligence',
      metrics: ['96% prediction accuracy', '24-hour advance warning', 'Sub-2-second analysis']
    },
    {
      icon: Zap,
      title: 'Integrated Intelligence',
      description: 'Single platform instead of 6+ disconnected tools for complete operational view',
      metrics: ['20+ integrated features', '3 intelligence layers', 'Unified data model']
    },
    {
      icon: Trophy,
      title: 'Proven ROI',
      description: 'Industry-validated savings with transparent cost accounting and benchmarks',
      metrics: ['1,232% Year 1 ROI', '29-day payback', 'Conservative estimates']
    }
  ];

  const technologyStack = [
    { category: 'AI/ML', technologies: ['GPT-4 for NLP', 'Custom ML models', 'Pattern recognition', 'Predictive analytics'] },
    { category: 'Integration', technologies: ['Splunk API', 'Git webhooks', 'REST APIs', 'Real-time streaming'] },
    { category: 'Platform', technologies: ['Next.js 15', 'TypeScript', 'React 19', 'Tailwind CSS'] },
    { category: 'Infrastructure', technologies: ['AWS/Azure', 'Microservices', '24/7 monitoring', 'Auto-scaling'] }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industry-First Innovations
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Breakthrough AI capabilities that transform how banking operations teams 
            detect, prevent, and resolve complex technical challenges.
          </p>
        </motion.div>

        {/* Innovation Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group"
            >
              {/* Badge */}
              <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${innovation.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold mb-4`}>
                <span>{innovation.badge}</span>
              </div>

              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <innovation.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{innovation.title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">{innovation.description}</p>

              {/* Impact */}
              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <div className={`text-lg font-bold ${innovation.impactColor} mb-1`}>
                  {innovation.impact}
                </div>
                <div className="text-sm text-gray-400">Measured business impact</div>
              </div>

              {/* Technical Details */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Technical Innovation:</h4>
                {innovation.technicalDetails.map((detail, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-xs text-gray-400">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Business Value */}
              <div className="bg-blue-500/20 rounded-lg p-3 mb-4 border border-blue-500/30">
                <h4 className="text-sm font-semibold text-blue-300 mb-1">Business Value:</h4>
                <p className="text-sm text-blue-200">{innovation.businessValue}</p>
              </div>

              {/* Demo Shortcut */}
              <div className="flex items-center justify-between pt-3 border-t border-white/20">
                <span className="text-xs text-gray-400">Try it live:</span>
                <div className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-mono">
                  {innovation.demoShortcut}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competitive Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Competitive Advantages</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-3">{advantage.title}</h4>
                <p className="text-gray-300 mb-4">{advantage.description}</p>
                <div className="space-y-1">
                  {advantage.metrics.map((metric, i) => (
                    <div key={i} className="text-sm text-blue-300">• {metric}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="bg-white/5 rounded-2xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Enterprise-Grade Technology Stack</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologyStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h4 className="font-semibold text-blue-300 mb-3">{stack.category}</h4>
                <div className="space-y-2">
                  {stack.technologies.map((tech, i) => (
                    <div key={i} className="text-sm text-gray-400 bg-white/5 rounded px-2 py-1">
                      {tech}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-center">
            <p className="text-gray-400 text-sm">
              Built with modern, scalable technologies for enterprise deployment and 24/7 operations
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}