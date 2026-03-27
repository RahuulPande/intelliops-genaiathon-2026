'use client';

import { motion } from 'framer-motion';
import { Brain, Package, BookOpen, Search, Bot, BarChart3, Settings, CheckCircle, Sparkles } from 'lucide-react';

const deliveryFeatures = [
  {
    title: 'Test & Quality Intelligence',
    icon: Brain,
    gradient: 'from-purple-600 to-indigo-700',
    aiTags: [
      { label: 'RAG Match', color: 'bg-blue-100 text-blue-700' },
      { label: 'LLM Insight', color: 'bg-green-100 text-green-700' },
      { label: 'NLP Analysis', color: 'bg-purple-100 text-purple-700' },
    ],
    features: [
      'AI defect pattern matching across 5+ years of historical data',
      'RAG-powered root cause analysis with fix recommendations',
      'NLP-based defect classification and severity prediction',
      'Cross-release quality trend analysis using ML models',
    ],
    metrics: { accuracy: '96%', timeSaved: '75%', qualityScore: '94.3' },
  },
  {
    title: 'Release Intelligence',
    icon: Package,
    gradient: 'from-blue-600 to-cyan-700',
    aiTags: [
      { label: 'ML Prediction', color: 'bg-orange-100 text-orange-700' },
      { label: 'AI Assessment', color: 'bg-teal-100 text-teal-700' },
    ],
    features: [
      'ML-powered release risk prediction from historical data',
      'AI deployment readiness scoring across test coverage and defect trends',
      'Automated rollback decision support',
      'Cross-branch fix tracking and merge intelligence',
    ],
    metrics: { successRate: '98.2%', riskPrevention: '75%', deployScore: '87.3' },
  },
  {
    title: 'Application Knowledge Base',
    icon: BookOpen,
    gradient: 'from-green-600 to-emerald-700',
    aiTags: [
      { label: 'LLM Insight', color: 'bg-green-100 text-green-700' },
      { label: 'RAG Match', color: 'bg-blue-100 text-blue-700' },
    ],
    features: [
      'LLM-generated runbooks from defect and incident history',
      'RAG-based knowledge retrieval for new team members',
      'Automated system dependency mapping',
      'AI-curated onboarding learning paths',
    ],
    metrics: { onboarding: '40% faster', articles: '1000+', retention: '95%' },
  },
];

export default function DeliveryFeaturesSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900" id="delivery-features">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 text-sm font-medium">Layer 1 — Delivery Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Delivery Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Three interconnected modules that transform how banking delivery teams manage defects,
            releases, and institutional knowledge — each powered by specific AI techniques.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="space-y-8">
          {deliveryFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${feature.gradient} p-6 flex items-center justify-between`}>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {feature.aiTags.map(tag => (
                      <span key={tag.label} className={`text-xs font-bold px-2.5 py-1 rounded-full ${tag.color}`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 grid md:grid-cols-[1fr_auto] gap-8">
                  {/* Features List */}
                  <ul className="space-y-3">
                    {feature.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Metrics */}
                  <div className="flex md:flex-col gap-4 md:gap-3 items-center md:items-end justify-center md:justify-start">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="text-center md:text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
