'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  AlertTriangle,
  GitPullRequest,
  MessageSquare,
  History,
  FileText,
  Shield,
  Lightbulb,
  Brain,
  CheckCircle,
  Zap,
  Activity,
  BookOpen,
  TestTube,
  TrendingUp,
  Clock,
  ChevronDown,
  ChevronUp,
  Lock,
  Link,
  ArrowRight,
  Layers,
  Eye,
} from 'lucide-react';
import { getIncidentAnalysis } from '@/services/incidentIntelligence';

const evidenceIconMap = {
  pr: GitPullRequest,
  slack: MessageSquare,
  historical: History,
  log: FileText,
};

const evidenceColorMap = {
  pr: 'text-blue-600 bg-blue-50 border-blue-200',
  slack: 'text-purple-600 bg-purple-50 border-purple-200',
  historical: 'text-amber-600 bg-amber-50 border-amber-200',
  log: 'text-gray-600 bg-gray-50 border-gray-200',
};

export default function IncidentIntelligencePreview() {
  const [isExpanded, setIsExpanded] = useState(true);

  const sampleIncident = 'Checkout failure for premium users';
  const analysis = getIncidentAnalysis(sampleIncident);

  return (
    <div className="space-y-6">
      {/* ── Section Header: L2 Reframing ── */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-orange-600">
              L2 — Operations Intelligence
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full border border-orange-200">
            <Lock className="w-3 h-3" />
            Preview
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Operations Intelligence
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          AI-powered root cause analysis across logs, PRs, and collaboration
          signals
        </p>
      </div>

      {/* ── Narrative Block ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-5 bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 rounded-xl border border-slate-200"
      >
        <div className="flex gap-3">
          <div className="p-2 bg-orange-100 rounded-lg h-fit mt-0.5">
            <Eye className="w-4 h-4 text-orange-600" />
          </div>
          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <p>
              Most teams don&apos;t have a complete picture of production
              behavior. Logs, pull requests, Slack discussions, incidents, and
              CI/CD pipelines all exist in silos.
            </p>
            <p>
              When something breaks, engineers manually stitch context together
              across systems — often taking hours or days to find a root cause.
            </p>
            <p className="text-gray-800 font-medium">
              IntelliOps changes this. It connects all systems into a unified
              intelligence layer — so you can trace any production issue to its
              root cause in minutes, not days.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Main Analysis Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Card Header with Gradient */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  AI Incident Intelligence Engine
                </h3>
                <p className="text-white/80 text-sm">
                  Cross-system context correlation (PRs, logs, Slack, incidents)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                <Activity className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-medium text-white">
                  {analysis.confidence}% confidence
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-medium text-white">
                  {analysis.analysisTime}
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="px-6 py-5 space-y-6">
            {/* Incident Input */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Production Incident
                </span>
                <p className="text-sm font-semibold text-gray-900">
                  {sampleIncident}
                </p>
              </div>
            </div>

            {/* Root Cause — highlighted prominently */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-red-100 rounded-md mt-0.5">
                  <Zap className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-800 mb-1">
                    Root Cause Identified
                  </h4>
                  <p className="text-sm text-red-700 leading-relaxed">
                    {analysis.rootCause}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contributing Factors & Evidence — two column */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Contributing Factors */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Contributing Factors
                </h4>
                <div className="space-y-2">
                  {analysis.contributingFactors.map((factor, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-2.5 bg-amber-50/50 rounded-lg border border-amber-100"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{factor}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Evidence */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Cross-System Evidence
                </h4>
                <div className="space-y-2">
                  {analysis.evidence.map((item, i) => {
                    const Icon = evidenceIconMap[item.type];
                    const colorClass = evidenceColorMap[item.type];
                    return (
                      <div
                        key={i}
                        className={`flex items-start gap-3 p-2.5 rounded-lg border ${colorClass}`}
                      >
                        <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold block">
                            {item.label}
                          </span>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* ── Context Graph Insights ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="p-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 rounded-lg border border-blue-200"
            >
              <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Link className="w-4 h-4 text-blue-600" />
                Context Graph Insights
              </h4>
              <p className="text-xs text-blue-600 mb-3">
                IntelliOps automatically connects signals across systems to build a causal timeline:
              </p>
              <div className="space-y-2">
                {[
                  {
                    icon: GitPullRequest,
                    color: 'text-blue-600',
                    bg: 'bg-blue-100',
                    text: 'PR #482 introduced timeout configuration change in payment-service',
                  },
                  {
                    icon: MessageSquare,
                    color: 'text-purple-600',
                    bg: 'bg-purple-100',
                    text: 'Slack discussion in #payments-team flagged potential risk before deployment',
                  },
                  {
                    icon: History,
                    color: 'text-amber-600',
                    bg: 'bg-amber-100',
                    text: 'Similar incident pattern (INC-2847) observed in Feb 2025 under comparable conditions',
                  },
                ].map((insight, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-2.5 bg-white/70 rounded-lg border border-blue-100"
                  >
                    <div className={`p-1 ${insight.bg} rounded-md mt-0.5`}>
                      <insight.icon className={`w-3.5 h-3.5 ${insight.color}`} />
                    </div>
                    <p className="text-sm text-gray-700">{insight.text}</p>
                    {i < 2 && (
                      <ArrowRight className="w-3.5 h-3.5 text-blue-300 flex-shrink-0 mt-0.5 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Risk Pattern */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-yellow-100 rounded-md mt-0.5">
                  <Shield className="w-4 h-4 text-yellow-700" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yellow-800 mb-1">
                    Detected Risk Pattern
                  </h4>
                  <p className="text-sm text-yellow-700 leading-relaxed">
                    {analysis.riskPattern}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-indigo-500" />
                AI Recommendations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {analysis.recommendation.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100"
                  >
                    <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{rec}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Continuous Learning Loop — CORE DIFFERENTIATOR ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-xl border-2 border-emerald-200 relative overflow-hidden"
            >
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-emerald-100 rounded-md">
                    <Brain className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-800">
                    Continuous Learning Loop
                  </h4>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                    Active
                  </span>
                </div>

                <p className="text-sm text-emerald-700 mb-4">
                  This incident pattern will now actively strengthen the
                  platform&apos;s intelligence across three dimensions:
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      icon: TrendingUp,
                      label: 'Release Risk Prediction',
                      text: 'Timeout config changes in payment services now flagged as high-risk in future release assessments',
                    },
                    {
                      icon: TestTube,
                      label: 'Test Coverage Recommendations',
                      text: 'Automated load test requirement added for any change touching payment-critical paths',
                    },
                    {
                      icon: BookOpen,
                      label: 'Knowledge Base Intelligence',
                      text: 'New pattern entry linking config changes to cascading timeout failures under load',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-white/70 rounded-lg border border-emerald-100"
                    >
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <item.icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-emerald-700 block">
                          {item.label}
                        </span>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lifecycle visualization */}
                <div className="mt-4 pt-4 border-t border-emerald-200">
                  <p className="text-xs font-medium text-emerald-600 mb-2">
                    Intelligence Lifecycle
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-medium text-emerald-700">
                    {[
                      'Incident',
                      'Root Cause',
                      'Knowledge Update',
                      'Test Optimization',
                      'Better Release',
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className="px-2 py-1 bg-emerald-100/80 rounded-md whitespace-nowrap">
                          {step}
                        </span>
                        {i < 4 && (
                          <span className="text-emerald-400 mx-0.5">
                            &rarr;
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* ── Transition Hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center py-4"
      >
        <p className="text-sm text-gray-400 italic">
          This is a preview of how IntelliOps extends beyond delivery — into
          production intelligence.
        </p>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            L1 Delivery Intelligence — Active
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            L2 Operations Intelligence — Preview
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            L3 Enterprise Intelligence — Coming Soon
          </span>
        </div>
      </motion.div>
    </div>
  );
}
