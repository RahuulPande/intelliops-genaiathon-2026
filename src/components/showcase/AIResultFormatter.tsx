'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Shield, GitBranch, Brain, Info } from 'lucide-react';

interface AIResultFormatterProps {
  analysisType: string;
  result: Record<string, unknown>;
}

// ── Failure Root Cause Clustering ──

function ClusteringResult({ result }: { result: Record<string, unknown> }) {
  const clusters = (result.clusters || []) as Array<{
    rootCause: string;
    failureCount: number;
    affectedSuites: number;
    affectedModules: string[];
    relatedDeployment: string;
    suggestedFix: string;
    confidence: number;
  }>;
  const totalFailures = (result.totalFailures as number) || 0;
  const uniqueRootCauses = (result.uniqueRootCauses as number) || 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold text-gray-900">Analysis Complete</span>
      </div>
      <div className="text-lg font-bold text-teal-700">
        {totalFailures} test failures &rarr; {uniqueRootCauses} root causes
      </div>
      <p className="text-sm text-gray-600">{result.summary as string}</p>

      {clusters.map((cluster, i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-gray-900">Root Cause {i + 1}</span>
            <span className="ml-auto text-xs text-gray-500">{cluster.failureCount} failures · {cluster.affectedSuites} suites</span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{cluster.rootCause}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {cluster.affectedModules.map((mod) => (
              <span key={mod} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-200 text-gray-600">{mod}</span>
            ))}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            <span className="font-medium">Deployment:</span> {cluster.relatedDeployment}
          </div>
          <div className="p-2 rounded-lg bg-green-50 border border-green-200">
            <p className="text-xs text-green-700"><span className="font-medium">Fix:</span> {cluster.suggestedFix}</p>
          </div>
          <div className="mt-2 text-right text-[10px] text-gray-400">
            Confidence: {typeof cluster.confidence === 'number' && cluster.confidence <= 1 ? Math.round(cluster.confidence * 100) : cluster.confidence}%
          </div>
        </div>
      ))}

      {typeof result.insight === 'string' && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-50 border border-purple-200">
          <Info className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-purple-700">{result.insight}</p>
        </div>
      )}
    </div>
  );
}

// ── Defect Pattern Analysis ──

function DefectPatternResult({ result }: { result: Record<string, unknown> }) {
  const summary = (result.summary as string) || '';
  const confidence = (result.confidence as number) || 0;
  const recommendations = (result.recommendations || []) as string[];
  const evidence = (result.evidence || []) as string[];
  const matches = (result.matches || []) as Array<{
    id: string;
    similarity: number;
    title: string;
    module: string;
    resolved: string;
    resolution: string;
    timeToResolve: string;
  }>;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold text-gray-900">Analysis Complete</span>
      </div>
      <div className="flex items-center gap-2">
        <Brain className="w-5 h-5 text-blue-600" />
        <span className="text-base font-bold text-gray-900">Defect Pattern Match Results</span>
      </div>
      <p className="text-xs text-gray-600">{summary}</p>
      <div className="text-xs text-gray-500">Confidence: <span className="text-teal-700 font-bold">{Math.round(confidence * 100)}%</span></div>

      {/* Rich match cards */}
      {matches.length > 0 && (
        <div className="space-y-2">
          {matches.map((match, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-900">Match {i + 1} — <span className="text-teal-700">{match.similarity}% similarity</span></span>
                <span className="text-[10px] text-gray-400">{match.id}</span>
              </div>
              <div className="text-xs text-gray-700 font-medium">{match.title}</div>
              <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
                <span>Module: {match.module}</span>
                <span>Resolved: {match.resolved}</span>
                {match.timeToResolve && <span>TTR: {match.timeToResolve}</span>}
              </div>
              <div className="text-[10px] text-green-600 mt-1">Resolution: {match.resolution}</div>
            </div>
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Recommendations</h4>
          <ul className="space-y-1">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                <span className="text-teal-600 mt-0.5">&bull;</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {evidence.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Evidence</h4>
          <ul className="space-y-1">
            {evidence.map((ev, i) => (
              <li key={i} className="text-[10px] text-gray-500">{ev}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Release Readiness Prediction ──

function ReleaseReadinessResult({ result }: { result: Record<string, unknown> }) {
  const confidence = (result.confidence as number) || 0;
  const completionPercentage = (result.completionPercentage as number) || 0;
  const recommendation = (result.recommendation as string) || '';
  const historicalSuccessRate = (result.historicalSuccessRate as number) || 0;
  const historicalSampleSize = (result.historicalSampleSize as number) || 0;
  const remainingRisks = (result.remainingRisks || []) as Array<{
    module: string;
    risk: string;
    severity: string;
  }>;
  const recommendationText = (result.recommendationText as string) || '';

  const recColor = recommendation === 'GO' ? 'text-green-600' : recommendation === 'CONDITIONAL_GO' ? 'text-amber-600' : 'text-red-600';
  const recLabel = recommendation.replace(/_/g, ' ');
  const barColor = recommendation === 'GO' ? 'bg-green-500' : recommendation === 'CONDITIONAL_GO' ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold text-gray-900">Analysis Complete</span>
      </div>

      <div className="text-center">
        <div className="text-4xl font-bold text-teal-700">{Math.round(confidence * 100)}%</div>
        <div className="text-sm text-gray-500 mt-1">Release Confidence</div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
          <div className={`h-3 rounded-full ${barColor}`} style={{ width: `${confidence * 100}%` }} />
        </div>
        <div className={`text-lg font-bold ${recColor} mt-2`}>{recLabel}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{completionPercentage}%</div>
          <div className="text-xs text-gray-500">Test Completion</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
          <div className="text-xl font-bold text-gray-900">{historicalSuccessRate}%</div>
          <div className="text-xs text-gray-500">{historicalSampleSize} releases</div>
        </div>
      </div>

      {remainingRisks.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Remaining Risks</h4>
          {remainingRisks.map((risk, i) => {
            const icon = risk.severity === 'critical' ? <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> :
              risk.severity === 'warning' ? <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> :
              <Shield className="w-3.5 h-3.5 text-green-500" />;
            return (
              <div key={i} className="flex items-center gap-2 text-sm">
                {icon}
                <span className="font-medium text-gray-700">{risk.module}:</span>
                <span className="text-gray-500">{risk.risk}</span>
              </div>
            );
          })}
        </div>
      )}

      {recommendationText && (
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-xs text-blue-700">{recommendationText}</p>
        </div>
      )}
    </div>
  );
}

// ── Fallback: generic formatted JSON ──

function GenericResult({ result }: { result: Record<string, unknown> }) {
  const summary = (result.summary as string) || '';
  const confidence = (result.confidence as number) || 0;
  const technique = (result.technique as string) || '';
  const recommendations = (result.recommendations || []) as string[];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="text-sm font-semibold text-gray-900">Analysis Complete</span>
        {technique && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">{technique}</span>
        )}
      </div>
      <p className="text-sm text-gray-600">{summary}</p>
      {confidence > 0 && (
        <div className="text-xs text-gray-500">Confidence: <span className="text-teal-700 font-bold">{Math.round(confidence * 100)}%</span></div>
      )}
      {recommendations.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recommendations</h4>
          <ul className="space-y-1.5">
            {recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-teal-600 mt-0.5">&bull;</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Main Formatter ──

export default function AIResultFormatter({ analysisType, result }: AIResultFormatterProps) {
  if (!result || (result.error && typeof result.error === 'string')) {
    return (
      <div className="text-center py-6">
        <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
        <p className="text-sm text-gray-500">{(result?.error as string) || 'No result available'}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-left"
    >
      {analysisType === 'failure_root_cause_cluster' && <ClusteringResult result={result} />}
      {analysisType === 'defect_pattern_analysis' && <DefectPatternResult result={result} />}
      {analysisType === 'release_readiness' && <ReleaseReadinessResult result={result} />}
      {!['failure_root_cause_cluster', 'defect_pattern_analysis', 'release_readiness'].includes(analysisType) && (
        <GenericResult result={result} />
      )}
    </motion.div>
  );
}
