'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, Brain, CheckCircle, Zap, Shield, Target } from 'lucide-react';

const impactMetrics = [
  {
    icon: Clock,
    value: '60–70%',
    label: 'Faster Defect Triage',
    description: 'AI-powered defect matching and RAG-based root cause analysis dramatically reduce time from defect report to resolution start',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Zap,
    value: '50%',
    label: 'Reduced Release Coordination',
    description: 'Automated release readiness scoring, risk prediction, and deployment intelligence cut manual coordination effort in half',
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Users,
    value: '40%',
    label: 'Faster Onboarding',
    description: 'AI-curated knowledge base transforms institutional knowledge into structured learning paths for new team members',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Brain,
    value: 'Significant',
    label: 'Reduced SME Dependency',
    description: 'Codified expertise through RAG-powered knowledge retrieval means teams can resolve issues without waiting for subject matter experts',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Shield,
    value: '↓ 40%',
    label: 'Release Risk Reduction',
    description: 'ML-driven risk scoring and deployment readiness assessment reduce production incidents by identifying high-risk releases before deployment',
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Target,
    value: '↑ 30%',
    label: 'Deployment Confidence',
    description: 'AI-powered go/no-go recommendations and multi-factor release health scoring increase team confidence in deployment decisions',
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50'
  }
];

export default function DeliveryImpactSection() {
  return (
    <section className="py-20 bg-white" id="delivery-impact">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-700 text-sm font-medium">Measurable Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Delivery Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IntelliOps AI transforms every stage of the software delivery lifecycle — from defect
            triage to release coordination to team onboarding.
          </p>
        </motion.div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${metric.color} rounded-xl flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}>
                      {metric.value}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.label}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{metric.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs text-gray-400 italic">
            * Projections based on enterprise banking benchmarks and internal simulations. Actual results vary by organization maturity and integration depth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}