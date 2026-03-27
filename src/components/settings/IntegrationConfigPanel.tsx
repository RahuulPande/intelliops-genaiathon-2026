'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plug,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Webhook,
  Brain,
  Shield,
  Settings,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────

type ConnectionStatus = 'connected' | 'disconnected' | 'pending';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'source' | 'notification' | 'ticketing' | 'monitoring';
  status: ConnectionStatus;
  icon: string;
  lastSync?: string;
  details?: string;
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  lastTriggered?: string;
}

interface AIConfig {
  id: string;
  name: string;
  technique: 'LLM' | 'RAG' | 'ML' | 'NLP';
  model: string;
  enabled: boolean;
  confidence: number;
  description: string;
}

// ── Mock Data ────────────────────────────────────────

const integrations: Integration[] = [
  { id: 'jira', name: 'Jira Software', description: 'Issue tracking and project management', category: 'ticketing', status: 'connected', icon: '🔵', lastSync: '2 min ago', details: 'Project: INTOPS · 1,247 issues synced' },
  { id: 'github', name: 'GitHub Enterprise', description: 'Source code management and PR tracking', category: 'source', status: 'connected', icon: '⚫', lastSync: '30 sec ago', details: 'Org: bank-platform · 23 repos · 156 PRs tracked' },
  { id: 'splunk', name: 'Splunk Enterprise', description: 'Log management and monitoring', category: 'monitoring', status: 'connected', icon: '🟢', lastSync: '60 sec polling', details: 'Index: payment-logs · 12.4M events/day' },
  { id: 'servicenow', name: 'ServiceNow', description: 'Incident management and ITSM', category: 'ticketing', status: 'pending', icon: '🟡', details: 'OAuth flow initiated — awaiting admin approval' },
  { id: 'slack', name: 'Slack Enterprise', description: 'Team communication and alerts', category: 'notification', status: 'connected', icon: '💬', lastSync: '5 sec ago', details: '#payment-alerts · #release-status · #incident-war-room' },
  { id: 'dynatrace', name: 'Dynatrace', description: 'APM and infrastructure monitoring', category: 'monitoring', status: 'disconnected', icon: '📊', details: 'Not configured — requires API token' },
  { id: 'confluence', name: 'Confluence', description: 'Knowledge base and documentation', category: 'source', status: 'connected', icon: '📘', lastSync: '15 min ago', details: 'Space: Engineering Wiki · 342 pages indexed' },
  { id: 'pagerduty', name: 'PagerDuty', description: 'On-call management and alerting', category: 'notification', status: 'disconnected', icon: '🔔', details: 'Not configured — requires service key' },
];

const webhooks: WebhookConfig[] = [
  { id: 'wh-1', name: 'Release Risk Alert', url: 'https://hooks.bank.internal/intelliops/release-risk', events: ['release.risk_high', 'release.risk_critical'], active: true, lastTriggered: '3 hours ago' },
  { id: 'wh-2', name: 'Incident Created', url: 'https://hooks.bank.internal/intelliops/incidents', events: ['incident.created', 'incident.severity_change'], active: true, lastTriggered: '45 min ago' },
  { id: 'wh-3', name: 'Knowledge Base Update', url: 'https://hooks.bank.internal/intelliops/kb-updates', events: ['knowledge.article_created', 'knowledge.pattern_learned'], active: false },
];

const aiConfigs: AIConfig[] = [
  { id: 'ai-llm', name: 'Root Cause Analysis', technique: 'LLM', model: 'Claude 3.5 Sonnet (simulated)', enabled: true, confidence: 0.92, description: 'Generates natural language reasoning for incident and defect analysis.' },
  { id: 'ai-rag', name: 'Historical Matching', technique: 'RAG', model: 'Embedding Index (2,400 docs)', enabled: true, confidence: 0.89, description: 'Retrieves relevant historical incidents and defects for context augmentation.' },
  { id: 'ai-ml', name: 'Risk Prediction', technique: 'ML', model: 'GradientBoosted v2.1 (simulated)', enabled: true, confidence: 0.87, description: 'Predicts risk scores for releases, PRs, and requirements using trained models.' },
  { id: 'ai-nlp', name: 'Entity Extraction', technique: 'NLP', model: 'SpaCy (simulated)', enabled: true, confidence: 0.94, description: 'Parses and classifies unstructured text from defects, PRs, and requirements.' },
];

// ── Status helpers ───────────────────────────────────

const statusConfig: Record<ConnectionStatus, { icon: typeof CheckCircle; color: string; label: string }> = {
  connected: { icon: CheckCircle, color: 'text-green-600 dark:text-green-400', label: 'Connected' },
  pending: { icon: Clock, color: 'text-amber-600 dark:text-amber-400', label: 'Pending' },
  disconnected: { icon: AlertCircle, color: 'text-gray-400 dark:text-gray-500', label: 'Not Connected' },
};

const techBadge: Record<string, string> = {
  LLM: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  RAG: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  ML: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  NLP: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
};

// ── Sub-tabs ─────────────────────────────────────────

type SubTab = 'integrations' | 'webhooks' | 'ai-config';

// ── Component ────────────────────────────────────────

export default function IntegrationConfigPanel() {
  const [activeTab, setActiveTab] = useState<SubTab>('integrations');
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);

  const apiKey = 'intops_sk_live_••••••••••••4a2f';
  const apiKeyFull = 'intops_sk_live_a1b2c3d4e5f6g7h84a2f';

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subTabs = [
    { id: 'integrations', label: 'Data Sources', icon: Plug },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'ai-config', label: 'AI Configuration', icon: Brain },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Integration Configuration</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Connect data sources, configure webhooks, and tune AI models.</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Shield className="w-3.5 h-3.5 text-green-500" />
          <span className="text-gray-500 dark:text-gray-400">All connections encrypted (TLS 1.3)</span>
        </div>
      </div>

      {/* API Key Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">API Key</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Use this key to authenticate IntelliOps API calls.</div>
          </div>
          <div className="flex items-center gap-2">
            <code className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-700 dark:text-gray-300">
              {showSecret ? apiKeyFull : apiKey}
            </code>
            <button onClick={() => setShowSecret(!showSecret)} className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {showSecret ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
            </button>
            <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700">
        {subTabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as SubTab)} className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <tab.icon className="w-4 h-4" />{tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'integrations' && (
          <motion.div key="integrations" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map(int => {
              const st = statusConfig[int.status];
              const StatusIcon = st.icon;
              return (
                <div key={int.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-sm transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{int.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{int.name}</span>
                        <StatusIcon className={`w-4 h-4 ${st.color}`} />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{int.description}</p>
                      {int.details && <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 font-medium">{int.details}</p>}
                      {int.lastSync && (
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                          <RefreshCw className="w-3 h-3" />
                          <span>Last sync: {int.lastSync}</span>
                        </div>
                      )}
                    </div>
                    <button className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      int.status === 'connected'
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                        : int.status === 'pending'
                          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    }`}>
                      {int.status === 'connected' ? 'Configure' : int.status === 'pending' ? 'Retry' : 'Connect'}
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'webhooks' && (
          <motion.div key="webhooks" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
            {webhooks.map(wh => (
              <div key={wh.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Webhook className={`w-4 h-4 ${wh.active ? 'text-green-500' : 'text-gray-400'}`} />
                    <div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{wh.name}</span>
                      {wh.lastTriggered && <span className="text-[10px] text-gray-400 ml-2">Last triggered: {wh.lastTriggered}</span>}
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${wh.active ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                    {wh.active ? 'Active' : 'Disabled'}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-3">
                  <code className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">{wh.url}</code>
                </div>
                <div className="flex flex-wrap gap-1">
                  {wh.events.map(ev => (
                    <span key={ev} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
              + Add Webhook Endpoint
            </button>
          </motion.div>
        )}

        {activeTab === 'ai-config' && (
          <motion.div key="ai-config" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
            {aiConfigs.map(ai => (
              <div key={ai.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{ai.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${techBadge[ai.technique]}`}>{ai.technique}</span>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ai.enabled ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    {ai.enabled ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{ai.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Model</div>
                    <div className="text-xs font-medium text-gray-900 dark:text-white">{ai.model}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Confidence Threshold</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${ai.confidence * 100}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{Math.round(ai.confidence * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
