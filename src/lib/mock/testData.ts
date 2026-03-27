// ============================================================================
// IntelliOps AI — Test Intelligence Mock Data (L2 TEST Layer)
// Structured dataset powering the interactive test quality analysis experience
// AI Techniques: RAG (defect matching), NLP (test classification), LLM (gap analysis)
// ============================================================================

// ─── Failed Test Record ───────────────────────────────────────────────────

export interface FailedTest {
  testId: string;
  testName: string;
  failureType: 'assertion' | 'timeout' | 'error' | 'flaky';
  errorMessage: string;
  lastPassedAt: string;
  failingSince: string;
  linkedDefect?: string;
}

// ─── Test Suite Record ────────────────────────────────────────────────────

export interface TestSuite {
  id: string;
  name: string;
  service: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  flakyTests: number;
  coverage: number; // 0-100
  lastRun: string;
  avgDuration: string;
  trend: 'improving' | 'stable' | 'declining';
  linkedRequirements: string[];
  linkedPRs: string[];
  failedTests: FailedTest[];
  coverageBreakdown: {
    unit: number;
    integration: number;
    e2e: number;
    performance: number;
  };
}

// ─── Defect Match Record ──────────────────────────────────────────────────

export interface DefectMatch {
  id: string;
  title: string;
  service: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  matchedDefectId: string;
  matchedDefectTitle: string;
  similarityScore: number; // 0-100
  technique: 'RAG' | 'NLP';
  status: 'confirmed' | 'reviewing' | 'false-positive';
}

// ─── Coverage Gap Record ──────────────────────────────────────────────────

export interface CoverageGap {
  id: string;
  component: string;
  currentCoverage: number;
  targetCoverage: number;
  gapType: 'line' | 'branch' | 'function';
  priority: 'critical' | 'high' | 'medium' | 'low';
}

// ═════════════════════════════════════════════════════════════════════════

// ─── Failed Tests Data ─────────────────────────────────────────────────────

const paymentFailedTests: FailedTest[] = [
  {
    testId: 'test-pay-001',
    testName: 'checkout_with_3d_secure_should_redirect_to_issuer',
    failureType: 'timeout',
    errorMessage: 'Test timeout after 30000ms. 3DS redirect did not complete within expected time window.',
    lastPassedAt: '2025-01-08T14:22:00Z',
    failingSince: '2025-02-15T09:15:00Z',
    linkedDefect: 'def-2025-001',
  },
  {
    testId: 'test-pay-002',
    testName: 'discount_code_application_should_reduce_total_amount',
    failureType: 'assertion',
    errorMessage: 'Expected cart total 95.50 but got 100.00. Discount code "MARCH2025" not applied to cart.',
    lastPassedAt: '2025-02-10T11:30:00Z',
    failingSince: '2025-02-20T16:45:00Z',
    linkedDefect: 'def-2025-002',
  },
  {
    testId: 'test-pay-003',
    testName: 'payment_gateway_timeout_should_retry_up_to_3_times',
    failureType: 'error',
    errorMessage: 'ReferenceError: paymentGateway.retry is not a function. Gateway retry handler may have been refactored.',
    lastPassedAt: '2025-01-25T13:20:00Z',
    failingSince: '2025-02-18T10:05:00Z',
  },
];

const portfolioFailedTests: FailedTest[] = [
  {
    testId: 'test-port-001',
    testName: 'real_time_quote_update_latency_under_100ms',
    failureType: 'assertion',
    errorMessage: 'Quote update latency averaged 145ms across 10 samples. Expected < 100ms for real-time performance.',
    lastPassedAt: '2025-02-12T08:30:00Z',
    failingSince: '2025-02-24T14:10:00Z',
  },
  {
    testId: 'test-port-002',
    testName: 'portfolio_sync_with_market_close_should_lock_positions',
    failureType: 'flaky',
    errorMessage: 'Intermittent failure: position lock timing depends on market data feed latency. Fails ~40% of runs.',
    lastPassedAt: '2025-02-22T16:00:00Z',
    failingSince: '2025-02-24T09:30:00Z',
  },
];

const kycFailedTests: FailedTest[] = [
  {
    testId: 'test-kyc-001',
    testName: 'document_ocr_should_extract_all_required_fields',
    failureType: 'assertion',
    errorMessage: 'OCR extraction failed for 2 out of 5 test documents. Expiry date field not recognized in passport scan.',
    lastPassedAt: '2025-02-08T10:15:00Z',
    failingSince: '2025-02-23T12:30:00Z',
  },
];

// ─── Test Suites ──────────────────────────────────────────────────────────

export const testSuites: TestSuite[] = [
  {
    id: 'ts-pay-001',
    name: 'Payment Service — Checkout Flow',
    service: 'payment-service',
    totalTests: 45,
    passed: 42,
    failed: 3,
    skipped: 0,
    flakyTests: 2,
    coverage: 67,
    lastRun: '2025-02-25T09:30:00Z',
    avgDuration: '3.2s',
    trend: 'declining',
    linkedRequirements: ['req-pay-001', 'req-pay-002'],
    linkedPRs: ['PR-4521', 'PR-4503'],
    failedTests: paymentFailedTests,
    coverageBreakdown: {
      unit: 75,
      integration: 62,
      e2e: 55,
      performance: 48,
    },
  },
  {
    id: 'ts-port-001',
    name: 'Portfolio Engine — Real-time Updates',
    service: 'portfolio-engine',
    totalTests: 38,
    passed: 35,
    failed: 2,
    skipped: 1,
    flakyTests: 1,
    coverage: 74,
    lastRun: '2025-02-25T10:15:00Z',
    avgDuration: '2.8s',
    trend: 'stable',
    linkedRequirements: ['req-port-001'],
    linkedPRs: ['PR-4512'],
    failedTests: portfolioFailedTests,
    coverageBreakdown: {
      unit: 82,
      integration: 71,
      e2e: 68,
      performance: 62,
    },
  },
  {
    id: 'ts-kyc-001',
    name: 'KYC Service — Document Processing',
    service: 'kyc-service',
    totalTests: 32,
    passed: 30,
    failed: 1,
    skipped: 1,
    flakyTests: 0,
    coverage: 82,
    lastRun: '2025-02-25T11:00:00Z',
    avgDuration: '4.1s',
    trend: 'improving',
    linkedRequirements: ['req-kyc-001', 'req-kyc-002', 'req-kyc-003'],
    linkedPRs: ['PR-4498'],
    failedTests: kycFailedTests,
    coverageBreakdown: {
      unit: 88,
      integration: 80,
      e2e: 78,
      performance: 76,
    },
  },
];

// ─── Defect Matches ────────────────────────────────────────────────────────

export const defectMatches: DefectMatch[] = [
  {
    id: 'dm-001',
    title: 'test-pay-001: 3DS timeout in checkout',
    service: 'payment-service',
    severity: 'high',
    matchedDefectId: 'def-2025-001',
    matchedDefectTitle: 'Payment Gateway — 3DS redirect hangs on slow networks',
    similarityScore: 94,
    technique: 'RAG',
    status: 'confirmed',
  },
  {
    id: 'dm-002',
    title: 'test-pay-002: discount code not applied',
    service: 'payment-service',
    severity: 'high',
    matchedDefectId: 'def-2025-002',
    matchedDefectTitle: 'Discount codes ignored if session expires between add and checkout',
    similarityScore: 87,
    technique: 'RAG',
    status: 'confirmed',
  },
  {
    id: 'dm-003',
    title: 'test-pay-003: retry handler missing',
    service: 'payment-service',
    severity: 'critical',
    matchedDefectId: 'def-2025-008',
    matchedDefectTitle: 'Gateway retry logic refactored but test stubs not updated',
    similarityScore: 78,
    technique: 'NLP',
    status: 'reviewing',
  },
  {
    id: 'dm-004',
    title: 'test-port-001: latency regression',
    service: 'portfolio-engine',
    severity: 'medium',
    matchedDefectId: 'def-2025-012',
    matchedDefectTitle: 'Real-time quote processing increased latency after Redis cluster migration',
    similarityScore: 71,
    technique: 'RAG',
    status: 'confirmed',
  },
  {
    id: 'dm-005',
    title: 'test-kyc-001: OCR field recognition',
    service: 'kyc-service',
    severity: 'high',
    matchedDefectId: 'def-2025-015',
    matchedDefectTitle: 'Document OCR model accuracy degraded for non-English passport formats',
    similarityScore: 65,
    technique: 'NLP',
    status: 'false-positive',
  },
];

// ─── Coverage Gaps ────────────────────────────────────────────────────────

export const coverageGaps: CoverageGap[] = [
  {
    id: 'gap-pay-001',
    component: 'payment-service/3ds-redirect',
    currentCoverage: 42,
    targetCoverage: 85,
    gapType: 'branch',
    priority: 'critical',
  },
  {
    id: 'gap-pay-002',
    component: 'payment-service/discount-engine',
    currentCoverage: 58,
    targetCoverage: 85,
    gapType: 'line',
    priority: 'high',
  },
  {
    id: 'gap-port-001',
    component: 'portfolio-engine/quote-latency',
    currentCoverage: 55,
    targetCoverage: 90,
    gapType: 'function',
    priority: 'high',
  },
  {
    id: 'gap-kyc-001',
    component: 'kyc-service/ocr-extraction',
    currentCoverage: 76,
    targetCoverage: 95,
    gapType: 'branch',
    priority: 'medium',
  },
];

// ─── Utility Functions ────────────────────────────────────────────────────

export function getTestSuiteById(id: string): TestSuite | undefined {
  return testSuites.find(ts => ts.id === id);
}

export function getDefectMatchesByService(service: string): DefectMatch[] {
  return defectMatches.filter(dm => dm.service === service);
}

export function getCoverageGapsByService(service: string): CoverageGap[] {
  return coverageGaps.filter(cg => cg.component.startsWith(service));
}

export function getFailureMetrics(suite: TestSuite) {
  const passRate = suite.totalTests > 0 ? ((suite.passed / suite.totalTests) * 100).toFixed(1) : '0.0';
  const failRate = suite.totalTests > 0 ? ((suite.failed / suite.totalTests) * 100).toFixed(1) : '0.0';
  const skipRate = suite.totalTests > 0 ? ((suite.skipped / suite.totalTests) * 100).toFixed(1) : '0.0';
  return { passRate, failRate, skipRate };
}
