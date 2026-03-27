'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, TrendingDown, TrendingUp, Clock, Target, Grid3x3, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import TestDetailTabs from './TestDetailTabs';
import { testSuites, type TestSuite, getFailureMetrics, getDefectMatchesByService, getCoverageGapsByService } from '@/lib/mock/testData';
import type { AIGenerationResult } from '@/lib/ai/simulatedAI';

// ─── Trend Colors ────────────────────────────────────────────────────────
const trendConfig: Record<TestSuite['trend'], { bg: string; text: string; icon: typeof TrendingUp }> = {
  improving: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300', icon: TrendingUp },
  stable: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300', icon: Activity },
  declining: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300', icon: TrendingDown },
};

// ═══════════════════════════════════════════════════════════════════════════════
export default function TestQualityWorkspace() {
  const [selectedId, setSelectedId] = useState<string>(testSuites[0].id);
  const [activeSubTab, setActiveSubTab] = useState<'results' | 'coverage' | 'defects' | 'assessment'>('results');

  const suite = testSuites.find(ts => ts.id === selectedId)!;
  const metrics = getFailureMetrics(suite);
  const relatedDefects = getDefectMatchesByService(suite.service);
  const relatedGaps = getCoverageGapsByService(suite.service);

  // ─── AI Generation Functions ──────────────────────────────────────────────

  const generateGapAnalysis = useCallback((): AIGenerationResult => {
    const gapCount = relatedGaps.length;
    const totalGap = relatedGaps.reduce((sum, g) => sum + (g.targetCoverage - g.currentCoverage), 0);
    const avgGap = gapCount > 0 ? (totalGap / gapCount).toFixed(1) : '0';

    const narratives = [
      `Test coverage analysis for ${suite.name} reveals ${gapCount} critical gaps across ${relatedGaps.length} components. The most significant gap is in branch coverage (${relatedGaps[0]?.currentCoverage}% vs 85% target), particularly in error handling paths. Integration tests show ${suite.coverageBreakdown.integration}% coverage—addressing edge cases in service-to-service communication would close this gap rapidly. Average improvement needed: ${avgGap} percentage points across all coverage types. Recommend prioritizing unit test expansion for cryptographic validation and payment gateway resilience paths.`,
      `Coverage assessment indicates ${suite.failed} active test failures linked to ${relatedGaps.length} coverage gaps. The payment-service/3ds-redirect component critically lacks branch coverage (${relatedGaps[0]?.currentCoverage || 42}%). This directly correlates with the 3DS timeout failures. Integration coverage at ${suite.coverageBreakdown.integration}% suggests incomplete cross-service testing. Immediate action: add conditional path tests for gateway timeouts and fallback handlers. Performance tests need expansion (current: ${suite.coverageBreakdown.performance}%) to catch real-world latency issues earlier.`,
      `Analysis of ${suite.service} shows systematic coverage deficiencies across all levels. Branch coverage gaps (${relatedGaps.length} components below target) explain intermittent test failures. Current overall coverage of ${suite.coverage}% masks deeper patterns: unit tests strong at ${suite.coverageBreakdown.unit}% but e2e tests weak at ${suite.coverageBreakdown.e2e}%. Each percentage point improvement requires approximately 8-12 new test cases. Gap prioritization: critical paths first (${relatedGaps.filter(g => g.priority === 'critical').length} critical gaps), then high-priority components affecting 5+ user flows.`,
    ];

    return {
      text: narratives[Math.floor(Math.random() * narratives.length)],
      meta: {
        model: 'Claude 3.5 Sonnet (simulated)',
        tokens: 1200 + Math.floor(Math.random() * 400),
        latency_ms: 950 + Math.floor(Math.random() * 600),
        technique: 'LLM',
        confidence: 0.88,
        timestamp: new Date().toISOString(),
      },
      promptTemplate: `Analyze test coverage gaps for service ${suite.service}. ${relatedGaps.length} gaps identified. Current coverage: ${suite.coverage}%. Provide actionable recommendations for improvement.`,
    };
  }, [suite, relatedGaps]);

  const generateQualityAssessment = useCallback((): AIGenerationResult => {
    const assessments = [
      `${suite.name} demonstrates ${suite.trend === 'declining' ? 'deteriorating' : suite.trend === 'stable' ? 'consistent' : 'improving'} test quality. With ${((suite.passed / suite.totalTests) * 100).toFixed(1)}% pass rate and ${suite.flakyTests} flaky tests, reliability concerns are ${suite.flakyTests > 1 ? 'significant' : 'manageable'}. The ${suite.failed} active failures correlate with recent PRs (${suite.linkedPRs.join(', ')}). Root cause analysis suggests ${relatedDefects.length} defect patterns matching these failures. Confidence: 92%. Recommendation: implement automated regression detection and increase test stability through isolation patterns.`,
      `Quality metrics for ${suite.service} reflect a ${suite.trend} trajectory. Pass rate of ${((suite.passed / suite.totalTests) * 100).toFixed(1)}% is ${suite.passed / suite.totalTests > 0.9 ? 'solid' : 'concerning'}, but ${suite.flakyTests} flaky tests indicate environmental or timing dependencies. Matched defects (${relatedDefects.filter(d => d.status === 'confirmed').length} confirmed) suggest architectural vulnerabilities rather than isolated bugs. Coverage at ${suite.coverage}% explains ${Math.round(suite.failed * 1.5)} of the failures. Priority actions: stabilize flaky tests, increase integration coverage, add performance baselines.`,
      `Test suite assessment for ${suite.service}: Quality is ${suite.trend} with ${suite.failed} failures out of ${suite.totalTests} tests. The suite shows ${suite.coverage}% code coverage with uneven distribution (unit: ${suite.coverageBreakdown.unit}%, e2e: ${suite.coverageBreakdown.e2e}%). Flaky test count (${suite.flakyTests}) indicates timing or resource contention issues—critical in distributed systems. ${relatedDefects.length} matched defects provide high-confidence linking between test failures and production issues. This suite requires stabilization before expanding test count.`,
    ];

    return {
      text: assessments[Math.floor(Math.random() * assessments.length)],
      meta: {
        model: 'Claude 3.5 Sonnet (simulated)',
        tokens: 1450 + Math.floor(Math.random() * 500),
        latency_ms: 1100 + Math.floor(Math.random() * 700),
        technique: 'LLM',
        confidence: 0.85,
        timestamp: new Date().toISOString(),
      },
      promptTemplate: `Provide comprehensive quality assessment for test suite ${suite.id} (${suite.name}). ${suite.failed} failures, ${suite.flakyTests} flaky tests, ${relatedDefects.length} linked defects.`,
    };
  }, [suite, relatedDefects]);

  return (
    <div className="space-y-6 p-6">
      {/* Badge */}
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/40">
          <Sparkles className="w-3.5 h-3.5" /> Interactive AI Simulation
        </span>
      </div>

      {/* Test Suite Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Test Suite Explorer — Select a suite to analyze</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {testSuites.map((ts) => {
            const active = ts.id === selectedId;
            const trend = trendConfig[ts.trend];
            const TrendIcon = trend.icon;
            return (
              <motion.button
                key={ts.id}
                onClick={() => {
                  setSelectedId(ts.id);
                  setActiveSubTab('results');
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative text-left rounded-lg border-2 p-4 transition-all ${
                  active
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md ring-1 ring-blue-300 dark:ring-blue-700'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
                }`}
              >
                {active && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{ts.service}</span>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${trend.bg} ${trend.text}`}>
                    <TrendIcon className="w-3 h-3" />
                    {ts.trend}
                  </span>
                </div>
                <p className={`text-sm font-medium ${active ? 'text-blue-900 dark:text-blue-200' : 'text-gray-800 dark:text-gray-200'}`}>{ts.id}: {ts.name}</p>
                <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] font-semibold">
                  <div className="text-green-600 dark:text-green-400">{ts.passed} passed</div>
                  <div className="text-red-600 dark:text-red-400">{ts.failed} failed</div>
                  <div className="text-gray-500 dark:text-gray-400">{ts.coverage}% cov</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div key={suite.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="space-y-6">

          {/* Suite Header */}
          <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500 bg-opacity-20">
                  <Grid3x3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {suite.totalTests} Total Tests
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{suite.id}: {suite.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span className="font-medium">Service:</span> {suite.service} · <span className="font-medium">Last Run:</span> {new Date(suite.lastRun).toLocaleDateString()} at {new Date(suite.lastRun).toLocaleTimeString()} · <span className="font-medium">Duration:</span> {suite.avgDuration}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Pass Rate</p>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{metrics.passRate}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{suite.passed} of {suite.totalTests}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Coverage</p>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{suite.coverage}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Code coverage</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Flaky Tests</p>
              </div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{suite.flakyTests}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Intermittent failures</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Duration</p>
              </div>
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{suite.avgDuration}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Average runtime</p>
            </div>
          </div>

          {/* Detail Tabs */}
          <TestDetailTabs
            activeTab={activeSubTab}
            suite={suite}
            relatedDefects={relatedDefects}
            relatedGaps={relatedGaps}
            onTabChange={setActiveSubTab}
            generateGapAnalysis={generateGapAnalysis}
            generateQualityAssessment={generateQualityAssessment}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
