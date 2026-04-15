'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PackageOpen,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  GitBranch,
  TestTubes,
  Shield,
  Zap,
} from 'lucide-react';
import { releases, type Release } from '@/lib/mock/releaseData';
import AIOutputPanel from '@/components/shared/AIOutputPanel';
import type { AIGenerationResult } from '@/lib/ai/simulatedAI';
import { useAuth } from '@/context/AuthContext';
import CABIntelligence from './CABIntelligence';

// ─── Color systems ──────────────────────────────────────────────
const statusColors: Record<string, { bg: string; text: string; badge: string }> = {
  deployed: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-900 dark:text-green-100',
    badge: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
  },
  'in-progress': {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    text: 'text-amber-900 dark:text-amber-100',
    badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  },
  planned: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-900 dark:text-blue-100',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  },
  'rolled-back': {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-900 dark:text-red-100',
    badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
  },
};

const riskLevelColor = (score: number) => {
  if (score >= 75) return 'text-red-600 dark:text-red-400';
  if (score >= 50) return 'text-amber-600 dark:text-amber-400';
  return 'text-green-600 dark:text-green-400';
};

const riskBgColor = (score: number) => {
  if (score >= 75) return 'bg-red-100 dark:bg-red-900/30';
  if (score >= 50) return 'bg-amber-100 dark:bg-amber-900/30';
  return 'bg-green-100 dark:bg-green-900/30';
};

// ─── AI Deployment Assessment Generator ──────────────────────────
const generateDeploymentAssessment = (rel: Release): AIGenerationResult => {
  const riskLevel = rel.riskScore > 70 ? 'high' : rel.riskScore > 40 ? 'moderate' : 'low';
  const riskProfile =
    rel.riskScore > 70
      ? 'critical payment coupling detected, requiring phased canary rollout'
      : rel.riskScore > 40
        ? 'moderate changes with integration points requiring validation'
        : 'low-risk changes supporting standard deployment';

  const failedChecks = rel.preDeployChecks.filter((c) => c.status === 'failed').length;
  const pendingChecks = rel.preDeployChecks.filter((c) => c.status === 'pending').length;
  const passedChecks = rel.preDeployChecks.filter((c) => c.status === 'passed').length;

  const deploymentStrategyRecommendation =
    rel.deploymentStrategy === 'canary'
      ? 'Canary strategy is appropriate—gradual rollout to user segments reduces blast radius.'
      : rel.deploymentStrategy === 'blue-green'
        ? 'Blue-green approach enables instant rollback if anomalies detected.'
        : rel.deploymentStrategy === 'rolling'
          ? 'Rolling update strategy balances uptime with staged validation.'
          : 'Direct deployment recommended only for low-risk hotfixes.';

  const checkReadiness =
    failedChecks > 0
      ? `WARNING: ${failedChecks} pre-deployment checks failed. Address before proceeding.`
      : pendingChecks > 0
        ? `${pendingChecks} checks still pending. Estimated readiness in 24-48 hours.`
        : `All ${passedChecks} pre-deployment checks passed. Release candidate ready.`;

  const rollbackConsideration =
    rel.riskScore > 75
      ? 'Given high risk profile, ensure rollback procedures are tested and team is on standby.'
      : rel.riskScore > 50
        ? 'Monitor key metrics for 30 minutes post-deployment. Rollback window available for 2 hours.'
        : 'Low risk profile supports standard deployment monitoring.';

  const text = `${rel.name} presents a ${riskLevel}-risk deployment scenario with ${riskProfile}. Risk score of ${rel.riskScore}/100 indicates ${checkReadiness} ${deploymentStrategyRecommendation} ${rollbackConsideration} Change footprint spans ${rel.changeSize.files} files (+${rel.changeSize.additions}/-${rel.changeSize.deletions} lines). Test coverage: ${rel.testsPassed} passed, ${rel.testsFailed} failed. Recommendation: Execute ${rel.deploymentStrategy} deployment with continuous monitoring of transaction error rates and service latency metrics.`;

  const confidence = failedChecks === 0 && pendingChecks === 0 ? 0.94 : failedChecks > 0 ? 0.62 : 0.78;

  return {
    text,
    meta: {
      model: 'Claude 3.5 Sonnet (simulated)',
      tokens: Math.floor(Math.random() * 1600 + 2400),
      latency_ms: Math.floor(Math.random() * 1200 + 950),
      technique: 'LLM',
      confidence,
      timestamp: new Date().toISOString(),
    },
    promptTemplate:
      'Analyze release deployment readiness, risk factors, and deployment strategy suitability. Consider pre-deployment check status, change metrics, test coverage, and service criticality.',
  };
};

// ─── Component ──────────────────────────────────────────────────
interface ReleaseExplorerWorkspaceProps {
  showCABTab?: boolean;
}

export default function ReleaseExplorerWorkspace({ showCABTab = true }: ReleaseExplorerWorkspaceProps) {
  const { isAdmin } = useAuth();
  const showCAB = showCABTab && isAdmin;
  const [activeTab, setActiveTab] = useState<'explorer' | 'cab'>('explorer');
  const [selectedId, setSelectedId] = useState<string>(releases[0].id);
  const rel = releases.find((r) => r.id === selectedId)!;

  const handleRegenerate = useCallback((): AIGenerationResult => {
    return generateDeploymentAssessment(rel);
  }, [rel]);

  return (
    <div className="space-y-6">
      {/* Tab Bar — admin only, only when CAB tab is shown */}
      {showCAB && (
        <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'explorer'
                ? 'bg-rose-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Release Explorer
          </button>
          <button
            onClick={() => setActiveTab('cab')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'cab'
                ? 'bg-rose-500 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            CAB Intelligence
          </button>
        </div>
      )}
      {/* CAB Intelligence Tab */}
      {activeTab === 'cab' && showCAB && <CABIntelligence />}

      {/* Release Explorer Tab */}
      {(activeTab === 'explorer' || !isAdmin) && (
      <><div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {releases.map((r) => (
          <motion.button
            key={r.id}
            onClick={() => setSelectedId(r.id)}
            className={`text-left p-6 rounded-xl border-2 transition-all ${
              selectedId === r.id
                ? 'border-rose-400 dark:border-rose-600 bg-rose-50 dark:bg-rose-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{r.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{r.version}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase whitespace-nowrap ml-2 ${statusColors[r.status].badge}`}>
                {r.status === 'in-progress' ? 'In Progress' : r.status === 'rolled-back' ? 'Rolled Back' : r.status === 'planned' ? 'Planned' : 'Deployed'}
              </span>
            </div>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3" />
                <span>{r.services.join(', ')}</span>
              </div>
              <div className={`font-semibold ${riskLevelColor(r.riskScore)}`}>Risk: {r.riskScore}/100</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Release Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColors[rel.status].badge}`}>
                    {rel.status === 'in-progress' ? 'In Progress' : rel.status === 'rolled-back' ? 'Rolled Back' : rel.status === 'planned' ? 'Planned' : 'Deployed'}
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {rel.deploymentStrategy === 'blue-green'
                      ? 'Blue-Green'
                      : rel.deploymentStrategy === 'rolling'
                        ? 'Rolling'
                        : rel.deploymentStrategy === 'canary'
                          ? 'Canary'
                          : 'Direct'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{rel.name}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Version {rel.version}</span>
                  <span>Deployed {new Date(rel.deploymentDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className={`flex-shrink-0 text-center px-6 py-4 rounded-xl border ${riskBgColor(rel.riskScore)} border-gray-200 dark:border-gray-700`}>
                <div className={`text-3xl font-bold ${riskLevelColor(rel.riskScore)}`}>{rel.riskScore}</div>
                <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase mt-1">Risk Score</div>
                <div className="mt-2 w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${rel.riskScore >= 75 ? 'bg-red-500' : rel.riskScore >= 50 ? 'bg-amber-500' : 'bg-green-500'}`}
                    style={{ width: `${rel.riskScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">Risk Level</div>
              <div className={`text-2xl font-bold ${riskLevelColor(rel.riskScore)}`}>
                {rel.riskScore >= 75 ? 'Critical' : rel.riskScore >= 50 ? 'Moderate' : 'Low'}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">Strategy</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {rel.deploymentStrategy === 'blue-green'
                  ? 'Blue-Green'
                  : rel.deploymentStrategy === 'rolling'
                    ? 'Rolling'
                    : rel.deploymentStrategy === 'canary'
                      ? 'Canary'
                      : 'Direct'}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">PRs Included</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{rel.includedPRs.length}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-2">Test Pass Rate</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round((rel.testsPassed / (rel.testsPassed + rel.testsFailed)) * 100)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {rel.testsPassed} passed, {rel.testsFailed} failed
              </div>
            </div>
          </div>

          {/* AI Deployment Assessment */}
          <AIOutputPanel
            generate={handleRegenerate}
            contextKey={selectedId}
            techniques={['LLM', 'ML']}
            title="AI Deployment Assessment"
          />

          {/* Included Changes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-rose-500" />
              Included Changes
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {rel.changeSize.files} files changed (+{rel.changeSize.additions} -{rel.changeSize.deletions} lines)
              </div>
              {rel.includedPRs.map((pr) => (
                <div key={pr} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{pr}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Services: {rel.services.join(', ')}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                    Risk: {rel.riskScore}
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                {rel.branchConflicts > 0
                  ? `${rel.branchConflicts} branch conflict(s) resolved during merge`
                  : 'No branch conflicts detected. Merge history clean.'}
              </div>
            </div>
          </div>

          {/* Pre-Deployment Checklist */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-rose-500" />
              Pre-Deployment Checklist
            </h3>
            <div className="space-y-3">
              {rel.preDeployChecks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex-shrink-0 mt-0.5">
                    {check.status === 'passed' && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {check.status === 'failed' && (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    {check.status === 'pending' && (
                      <Clock className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{check.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{check.detail}</div>
                  </div>
                  <span
                    className={`text-xs font-bold uppercase px-2 py-0.5 rounded whitespace-nowrap ${
                      check.status === 'passed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : check.status === 'failed'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {check.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Rollback Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              Rollback Strategy
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{rel.rollbackPlan}</p>
            <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded text-sm text-rose-700 dark:text-rose-300">
              {rel.status === 'rolled-back'
                ? 'This release was rolled back due to issues detected post-deployment.'
                : rel.status === 'deployed'
                  ? 'Release deployed successfully. Monitoring active for 24 hours post-deployment.'
                  : 'Rollback procedures ready. Team standby required.'}
            </div>
          </div>

        </motion.div>
      </AnimatePresence>
      </>)}
    </div>
  );
}
