'use client';

import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  Check,
  Clock,
  X,
  ChevronDown,
  ChevronRight,
  Download,
  Clipboard,
  Database,
  Server,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ScoreGauge from '@/components/ui/ScoreGauge';
import AIOutputPanel from '@/components/shared/AIOutputPanel';
import { generateCABRecommendation } from '@/lib/ai/simulatedAI';
import { exportToMarkdown, copyToClipboard } from '@/lib/export/exportService';
import { cabPackages } from '@/lib/mock/cabData';
import type { CABSubmissionPackage } from '@/lib/types/cabIntelligence';

// ── Helpers ─────────────────────────────────────────────

function recommendationConfig(rec: string) {
  if (rec === 'approve') return { label: 'APPROVE', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-800' };
  if (rec === 'conditional') return { label: 'CONDITIONAL', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' };
  return { label: 'REJECT', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-800' };
}

function reviewStatusConfig(status: string) {
  if (status === 'approved') return { label: 'Approved', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' };
  if (status === 'changes_requested') return { label: 'Changes Requested', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' };
  return { label: 'Pending', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400' };
}

function approvalStatusIcon(status: string) {
  if (status === 'approved') return <Check className="w-4 h-4 text-green-500" />;
  if (status === 'rejected') return <X className="w-4 h-4 text-red-500" />;
  return <Clock className="w-4 h-4 text-amber-500" />;
}

function riskBadge(score: number) {
  if (score >= 70) return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
  if (score >= 40) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
  return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
}

// ── Component ────────────────────────────────────────────

export default function CABIntelligence() {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(cabPackages[0].id);
  const [expandedPR, setExpandedPR] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const pkg = cabPackages.find((p) => p.id === selectedPackageId) as CABSubmissionPackage;
  const recConfig = recommendationConfig(pkg.releaseOverview.recommendation);

  const testPieData = [
    { name: 'Passed', value: pkg.testEvidence.passed },
    { name: 'Failed', value: pkg.testEvidence.failed },
    { name: 'Skipped', value: pkg.testEvidence.skipped },
  ];
  const PIE_COLORS = ['#22c55e', '#ef4444', '#6b7280'];

  const passingTests = pkg.changes.reduce((sum, c) => sum + Math.round(c.testsCovering * c.testsPassRate), 0);
  const totalCoveringTests = pkg.changes.reduce((sum, c) => sum + c.testsCovering, 0);

  function handleExport() {
    exportToMarkdown(
      [
        { type: 'heading', level: 1, content: `CAB Submission: ${pkg.releaseName}` },
        { type: 'paragraph', content: `Generated: ${new Date(pkg.generatedAt).toLocaleString()} | By: ${pkg.generatedBy}` },
        { type: 'heading', level: 2, content: 'Release Overview' },
        { type: 'table', rows: [
          ['Field', 'Value'],
          ['Environment', pkg.releaseOverview.targetEnvironment],
          ['Scheduled', new Date(pkg.releaseOverview.scheduledDate).toLocaleString()],
          ['Change Type', pkg.releaseOverview.changeType],
          ['Risk Score', String(pkg.releaseOverview.overallRiskScore)],
          ['Recommendation', pkg.releaseOverview.recommendation.toUpperCase()],
        ]},
        { type: 'heading', level: 2, content: 'AI Recommendation' },
        { type: 'paragraph', content: `Decision: ${pkg.aiRecommendation.decision.toUpperCase()} (${Math.round(pkg.aiRecommendation.confidence * 100)}% confidence)` },
        { type: 'paragraph', content: pkg.aiRecommendation.reasoning },
        ...(pkg.aiRecommendation.conditions.length > 0
          ? [{ type: 'heading' as const, level: 3, content: 'Conditions' }, { type: 'list' as const, items: pkg.aiRecommendation.conditions }]
          : []),
        { type: 'heading', level: 2, content: 'Risks' },
        { type: 'list', items: pkg.aiRecommendation.risks },
        { type: 'heading', level: 2, content: 'Changes' },
        { type: 'table', rows: [
          ['PR', 'Title', 'Author', 'Risk', 'Files', 'Review'],
          ...pkg.changes.map((c) => [c.prId, c.title, c.author, String(c.riskScore), String(c.filesChanged), c.reviewStatus]),
        ]},
        { type: 'heading', level: 2, content: 'Test Evidence' },
        { type: 'table', rows: [
          ['Metric', 'Value'],
          ['Total Tests', String(pkg.testEvidence.totalTests)],
          ['Passed', String(pkg.testEvidence.passed)],
          ['Failed', String(pkg.testEvidence.failed)],
          ['Coverage', `${pkg.testEvidence.coveragePercentage}%`],
        ]},
      ],
      `cab-${pkg.id}.md`
    );
  }

  async function handleCopy() {
    const summary = `CAB: ${pkg.releaseName}\nRecommendation: ${pkg.releaseOverview.recommendation.toUpperCase()}\nRisk Score: ${pkg.releaseOverview.overallRiskScore}/100\nConfidence: ${Math.round(pkg.aiRecommendation.confidence * 100)}%\nChanges: ${pkg.changes.length} | Tests Passing: ${passingTests}/${totalCoveringTests} | Coverage: ${pkg.testEvidence.coveragePercentage}%`;
    await copyToClipboard(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">CAB Intelligence</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI-generated Change Advisory Board submission packages</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Markdown
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Summary'}
          </button>
        </div>
      </div>

      {/* Section 1: Release Selector */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto pb-0">
        {cabPackages.map((p) => {
          const rc = recommendationConfig(p.releaseOverview.recommendation);
          const isActive = p.id === selectedPackageId;
          return (
            <button
              key={p.id}
              onClick={() => { setSelectedPackageId(p.id); setExpandedPR(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {p.releaseName.split(' — ')[0]}
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                isActive ? 'bg-white/20 text-white' : `${rc.bg} ${rc.text}`
              }`}>
                {rc.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPackageId}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Section 2: CAB Summary Card */}
          <div className={`bg-white dark:bg-gray-800 rounded-xl border ${recConfig.border} p-6`}>
            <div className="flex flex-wrap items-center gap-6">
              {/* Recommendation Badge */}
              <div className={`flex flex-col items-center px-6 py-4 rounded-xl border ${recConfig.border} ${recConfig.bg}`}>
                <span className={`text-2xl font-black tracking-wider ${recConfig.text}`}>{recConfig.label}</span>
                <span className={`text-xs font-medium mt-1 ${recConfig.text}`}>CAB Decision</span>
              </div>

              {/* Score Gauge */}
              <div className="flex flex-col items-center gap-1">
                <ScoreGauge score={pkg.releaseOverview.overallRiskScore} size="md" showLabel />
                <span className="text-xs text-gray-500 dark:text-gray-400">Risk Score</span>
              </div>

              {/* Stats */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.changes.length}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Changes</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{passingTests}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Tests Passing</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.testEvidence.coveragePercentage}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Coverage</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(pkg.aiRecommendation.confidence * 100)}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">AI Confidence</div>
                </div>
              </div>

              {/* Change type badge */}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 uppercase tracking-wide self-start">
                {pkg.releaseOverview.changeType}
              </span>
            </div>
          </div>

          {/* Section 3: Change Details Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Change Details</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{pkg.changes.length} pull requests in this release</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">PR</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Author</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Files</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Coverage</th>
                    <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Review</th>
                    <th className="px-4 py-2.5 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {pkg.changes.map((change) => {
                    const isHighRisk = change.riskScore > 70;
                    const isExpanded = expandedPR === change.prId;
                    const rsConfig = reviewStatusConfig(change.reviewStatus);
                    return (
                      <Fragment key={change.prId}>
                        <tr
                          onClick={() => setExpandedPR(isExpanded ? null : change.prId)}
                          className={`cursor-pointer transition-colors ${
                            isHighRisk
                              ? 'bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-purple-600 dark:text-purple-400 font-semibold">{change.prId}</td>
                          <td className="px-4 py-3 text-gray-900 dark:text-white max-w-[200px] truncate">{change.title}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{change.author}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${riskBadge(change.riskScore)}`}>
                              {change.riskScore}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{change.filesChanged}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{Math.round(change.testsPassRate * 100)}%</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${rsConfig.bg} ${rsConfig.text}`}>
                              {rsConfig.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </td>
                        </tr>
                        <AnimatePresence>
                          {isExpanded && (
                            <tr key={`${change.prId}-expanded`}>
                              <td colSpan={8} className="p-0">
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/10 border-t border-blue-100 dark:border-blue-900/30">
                                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2">AI Summary</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{change.aiSummary}</p>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                      <span>+{change.linesAdded} / -{change.linesRemoved} lines</span>
                                      <span>{change.testsCovering} tests covering</span>
                                      <span className="text-purple-600 dark:text-purple-400 font-medium">{change.riskCategory}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4 & 5: Test Evidence + Risk Assessment (side by side) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section 4: Test Evidence Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Test Evidence</h3>
              <div className="flex items-start gap-6">
                {/* Pie Chart */}
                <div className="w-40 h-40 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={testPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={58}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {testPieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                        formatter={(value: number, name: string) => [`${value} tests`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Stats + Checklist */}
                <div className="flex-1 space-y-3">
                  {/* Legend */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {testPieData.map((entry, i) => (
                      <span key={entry.name} className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: PIE_COLORS[i] }} />
                        {entry.value} {entry.name}
                      </span>
                    ))}
                  </div>

                  {/* Coverage bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Coverage</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{pkg.testEvidence.coveragePercentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pkg.testEvidence.coveragePercentage}%`,
                          backgroundColor: pkg.testEvidence.coveragePercentage >= 85 ? '#22c55e' : pkg.testEvidence.coveragePercentage >= 70 ? '#f59e0b' : '#ef4444',
                        }}
                      />
                    </div>
                  </div>

                  {/* Checklist */}
                  {[
                    { label: 'Critical Paths', passed: pkg.testEvidence.criticalPathsTested },
                    { label: 'Regression Suite', passed: pkg.testEvidence.regressionSuiteRun },
                    { label: 'Performance Tests', passed: pkg.testEvidence.performanceTestsRun },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs">
                      {item.passed
                        ? <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        : <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
                      <span className={item.passed ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 5: Risk Assessment Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Risk Assessment</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-3.5 h-3.5 text-purple-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Security Impact</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{pkg.riskAssessment.securityImpactChanges}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">changes</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">High Risk</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{pkg.riskAssessment.highRiskChanges}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">changes</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">DB Changes</span>
                  </div>
                  <div className={`text-sm font-bold ${pkg.riskAssessment.databaseChanges ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                    {pkg.riskAssessment.databaseChanges ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Server className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Infra Changes</span>
                  </div>
                  <div className={`text-sm font-bold ${pkg.riskAssessment.infrastructureChanges ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'}`}>
                    {pkg.riskAssessment.infrastructureChanges ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              {/* Blast Radius + Rollback */}
              <div className="flex items-center gap-3 mb-4 text-xs">
                <span className="text-gray-500 dark:text-gray-400">Blast Radius:</span>
                <span className={`px-2 py-0.5 rounded-full font-semibold ${
                  pkg.riskAssessment.blastRadius === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                  pkg.riskAssessment.blastRadius === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                }`}>{pkg.riskAssessment.blastRadius.toUpperCase()}</span>
                <span className="text-gray-500 dark:text-gray-400">Rollback:</span>
                <span className={`px-2 py-0.5 rounded-full font-semibold ${
                  pkg.riskAssessment.rollbackComplexity === 'complex' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                  pkg.riskAssessment.rollbackComplexity === 'moderate' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                  'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                }`}>{pkg.riskAssessment.rollbackComplexity.toUpperCase()}</span>
              </div>

              {/* Regulatory Impact */}
              {pkg.riskAssessment.regulatoryImpact.affectsRegulatedFlow && (
                <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Regulatory Impact</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.riskAssessment.regulatoryImpact.affectedRegulations.map((reg) => (
                      <span key={reg} className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded text-xs font-medium">
                        {reg}
                      </span>
                    ))}
                  </div>
                  {pkg.riskAssessment.regulatoryImpact.complianceReviewRequired && (
                    <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">Compliance review required before deployment.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 6: AI Reasoning */}
          <AIOutputPanel
            title="CAB Recommendation Analysis"
            generate={() => generateCABRecommendation({
              releaseName: pkg.releaseName,
              changeCount: pkg.changes.length,
              riskScore: pkg.releaseOverview.overallRiskScore,
              recommendation: pkg.releaseOverview.recommendation,
              conditions: pkg.aiRecommendation.conditions,
            })}
            contextKey={selectedPackageId}
            techniques={['LLM']}
          />

          {/* Section 7: Approval Workflow Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Approval Workflow</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                    <th className="px-6 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Approver</th>
                    <th className="px-6 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Comments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {pkg.approvals.map((approval) => (
                    <tr key={approval.role} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{approval.role}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1.5">
                          {approvalStatusIcon(approval.status)}
                          <span className="text-xs capitalize text-gray-600 dark:text-gray-400">{approval.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-xs">{approval.approvedBy ?? '—'}</td>
                      <td className="px-6 py-3 text-gray-500 dark:text-gray-500 text-xs">
                        {approval.approvedAt ? new Date(approval.approvedAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-3 text-gray-600 dark:text-gray-400 text-xs max-w-[280px]">
                        {approval.comments ?? <span className="text-gray-400 dark:text-gray-600 italic">Awaiting review</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
