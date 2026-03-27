'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Database, Zap, Brain } from 'lucide-react';

interface LayerProcessing {
  layer: string;
  label: string;
  color: 'green' | 'blue' | 'amber' | 'red' | 'purple' | 'teal';
  dataSources: string[];
  ingestion: string;
  aiTechniques: { name: string; color: 'llm' | 'rag' | 'ml' | 'nlp' }[];
  output: string[];
}

const layerProcessing: LayerProcessing[] = [
  {
    layer: 'L0',
    label: 'Plan Intelligence',
    color: 'green',
    dataSources: ['Jira', 'Azure DevOps', 'Confluence'],
    ingestion: 'REST API polling + webhooks',
    aiTechniques: [
      { name: 'NLP', color: 'nlp' },
      { name: 'RAG', color: 'rag' },
      { name: 'ML', color: 'ml' }
    ],
    output: ['Requirement gaps', 'Risk scores', 'Test strategy', 'Dependency graph']
  },
  {
    layer: 'L1',
    label: 'Build Intelligence',
    color: 'blue',
    dataSources: ['GitHub', 'GitLab', 'Bitbucket'],
    ingestion: 'Webhooks (real-time)',
    aiTechniques: [
      { name: 'ML', color: 'ml' },
      { name: 'LLM', color: 'llm' },
      { name: 'NLP', color: 'nlp' }
    ],
    output: ['PR risk scores', 'AI summaries', 'Change impact analysis']
  },
  {
    layer: 'L2',
    label: 'Test Intelligence',
    color: 'amber',
    dataSources: ['TestRail', 'Playwright', 'Selenium', 'CI pipelines'],
    ingestion: 'Pipeline-trigger events',
    aiTechniques: [
      { name: 'RAG', color: 'rag' },
      { name: 'ML', color: 'ml' },
      { name: 'NLP', color: 'nlp' }
    ],
    output: ['Defect correlations', 'Coverage analysis', 'Flaky test detection']
  },
  {
    layer: 'L3',
    label: 'Release Intelligence',
    color: 'red',
    dataSources: ['Jenkins', 'ArgoCD', 'GitHub Actions'],
    ingestion: 'Event-driven (deploy webhooks)',
    aiTechniques: [
      { name: 'ML', color: 'ml' },
      { name: 'LLM', color: 'llm' }
    ],
    output: ['Deployment risk', 'Release readiness', 'Branch conflict detection']
  },
  {
    layer: 'L4',
    label: 'Operate Intelligence',
    color: 'purple',
    dataSources: ['Splunk', 'Datadog', 'ServiceNow', 'PagerDuty'],
    ingestion: 'Near real-time streaming + webhooks',
    aiTechniques: [
      { name: 'LLM', color: 'llm' },
      { name: 'RAG', color: 'rag' },
      { name: 'ML', color: 'ml' }
    ],
    output: ['Incident RCA in 2.3s', 'Cross-system correlation', 'Predictive alerts']
  },
  {
    layer: 'L5',
    label: 'Learn Intelligence',
    color: 'teal',
    dataSources: ['Derived from L0-L4 data'],
    ingestion: 'Batch processing + event triggers',
    aiTechniques: [
      { name: 'ML', color: 'ml' },
      { name: 'LLM', color: 'llm' },
      { name: 'RAG', color: 'rag' }
    ],
    output: ['Risk model updates', 'Knowledge base growth', 'Prevention rules']
  }
];

const pipelineStages = [
  { label: 'External Tools', color: 'bg-orange-500', items: ['GitHub', 'Jira', 'Jenkins', 'Splunk', 'ServiceNow'] },
  { label: 'Ingestion Layer', color: 'bg-blue-500', items: ['FastAPI webhooks', 'API polling', 'Event normalization'] },
  { label: 'Data Layer', color: 'bg-indigo-600', items: ['PostgreSQL + pgvector', 'Embeddings storage'] },
  { label: 'Context Engine', color: 'bg-purple-600', items: ['Entity linking', 'RAG retrieval', 'Context assembly'] },
  { label: 'AI Layer', color: 'bg-green-500', items: ['Claude API', 'Rule-based scoring', 'Caching'] },
  { label: 'IntelliOps UI', color: 'bg-cyan-500', items: ['React dashboard', 'Real-time updates'] }
];

const aiTechnicheColors = {
  llm: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
  rag: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
  ml: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300' },
  nlp: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' }
};

const colorConfig = {
  green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
  red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
  teal: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800'
};

const badgeColors = {
  green: 'bg-green-600 text-white',
  blue: 'bg-blue-600 text-white',
  amber: 'bg-amber-600 text-white',
  red: 'bg-red-600 text-white',
  purple: 'bg-purple-600 text-white',
  teal: 'bg-teal-600 text-white'
};

export default function AdminPlatformPipeline() {
  return (
    <div className="space-y-8">
      {/* Conceptual AI Pipeline */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conceptual AI Pipeline</h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto"
        >
          <div className="flex gap-2 min-w-max">
            {pipelineStages.map((stage, idx) => (
              <div key={idx} className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`${stage.color} text-white rounded-lg p-4 min-w-[160px]`}
                >
                  <p className="text-sm font-bold mb-2">{stage.label}</p>
                  <ul className="text-xs space-y-1">
                    {stage.items.map((item, iidx) => (
                      <li key={iidx}>• {item}</li>
                    ))}
                  </ul>
                </motion.div>
                {idx < pipelineStages.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-600 mx-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Intelligence Processing by Layer */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Intelligence Processing by Layer</h3>
        <div className="space-y-4">
          {layerProcessing.map((layer, idx) => {
            const config = colorConfig[layer.color];
            const badgeConfig = badgeColors[layer.color];
            return (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`border ${config} rounded-lg p-4`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`${badgeConfig} text-xs font-bold px-2 py-1 rounded`}>
                    {layer.layer}
                  </span>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                    {layer.label}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Data Sources */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Data Sources</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.dataSources.map((source, sidx) => (
                        <span key={sidx} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ingestion Method */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Ingestion</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{layer.ingestion}</p>
                  </div>

                  {/* AI Techniques */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">AI Techniques</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.aiTechniques.map((tech, tidx) => {
                        const techColor = aiTechnicheColors[tech.color];
                        return (
                          <span key={tidx} className={`text-xs font-semibold px-2 py-1 rounded ${techColor.bg} ${techColor.text}`}>
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Intelligence Output */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Intelligence Output</p>
                    <div className="flex flex-wrap gap-2">
                      {layer.output.map((out, oidx) => (
                        <span key={oidx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded">
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
