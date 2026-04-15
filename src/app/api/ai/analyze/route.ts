import { NextResponse } from 'next/server';

const mockResults: Record<string, Record<string, unknown>> = {
  defect_pattern_analysis: {
    summary: 'RAG analysis identified 3 highly similar historical defects matching the current pattern.',
    matches: [
      { defectId: 'DEF-2847', similarity: 0.94, title: 'Payment timeout in multi-currency flow', resolution: 'Connection pool exhaustion — increased pool size from 10 to 50', resolvedIn: '4.2 hours' },
      { defectId: 'DEF-2103', similarity: 0.87, title: 'Transaction rollback on concurrent updates', resolution: 'Added optimistic locking with retry mechanism', resolvedIn: '6.1 hours' },
      { defectId: 'DEF-1856', similarity: 0.82, title: 'Batch processing stall under high load', resolution: 'Implemented backpressure with circuit breaker pattern', resolvedIn: '8.5 hours' },
    ],
    recommendation: 'Based on historical patterns, this defect is most likely caused by resource exhaustion under concurrent load. Recommend checking connection pools and implementing circuit breakers.',
    confidence: 0.92,
    technique: 'RAG',
    documentsSearched: 3247,
    retrievalTimeMs: 1200,
  },
  failure_root_cause_cluster: {
    summary: 'ML clustering identified 4 distinct root cause groups from 47 recent failures.',
    clusters: [
      { id: 1, label: 'Database Connection Exhaustion', count: 18, severity: 'Critical', trend: 'increasing' },
      { id: 2, label: 'Memory Leak in Payment Service', count: 12, severity: 'High', trend: 'stable' },
      { id: 3, label: 'API Gateway Timeout', count: 11, severity: 'Medium', trend: 'decreasing' },
      { id: 4, label: 'Cache Invalidation Race Condition', count: 6, severity: 'Low', trend: 'stable' },
    ],
    recommendation: 'Focus remediation on Cluster 1 (Database Connection Exhaustion) — 38% of all failures, trending upward. Cross-reference with recent deployment changes.',
    confidence: 0.88,
    technique: 'ML+NLP',
    failuresAnalyzed: 47,
    clusteringTimeMs: 890,
  },
  release_readiness: {
    summary: 'ML model predicts 73.2% release readiness based on partial test coverage and risk signals.',
    readinessScore: 73.2,
    riskFactors: [
      { factor: 'Test coverage gap in payment module', impact: -12.5, severity: 'High' },
      { factor: 'Unresolved P1 defect in auth service', impact: -8.3, severity: 'Critical' },
      { factor: '3 PRs pending review in release branch', impact: -6.0, severity: 'Medium' },
    ],
    positiveSignals: [
      { signal: 'All regression tests passing', impact: 15.0 },
      { signal: 'Performance benchmarks within SLA', impact: 10.0 },
      { signal: 'Security scan clean', impact: 8.5 },
    ],
    recommendation: 'Release NOT recommended until P1 defect DEF-3021 is resolved and payment module test coverage reaches 80%+. Current ETA: 2 business days.',
    confidence: 0.85,
    technique: 'ML',
    featuresAnalyzed: 12,
    predictionTimeMs: 650,
  },
};

export async function POST(request: Request) {
  const body = await request.json();
  const analysisType = body.type || 'defect_pattern_analysis';

  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

  const result = mockResults[analysisType] || mockResults.defect_pattern_analysis;
  const inputTokens = 420 + Math.floor(Math.random() * 200);
  const outputTokens = 680 + Math.floor(Math.random() * 300);

  return NextResponse.json({
    success: true,
    result,
    model: 'claude-sonnet-4-20250514 (simulated)',
    tokenUsage: { input: inputTokens, output: outputTokens },
    durationMs: 800 + Math.floor(Math.random() * 1200),
    isSimulated: true,
    auditId: `audit-${Date.now()}`,
  });
}
