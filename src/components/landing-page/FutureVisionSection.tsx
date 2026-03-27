'use client';

import { motion } from 'framer-motion';
import {
  Lock,
  Activity,
  BarChart3,
  AlertTriangle,
  Brain,
  TrendingUp,
  DollarSign,
  Shield,
  Layers,
  Eye,
  Server,
  PieChart
} from 'lucide-react';

const futureModules = [
  {
    layer: 'L2',
    title: 'Operations Intelligence',
    status: 'Coming Soon',
    statusColor: 'bg-blue-100 text-blue-700 border-blue-200',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-200',
    features: [
      { icon: Activity, title: 'Predictive Incident Detection', description: 'Predict incidents using log patterns and anomaly detection before they impact services' },
      { icon: Brain, title: 'AI Monitoring Insights', description: 'AI-powered analysis of Splunk, Dynatrace and ServiceNow data for proactive operations' },
      { icon: AlertTriangle, title: 'Service Degradation Alerts', description: 'Early warning system for service health degradation with automated mitigation recommendations' },
    ]
  },
  {
    layer: 'L3',
    title: 'Enterprise Intelligence',
    status: 'Future Vision',
    statusColor: 'bg-orange-100 text-orange-700 border-orange-200',
    gradient: 'from-orange-500/10 to-red-500/10',
    borderColor: 'border-orange-200',
    features: [
      { icon: DollarSign, title: 'Cost Optimization', description: 'AI-driven infrastructure cost analysis and optimization recommendations across cloud providers' },
      { icon: PieChart, title: 'Business Analytics', description: 'Strategic analytics connecting IT delivery metrics to business outcomes and revenue impact' },
      { icon: Shield, title: 'License & Compliance Insights', description: 'Automated license usage tracking, compliance monitoring, and optimization suggestions' },
    ]
  }
];

export default function FutureVisionSection() {
  return (
    <section className="py-20 bg-gray-50" id="future-vision">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-200 border border-gray-300 rounded-full px-4 py-2 mb-6">
            <Eye className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 text-sm font-medium">Platform Roadmap</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What's Next
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            IntelliOps is designed as a 3-layer intelligence platform. While this demo focuses on Delivery Intelligence,
            here's a preview of upcoming capabilities.
          </p>
        </motion.div>

        {/* Future Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {futureModules.map((module, moduleIndex) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: moduleIndex * 0.15 }}
              className={`bg-gradient-to-br ${module.gradient} rounded-2xl border ${module.borderColor} overflow-hidden relative`}
            >
              {/* Blur overlay */}
              <div className="absolute inset-0 backdrop-blur-[1px] bg-white/30 z-10 pointer-events-none" />

              {/* Content */}
              <div className="relative z-20 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold bg-gray-200 text-gray-700 px-2 py-1 rounded">
                      {module.layer}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                  </div>
                  <div className={`flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${module.statusColor}`}>
                    <Lock className="w-3 h-3" />
                    <span>{module.status}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {module.features.map((feature, featureIndex) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (moduleIndex * 0.15) + (featureIndex * 0.05) }}
                        className="bg-white/60 rounded-xl p-4 border border-gray-200/50"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                            <Icon className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm">{feature.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 text-center">
                  <span className="text-xs text-gray-500 italic">Preview of upcoming capabilities</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}