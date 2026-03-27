'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface LayerModule {
  layer: string;
  label: string;
  color: 'green' | 'blue' | 'amber' | 'red' | 'purple' | 'teal';
  modules: string[];
}

const layerModules: LayerModule[] = [
  {
    layer: 'L0',
    label: 'Plan Intelligence',
    color: 'green',
    modules: [
      'Requirement Intelligence (gap analysis, risk prediction, duplicate detection)',
      'Test Strategy Generation',
      'Dependency Graph Analysis'
    ]
  },
  {
    layer: 'L1',
    label: 'Build Intelligence',
    color: 'blue',
    modules: [
      'Change Intelligence (PR risk scoring, AI summaries, entity extraction)',
      'Code Quality Analysis',
      'Impact Assessment'
    ]
  },
  {
    layer: 'L2',
    label: 'Test Intelligence',
    color: 'amber',
    modules: [
      'Test & Quality Intelligence (defect matching, coverage analysis, test explorer)',
      'Flaky Test Detection',
      'Coverage Gap Analysis'
    ]
  },
  {
    layer: 'L3',
    label: 'Release Intelligence',
    color: 'red',
    modules: [
      'Release Intelligence (deployment risk, rollback planning)',
      'Application Knowledge Base',
      'Branch Conflict Detection'
    ]
  },
  {
    layer: 'L4',
    label: 'Operate Intelligence',
    color: 'purple',
    modules: [
      'Service Health & Incident Intelligence (root cause analysis, cross-system correlation)',
      'Predictive Failure Detection',
      'Real-Time Anomaly Detection'
    ]
  },
  {
    layer: 'L5',
    label: 'Learn Intelligence',
    color: 'teal',
    modules: [
      'Learning Intelligence (feedback loop, knowledge generation, model improvement)',
      'Pattern Learning',
      'Prevention Rule Generation'
    ]
  }
];

const crossLayerModules = [
  'Service Intelligence (unified cross-layer service dashboard)',
  'Technical Documentation',
  'Settings & Administration'
];

const colorConfig = {
  green: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', badge: 'bg-green-600', text: 'text-white' },
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-600', text: 'text-white' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', badge: 'bg-amber-600', text: 'text-white' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', badge: 'bg-red-600', text: 'text-white' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', badge: 'bg-purple-600', text: 'text-white' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-200 dark:border-teal-800', badge: 'bg-teal-600', text: 'text-white' }
};

export default function AdminModuleList() {
  return (
    <div className="space-y-6">
      {/* SDLC Layer Modules */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SDLC Layer Modules</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {layerModules.map((layer, idx) => {
            const config = colorConfig[layer.color];
            return (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${config.bg} border ${config.border} rounded-lg p-4`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`${config.badge} ${config.text} text-xs font-bold px-2 py-1 rounded`}>
                    {layer.layer}
                  </span>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                    {layer.label}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {layer.modules.map((module, midx) => (
                    <li key={midx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {module}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cross-Layer Modules */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cross-Layer Modules</h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          <ul className="space-y-2">
            {crossLayerModules.map((module, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {module}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
