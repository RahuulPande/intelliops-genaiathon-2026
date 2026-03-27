'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Database, Zap, Brain } from 'lucide-react';

interface BackendComponent {
  title: string;
  status: 'implemented' | 'planned';
  icon: any;
  details: string[];
}

const backendComponents: BackendComponent[] = [
  {
    title: 'Backend API Server',
    status: 'implemented',
    icon: Zap,
    details: [
      'FastAPI (Python 3.11+)',
      'Async/await architecture',
      'Background task processing',
      'CORS-enabled for frontend',
      'Request validation with Pydantic',
      'Structured logging'
    ]
  },
  {
    title: 'Database Layer',
    status: 'implemented',
    icon: Database,
    details: [
      'PostgreSQL 15+ with asyncpg',
      'pgvector extension for embeddings',
      'SQLAlchemy 2.0 ORM',
      'Models: PullRequests, Services, AIAnalyses, WebhookEvents',
      'Connection pooling',
      'Migration system (Alembic)'
    ]
  },
  {
    title: 'AI Integration',
    status: 'implemented',
    icon: Brain,
    details: [
      'Anthropic Claude API (claude-sonnet-4-20250514)',
      'Structured JSON prompting',
      'Response caching (24h TTL)',
      'Temperature: 0.3 (deterministic)',
      'Token usage tracking',
      'Error handling & retries'
    ]
  },
  {
    title: 'Data Ingestion',
    status: 'implemented',
    icon: CheckCircle,
    details: [
      'GitHub webhook receiver (HMAC-SHA256 verification)',
      'PR data enricher (diffs, files, commits)',
      'Rule-based risk scoring engine',
      'Service detection from file paths',
      'Event normalization',
      'Deduplication logic'
    ]
  },
  {
    title: 'Infrastructure (Planned)',
    status: 'planned',
    icon: Clock,
    details: [
      'Redis caching layer',
      'Docker containerization',
      'CI/CD via GitHub Actions',
      'Cloud deployment (AWS/GCP)',
      'SSL/TLS certificates',
      'Database backups & recovery'
    ]
  }
];

const statusConfig = {
  implemented: {
    badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    label: 'IMPLEMENTED',
    icon: CheckCircle
  },
  planned: {
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    label: 'PLANNED',
    icon: Clock
  }
};

export default function AdminBackendStack() {
  return (
    <div className="space-y-4">
      {backendComponents.map((component, idx) => {
        const config = statusConfig[component.status];
        const StatusIcon = component.icon;
        const BadgeIcon = config.icon;

        return (
          <motion.div
            key={component.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <StatusIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {component.title}
                  </h3>
                  <span className={`${config.badge} text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1`}>
                    <BadgeIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 ml-10">
              {component.details.map((detail, didx) => (
                <li key={didx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0 mt-2" />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}

      {/* Key Endpoints Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6"
      >
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <span className="font-semibold">Backend Status:</span> Currently supporting GitHub PR ingestion, AI analysis, and knowledge base operations. Extensible architecture supports adding Jira, ServiceNow, and Splunk connectors without core changes.
        </p>
      </motion.div>
    </div>
  );
}
