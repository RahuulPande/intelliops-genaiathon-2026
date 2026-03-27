'use client';

import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Clock, 
  DollarSign,
  Users,
  TrendingDown,
  Brain,
  Target,
  CheckCircle,
  Zap,
  Shield
} from 'lucide-react';
import { defaultTeamConfig } from '@/lib/utils/realisticROI';

export default function ProblemSolution() {
  const painPoints = [
    {
      icon: Clock,
      metric: "6.2 hours",
      description: "Average incident resolution time",
      impact: "Manual troubleshooting and knowledge gaps"
    },
    {
      icon: Users,
      metric: "35%",
      description: "Of engineer time on manual monitoring",
      impact: "Reactive instead of predictive operations"
    },
    {
      icon: DollarSign,
      metric: "$47K",
      description: "Cost per engineer departure",
      impact: "Knowledge walks out the door"
    },
    {
      icon: TrendingDown,
      metric: "180 min",
      description: "Monthly unplanned downtime",
      impact: "$5,600 per minute business impact"
    }
  ];

  const solutionBenefits = [
    {
      icon: Brain,
      title: "96% Accurate AI Defect Matching",
      description: "Historical pattern analysis finds proven solutions instantly",
      improvement: "6 hours → 45 minutes resolution"
    },
    {
      icon: Target,
      title: "Predictive Service Intelligence",
      description: "24-hour advance warning prevents service failures",
      improvement: "180 min → 72 min downtime"
    },
    {
      icon: Zap,
      title: "Automated Workflow Orchestration",
      description: "Intelligent automation reduces manual monitoring overhead",
      improvement: "35% → 25% time on monitoring"
    },
    {
      icon: Shield,
      title: "Permanent Knowledge Retention",
      description: "AI captures and preserves institutional knowledge",
      improvement: "40% faster new joiner ramp-up"
    }
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
            From <span className="text-red-600">Operational Gaps</span> to <span className="text-green-600">Intelligent Solution</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Banking IT teams invest heavily but waste 40% of time on manual processes. 
            IntelliOps AI transforms reactive operations into predictive intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Problem Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-l-4 border-red-500">
              <div className="flex items-center space-x-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">The {defaultTeamConfig.totalAnnualCost.toLocaleString()} Problem</h3>
                  <p className="text-red-600 font-medium">100-person engineering team annual investment</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Banks invest millions in engineering talent but lose efficiency to manual processes, 
                reactive incident response, and knowledge gaps. Critical institutional knowledge 
                disappears when engineers leave, forcing teams to rediscover solutions repeatedly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={point.metric}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-4 border border-red-200"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <point.icon className="w-5 h-5 text-red-600" />
                      <span className="text-xl font-bold text-red-600">{point.metric}</span>
                    </div>
                    <p className="text-gray-900 font-medium text-sm mb-1">{point.description}</p>
                    <p className="text-gray-600 text-xs">{point.impact}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solution Statement */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-l-4 border-green-500">
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">AI-Powered Intelligence Solution</h3>
                  <p className="text-green-600 font-medium">Transform reactive to predictive operations</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                IntelliOps AI captures institutional knowledge, automates complex workflows, 
                and provides predictive insights. Teams become proactive instead of reactive, 
                with AI-powered assistance for every operational challenge.
              </p>

              <div className="space-y-4">
                {solutionBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-4 border border-green-200"
                  >
                    <div className="flex items-start space-x-3">
                      <benefit.icon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{benefit.description}</p>
                        <div className="bg-green-100 rounded px-2 py-1 inline-block">
                          <span className="text-green-800 text-xs font-medium">
                            Impact: {benefit.improvement}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transformation Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">The Transformation Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">$5.77M</div>
                <div className="text-blue-100">Net Annual Savings</div>
                <div className="text-blue-200 text-sm">Conservative, verified estimates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">1,232%</div>
                <div className="text-blue-100">Year 1 ROI</div>
                <div className="text-blue-200 text-sm">29-day payback period</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">99.7%</div>
                <div className="text-blue-100">Service Uptime</div>
                <div className="text-blue-200 text-sm">Through predictive intelligence</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-blue-100 italic">
                "From 100-person team struggling with reactive operations to an intelligent, 
                predictive platform that prevents issues before they impact business."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}