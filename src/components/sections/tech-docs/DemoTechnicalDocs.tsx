'use client';

import { motion } from 'framer-motion';
import {
  Box, Package, Brain, Workflow, Server, Shield, Activity,
  Layers, Monitor, CheckCircle, ArrowRight, Cpu, Globe,
  Lock, Cloud, Database, Zap
} from 'lucide-react';

interface DemoTechnicalDocsProps {
  activeSection: string;
}

// ─── Prototype Architecture (Demo) ─────────────────────────────────
const DemoPrototype = () => (
  <div className="space-y-8">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
        <Box className="w-6 h-6 mr-3 text-blue-600" />
        Delivery Intelligence Architecture
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This prototype demonstrates IntelliOps AI&apos;s Delivery Intelligence capabilities — a focused AI layer that transforms how banking teams manage software quality and releases.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-purple-600" />
            Architecture Characteristics
          </h4>
          <div className="space-y-3">
            {[
              { title: 'Single Page Application (SPA)', desc: 'React/Next.js with client-side routing and state-driven navigation' },
              { title: 'Component-Based Design', desc: 'Modular, reusable UI components organized by intelligence domain' },
              { title: 'AI-Powered Analysis', desc: 'RAG, ML, NLP, and LLM techniques for intelligent insights' },
              { title: 'Real-Time Data Simulation', desc: 'Realistic enterprise data patterns from banking environments' },
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
            Dashboard Modules
          </h4>
          <div className="space-y-3">
            {[
              { name: 'Test & Quality Intelligence', desc: 'Defect matching, coverage analysis, quality trends', icon: Brain },
              { name: 'Release Intelligence', desc: 'Deployment risk scoring, rollback planning', icon: Package },
              { name: 'Application Knowledge Base', desc: 'Institutional knowledge from defect history', icon: Layers },
              { name: 'Technical Documentation', desc: 'Architecture and integration guides', icon: Box },
              { name: 'Settings & Administration', desc: 'Platform configuration', icon: Zap }
            ].map((mod, i) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
              >
                <div className="p-1.5 bg-purple-100 dark:bg-purple-800 rounded-md">
                  <mod.icon className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">{mod.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{mod.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── How the Platform Works (Demo) ─────────────────────────────────
const DemoPlatform = () => (
  <div className="space-y-8">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
        <Brain className="w-6 h-6 mr-3 text-purple-600" />
        How Delivery Intelligence Works
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Delivery Intelligence transforms raw operational data from enterprise systems into actionable quality and release insights through a three-stage AI pipeline.
      </p>

      {/* Pipeline Flow */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-center gap-3 p-6 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-700 dark:to-purple-900/30 rounded-xl border border-gray-200 dark:border-gray-600">
          {[
            { name: 'Data Sources', color: 'bg-orange-500', desc: 'JIRA, TestRail, GitHub, Jenkins' },
            { name: 'AI Intelligence\nEngine', color: 'bg-purple-600', desc: 'RAG, ML, NLP, LLM' },
            { name: 'IntelliOps\nDashboard', color: 'bg-indigo-500', desc: 'Visualize & act' }
          ].map((step, index) => (
            <div key={step.name} className="flex items-center">
              <div className="text-center">
                <div className={`${step.color} text-white px-4 py-3 rounded-lg text-sm font-medium whitespace-pre-line min-w-[120px]`}>
                  {step.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{step.desc}</div>
              </div>
              {index < 2 && <ArrowRight className="w-5 h-5 mx-2 text-gray-400 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence Modules */}
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Intelligence Modules</h4>
      <div className="space-y-4">
        {[
          {
            title: 'Test & Quality Intelligence',
            color: 'purple',
            sources: 'JIRA, TestRail, CI pipelines',
            processing: ['RAG-based defect matching against historical database', 'NLP pattern analysis for defect classification', 'ML quality prediction and coverage scoring'],
            output: 'Defect correlations, coverage analysis, quality trends'
          },
          {
            title: 'Release Intelligence',
            color: 'purple',
            sources: 'Jenkins, GitHub, deployment pipelines',
            processing: ['ML risk scoring based on 18 months of release history', 'LLM-powered rollback planning and recommendations', 'Pattern detection across deployment configurations'],
            output: 'Deployment risk assessment, release readiness scoring'
          },
          {
            title: 'Application Knowledge Base',
            color: 'purple',
            sources: 'Historical defects, runbooks, documentation',
            processing: ['LLM knowledge extraction from unstructured sources', 'RAG semantic search across organizational knowledge', 'Automated onboarding path generation'],
            output: 'Searchable runbooks, institutional knowledge, onboarding paths'
          }
        ].map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="rounded-xl p-6 border bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
          >
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{module.title}</h5>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <span className="font-medium">Data Sources:</span> {module.sources}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Processing:</div>
                <ul className="space-y-1">
                  {module.processing.map((p, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                      <Cpu className="w-3 h-3 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Intelligence Output:</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{module.output}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Enterprise Integrations (Demo) ────────────────────────────────
const DemoIntegrations = () => (
  <div className="space-y-8">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
        <Workflow className="w-6 h-6 mr-3 text-green-600" />
        Delivery Intelligence — Integrations
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        IntelliOps connects to your existing tools to power intelligent analysis. All integrations use standard REST APIs and webhook-based event ingestion.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            category: 'Quality & Testing Tools',
            tools: [
              { name: 'JIRA Cloud / Server', desc: 'Defect tracking, project management, sprint data' },
              { name: 'TestRail / Xray', desc: 'Test execution data, coverage reports, test plans' }
            ]
          },
          {
            category: 'Source Control & CI/CD',
            tools: [
              { name: 'GitHub / GitLab', desc: 'Repository access, PR data, commit history' },
              { name: 'Jenkins', desc: 'Build history, pipeline status, deployment logs' }
            ]
          },
          {
            category: 'Knowledge Sources',
            tools: [
              { name: 'Confluence', desc: 'Documentation, runbooks, knowledge articles' }
            ]
          }
        ].map((group, gIndex) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gIndex * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
          >
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{group.category}</h4>
            <div className="space-y-3">
              {group.tools.map(tool => (
                <div key={tool.name} className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm text-gray-900 dark:text-white">{tool.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{tool.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Infrastructure (Demo) ─────────────────────────────────────────
const DemoInfrastructure = () => (
  <div className="space-y-8">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
        <Server className="w-6 h-6 mr-3 text-blue-600" />
        Infrastructure Overview
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        This demo runs as a client-side application with simulated data. Below is the current demo infrastructure and the planned production architecture.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-green-600" />
            Demo Infrastructure
          </h4>
          <div className="space-y-3">
            {[
              { label: 'Frontend', value: 'Next.js 15 on Vercel' },
              { label: 'Data', value: 'Client-side simulation (no backend required)' },
              { label: 'AI', value: 'Simulated outputs demonstrating real analysis patterns' },
              { label: 'Deployment', value: 'Edge-cached static assets, global CDN' }
            ].map(item => (
              <div key={item.label} className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-sm text-gray-900 dark:text-white">{item.label}:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Cloud className="w-5 h-5 mr-2 text-blue-600" />
            Production Infrastructure (Planned)
          </h4>
          <div className="space-y-3">
            {[
              { label: 'Application Server', value: 'Node.js/Python with auto-scaling' },
              { label: 'Database', value: 'PostgreSQL for structured data' },
              { label: 'AI Services', value: 'Claude API for intelligent analysis' },
              { label: 'Deployment', value: 'Cloud-hosted with enterprise SLA' }
            ].map(item => (
              <div key={item.label} className="flex items-start space-x-3">
                <Database className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-sm text-gray-900 dark:text-white">{item.label}:</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

// ─── Data Flow (Demo) ──────────────────────────────────────────────
const DemoDataFlow = () => (
  <div className="space-y-8">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
        <Activity className="w-6 h-6 mr-3 text-indigo-600" />
        Data Flow — Delivery Intelligence
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        End-to-end data flow from enterprise tools through the AI intelligence engine to the dashboard.
      </p>

      {/* Visual Flow */}
      <div className="space-y-4">
        {[
          {
            step: 1,
            title: 'Enterprise Tools',
            desc: 'JIRA, TestRail, GitHub, Jenkins',
            color: 'bg-orange-500',
            detail: 'REST APIs + Webhooks push events in real-time'
          },
          {
            step: 2,
            title: 'Data Ingestion & Normalization',
            desc: 'Structured event processing',
            color: 'bg-blue-500',
            detail: 'Raw data transformed into normalized entities for analysis'
          },
          {
            step: 3,
            title: 'AI Intelligence Engine',
            desc: 'RAG, ML, NLP, LLM',
            color: 'bg-purple-600',
            detail: 'Semantic search, risk scoring, entity extraction, natural language insights'
          },
          {
            step: 4,
            title: 'IntelliOps Dashboard',
            desc: 'Test & Quality, Release, Knowledge Base',
            color: 'bg-indigo-500',
            detail: 'Grounded intelligence presented as actionable insights with confidence scores'
          }
        ].map((stage, index) => (
          <motion.div
            key={stage.step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.12 }}
            className="flex items-start space-x-4"
          >
            <div className={`${stage.color} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}>
              {stage.step}
            </div>
            <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-1">
                <h5 className="font-semibold text-gray-900 dark:text-white">{stage.title}</h5>
                <span className="text-xs text-gray-500 dark:text-gray-400">{stage.desc}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stage.detail}</p>
            </div>
            {index < 3 && (
              <div className="absolute left-[1.85rem] mt-8 w-0.5 h-4 bg-gray-300 dark:bg-gray-600" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Main Export ────────────────────────────────────────────────────
export default function DemoTechnicalDocs({ activeSection }: DemoTechnicalDocsProps) {
  switch (activeSection) {
    case 'prototype':
      return <DemoPrototype />;
    case 'platform':
      return <DemoPlatform />;
    case 'integrations':
      return <DemoIntegrations />;
    case 'infrastructure':
      return <DemoInfrastructure />;
    case 'dataflow':
      return <DemoDataFlow />;
    default:
      return null; // techstack and security handled by parent (unchanged)
  }
}
