'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import AdminModuleList from './tech-docs/AdminModuleList';
import AdminPlatformPipeline from './tech-docs/AdminPlatformPipeline';
import AdminIntegrations from './tech-docs/AdminIntegrations';
import AdminBackendStack from './tech-docs/AdminBackendStack';
import BackendAPIDocsTab from './tech-docs/BackendAPIDocsTab';
import {
  Book,
  Code,
  Database,
  Server,
  Shield,
  Zap,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Copy,
  Search,
  Mail,
  Calendar,
  FileText,
  Settings,
  Lock,
  Cloud,
  GitBranch,
  Users,
  Clock,
  Layers,
  Monitor,
  HelpCircle,
  ArrowRight,
  Gauge,
  Globe,
  Cpu,
  Box,
  BarChart3,
  Activity,
  Workflow,
  Brain,
  Package,
  Palette,
  Terminal
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'technical' | 'business' | 'integration';
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    id: 'splunk-integration',
    question: 'How does this integrate with our existing Splunk setup?',
    answer: 'The platform uses Splunk\'s REST API to query logs every 60 seconds. No changes to your Splunk configuration are needed — just API credentials. The integration is read-only and doesn\'t affect your existing dashboards or searches.',
    category: 'technical',
    tags: ['splunk', 'integration', 'api']
  },
  {
    id: 'other-tools',
    question: 'What if we use Elastic/Datadog instead of Splunk?',
    answer: 'The platform has adapters for major logging tools including Elasticsearch, Datadog, New Relic, and Sumo Logic. The same intelligence features work across different connectors. AI analysis remains consistent across all data sources.',
    category: 'technical',
    tags: ['elasticsearch', 'datadog', 'adapters']
  },
  {
    id: 'ai-matching',
    question: 'How does the AI defect matching actually work?',
    answer: 'The system uses NLP to analyze defect descriptions, extract key terms, and compare against historical defects using cosine similarity with BERT embeddings. The ML model improves with each match confirmation, achieving 96% accuracy.',
    category: 'technical',
    tags: ['ai', 'nlp', 'machine-learning']
  },
  {
    id: 'air-gapped',
    question: 'Can this work in an air-gapped environment?',
    answer: 'Yes. The platform can be deployed entirely on-premise with no external dependencies. All AI models can be pre-trained and deployed locally. No internet connection is required after installation.',
    category: 'technical',
    tags: ['security', 'on-premise', 'air-gapped']
  },
  {
    id: 'three-layers',
    question: 'What are the three intelligence layers?',
    answer: 'Layer 1 (Delivery Intelligence) covers test quality, release, and knowledge management using JIRA, GitHub, and TestRail. Layer 2 (Operations Intelligence) covers service health and incident management using Splunk, ServiceNow, and Dynatrace. Layer 3 (Enterprise Intelligence) covers business analytics and cost optimization using SAP, Flexera, and cloud APIs.',
    category: 'technical',
    tags: ['layers', 'architecture', 'platform']
  },
  {
    id: 'savings-calculation',
    question: 'How are the savings calculated?',
    answer: 'Based on conservative industry benchmarks across three intelligence layers: Layer 1 (Delivery) saves ~$88K/year from faster incident resolution, knowledge retention, and deployment risk reduction. Layer 2 (Operations) adds ~$72K from proactive downtime prevention and monitoring efficiency. Layer 3 (Enterprise) adds ~$95K from cost optimization insights, strategic analytics, and cross-layer correlation. Total ~$255K for a 100-person team, with platform costs of $60K/year for Enterprise license.',
    category: 'business',
    tags: ['roi', 'savings', 'calculation']
  },
  {
    id: 'timeline',
    question: 'What\'s the implementation timeline?',
    answer: 'Progressive adoption: Layer 1 (Delivery Intelligence) deploys in Weeks 1-4 using readily available CI/CD and test data. Layer 2 (Operations Intelligence) follows in Months 2-3 connecting monitoring and incident systems. Layer 3 (Enterprise Intelligence) activates in Month 4+ integrating financial and strategic systems. Each layer delivers value independently.',
    category: 'business',
    tags: ['timeline', 'implementation', 'rollout']
  },
  {
    id: 'team-size',
    question: 'What if our team is smaller or larger?',
    answer: 'Savings scale proportionally with team size. A 50-person team sees approximately $128K gross savings (Enterprise tier), while a 200-person team sees approximately $510K. The interactive ROI calculator lets you adjust team size, incident volume, MTTR, and monitoring effort to see precise estimates for your organization.',
    category: 'business',
    tags: ['scaling', 'team-size', 'cost']
  },
  {
    id: 'vendor-lockin',
    question: 'Is there vendor lock-in?',
    answer: 'No. All data remains in your enterprise systems. The platform acts as an intelligence layer over your existing tools — it reads from JIRA, Splunk, ServiceNow etc. via standard APIs. Open API standards ensure you can migrate anytime.',
    category: 'business',
    tags: ['vendor-lockin', 'migration', 'data-ownership']
  },
  {
    id: 'jira-versions',
    question: 'Which versions of JIRA are supported?',
    answer: 'JIRA Cloud, Server 8.0+, and Data Center are supported. The platform uses REST API v2/v3 with backward compatibility. Azure DevOps, GitHub Issues, and custom ticketing systems are also supported as part of Layer 1 (Delivery Intelligence).',
    category: 'integration',
    tags: ['jira', 'versions', 'ticketing']
  },
  {
    id: 'prototype-vs-production',
    question: 'Is this prototype connected to real enterprise systems?',
    answer: 'No. The current prototype is a frontend simulation that demonstrates the full platform UX using client-side mock data generation (Faker.js). All dashboards, analytics, and AI insights shown are simulated. The production platform would replace the mock data layer with real API integrations to enterprise systems.',
    category: 'technical',
    tags: ['prototype', 'mock-data', 'simulation']
  },
  {
    id: 'replace-tools',
    question: 'Does this replace our existing monitoring tools?',
    answer: 'No, it aggregates and enhances them. Think of it as a smart orchestration layer that connects Splunk, JIRA, ServiceNow, Dynatrace, and other tools across all three intelligence layers. Your existing investments remain valuable.',
    category: 'integration',
    tags: ['monitoring', 'aggregation', 'orchestration']
  },
  {
    id: 'false-positives',
    question: 'How do you handle false positives?',
    answer: 'The ML model learns from feedback. False positive rate drops from 20% to less than 5% in the first month. Built-in feedback loops allow quick correction. Manual override is always available.',
    category: 'integration',
    tags: ['false-positives', 'feedback', 'accuracy']
  }
];

const codeExamples = {
  splunk: `{
  "search": "index=application_logs status=error | stats count by service",
  "earliest_time": "-5m",
  "latest_time": "now",
  "output_mode": "json"
}`,
  jira: `{
  "fields": {
    "project": {"key": "INC"},
    "summary": "Service Failure: Payment Gateway",
    "description": "Auto-generated from IntelliOps AI\\nSeverity: Critical\\nAffected Service: payment-gateway-v2",
    "priority": {"name": "Critical"},
    "customfield_10001": "AI-MATCH-95.7%",
    "labels": ["auto-generated", "ai-detected"]
  }
}`,
  bash: `# 1. Configure Splunk Connection
curl -X POST https://api.intelliops.ai/integrations/splunk \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "host": "splunk.enterprise.com",
    "port": 8089,
    "username": "service_account",
    "password": "encrypted_password",
    "verify_ssl": true
  }'

# 2. Test Connection
curl https://api.intelliops.ai/integrations/splunk/test

# 3. Start Data Ingestion
curl -X POST https://api.intelliops.ai/integrations/splunk/start`
};

export default function TechnicalDocsSection() {
  const [activeSection, setActiveSection] = useState('prototype');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  const baseSections = [
    { id: 'prototype', label: 'Prototype Architecture', icon: Box },
    { id: 'techstack', label: 'Technology Stack', icon: Package },
    { id: 'platform', label: 'How the Platform Works', icon: Brain },
    { id: 'integrations', label: 'Enterprise Integrations', icon: Workflow },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
    { id: 'dataflow', label: 'Data Flow Architecture', icon: Activity }
  ];

  const sections = isAdmin
    ? [...baseSections, { id: 'backend-api', label: 'Backend API', icon: Code }]
    : baseSections;

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // ─── SECTION 1: Prototype Architecture ────────────────────────────
  const renderPrototype = () => (
    <div className="space-y-8">
      {/* Prototype Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Box className="w-6 h-6 mr-3 text-blue-600" />
          Prototype Architecture Overview
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This prototype is a <span className="font-semibold text-blue-600">frontend simulation</span> of the IntelliOps AI platform.
          It demonstrates the full user experience and platform capabilities without requiring real enterprise data integrations.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-purple-600" />
              Architecture Characteristics
            </h4>
            <div className="space-y-3">
              {[
                { title: 'Single Page Application (SPA)', desc: 'Client-side routing via React state — no server-side page rendering' },
                { title: 'Component-Based Design', desc: '105+ TypeScript React components organized by feature domain' },
                { title: 'Client-Side Data Simulation', desc: 'Faker.js generates realistic mock data for all dashboards and analytics' },
                { title: 'State-Based Navigation', desc: 'Zustand store manages dashboard state; URL routing is state-driven' },
                { title: 'No Backend Server', desc: 'Entirely frontend — no API server, no database, no authentication layer' },
                { title: 'Static Deployment', desc: 'Deployed as static assets on Vercel with edge caching' }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{item.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Monitor className="w-5 h-5 mr-2 text-green-600" />
              Dashboard Modules in Prototype
            </h4>
            {isAdmin ? (
              <AdminModuleList />
            ) : (
            <div className="space-y-3">
              {[
                { layer: 'L1', color: 'purple', modules: ['Test & Quality Intelligence', 'Release Intelligence', 'Application Knowledge Base'] },
                { layer: 'L2', color: 'blue', modules: ['Service Health & Incident Intelligence'] },
                { layer: 'L3', color: 'orange', modules: ['Enterprise Business Intelligence & Analytics'] }
              ].map((group, gIndex) => (
                <motion.div
                  key={group.layer}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gIndex * 0.15 }}
                  className={`rounded-lg p-4 border ${
                    group.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
                    group.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                    'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded mr-2 ${
                      group.color === 'purple' ? 'bg-purple-600 text-white' :
                      group.color === 'blue' ? 'bg-blue-600 text-white' :
                      'bg-orange-600 text-white'
                    }`}>{group.layer}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {group.layer === 'L1' ? 'Delivery Intelligence' : group.layer === 'L2' ? 'Operations Intelligence' : 'Enterprise Intelligence'}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {group.modules.map(m => (
                      <li key={m} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            )}

            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 mr-2 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-800 dark:text-amber-300 text-sm">Demo Analytics</div>
                  <div className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    All charts, metrics, AI predictions, and trend data are generated client-side using Faker.js.
                    The production platform would replace this with real-time data from enterprise integrations.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prototype vs Production */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <GitBranch className="w-6 h-6 mr-3 text-blue-600" />
          Prototype vs. Production Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">Component</th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-blue-600">Prototype (Current)</th>
                <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-green-600">Production Deployment</th>
              </tr>
            </thead>
            <tbody>
              {[
                { component: 'Data Source', demo: 'Faker.js mock generator', production: 'Real-time enterprise API feeds' },
                { component: 'AI/ML Engine', demo: 'Simulated predictions & insights', production: 'BERT/NLP models, ML pipelines (OpenAI/Bedrock)' },
                { component: 'Backend', demo: 'None — client-side only', production: 'Node.js/Python API server + message queues' },
                { component: 'Database', demo: 'None — in-memory state', production: 'PostgreSQL + Redis + vector database' },
                { component: 'Authentication', demo: 'Client-side license toggle', production: 'SSO/SAML 2.0, RBAC, MFA' },
                { component: 'Integrations', demo: 'Simulated (JIRA, Splunk badges)', production: 'Live REST API connections to 15+ systems' },
                { component: 'Notifications', demo: 'UI-only toasts', production: 'Email, Slack, Teams, PagerDuty' },
                { component: 'Deployment', demo: 'Vercel static hosting', production: 'Kubernetes / cloud-native infrastructure' }
              ].map((row, index) => (
                <motion.tr
                  key={row.component}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white">{row.component}</td>
                  <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-blue-600 dark:text-blue-400">{row.demo}</td>
                  <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-green-600 dark:text-green-400">{row.production}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ─── SECTION 2: Technology Stack ──────────────────────────────────
  const renderTechStack = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Package className="w-6 h-6 mr-3 text-green-600" />
          Technology Stack Used in This Prototype
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The current prototype is built with a modern React/Next.js stack. All libraries listed below are actively used in the codebase.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend Core */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-blue-600" />
              Frontend Core
            </h4>
            <div className="space-y-3">
              {[
                { name: 'Next.js 15', desc: 'React framework with App Router, Turbopack dev server', badge: 'Framework' },
                { name: 'React 19', desc: 'Component library with hooks-based architecture', badge: 'UI Library' },
                { name: 'TypeScript', desc: 'Strict type checking across 105+ components', badge: 'Language' },
                { name: 'TailwindCSS 4', desc: 'Utility-first CSS with dark mode support', badge: 'Styling' },
                { name: 'Framer Motion', desc: 'Declarative animations and page transitions', badge: 'Animation' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{tech.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded">{tech.badge}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tech.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Data & Visualization */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              Data & Visualization
            </h4>
            <div className="space-y-3">
              {[
                { name: 'Recharts', desc: 'Chart library for all dashboard visualizations (area, bar, radar, pie)', badge: 'Charts' },
                { name: 'Zustand', desc: 'Lightweight state management with devtools and persist middleware', badge: 'State' },
                { name: 'TanStack React Query', desc: 'Async state management for data fetching patterns', badge: 'Data' },
                { name: 'Faker.js', desc: 'Mock data generator for all simulated enterprise data', badge: 'Mock Data' },
                { name: 'React Window', desc: 'Virtualized list rendering for large datasets', badge: 'Performance' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{tech.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-600 text-white rounded">{tech.badge}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tech.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Utilities & Deployment */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Terminal className="w-5 h-5 mr-2 text-green-600" />
              Utilities
            </h4>
            <div className="space-y-3">
              {[
                { name: 'Axios', desc: 'HTTP client (configured for future API integration)' },
                { name: 'date-fns', desc: 'Date manipulation and formatting' },
                { name: 'Lucide React', desc: 'Icon library used across all components' },
                { name: 'clsx / tailwind-merge', desc: 'Conditional class name utilities' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-start bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800"
                >
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{tech.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{tech.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Cloud className="w-5 h-5 mr-2 text-cyan-600" />
              Deployment & Architecture Notes
            </h4>
            <div className="space-y-3">
              {[
                { label: 'Hosting', value: 'Vercel (static deployment with edge caching)' },
                { label: 'Backend', value: 'None — entirely client-side application' },
                { label: 'Database', value: 'None — Zustand in-memory + localStorage persist' },
                { label: 'AI/ML Models', value: 'Simulated — deterministic mock outputs' },
                { label: 'Authentication', value: 'Client-side license tier toggle (no real auth)' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="flex items-center justify-between p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 text-right ml-4">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── SECTION 3: How the Platform Works ────────────────────────────
  const renderPlatform = () => (
    <div className="space-y-8">
      {isAdmin ? (
        <AdminPlatformPipeline />
      ) : (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Brain className="w-6 h-6 mr-3 text-purple-600" />
          How the IntelliOps AI Platform Works
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The production IntelliOps platform transforms raw operational data from enterprise systems into actionable intelligence
          through a five-stage AI-driven pipeline.
        </p>

        {/* AI Pipeline Flow */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Conceptual AI Pipeline</h4>
          <div className="flex flex-wrap items-center justify-center gap-3 p-6 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700 dark:to-purple-900/30 rounded-xl border border-gray-200 dark:border-gray-600">
            {[
              { name: 'Operational\nData Sources', color: 'bg-orange-500', desc: 'JIRA, Splunk, SAP...' },
              { name: 'Data\nPipeline', color: 'bg-blue-500', desc: 'Ingestion & normalization' },
              { name: 'AI Intelligence\nEngine', color: 'bg-purple-600', desc: 'NLP, ML, predictions' },
              { name: 'Insights &\nPredictions', color: 'bg-green-500', desc: 'Patterns, anomalies, ROI' },
              { name: 'IntelliOps\nDashboard', color: 'bg-indigo-500', desc: 'Visualize & act' }
            ].map((step, index) => (
              <div key={step.name} className="flex items-center">
                <div className="text-center">
                  <div className={`${step.color} text-white px-4 py-3 rounded-lg text-sm font-medium whitespace-pre-line min-w-[120px]`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{step.desc}</div>
                </div>
                {index < 4 && <ArrowRight className="w-5 h-5 mx-2 text-gray-400 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* How Each Layer Processes Data */}
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Intelligence Processing by Layer</h4>
        <div className="space-y-4">
          {[
            {
              layer: 'L1',
              title: 'Delivery Intelligence',
              color: 'purple',
              sources: 'JIRA, GitHub, TestRail, Jenkins, Confluence',
              processing: [
                'Defect descriptions analyzed via NLP to detect duplicates and patterns',
                'Test execution data correlated with release risk scores',
                'Code commit patterns analyzed for quality prediction',
                'Knowledge graphs built from documentation and defect history'
              ],
              output: 'Defect predictions, test optimization recommendations, release risk scoring, institutional knowledge retrieval'
            },
            {
              layer: 'L2',
              title: 'Operations Intelligence',
              color: 'blue',
              sources: 'Splunk, ServiceNow, Dynatrace, AppDynamics',
              processing: [
                'Log streams processed in real-time for anomaly detection',
                'Incident data correlated across monitoring tools',
                'Service dependency maps built from traffic patterns',
                'Root cause analysis via ML pattern matching on historical incidents'
              ],
              output: 'Incident predictions, automated root cause analysis, service health scoring, SLA risk alerts'
            },
            {
              layer: 'L3',
              title: 'Enterprise Intelligence',
              color: 'orange',
              sources: 'SAP, Flexera, Cloud APIs, HR systems, data warehouses',
              processing: [
                'Software license utilization tracked against entitlements',
                'Cloud spend analyzed for optimization opportunities',
                'Workforce allocation correlated with delivery velocity',
                'Financial data combined with operational metrics for cost modeling'
              ],
              output: 'License optimization savings, cloud cost reduction, resource allocation insights, strategic business recommendations'
            }
          ].map((layer, index) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`rounded-xl p-6 border ${
                layer.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
                layer.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
              }`}
            >
              <div className="flex items-center mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded mr-2 ${
                  layer.color === 'purple' ? 'bg-purple-600 text-white' :
                  layer.color === 'blue' ? 'bg-blue-600 text-white' :
                  'bg-orange-600 text-white'
                }`}>{layer.layer}</span>
                <h5 className="font-semibold text-gray-900 dark:text-white">{layer.title}</h5>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span className="font-medium">Data Sources:</span> {layer.sources}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Processing:</div>
                  <ul className="space-y-1">
                    {layer.processing.map((p, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <Cpu className="w-3 h-3 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Intelligence Output:</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{layer.output}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      )}
    </div>
  );

  // ─── SECTION 4: Enterprise Integration Requirements ───────────────
  const renderIntegrations = () => (
    <div className="space-y-8">
      {isAdmin ? (
        <AdminIntegrations />
      ) : (
      <>
      {/* Layer 1 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <span className="text-xs font-bold px-2.5 py-1 bg-purple-600 text-white rounded mr-3">L1</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Delivery Intelligence — Integrations</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Layer 1 connects to development, testing, and release management tools to power defect intelligence,
          test quality insights, release analytics, and application knowledge generation.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'JIRA Cloud/Server', version: 'REST API v2/v3', access: ['Project admin access', 'Custom field creation', 'Webhook support', 'Defect repository read access'], icon: FileText },
            { name: 'XRAY / TestRail', version: 'REST API', access: ['Test execution data', 'Test plan access', 'Coverage reports', 'Execution history'], icon: CheckCircle },
            { name: 'GitHub / GitLab', version: 'REST + GraphQL API', access: ['Repository read access', 'Pull request data', 'Commit history', 'CI/CD pipeline status'], icon: GitBranch },
            { name: 'Jenkins', version: 'REST API', access: ['Build history', 'Pipeline status', 'Test results', 'Deployment logs'], icon: Settings },
            { name: 'Confluence', version: 'REST API', access: ['Space read access', 'Page content', 'Attachment data', 'Search API'], icon: Book },
            { name: 'Azure DevOps', version: 'REST API v6+', access: ['Work items', 'Boards data', 'Repos', 'Pipelines'], icon: Cloud }
          ].map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center mb-2">
                <integration.icon className="w-5 h-5 mr-2 text-purple-600" />
                <span className="font-medium text-gray-900 dark:text-white text-sm">{integration.name}</span>
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400 mb-2">{integration.version}</div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {integration.access.map((req, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1.5 text-green-500 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Layer 2 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <span className="text-xs font-bold px-2.5 py-1 bg-blue-600 text-white rounded mr-3">L2</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Operations Intelligence — Integrations</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Layer 2 connects to monitoring, incident management, and observability tools to power
          incident intelligence, service health monitoring, root cause analysis, and anomaly detection.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Splunk Enterprise', version: 'Version 8.0+ / REST API', access: ['Search head access', '90-day data retention', 'Saved searches', 'Real-time log streaming'], icon: Monitor },
            { name: 'ServiceNow', version: 'Table API / REST', access: ['Incident management module', 'CMDB access', 'Change management', 'SLA data'], icon: Settings },
            { name: 'Dynatrace', version: 'REST API v2', access: ['Entity API', 'Problem feed', 'Metrics API', 'Topology data'], icon: Activity },
            { name: 'AppDynamics', version: 'REST API', access: ['Application metrics', 'Business transactions', 'Health rules', 'Alert data'], icon: Gauge },
            { name: 'PagerDuty', version: 'Events API v2', access: ['Incident data', 'On-call schedules', 'Escalation policies', 'Alert routing'], icon: Zap },
            { name: 'Monitoring Platforms', version: 'Various APIs', access: ['Datadog, New Relic', 'Elastic APM', 'Prometheus/Grafana', 'Custom exporters'], icon: Globe }
          ].map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center mb-2">
                <integration.icon className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium text-gray-900 dark:text-white text-sm">{integration.name}</span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mb-2">{integration.version}</div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {integration.access.map((req, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1.5 text-green-500 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Layer 3 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <span className="text-xs font-bold px-2.5 py-1 bg-orange-600 text-white rounded mr-3">L3</span>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Enterprise Intelligence — Integrations</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Layer 3 connects to financial, licensing, and strategic enterprise systems to power
          cost optimization, license management, and business analytics.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'SAP', version: 'RFC / REST API', access: ['Financial modules', 'Cost center data', 'Workforce data', 'Project accounting'], icon: Database },
            { name: 'Flexera', version: 'REST API', access: ['License entitlements', 'Usage data', 'Compliance reports', 'Optimization insights'], icon: FileText },
            { name: 'Cloud Cost APIs', version: 'AWS/Azure/GCP', access: ['Cost Explorer / Billing API', 'Resource utilization', 'Reserved instance data', 'Savings Plans'], icon: Cloud },
            { name: 'HR Systems', version: 'REST API / SFTP', access: ['Workforce allocation', 'Team structure', 'Resource rates', 'Capacity planning'], icon: Users },
            { name: 'Data Warehouses', version: 'JDBC / REST', access: ['Enterprise data lake', 'Historical analytics', 'Business KPIs', 'Custom queries'], icon: Database },
            { name: 'ITSM / CMDB', version: 'REST API', access: ['Asset inventory', 'Configuration items', 'Service catalog', 'Dependency maps'], icon: Layers }
          ].map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800"
            >
              <div className="flex items-center mb-2">
                <integration.icon className="w-5 h-5 mr-2 text-orange-600" />
                <span className="font-medium text-gray-900 dark:text-white text-sm">{integration.name}</span>
              </div>
              <div className="text-xs text-orange-600 dark:text-orange-400 mb-2">{integration.version}</div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {integration.access.map((req, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1.5 text-green-500 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      </>
      )}
    </div>
  );

  // ─── SECTION 5: Infrastructure Requirements ───────────────────────
  const renderInfrastructure = () => (
    <div className="space-y-8">
      {isAdmin && <AdminBackendStack />}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Server className="w-6 h-6 mr-3 text-indigo-600" />
          {isAdmin ? 'Target Production Infrastructure' : 'Production Infrastructure Requirements'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The following infrastructure is required for a production deployment of the IntelliOps platform
          supporting an enterprise environment with 100-500 services.
        </p>

        {/* Core Infrastructure */}
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Core Infrastructure</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { component: 'Application Server', specs: '8 vCPUs, 32GB RAM', detail: 'Node.js/Python API server with auto-scaling', icon: Server, color: 'indigo' },
            { component: 'Database (Primary)', specs: 'PostgreSQL 12+ or MongoDB 4.4+', detail: 'Relational data, configurations, user management', icon: Database, color: 'blue' },
            { component: 'Cache Layer', specs: 'Redis 6+, 16GB RAM', detail: 'Session management, real-time data caching', icon: Zap, color: 'red' },
            { component: 'Vector Database', specs: 'Pinecone / pgvector / Weaviate', detail: 'AI knowledge retrieval and semantic search', icon: Brain, color: 'purple' },
            { component: 'Object Storage', specs: '500GB+ (scales with log volume)', detail: 'Log archives, AI model artifacts, reports', icon: Layers, color: 'green' },
            { component: 'Message Queue', specs: 'Kafka / RabbitMQ', detail: 'Event streaming between microservices', icon: Activity, color: 'orange' }
          ].map((infra, index) => (
            <motion.div
              key={infra.component}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-lg p-5 border ${
                infra.color === 'indigo' ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
                infra.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                infra.color === 'red' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                infra.color === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
                infra.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
              }`}
            >
              <div className="flex items-center mb-2">
                <infra.icon className={`w-5 h-5 mr-2 ${
                  infra.color === 'indigo' ? 'text-indigo-600' :
                  infra.color === 'blue' ? 'text-blue-600' :
                  infra.color === 'red' ? 'text-red-600' :
                  infra.color === 'purple' ? 'text-purple-600' :
                  infra.color === 'green' ? 'text-green-600' :
                  'text-orange-600'
                }`} />
                <span className="font-medium text-gray-900 dark:text-white">{infra.component}</span>
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">{infra.specs}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{infra.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* AI/ML Services */}
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">AI/ML Services</h4>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { name: 'OpenAI / Azure OpenAI', use: 'NLP processing, text embeddings, defect analysis', tier: 'GPT-4 / Ada embeddings' },
            { name: 'AWS Bedrock', use: 'ML inference, anomaly detection models', tier: 'Claude / Titan models' },
            { name: 'Custom ML Pipeline', use: 'Historical pattern training, prediction models', tier: 'PyTorch / TensorFlow' }
          ].map((ai, index) => (
            <motion.div
              key={ai.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-5 border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center mb-2">
                <Cpu className="w-5 h-5 mr-2 text-purple-600" />
                <span className="font-medium text-gray-900 dark:text-white">{ai.name}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{ai.use}</div>
              <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded">{ai.tier}</span>
            </motion.div>
          ))}
        </div>

        {/* Network & Connectivity */}
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Network & Connectivity</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { req: 'Internal network access to Splunk, JIRA, ServiceNow APIs', icon: Globe },
            { req: 'TLS 1.3 for all data in transit between services', icon: Lock },
            { req: 'Outbound HTTPS for AI service APIs (OpenAI, Bedrock)', icon: Cloud },
            { req: 'Load balancer for high availability (HAProxy / ALB)', icon: Server },
            { req: 'DNS resolution for all integrated enterprise systems', icon: Globe },
            { req: 'VPN or private link for on-premise system access', icon: Shield }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <item.icon className="w-4 h-4 mr-3 text-indigo-600 flex-shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.req}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scaling & Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Gauge className="w-6 h-6 mr-3 text-indigo-600" />
          Scaling & Performance Targets
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Performance Metrics</h4>
            <div className="space-y-3">
              {[
                { metric: 'Log Processing Rate', value: '1M+ logs/minute', icon: Zap },
                { metric: 'Dashboard Updates', value: 'Sub-second real-time', icon: Monitor },
                { metric: 'Concurrent Users', value: '1000+ supported', icon: Users },
                { metric: 'Uptime SLA', value: '99.9% guaranteed', icon: CheckCircle }
              ].map((perf, index) => (
                <motion.div
                  key={perf.metric}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800"
                >
                  <div className="flex items-center">
                    <perf.icon className="w-5 h-5 mr-3 text-indigo-600" />
                    <span className="font-medium text-gray-900 dark:text-white">{perf.metric}</span>
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{perf.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Scaling Options</h4>
            <div className="space-y-3">
              {[
                { option: 'Horizontal API Scaling', description: 'Auto-scaling based on request load' },
                { option: 'Database Read Replicas', description: 'Multi-region read performance' },
                { option: 'CDN Global Deployment', description: 'Edge caching for dashboard assets' },
                { option: 'Multi-Region Support', description: 'Data sovereignty and DR compliance' }
              ].map((scale, index) => (
                <motion.div
                  key={scale.option}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{scale.option}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{scale.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── SECTION 6: Security & Compliance ─────────────────────────────
  const renderSecurity = () => (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-3 text-red-600" />
          Security & Compliance
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-red-600" />
              Authentication & Authorization
            </h4>
            <div className="space-y-3">
              {[
                'SSO/SAML 2.0 integration',
                'Role-based access control (RBAC)',
                'API key management with rotation',
                'Session management & timeout',
                'Multi-factor authentication (MFA)',
                'OAuth 2.0 / OpenID Connect'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-blue-600" />
              Data Security
            </h4>
            <div className="space-y-3">
              {[
                'Encryption at rest (AES-256)',
                'TLS 1.3 for data in transit',
                'No PII storage policy',
                'Log data anonymization',
                'Data residency controls',
                'Secure key management (HSM)'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-600" />
            Compliance Standards
          </h4>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: 'SOC 2 Type II', status: 'Ready', color: 'green' },
              { name: 'GDPR', status: 'Compliant', color: 'green' },
              { name: 'PCI-DSS', status: 'Compatible', color: 'blue' },
              { name: 'ISO 27001', status: 'In Progress', color: 'yellow' }
            ].map((compliance, index) => (
              <motion.div
                key={compliance.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 text-center ${
                  compliance.color === 'green' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                  compliance.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                  'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                }`}
              >
                <div className="font-semibold text-gray-900 dark:text-white">{compliance.name}</div>
                <div className={`text-sm ${
                  compliance.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  compliance.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {compliance.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enterprise Security Considerations */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-indigo-600" />
            Enterprise Deployment Security
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Air-Gapped Deployment', desc: 'Full on-premise deployment with no external dependencies. AI models pre-trained and deployed locally.' },
              { title: 'Network Segmentation', desc: 'Platform deployed in isolated network zones with controlled access to enterprise systems via API gateways.' },
              { title: 'Audit Logging', desc: 'Complete audit trail of all data access, user actions, and AI decisions for compliance reporting.' },
              { title: 'Data Retention Policies', desc: 'Configurable retention with automated data lifecycle management aligned to enterprise policies.' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="font-medium text-gray-900 dark:text-white mb-1">{item.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── SECTION 7: Data Flow Architecture ────────────────────────────
  const renderDataFlow = () => (
    <div className="space-y-8">
      {/* End-to-End Data Flow */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Activity className="w-6 h-6 mr-3 text-green-600" />
          End-to-End Data Flow Architecture
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Data flows from enterprise source systems through the IntelliOps platform and back into enterprise workflows as actionable intelligence.
        </p>

        {/* Main Flow Diagram */}
        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/30 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'Enterprise\nSystems', color: 'bg-orange-500', sub: 'JIRA, Splunk, SAP' },
              { name: 'Data Ingestion\nLayer', color: 'bg-blue-500', sub: 'APIs, webhooks, polling' },
              { name: 'IntelliOps\nPlatform', color: 'bg-indigo-600', sub: 'Normalize & store' },
              { name: 'AI Intelligence\nEngine', color: 'bg-purple-600', sub: 'NLP, ML, predictions' },
              { name: 'IntelliOps\nDashboard', color: 'bg-green-500', sub: 'Visualize & decide' },
              { name: 'Enterprise\nActions', color: 'bg-red-500', sub: 'Tickets, alerts, reports' }
            ].map((step, index) => (
              <div key={step.name} className="flex items-center">
                <div className="text-center">
                  <div className={`${step.color} text-white px-4 py-3 rounded-lg text-sm font-medium whitespace-pre-line min-w-[110px]`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{step.sub}</div>
                </div>
                {index < 5 && <ArrowRight className="w-5 h-5 mx-1.5 text-gray-400 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Layer-Specific Data Flows */}
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">SDLC Layer Data Flows (L0–L5)</h4>
        <div className="space-y-4">
          {[
            { layer: 'L0', title: 'Plan Intelligence Flow', color: 'teal', bgClass: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800', cellClass: 'bg-teal-100 dark:bg-teal-800/30', badgeClass: 'bg-teal-600 text-white', flow: [
              { stage: 'Ingest', desc: 'Requirement docs, user stories, acceptance criteria' },
              { stage: 'Process', desc: 'NLP entity extraction, RAG duplicate detection, ML risk scoring' },
              { stage: 'Output', desc: 'Gap analysis, duplicate alerts, test strategy recommendations' },
              { stage: 'Action', desc: 'Update JIRA stories, flag risks, generate test plans' },
            ]},
            { layer: 'L1', title: 'Build Intelligence Flow', color: 'indigo', bgClass: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800', cellClass: 'bg-indigo-100 dark:bg-indigo-800/30', badgeClass: 'bg-indigo-600 text-white', flow: [
              { stage: 'Ingest', desc: 'GitHub PRs, code diffs, commit messages, CI/CD pipelines' },
              { stage: 'Process', desc: 'NLP entity extraction, ML risk prediction, LLM summary generation' },
              { stage: 'Output', desc: 'PR risk scores, impact graphs, failure predictions, test recommendations' },
              { stage: 'Action', desc: 'Require senior review, trigger load tests, auto-generate test cases' },
            ]},
            { layer: 'L2', title: 'Test Intelligence Flow', color: 'purple', bgClass: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800', cellClass: 'bg-purple-100 dark:bg-purple-800/30', badgeClass: 'bg-purple-600 text-white', flow: [
              { stage: 'Ingest', desc: 'JIRA defects, TestRail executions, coverage reports' },
              { stage: 'Process', desc: 'RAG defect matching, NLP classification, LLM root cause insights' },
              { stage: 'Output', desc: 'Duplicate defect alerts, severity classification, quality recommendations' },
              { stage: 'Action', desc: 'Auto-link JIRA issues, prioritize test suites, update knowledge base' },
            ]},
            { layer: 'L3', title: 'Release Intelligence Flow', color: 'rose', bgClass: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800', cellClass: 'bg-rose-100 dark:bg-rose-800/30', badgeClass: 'bg-rose-600 text-white', flow: [
              { stage: 'Ingest', desc: 'Release manifests, deployment configs, Jenkins builds' },
              { stage: 'Process', desc: 'ML risk prediction, NLP change parsing, LLM readiness scoring' },
              { stage: 'Output', desc: 'Release risk score, deployment readiness, go/no-go recommendation' },
              { stage: 'Action', desc: 'Gate deployments, generate release notes, update Confluence' },
            ]},
            { layer: 'L4', title: 'Operate Intelligence Flow', color: 'blue', bgClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', cellClass: 'bg-blue-100 dark:bg-blue-800/30', badgeClass: 'bg-blue-600 text-white', flow: [
              { stage: 'Ingest', desc: 'Splunk logs, ServiceNow incidents, Dynatrace metrics' },
              { stage: 'Process', desc: 'LLM root cause analysis, RAG incident correlation, ML anomaly detection' },
              { stage: 'Output', desc: 'Root cause candidates, cross-system evidence, service health scores' },
              { stage: 'Action', desc: 'Create ServiceNow tickets, trigger PagerDuty alerts, generate RCA reports' },
            ]},
            { layer: 'L5', title: 'Learn Intelligence Flow', color: 'emerald', bgClass: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800', cellClass: 'bg-emerald-100 dark:bg-emerald-800/30', badgeClass: 'bg-emerald-600 text-white', flow: [
              { stage: 'Ingest', desc: 'Incident learnings, release outcomes, model predictions vs actuals' },
              { stage: 'Process', desc: 'ML model retraining, RAG knowledge enrichment, pattern extraction' },
              { stage: 'Output', desc: 'Updated risk models, enriched knowledge base, closed feedback loops' },
              { stage: 'Action', desc: 'Improve L0-L4 predictions, generate prevention rules, update test coverage' },
            ]},
          ].map((layer, index) => (
            <motion.div key={layer.layer} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={`rounded-xl p-6 border ${layer.bgClass}`}>
              <div className="flex items-center mb-4">
                <span className={`text-xs font-bold px-2 py-0.5 rounded mr-2 ${layer.badgeClass}`}>{layer.layer}</span>
                <h5 className="font-semibold text-gray-900 dark:text-white">{layer.title}</h5>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {layer.flow.map((step, i) => (
                  <div key={step.stage} className="relative">
                    <div className={`text-center p-3 rounded-lg ${layer.cellClass}`}>
                      <div className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">{step.stage}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{step.desc}</div>
                    </div>
                    {i < 3 && <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 hidden md:block" />}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Strategy Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            AI Strategy — Technique Selection Matrix
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Each layer uses specific AI techniques based on the nature of the intelligence required. The selection follows a principle: use the simplest technique that achieves the goal.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left border-b border-blue-200 dark:border-blue-800">
                  <th className="py-2 px-3 font-bold text-gray-700 dark:text-gray-300">Layer</th>
                  <th className="py-2 px-3 font-bold text-blue-700 dark:text-blue-300">LLM</th>
                  <th className="py-2 px-3 font-bold text-green-700 dark:text-green-300">RAG</th>
                  <th className="py-2 px-3 font-bold text-amber-700 dark:text-amber-300">ML</th>
                  <th className="py-2 px-3 font-bold text-purple-700 dark:text-purple-300">NLP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {[
                  { layer: 'L0 PLAN', llm: 'Strategy generation', rag: 'Duplicate detection', ml: 'Risk scoring', nlp: 'Entity extraction' },
                  { layer: 'L1 BUILD', llm: 'PR summaries', rag: 'Historical matching', ml: 'Failure prediction', nlp: 'Code path analysis' },
                  { layer: 'L2 TEST', llm: 'Root cause insights', rag: 'Defect matching', ml: '—', nlp: 'Defect classification' },
                  { layer: 'L3 RELEASE', llm: 'Readiness narrative', rag: 'Knowledge retrieval', ml: 'Release risk scoring', nlp: '—' },
                  { layer: 'L4 OPERATE', llm: 'Root cause analysis', rag: 'Incident correlation', ml: 'Anomaly detection', nlp: 'Log parsing' },
                  { layer: 'L5 LEARN', llm: '—', rag: 'Knowledge enrichment', ml: 'Model retraining', nlp: '—' },
                ].map(row => (
                  <tr key={row.layer} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
                    <td className="py-2 px-3 font-semibold text-gray-900 dark:text-white">{row.layer}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{row.llm}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{row.rag}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{row.ml}</td>
                    <td className="py-2 px-3 text-gray-600 dark:text-gray-400">{row.nlp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* API Examples */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Code className="w-6 h-6 mr-3 text-green-600" />
          API Integration Examples
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Splunk Query (L2 — Operations)</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{codeExamples.splunk}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeExamples.splunk, 'splunk')}
                className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
              >
                {copiedCode === 'splunk' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">JIRA Ticket Creation (L1 — Delivery)</h4>
            <div className="relative">
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{codeExamples.jira}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeExamples.jira, 'jira')}
                className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
              >
                {copiedCode === 'jira' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Quick Start: Connect Your First Data Source
          </h4>
          <div className="relative">
            <pre className="bg-gray-900 text-green-400 p-6 rounded-lg text-sm overflow-x-auto">
              <code>{codeExamples.bash}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(codeExamples.bash, 'bash')}
              className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
            >
              {copiedCode === 'bash' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <HelpCircle className="w-6 h-6 mr-3 text-blue-600" />
          Frequently Asked Questions
        </h3>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="business">Business</option>
            <option value="integration">Integration</option>
          </select>
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h4>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      faq.category === 'technical' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' :
                      faq.category === 'business' ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' :
                      'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                    }`}>
                      {faq.category}
                    </span>
                    {faq.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-gray-800"
                  >
                    <div className="px-6 py-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'prototype':
        return renderPrototype();
      case 'techstack':
        return renderTechStack();
      case 'platform':
        return renderPlatform();
      case 'integrations':
        return renderIntegrations();
      case 'infrastructure':
        return renderInfrastructure();
      case 'security':
        return renderSecurity();
      case 'dataflow':
        return renderDataFlow();
      case 'backend-api':
        return isAdmin ? <BackendAPIDocsTab /> : renderPrototype();
      default:
        return renderPrototype();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <Book className="w-8 h-8 mr-3 text-blue-600" />
          Technical Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Architecture, technology stack, enterprise integration requirements, and implementation guidance
          for the IntelliOps AI platform.
        </p>
      </motion.div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <section.icon className="w-5 h-5 mr-2" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Need More Information?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center justify-center">
            <Book className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-gray-700 dark:text-gray-300">Full implementation documentation available on request</span>
          </div>
          <div className="flex items-center justify-center">
            <Mail className="w-5 h-5 mr-2 text-green-600" />
            <span className="text-gray-700 dark:text-gray-300">Technical questions? tech@intelliops.ai</span>
          </div>
          <div className="flex items-center justify-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-600" />
            <span className="text-gray-700 dark:text-gray-300">Schedule a technical deep-dive session</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}