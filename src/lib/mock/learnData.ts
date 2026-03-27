// ── LEARN Layer (L5) — Learning Intelligence Mock Data ──────────────
// Self-learning feedback loop: incidents + releases feed back into the platform

// ── Types ──────────────────────────────────────────────

export interface LearningEvidence {
  type: 'pr' | 'slack' | 'incident' | 'log' | 'jira' | 'commit' | 'test';
  id: string;
  title: string;
  timestamp: string;
  relevance: number;
}

export interface KnowledgeUpdate {
  id: string;
  category: 'test-coverage' | 'release-risk' | 'defect-pattern' | 'knowledge-base';
  title: string;
  description: string;
  technique: 'LLM' | 'RAG' | 'ML' | 'NLP';
  confidence: number;
  impactScore: number;
  appliedAt: string;
}

export interface IncidentLearning {
  id: string;
  incidentTitle: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  service: string;
  occurredAt: string;
  resolvedAt: string;
  rootCause: string;
  rootCauseAnalysis: {
    technique: 'LLM';
    confidence: number;
    reasoning: string;
    model: string;
    tokensUsed: number;
  };
  correlatedEvidence: LearningEvidence[];
  knowledgeUpdates: KnowledgeUpdate[];
  preventionActions: {
    action: string;
    priority: 'P0' | 'P1' | 'P2' | 'P3';
    status: 'Applied' | 'Pending' | 'Planned';
    estimatedImpact: string;
  }[];
  feedbackLoop: {
    testCoverageImproved: boolean;
    releaseRiskUpdated: boolean;
    knowledgeBaseEnriched: boolean;
    defectPatternLearned: boolean;
    description: string;
  };
}

export interface ReleaseLearning {
  id: string;
  releaseVersion: string;
  releasedAt: string;
  status: 'Successful' | 'Rolled Back' | 'Partial';
  services: string[];
  riskPrediction: {
    predicted: number;
    actual: number;
    technique: 'ML';
    accuracy: number;
    model: string;
    features: string[];
  };
  qualityMetrics: {
    defectsFound: number;
    defectsPredicted: number;
    testPassRate: number;
    coverageGap: number;
  };
  knowledgeUpdates: KnowledgeUpdate[];
  modelImprovements: {
    area: string;
    before: number;
    after: number;
    technique: 'ML' | 'RAG' | 'LLM';
    description: string;
  }[];
  feedbackLoop: {
    testCoverageImproved: boolean;
    releaseRiskUpdated: boolean;
    knowledgeBaseEnriched: boolean;
    defectPatternLearned: boolean;
    description: string;
  };
}

export interface PlatformLearningMetrics {
  totalIncidentsLearned: number;
  totalReleasesAnalyzed: number;
  knowledgeArticlesGenerated: number;
  modelAccuracyImprovement: number;
  defectPredictionAccuracy: number;
  releaseRiskAccuracy: number;
  testCoverageGapsClosed: number;
  averageMTTRReduction: string;
  feedbackLoopsCompleted: number;
}

// ── Mock Data ──────────────────────────────────────────

export const incidentLearnings: IncidentLearning[] = [
  {
    id: 'learn-inc-001',
    incidentTitle: 'Checkout failure for premium users during peak hours',
    severity: 'Critical',
    service: 'payment-service',
    occurredAt: '2025-12-18T14:30:00Z',
    resolvedAt: '2025-12-18T17:45:00Z',
    rootCause: 'Connection pool exhaustion under concurrent premium-tier discount calculations triggered by a race condition in the timeout handler introduced in PR-4521.',
    rootCauseAnalysis: {
      technique: 'LLM',
      confidence: 0.94,
      reasoning: 'Cross-referenced PR-4521 timeout changes with Splunk connection pool metrics showing 100% utilization at 14:28. Slack thread #payment-alerts confirms premium discount path was the trigger. Historical incident INC-2024-007 showed similar pool exhaustion pattern.',
      model: 'Claude 3.5 (simulated)',
      tokensUsed: 4820,
    },
    correlatedEvidence: [
      { type: 'pr', id: 'PR-4521', title: 'Refactor payment gateway timeout handling', timestamp: '2025-12-16T09:00:00Z', relevance: 0.96 },
      { type: 'slack', id: '#payment-alerts', title: 'Thread: Premium checkout 500 errors spike', timestamp: '2025-12-18T14:32:00Z', relevance: 0.91 },
      { type: 'log', id: 'splunk-pool-exhaust', title: 'Connection pool at 100% utilization', timestamp: '2025-12-18T14:28:00Z', relevance: 0.93 },
      { type: 'incident', id: 'INC-2024-007', title: 'Similar pool exhaustion in payment-service', timestamp: '2024-09-12T11:00:00Z', relevance: 0.82 },
    ],
    knowledgeUpdates: [
      { id: 'ku-001', category: 'defect-pattern', title: 'Connection pool exhaustion under concurrent discount calculations', description: 'Premium discount path creates N+1 DB calls when concurrent users exceed pool threshold', technique: 'RAG', confidence: 0.91, impactScore: 0.88, appliedAt: '2025-12-19T08:00:00Z' },
      { id: 'ku-002', category: 'test-coverage', title: 'Added concurrent load test for premium checkout path', description: 'New test scenario: 200+ concurrent premium users with discount calculations', technique: 'LLM', confidence: 0.87, impactScore: 0.82, appliedAt: '2025-12-19T10:00:00Z' },
      { id: 'ku-003', category: 'release-risk', title: 'Payment-service connection pool changes flagged as high-risk', description: 'Any PR touching connection pool or timeout settings auto-flagged for load testing', technique: 'ML', confidence: 0.93, impactScore: 0.90, appliedAt: '2025-12-19T09:00:00Z' },
    ],
    preventionActions: [
      { action: 'Add connection pool stress test to payment-service CI pipeline', priority: 'P0', status: 'Applied', estimatedImpact: 'Prevents 73% of pool-related incidents' },
      { action: 'Flag timeout handler PRs for mandatory load review', priority: 'P1', status: 'Applied', estimatedImpact: 'Catches 65% of timeout-related regressions' },
      { action: 'Implement circuit breaker on premium discount path', priority: 'P1', status: 'Pending', estimatedImpact: 'Reduces blast radius by 80% for similar failures' },
    ],
    feedbackLoop: {
      testCoverageImproved: true,
      releaseRiskUpdated: true,
      knowledgeBaseEnriched: true,
      defectPatternLearned: true,
      description: 'Full learning loop completed: incident → root cause → test gap identified → coverage added → risk model updated → knowledge base enriched.',
    },
  },
  {
    id: 'learn-inc-002',
    incidentTitle: 'Portfolio rebalancing notifications delayed by 4+ hours',
    severity: 'High',
    service: 'portfolio-engine',
    occurredAt: '2026-01-08T06:00:00Z',
    resolvedAt: '2026-01-08T12:30:00Z',
    rootCause: 'Message queue consumer lag caused by schema migration in notification-service that added a non-indexed JSON column, slowing queries from 2ms to 1.8s.',
    rootCauseAnalysis: {
      technique: 'LLM',
      confidence: 0.88,
      reasoning: 'Correlated notification-service deployment at 05:45 with consumer lag spike at 06:00. Schema diff shows new JSON column without index. Historical pattern: INC-2024-012 had similar query degradation after schema change. Slack #portfolio-ops confirms rebalancing batch started at 06:00.',
      model: 'Claude 3.5 (simulated)',
      tokensUsed: 3650,
    },
    correlatedEvidence: [
      { type: 'pr', id: 'PR-4489', title: 'Add notification preferences JSON column', timestamp: '2026-01-07T16:00:00Z', relevance: 0.92 },
      { type: 'log', id: 'kafka-lag-alert', title: 'Consumer lag exceeds 10k messages', timestamp: '2026-01-08T06:15:00Z', relevance: 0.89 },
      { type: 'slack', id: '#portfolio-ops', title: 'Thread: Rebalancing notifications not sending', timestamp: '2026-01-08T07:00:00Z', relevance: 0.85 },
      { type: 'incident', id: 'INC-2024-012', title: 'Query degradation after auth-service schema migration', timestamp: '2024-06-20T09:00:00Z', relevance: 0.78 },
    ],
    knowledgeUpdates: [
      { id: 'ku-004', category: 'defect-pattern', title: 'Schema migration causing query degradation in message consumers', description: 'Non-indexed columns in high-throughput query paths cause exponential lag', technique: 'RAG', confidence: 0.86, impactScore: 0.79, appliedAt: '2026-01-09T08:00:00Z' },
      { id: 'ku-005', category: 'release-risk', title: 'Schema migrations auto-flagged for performance review', description: 'Any PR with ALTER TABLE requires query performance benchmark', technique: 'ML', confidence: 0.84, impactScore: 0.81, appliedAt: '2026-01-09T09:00:00Z' },
    ],
    preventionActions: [
      { action: 'Mandatory query performance benchmark for schema migration PRs', priority: 'P0', status: 'Applied', estimatedImpact: 'Catches 81% of migration-induced slowdowns' },
      { action: 'Add consumer lag monitoring with auto-scaling trigger', priority: 'P1', status: 'Pending', estimatedImpact: 'Reduces notification delay by 90%' },
      { action: 'Create schema migration checklist requiring index analysis', priority: 'P2', status: 'Planned', estimatedImpact: 'Prevents unindexed column additions in hot paths' },
    ],
    feedbackLoop: {
      testCoverageImproved: true,
      releaseRiskUpdated: true,
      knowledgeBaseEnriched: true,
      defectPatternLearned: true,
      description: 'Schema migration risk pattern added to release model. Test suite now includes migration performance benchmarks.',
    },
  },
  {
    id: 'learn-inc-003',
    incidentTitle: 'KYC document upload returning 403 for verified users',
    severity: 'Medium',
    service: 'kyc-service',
    occurredAt: '2026-02-03T10:15:00Z',
    resolvedAt: '2026-02-03T13:00:00Z',
    rootCause: 'RBAC policy cache TTL mismatch between auth-gateway (60s) and kyc-service (300s) caused stale permission denials after role updates.',
    rootCauseAnalysis: {
      technique: 'LLM',
      confidence: 0.79,
      reasoning: 'Auth logs show role update at 10:10, but kyc-service still serving cached RBAC from 10:05. TTL difference (60s vs 300s) means kyc-service stale for up to 4 extra minutes. Low confidence because RBAC cache issue is intermittent and depends on timing window.',
      model: 'Claude 3.5 (simulated)',
      tokensUsed: 2980,
    },
    correlatedEvidence: [
      { type: 'pr', id: 'PR-4501', title: 'Update RBAC cache strategy in auth-gateway', timestamp: '2026-01-28T14:00:00Z', relevance: 0.84 },
      { type: 'log', id: 'kyc-403-spike', title: '403 error rate spike on /upload endpoint', timestamp: '2026-02-03T10:15:00Z', relevance: 0.90 },
      { type: 'jira', id: 'KYC-892', title: 'Users reporting document upload failures', timestamp: '2026-02-03T10:30:00Z', relevance: 0.82 },
    ],
    knowledgeUpdates: [
      { id: 'ku-006', category: 'defect-pattern', title: 'RBAC cache TTL mismatch between services', description: 'Services with different cache TTLs for shared RBAC data can cause intermittent permission errors', technique: 'RAG', confidence: 0.77, impactScore: 0.68, appliedAt: '2026-02-04T08:00:00Z' },
    ],
    preventionActions: [
      { action: 'Standardize RBAC cache TTL across all services to 60s', priority: 'P1', status: 'Applied', estimatedImpact: 'Eliminates cross-service TTL mismatch' },
      { action: 'Add RBAC consistency integration test', priority: 'P2', status: 'Planned', estimatedImpact: 'Detects TTL drift during CI' },
    ],
    feedbackLoop: {
      testCoverageImproved: false,
      releaseRiskUpdated: true,
      knowledgeBaseEnriched: true,
      defectPatternLearned: true,
      description: 'RBAC cache pattern added to knowledge base. Release risk model now flags cache configuration changes.',
    },
  },
];

export const releaseLearnings: ReleaseLearning[] = [
  {
    id: 'learn-rel-001',
    releaseVersion: 'v3.4.0',
    releasedAt: '2026-01-15T02:00:00Z',
    status: 'Successful',
    services: ['payment-service', 'auth-gateway', 'notification-service'],
    riskPrediction: {
      predicted: 0.72,
      actual: 0.31,
      technique: 'ML',
      accuracy: 0.68,
      model: 'GradientBoosted (simulated)',
      features: ['pr_count', 'code_churn', 'service_dependencies', 'test_coverage', 'author_experience'],
    },
    qualityMetrics: {
      defectsFound: 2,
      defectsPredicted: 5,
      testPassRate: 0.97,
      coverageGap: 0.04,
    },
    knowledgeUpdates: [
      { id: 'ku-007', category: 'release-risk', title: 'Risk model over-predicted for v3.4.0', description: 'Model weighted code_churn too heavily — high churn was mostly test additions, not risky code', technique: 'ML', confidence: 0.82, impactScore: 0.76, appliedAt: '2026-01-16T08:00:00Z' },
      { id: 'ku-008', category: 'knowledge-base', title: 'Test churn vs code churn distinction', description: 'Model now distinguishes test file changes from production code changes in churn calculation', technique: 'ML', confidence: 0.88, impactScore: 0.84, appliedAt: '2026-01-16T09:00:00Z' },
    ],
    modelImprovements: [
      { area: 'Release Risk Prediction', before: 0.68, after: 0.74, technique: 'ML', description: 'Added test-churn vs code-churn feature split. Reduces false-positive high-risk predictions by 18%.' },
      { area: 'Defect Prediction', before: 0.61, after: 0.65, technique: 'ML', description: 'Incorporated release timing (day/hour) as feature. Weekend releases correlate with higher defect rates.' },
    ],
    feedbackLoop: {
      testCoverageImproved: false,
      releaseRiskUpdated: true,
      knowledgeBaseEnriched: true,
      defectPatternLearned: false,
      description: 'Release risk model retrained with test-churn differentiation. Accuracy improved from 68% to 74%.',
    },
  },
  {
    id: 'learn-rel-002',
    releaseVersion: 'v3.4.1',
    releasedAt: '2026-02-01T04:00:00Z',
    status: 'Rolled Back',
    services: ['portfolio-engine', 'reporting-service'],
    riskPrediction: {
      predicted: 0.85,
      actual: 0.92,
      technique: 'ML',
      accuracy: 0.91,
      model: 'GradientBoosted (simulated)',
      features: ['pr_count', 'code_churn', 'service_dependencies', 'test_coverage', 'schema_changes'],
    },
    qualityMetrics: {
      defectsFound: 7,
      defectsPredicted: 6,
      testPassRate: 0.89,
      coverageGap: 0.12,
    },
    knowledgeUpdates: [
      { id: 'ku-009', category: 'release-risk', title: 'Risk model correctly flagged v3.4.1 as high-risk', description: 'Schema migration + low test coverage + Friday deployment all contributed to accurate high-risk prediction', technique: 'ML', confidence: 0.91, impactScore: 0.93, appliedAt: '2026-02-02T08:00:00Z' },
      { id: 'ku-010', category: 'test-coverage', title: 'Portfolio rebalancing test gap identified', description: 'Missing integration tests for concurrent rebalancing with new reporting schema', technique: 'LLM', confidence: 0.86, impactScore: 0.88, appliedAt: '2026-02-02T10:00:00Z' },
    ],
    modelImprovements: [
      { area: 'Release Risk Prediction', before: 0.74, after: 0.78, technique: 'ML', description: 'Validated schema_changes feature importance. Rollback reinforced high weight for migration PRs.' },
      { area: 'Test Coverage Recommendation', before: 0.59, after: 0.67, technique: 'LLM', description: 'LLM now generates targeted test recommendations for uncovered schema migration paths.' },
    ],
    feedbackLoop: {
      testCoverageImproved: true,
      releaseRiskUpdated: true,
      knowledgeBaseEnriched: true,
      defectPatternLearned: true,
      description: 'Full learning loop: rollback → root cause → test gaps → coverage recommendations → risk model update → knowledge base enrichment.',
    },
  },
  {
    id: 'learn-rel-003',
    releaseVersion: 'v3.5.0',
    releasedAt: '2026-02-20T03:00:00Z',
    status: 'Successful',
    services: ['kyc-service', 'auth-gateway', 'payment-service', 'portfolio-engine'],
    riskPrediction: {
      predicted: 0.58,
      actual: 0.22,
      technique: 'ML',
      accuracy: 0.72,
      model: 'GradientBoosted (simulated)',
      features: ['pr_count', 'code_churn', 'service_dependencies', 'test_coverage', 'schema_changes', 'incident_history'],
    },
    qualityMetrics: {
      defectsFound: 1,
      defectsPredicted: 3,
      testPassRate: 0.99,
      coverageGap: 0.02,
    },
    knowledgeUpdates: [
      { id: 'ku-011', category: 'release-risk', title: 'Learning loop improving prediction accuracy', description: 'v3.5.0 benefited from test coverage improvements learned from v3.4.1 rollback — fewer actual defects than predicted', technique: 'ML', confidence: 0.88, impactScore: 0.91, appliedAt: '2026-02-21T08:00:00Z' },
      { id: 'ku-012', category: 'knowledge-base', title: 'RBAC cache standardization reduced permission-related defects', description: 'Zero permission-related defects in v3.5.0 after TTL standardization from incident learn-inc-003', technique: 'RAG', confidence: 0.92, impactScore: 0.85, appliedAt: '2026-02-21T09:00:00Z' },
    ],
    modelImprovements: [
      { area: 'Release Risk Prediction', before: 0.78, after: 0.81, technique: 'ML', description: 'Incident history feature now weights recent learnings. Past incident fixes reduce future risk scores for same service.' },
      { area: 'Knowledge Base Retrieval', before: 0.72, after: 0.79, technique: 'RAG', description: 'RAG index enriched with 12 new patterns from L5 learnings. Retrieval accuracy improved for cross-service queries.' },
    ],
    feedbackLoop: {
      testCoverageImproved: true,
      releaseRiskUpdated: true,
      knowledgeBaseEnriched: true,
      defectPatternLearned: false,
      description: 'Successful release validated prior learnings. Test improvements from v3.4.1 rollback prevented similar defects. Self-learning loop demonstrably reducing risk.',
    },
  },
];

export const platformMetrics: PlatformLearningMetrics = {
  totalIncidentsLearned: 47,
  totalReleasesAnalyzed: 23,
  knowledgeArticlesGenerated: 156,
  modelAccuracyImprovement: 0.19,
  defectPredictionAccuracy: 0.81,
  releaseRiskAccuracy: 0.78,
  testCoverageGapsClosed: 34,
  averageMTTRReduction: '42%',
  feedbackLoopsCompleted: 38,
};

// ── Utility ────────────────────────────────────────────

export function getIncidentLearningById(id: string): IncidentLearning | undefined {
  return incidentLearnings.find(i => i.id === id);
}

export function getReleaseLearningById(id: string): ReleaseLearning | undefined {
  return releaseLearnings.find(r => r.id === id);
}
