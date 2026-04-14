// src/lib/mock/testManagementIntelligenceData.ts
// Default display data for the 6 Test Management Intelligence panels.
// Used as initial UI state before the user triggers an AI analysis.

// ── Interfaces ───────────────────────────────────────────

export interface PrioritizedTest {
  name: string;
  riskScore: number;
  reason: string;
  module: string;
}

export interface PrioritizationCoverage {
  top20PercentCatches: number;
  estimatedTimeSaved: string;
}

export interface TestPrioritizationData {
  summary: string;
  technique: 'ML';
  confidence: number;
  prioritizedTests: PrioritizedTest[];
  coverage: PrioritizationCoverage;
  insight: string;
}

export interface FlakyTest {
  name: string;
  flakinessScore: number;
  runHistory: string;
  rootCause: string;
  recommendation: 'quarantine' | 'investigate' | 'fix';
}

export interface FlakyTestDetectionData {
  summary: string;
  technique: 'ML';
  confidence: number;
  flakyTests: FlakyTest[];
  totalQuarantined: number;
  timeSaved: string;
  impact: string;
}

export interface TestGap {
  requirement: string;
  currentCoverage: number;
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  details: string;
  defectHistory: number;
}

export interface TestGapAnalysisData {
  summary: string;
  technique: 'RAG';
  confidence: number;
  gaps: TestGap[];
  overallCoverage: number;
  targetCoverage: number;
  insight: string;
}

export interface FailureCluster {
  rootCause: string;
  failureCount: number;
  affectedSuites: number;
  affectedModules: string[];
  relatedDeployment: string;
  suggestedFix: string;
  confidence: number;
}

export interface FailureRootCauseClusterData {
  summary: string;
  technique: 'NLP';
  confidence: number;
  clusters: FailureCluster[];
  totalFailures: number;
  uniqueRootCauses: number;
  insight: string;
}

export interface RemainingRisk {
  module: string;
  risk: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface ReleaseReadinessData {
  summary: string;
  technique: 'ML';
  confidence: number;
  completionPercentage: number;
  recommendation: 'GO' | 'CONDITIONAL_GO' | 'NO_GO';
  historicalSuccessRate: number;
  historicalSampleSize: number;
  remainingRisks: RemainingRisk[];
  recommendationText: string;
}

export interface SimilarDefect {
  id: string;
  similarity: number;
  resolution: string;
  resolvedDate: string;
}

export interface SmartFailureTriageData {
  summary: string;
  technique: 'RAG';
  confidence: number;
  failedTest: string;
  error: string;
  module: string;
  similarDefects: SimilarDefect[];
  suggestedAction: string;
  routeTo: string;
}

// ── Mock Data ────────────────────────────────────────────

export const mockPrioritizedTests: PrioritizedTest[] = [
  { name: 'Payment_Checkout_E2E', riskScore: 94, reason: 'Module had 5 critical defects in last quarter; recent code changes to checkout flow', module: 'payment-service' },
  { name: 'Auth_Token_Refresh', riskScore: 87, reason: 'Authentication service recently modified; token handling has regression history', module: 'auth-gateway' },
  { name: 'Transfer_Validation_E2E', riskScore: 82, reason: 'Cross-service dependency chain — transfer depends on payment + auth', module: 'transfer-service' },
  { name: 'KYC_Document_Upload', riskScore: 76, reason: 'File handling module flagged in security scan; 2 open defects', module: 'kyc-service' },
  { name: 'Portfolio_Rebalance_Calc', riskScore: 71, reason: 'Complex calculation logic with edge cases in currency conversion', module: 'portfolio-engine' },
  { name: 'Session_Timeout_Handler', riskScore: 65, reason: 'Intermittent failures in UAT; environment-specific timing dependency', module: 'auth-gateway' },
  { name: 'Report_PDF_Generation', riskScore: 58, reason: 'PDF library upgrade pending; current version has known memory leak', module: 'reporting-service' },
  { name: 'Notification_Delivery', riskScore: 52, reason: 'Low defect history but untested after recent infrastructure change', module: 'notification-service' },
  { name: 'Audit_Log_Integrity', riskScore: 45, reason: 'Stable module with comprehensive coverage; minor priority', module: 'audit-service' },
  { name: 'Dashboard_Widget_Render', riskScore: 38, reason: 'UI-only test; low business impact if failing', module: 'frontend' },
];

export const mockFlakyTests: FlakyTest[] = [
  { name: 'UI_Render_Dashboard', flakinessScore: 89, runHistory: '\u2713\u2717\u2713\u2713\u2717\u2713\u2717\u2717\u2713\u2717\u2713\u2713\u2717\u2713\u2717\u2713\u2713\u2717\u2713\u2717', rootCause: 'CSS animation timing dependency — test assertions fire before render completes', recommendation: 'quarantine' },
  { name: 'API_Concurrent_Load', flakinessScore: 78, runHistory: '\u2713\u2713\u2717\u2713\u2713\u2717\u2713\u2717\u2713\u2713\u2713\u2717\u2713\u2713\u2717\u2713\u2717\u2713\u2713\u2717', rootCause: 'Race condition in connection pool under concurrent requests', recommendation: 'investigate' },
  { name: 'DB_Connection_Pool', flakinessScore: 74, runHistory: '\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2717\u2713\u2713\u2713', rootCause: 'Resource leak in test teardown — connections not properly released', recommendation: 'fix' },
  { name: 'Cache_Invalidation_E2E', flakinessScore: 68, runHistory: '\u2713\u2713\u2717\u2717\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2717\u2713', rootCause: 'Redis TTL timing varies between environments', recommendation: 'investigate' },
  { name: 'Websocket_Reconnect', flakinessScore: 62, runHistory: '\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713', rootCause: 'Network timeout threshold too aggressive in CI environment', recommendation: 'fix' },
];

export const mockTestGaps: TestGap[] = [
  { requirement: 'Payment reconciliation workflow', currentCoverage: 0, risk: 'HIGH', details: 'No test cases exist for the reconciliation batch process. 3 acceptance criteria completely untested. Module had 5 defects last quarter.', defectHistory: 5 },
  { requirement: 'User session timeout handling', currentCoverage: 12, risk: 'MEDIUM', details: 'Happy path tested, but error flows (network interruption, concurrent sessions, token refresh failure) have no coverage.', defectHistory: 2 },
  { requirement: 'Multi-currency transfer validation', currentCoverage: 45, risk: 'HIGH', details: 'Currency conversion edge cases untested — rounding errors, rate fluctuation during transaction, unsupported currency pairs.', defectHistory: 3 },
];

export const mockFailureClusters: FailureCluster[] = [
  { rootCause: 'Auth service connection pool exhaustion — response time exceeds 5s threshold after deployment AUT-2847', failureCount: 8, affectedSuites: 4, affectedModules: ['Login', 'Checkout', 'Profile', 'Transfer'], relatedDeployment: 'AUT-2847 (deployed 2 hours ago)', suggestedFix: 'Check auth service connection pool configuration. Previous incident INC-1122 was resolved by increasing pool size from 10 to 25.', confidence: 0.91 },
  { rootCause: 'Stale test data in SIT environment — expected accounts were deleted during data refresh', failureCount: 4, affectedSuites: 1, affectedModules: ['Regression Suite'], relatedDeployment: 'ENV-refresh-0412 (scheduled maintenance)', suggestedFix: 'Run test data seed script for SIT environment. Contact DevOps to add data validation to the refresh pipeline.', confidence: 0.87 },
];

export const mockReleaseReadiness: ReleaseReadinessData = {
  summary: 'Release readiness prediction: CONDITIONAL GO at 82% confidence with 60% test completion.',
  technique: 'ML',
  confidence: 0.82,
  completionPercentage: 60,
  recommendation: 'CONDITIONAL_GO',
  historicalSuccessRate: 94,
  historicalSampleSize: 50,
  remainingRisks: [
    { module: 'Payment Module', risk: '2 critical tests still pending execution', severity: 'critical' },
    { module: 'Auth Service', risk: 'Flaky test may produce false negative — quarantined but monitor', severity: 'warning' },
    { module: 'Core Workflow', risk: '100% pass rate, high confidence — no action needed', severity: 'info' },
  ],
  recommendationText: 'Proceed with release. Monitor payment module post-deployment. Auth flaky test is quarantined and should not block. Historical releases with this test pattern had 94% success rate (47/50).',
};

export const mockFailureTriage: SmartFailureTriageData = {
  summary: 'Smart triage for Payment_Checkout_E2E failure: 92% match to resolved defect DEF-1247.',
  technique: 'RAG',
  confidence: 0.89,
  failedTest: 'Payment_Checkout_E2E',
  error: 'AssertionError: Expected status 200, received 503 Service Unavailable',
  module: 'Payment Gateway',
  similarDefects: [
    { id: 'DEF-1247', similarity: 92, resolution: 'Connection pool exhaustion — increased pool size from 10 to 25 in payment-gateway config', resolvedDate: '2026-03-22' },
    { id: 'DEF-1189', similarity: 78, resolution: 'Timeout configuration mismatch between gateway and downstream service', resolvedDate: '2026-02-15' },
    { id: 'DEF-1056', similarity: 65, resolution: 'Circuit breaker threshold too aggressive — adjusted from 3 to 5 failures', resolvedDate: '2026-01-08' },
  ],
  suggestedAction: 'Check if payment-gateway connection pool config was reverted during recent deployment. DEF-1247 had identical symptoms and was resolved by pool size increase. Verify config in payment-gateway/config/db.yml.',
  routeTo: '@dev-payment-team (code owners: payment-gateway/src/checkout/)',
};
