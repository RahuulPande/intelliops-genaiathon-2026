'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp } from 'lucide-react';
import ReadinessBanner from './panels/ReadinessBanner';
import PrioritizationPanel from './panels/PrioritizationPanel';
import FlakyTestPanel from './panels/FlakyTestPanel';
import TestGapPanel from './panels/TestGapPanel';
import ClusterPanel from './panels/ClusterPanel';
import TriagePanel from './panels/TriagePanel';
import {
  mockPrioritizedTests,
  mockFlakyTests,
  mockTestGaps,
  mockFailureClusters,
  mockReleaseReadiness,
  mockFailureTriage,
  type TestPrioritizationData,
  type FlakyTestDetectionData,
  type TestGapAnalysisData,
  type FailureRootCauseClusterData,
  type ReleaseReadinessData,
  type SmartFailureTriageData,
} from '@/lib/mock/testManagementIntelligenceData';

// ── Panel state helper ───────────────────────────────────

interface PanelState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

// ── Default panel data (pre-loaded from mock) ────────────

const defaultPrioritization: TestPrioritizationData = {
  summary: 'Smart test prioritization based on historical failure patterns and code change impact.',
  technique: 'ML',
  confidence: 0.91,
  prioritizedTests: mockPrioritizedTests,
  coverage: { top20PercentCatches: 82, estimatedTimeSaved: '3.2 hours' },
  insight: 'Top 20% of tests (47 of 235) catch 82% of bugs. Running these first saves ~3.2 hours per cycle.',
};

const defaultFlaky: FlakyTestDetectionData = {
  summary: 'Flaky test detection identified 5 tests with inconsistent pass/fail patterns.',
  technique: 'ML',
  confidence: 0.88,
  flakyTests: mockFlakyTests,
  totalQuarantined: 5,
  timeSaved: '2.1 hrs/sprint',
  impact: 'Quarantining these 5 tests saves 2.1 hrs/sprint in false triage and unblocks 3 release pipelines.',
};

const defaultGap: TestGapAnalysisData = {
  summary: 'Test coverage gap analysis identified 3 critical gaps.',
  technique: 'RAG',
  confidence: 0.86,
  gaps: mockTestGaps,
  overallCoverage: 68,
  targetCoverage: 80,
  insight: '3 critical requirements have less than 50% coverage. Closing these gaps would prevent an estimated 8 defects per release cycle.',
};

const defaultCluster: FailureRootCauseClusterData = {
  summary: '12 test failures clustered into 2 root causes instead of 12 separate issues.',
  technique: 'NLP',
  confidence: 0.91,
  clusters: mockFailureClusters,
  totalFailures: 12,
  uniqueRootCauses: 2,
  insight: 'What looked like 12 separate problems is actually 2 root causes. Fixing the auth pool config resolves 67% of all failures.',
};

// ── Main Component ───────────────────────────────────────

export default function TestManagementIntelligence() {
  const [readiness, setReadiness] = useState<PanelState<ReleaseReadinessData>>({
    data: mockReleaseReadiness,
    loading: false,
    error: null,
  });

  const [prioritization, setPrioritization] = useState<PanelState<TestPrioritizationData>>({
    data: defaultPrioritization,
    loading: false,
    error: null,
  });

  const [flaky, setFlaky] = useState<PanelState<FlakyTestDetectionData>>({
    data: defaultFlaky,
    loading: false,
    error: null,
  });

  const [gap, setGap] = useState<PanelState<TestGapAnalysisData>>({
    data: defaultGap,
    loading: false,
    error: null,
  });

  const [cluster, setCluster] = useState<PanelState<FailureRootCauseClusterData>>({
    data: defaultCluster,
    loading: false,
    error: null,
  });

  const [triage, setTriage] = useState<PanelState<SmartFailureTriageData>>({
    data: mockFailureTriage,
    loading: false,
    error: null,
  });

  // ── Generic analyze handler ──────────────────────────────

  const analyzePanel = useCallback(
    async <T,>(
      type: string,
      setter: React.Dispatch<React.SetStateAction<PanelState<T>>>,
      fallbackData: T,
    ) => {
      setter((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const res = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            context: { source: 'test-management-intelligence', timestamp: new Date().toISOString() },
            layer: 'L1',
            workspace: 'test-management',
            inputSummary: `${type} analysis triggered from Test Management Intelligence dashboard`,
          }),
        });

        if (!res.ok) throw new Error(`API responded ${res.status}`);

        const json = await res.json();
        const result = json.result as T;
        setter({ data: result ?? fallbackData, loading: false, error: null });
      } catch (err) {
        console.warn(`[TestManagementIntelligence] ${type} analysis failed:`, err);
        setter((prev) => ({ ...prev, loading: false, error: 'Analysis failed — showing cached data' }));
      }
    },
    [],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 text-white"
      >
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="w-7 h-7" />
          <h2 className="text-2xl font-bold">Test Management Intelligence</h2>
          <span className="ml-auto text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
            6 AI Capabilities · ML + RAG + NLP + LLM
          </span>
        </div>
        <p className="text-purple-100 text-sm">
          AI-powered test management — prioritize intelligently, detect flaky tests, find coverage gaps,
          cluster failures by root cause, predict release readiness, and auto-triage failures.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
          {[
            { label: 'Prioritized', value: mockPrioritizedTests.length, sub: 'tests' },
            { label: 'Flaky', value: mockFlakyTests.length, sub: 'detected' },
            { label: 'Gaps', value: mockTestGaps.length, sub: 'critical' },
            { label: 'Clusters', value: mockFailureClusters.length, sub: 'root causes' },
            { label: 'Readiness', value: `${mockReleaseReadiness.completionPercentage}%`, sub: 'complete' },
            { label: 'Triage', value: mockFailureTriage.similarDefects.length, sub: 'matches' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-[10px] text-purple-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Self-Learning Loop Badge */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <TrendingUp className="w-4 h-4 text-purple-500" />
        <span>
          <span className="font-medium text-gray-700 dark:text-gray-300">Self-Learning Loop:</span>{' '}
          Every analysis feeds back into model training — improving prioritization accuracy, flaky detection, and readiness prediction over time.
        </span>
      </div>

      {/* Release Readiness Banner — Full Width */}
      <ReadinessBanner
        data={readiness.data}
        loading={readiness.loading}
        onAnalyze={() => analyzePanel('release_readiness', setReadiness, mockReleaseReadiness)}
      />

      {/* 2×3 Grid of Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PrioritizationPanel
          tests={prioritization.data.prioritizedTests}
          coverage={prioritization.data.coverage}
          insight={prioritization.data.insight}
          confidence={prioritization.data.confidence}
          loading={prioritization.loading}
          onAnalyze={() => analyzePanel('test_prioritization', setPrioritization, defaultPrioritization)}
        />

        <FlakyTestPanel
          tests={flaky.data.flakyTests}
          totalQuarantined={flaky.data.totalQuarantined}
          timeSaved={flaky.data.timeSaved}
          impact={flaky.data.impact}
          confidence={flaky.data.confidence}
          loading={flaky.loading}
          onAnalyze={() => analyzePanel('flaky_test_detection', setFlaky, defaultFlaky)}
        />

        <TestGapPanel
          gaps={gap.data.gaps}
          overallCoverage={gap.data.overallCoverage}
          targetCoverage={gap.data.targetCoverage}
          insight={gap.data.insight}
          confidence={gap.data.confidence}
          loading={gap.loading}
          onAnalyze={() => analyzePanel('test_gap_analysis', setGap, defaultGap)}
        />

        <ClusterPanel
          clusters={cluster.data.clusters}
          totalFailures={cluster.data.totalFailures}
          uniqueRootCauses={cluster.data.uniqueRootCauses}
          insight={cluster.data.insight}
          confidence={cluster.data.confidence}
          loading={cluster.loading}
          onAnalyze={() => analyzePanel('failure_root_cause_cluster', setCluster, defaultCluster)}
        />

        <TriagePanel
          data={triage.data}
          loading={triage.loading}
          onAnalyze={() => analyzePanel('smart_failure_triage', setTriage, mockFailureTriage)}
        />
      </div>
    </div>
  );
}
