'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code, Database, BookOpen } from 'lucide-react';

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  status: 'implemented' | 'planned';
}

interface DataModel {
  name: string;
  fields: { name: string; type: string; description: string }[];
}

const apiEndpoints: APIEndpoint[] = [
  { method: 'GET', path: '/api/health', description: 'Health check + DB connectivity', status: 'implemented' },
  { method: 'POST', path: '/api/webhooks/github', description: 'GitHub webhook receiver', status: 'implemented' },
  { method: 'GET', path: '/api/prs', description: 'List PRs (filterable by service, author, status)', status: 'implemented' },
  { method: 'GET', path: '/api/prs/{pr_id}', description: 'Get PR details with metadata', status: 'implemented' },
  { method: 'GET', path: '/api/prs/{pr_id}/analysis', description: 'Get AI analysis (risk score, summary, factors)', status: 'implemented' },
  { method: 'POST', path: '/api/prs/{pr_id}/reanalyze', description: 'Force re-analysis of a PR', status: 'implemented' },
  { method: 'GET', path: '/api/services', description: 'List services with metadata', status: 'planned' },
  { method: 'POST', path: '/api/webhooks/jira', description: 'Jira webhook receiver for requirement events', status: 'planned' },
  { method: 'GET', path: '/api/incidents', description: 'List incidents with RCA metadata', status: 'planned' }
];

const dataModels: DataModel[] = [
  {
    name: 'PullRequest',
    fields: [
      { name: 'id', type: 'UUID', description: 'Primary key' },
      { name: 'github_id', type: 'int', description: 'GitHub PR number' },
      { name: 'title', type: 'string', description: 'PR title' },
      { name: 'author', type: 'string', description: 'GitHub username of PR author' },
      { name: 'repository', type: 'string', description: 'Repo owner/name' },
      { name: 'status', type: 'enum(open|merged|closed)', description: 'Current PR status' },
      { name: 'risk_score', type: 'float(0-1)', description: 'ML-computed risk score' },
      { name: 'changed_files', type: 'JSONB', description: 'Array of file changes with diff stats' },
      { name: 'commit_messages', type: 'JSONB', description: 'Commit message data' },
      { name: 'created_at', type: 'timestamp', description: 'PR creation timestamp' }
    ]
  },
  {
    name: 'AIAnalysis',
    fields: [
      { name: 'id', type: 'UUID', description: 'Primary key' },
      { name: 'pr_id', type: 'UUID', description: 'Foreign key to PR' },
      { name: 'risk_score', type: 'float(0-1)', description: 'Numeric risk prediction' },
      { name: 'summary', type: 'text', description: 'LLM-generated summary' },
      { name: 'risk_factors', type: 'JSONB', description: 'Array of identified risk factors' },
      { name: 'recommendations', type: 'JSONB', description: 'Actionable recommendations' },
      { name: 'model_used', type: 'string', description: 'Claude model ID' },
      { name: 'expires_at', type: 'timestamp', description: '24h cache TTL' }
    ]
  },
  {
    name: 'Service',
    fields: [
      { name: 'id', type: 'UUID', description: 'Primary key' },
      { name: 'name', type: 'string', description: 'Service name (e.g. payment-service)' },
      { name: 'repository', type: 'string', description: 'GitHub repo path' },
      { name: 'criticality', type: 'enum(critical|high|medium|low)', description: 'Business impact level' },
      { name: 'description', type: 'text', description: 'Service purpose and responsibilities' }
    ]
  },
  {
    name: 'WebhookEvent',
    fields: [
      { name: 'id', type: 'UUID', description: 'Primary key' },
      { name: 'event_type', type: 'string', description: 'Type of event (pr_opened, pr_updated)' },
      { name: 'payload', type: 'JSONB', description: 'Raw webhook payload' },
      { name: 'processed', type: 'boolean', description: 'Has been processed successfully' },
      { name: 'error_message', type: 'text', description: 'Error details if processing failed' },
      { name: 'created_at', type: 'timestamp', description: 'Event receipt timestamp' }
    ]
  }
];

const methodColors = {
  GET: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  POST: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  PUT: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  DELETE: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
};

const statusColors = {
  implemented: 'text-green-700 dark:text-green-300',
  planned: 'text-amber-700 dark:text-amber-300'
};

export default function BackendAPIDocsTab() {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* API Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Code className="w-5 h-5" />
          API Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">Base URL</p>
            <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
              localhost:8000/api
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">(dev)</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">Production URL</p>
            <p className="text-sm font-mono text-gray-900 dark:text-gray-100">
              api.intelliops.ai/api
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-1">Authentication</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              JWT Bearer (planned)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Endpoints Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            REST Endpoints
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Method</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Path</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Description</th>
                <th className="text-center px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((endpoint, idx) => (
                <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/30">
                  <td className="px-4 py-3">
                    <span className={`font-bold text-xs px-2 py-1 rounded ${methodColors[endpoint.method]}`}>
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-900 dark:text-gray-100">
                    {endpoint.path}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {endpoint.description}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold ${statusColors[endpoint.status]}`}>
                      {endpoint.status === 'implemented' ? '✅' : '🔜'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Data Models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5" />
          Data Models
        </h3>

        {dataModels.map((model, idx) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + idx * 0.05 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedModel(expandedModel === model.name ? null : model.name)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
            >
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{model.name}</p>
              <motion.div
                animate={{ rotate: expandedModel === model.name ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedModel === model.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/30 space-y-2">
                    {model.fields.map((field, fidx) => (
                      <div key={fidx} className="flex flex-col gap-1">
                        <div className="flex items-start gap-2">
                          <code className="text-xs font-mono bg-gray-900 dark:bg-gray-950 text-amber-400 px-2 py-1 rounded">
                            {field.name}
                          </code>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {field.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 ml-1">
                          {field.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* AI Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 dark:from-purple-900/20 to-blue-50 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4"
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">AI Analysis Pipeline</h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p><span className="font-semibold">Step 1:</span> PR webhook → Extract commits, files, diffs</p>
          <p><span className="font-semibold">Step 2:</span> NLP entity extraction (services, risk signals)</p>
          <p><span className="font-semibold">Step 3:</span> Claude API analysis with structured prompt</p>
          <p><span className="font-semibold">Step 4:</span> Parse JSON response → Store risk_score, summary, factors</p>
          <p><span className="font-semibold">Step 5:</span> Cache result (24h TTL) for fast retrieval</p>
        </div>
      </motion.div>
    </div>
  );
}
