'use client';

import { motion } from 'framer-motion';
import { Brain, Search, Bot, BarChart3, Settings, BookOpen, Database, Sparkles } from 'lucide-react';

const aiCapabilities = [
  {
    title: 'Test & Quality Intelligence',
    gradient: 'from-purple-600 to-indigo-700',
    techniques: [
      { icon: Search, label: 'RAG', badge: 'RAG Match', badgeColor: 'bg-blue-100 text-blue-700', description: 'Retrieve similar defects from 5+ years of historical data using vector embeddings and semantic similarity search' },
      { icon: Bot, label: 'LLM', badge: 'LLM Insight', badgeColor: 'bg-green-100 text-green-700', description: 'Generate root cause analysis and fix recommendations using large language models with contextual reasoning' },
      { icon: Brain, label: 'NLP', badge: 'NLP Analysis', badgeColor: 'bg-purple-100 text-purple-700', description: 'Parse and understand defect descriptions, extract entities, classify severity and impacted modules automatically' },
    ]
  },
  {
    title: 'Release Intelligence',
    gradient: 'from-blue-600 to-cyan-700',
    techniques: [
      { icon: BarChart3, label: 'ML', badge: 'ML Prediction', badgeColor: 'bg-orange-100 text-orange-700', description: 'Predict release risks using trained models on historical release data, defect density, and code churn metrics' },
      { icon: Settings, label: 'AI', badge: 'AI Assessment', badgeColor: 'bg-teal-100 text-teal-700', description: 'Evaluate deployment readiness and failure probability through multi-factor AI scoring across test coverage, defect trends, and dependency health' },
      { icon: Brain, label: 'ML', badge: 'Pattern Intelligence', badgeColor: 'bg-orange-100 text-orange-700', description: 'Detect recurring deployment failure patterns and correlate release outcomes across environments to prevent repeated incidents' },
    ]
  },
  {
    title: 'Application Knowledge Base',
    gradient: 'from-green-600 to-emerald-700',
    techniques: [
      { icon: Bot, label: 'LLM', badge: 'LLM Insight', badgeColor: 'bg-green-100 text-green-700', description: 'Convert raw defects, incidents, and resolutions into structured, reusable knowledge articles with AI-generated summaries' },
      { icon: Search, label: 'RAG', badge: 'RAG Match', badgeColor: 'bg-blue-100 text-blue-700', description: 'Context-aware retrieval of relevant knowledge articles, past solutions, and module expertise for new team members' },
      { icon: Database, label: 'LLM', badge: 'Knowledge Generation', badgeColor: 'bg-green-100 text-green-700', description: 'Auto-generate onboarding guides, system dependency maps, and runbook drafts from historical incident and resolution data' },
    ]
  }
];

export default function AIUsageSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800" id="ai-usage">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">AI / ML / RAG Architecture</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How AI Powers Delivery Intelligence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Each intelligence module is powered by specific AI techniques — RAG, ML, NLP, and LLM —
            engineered for enterprise banking delivery workflows.
          </p>
        </motion.div>

        {/* AI Capabilities Grid */}
        <div className="space-y-8">
          {aiCapabilities.map((capability, capIndex) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: capIndex * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden"
            >
              {/* Capability Header */}
              <div className={`bg-gradient-to-r ${capability.gradient} p-6`}>
                <h3 className="text-2xl font-bold text-white">{capability.title}</h3>
              </div>

              {/* Techniques */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {capability.techniques.map((tech, techIndex) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.badge}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (capIndex * 0.1) + (techIndex * 0.05) }}
                      className="bg-gray-700/50 rounded-xl p-5 border border-gray-600 hover:border-gray-500 transition-colors"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gray-600/50 rounded-lg">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${tech.badgeColor}`}>
                          {tech.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{tech.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-700/50 rounded-lg px-4 py-3 border border-gray-600">
            <Database className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">
              All AI models operate on enterprise data with full audit trails and explainability
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}