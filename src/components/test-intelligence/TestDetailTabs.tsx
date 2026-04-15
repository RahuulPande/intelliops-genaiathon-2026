'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, BarChart3, Brain, CheckCircle } from 'lucide-react';
import AIOutputPanel from '@/components/shared/AIOutputPanel';
import { type TestSuite, type DefectMatch } from '@/lib/mock/testData';
import type { AIGenerationResult } from '@/lib/ai/simulatedAI';
import { Zap, ArrowRight, RefreshCw } from 'lucide-react';

interface TestDetailTabsProps {
  activeTab: 'results' | 'coverage' | 'defects' | 'assessment';
  suite: TestSuite;
  relatedDefects: DefectMatch[];
  relatedGaps: any[];
  onTabChange: (tab: 'results' | 'coverage' | 'defects' | 'assessment') => void;
  generateGapAnalysis: () => AIGenerationResult;
  generateQualityAssessment: () => AIGenerationResult;
}

const severityConfig: Record<DefectMatch['severity'], { bg: string; text: string; border: string; dot: string }> = {
  critical: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800', dot: 'bg-red-500' },
  high: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800', dot: 'bg-orange-500' },
  medium: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800', dot: 'bg-amber-500' },
  low: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800', dot: 'bg-green-500' },
};

const statusConfig: Record<DefectMatch['status'], { bg: string; text: string }> = {
  confirmed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-300' },
  reviewing: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-800 dark:text-amber-300' },
  'false-positive': { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-800 dark:text-gray-300' },
};

const Badge = ({ label }: { label: string }) => {
  const techBadge: Record<string, string> = {
    LLM: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    RAG: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    ML: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    NLP: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${techBadge[label] ?? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
      {label}
    </span>
  );
};

export default function TestDetailTabs({
  activeTab,
  suite,
  relatedDefects,
  relatedGaps,
  onTabChange,
  generateGapAnalysis,
  generateQualityAssessment,
}: TestDetailTabsProps) {
  const tabs = [
    { id: 'results', label: 'Test Results', icon: CheckCircle },
    { id: 'coverage', label: 'Coverage Analysis', icon: BarChart3 },
    { id: 'defects', label: 'Defect Matching', icon: AlertTriangle },
    { id: 'assessment', label: 'AI Assessment', icon: Brain },
  ];

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'results' && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Test Results Distribution</h4>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Passed', value: suite.passed, total: suite.totalTests, color: 'bg-green-500 dark:bg-green-400' },
                  { label: 'Failed', value: suite.failed, total: suite.totalTests, color: 'bg-red-500 dark:bg-red-400' },
                  ...(suite.skipped > 0 ? [{ label: 'Skipped', value: suite.skipped, total: suite.totalTests, color: 'bg-gray-400 dark:bg-gray-500' }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-16">{item.label}</span>
                    <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.value / item.total) * 100}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-12">{((item.value / item.total) * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            {suite.failedTests.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">Failed Tests ({suite.failedTests.length})</h4>
                <div className="space-y-3">
                  {suite.failedTests.map((test) => (
                    <div key={test.testId} className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{test.testName}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{test.testId} · Type: {test.failureType}</p>
                        </div>
                        {test.linkedDefect && (
                          <span className="text-[10px] px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-bold ml-2 flex-shrink-0">
                            {test.linkedDefect}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 font-mono bg-gray-50 dark:bg-gray-900/50 p-2 rounded border border-gray-100 dark:border-gray-700">
                        {test.errorMessage}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        Last passed: {new Date(test.lastPassedAt).toLocaleDateString()} · Failing since: {new Date(test.failingSince).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'coverage' && (
          <motion.div key="coverage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Coverage Breakdown by Type</h4>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Unit Tests', value: suite.coverageBreakdown.unit },
                  { label: 'Integration Tests', value: suite.coverageBreakdown.integration },
                  { label: 'E2E Tests', value: suite.coverageBreakdown.e2e },
                  { label: 'Performance Tests', value: suite.coverageBreakdown.performance },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 w-32">{item.label}</span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: `${item.value}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-10 text-right">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {relatedGaps.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">Coverage Gaps ({relatedGaps.length})</h4>
                <div className="space-y-3">
                  {relatedGaps.map((gap) => (
                    <div key={gap.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{gap.component}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{gap.gapType} coverage · {gap.currentCoverage}% → {gap.targetCoverage}%</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                          gap.priority === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                          gap.priority === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                          gap.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                          'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}>
                          {gap.priority}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 dark:bg-amber-400 rounded-full" style={{ width: `${gap.currentCoverage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <AIOutputPanel
              generate={generateGapAnalysis}
              contextKey={suite.id}
              techniques={['LLM']}
              title="AI Gap Analysis"
            />
          </motion.div>
        )}

        {activeTab === 'defects' && (
          <motion.div key="defects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {relatedDefects.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Matched Defects ({relatedDefects.length})</h4>
                  <Badge label="RAG" />
                  <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">Similarity scoring</span>
                </div>
                <div className="space-y-3">
                  {relatedDefects.map((defect) => {
                    const sev = severityConfig[defect.severity];
                    const stat = statusConfig[defect.status];
                    return (
                      <div key={defect.id} className={`rounded-lg border p-4 ${sev.bg} ${sev.border}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3 flex-1">
                            <span className={`w-2 h-2 rounded-full ${sev.dot} mt-2 flex-shrink-0`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold ${sev.text}`}>{defect.matchedDefectTitle}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{defect.matchedDefectId}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <Badge label={defect.technique} />
                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${stat.bg} ${stat.text}`}>
                              {defect.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Similarity</span>
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 dark:bg-green-400 rounded-full" style={{ width: `${defect.similarityScore}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-10 text-right">{defect.similarityScore}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">No defects matched</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Test failures are isolated or due to new issues.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'assessment' && (
          <motion.div key="assessment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <AIOutputPanel
              generate={generateQualityAssessment}
              contextKey={suite.id}
              techniques={['LLM']}
              title="AI Quality Assessment"
            />

            <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-4 h-4 text-green-700 dark:text-green-400" />
                <h4 className="text-sm font-bold text-green-800 dark:text-green-300">Continuous Learning Loop</h4>
                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 ml-2">Active</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Test results feed back into the platform to improve risk prediction, test coverage recommendations, and defect detection accuracy.
              </p>
              <div className="space-y-2">
                {[
                  'Flaky test patterns inform deployment readiness scoring',
                  'Coverage gaps guide test generation recommendations',
                  'Defect matches refine RAG retrieval models',
                  'Failed test trends predict production failure risk',
                ].map((imp, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-100 dark:border-green-800">
                    <div className="p-1 rounded-md bg-green-100 dark:bg-green-900/30 flex-shrink-0">
                      <Zap className="w-3 h-3 text-green-700 dark:text-green-400" />
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{imp}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-800 dark:text-green-300 mb-3">Test Quality Lifecycle</p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  {['Test Run', 'Failure Analysis', 'Defect Match', 'Coverage Plan', 'Improved Quality'].map((step, i, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                        i === 0 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        i === 1 ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        i === 2 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
                        i === 3 ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}>{step}</span>
                      {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
