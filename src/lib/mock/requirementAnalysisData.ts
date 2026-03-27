// ── Requirement Analysis Deep Data (L0 PLAN Sub-Tabs) ──────────────
// Provides detailed analysis data for each requirement across all 5 sub-tabs.

export interface Ambiguity {
  phrase: string;
  issue: string;
  suggestion: string;
  severity: 'high' | 'medium' | 'low';
}

export interface AcceptanceCriterion {
  id: string;
  criterion: string;
  testable: boolean;
  automatable: boolean;
}

export interface ComplexityEstimate {
  storyPoints: number;
  rationale: string;
  similarRequirements: Array<{ id: string; name: string; actualPoints: number }>;
}

export interface DuplicateSignal {
  targetId: string;
  targetName: string;
  similarity: number;
  overlapAreas: string[];
}

export interface RiskFactorDetail {
  category: string;
  score: number;
  explanation: string;
  mitigation: string;
}

export interface TestTypeRecommendation {
  type: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedCases: number;
  rationale: string;
}

export interface CoverageMapping {
  testSuiteId: string;
  testSuiteName: string;
  partialCoverage: number;
}

export interface DependencyLink {
  entityType: 'requirement' | 'service' | 'pr' | 'incident';
  entityId: string;
  entityName: string;
  relationship: 'depends-on' | 'blocks' | 'implements' | 'related-to';
}

export interface RequirementAnalysis {
  requirementId: string;
  completenessScore: number;
  ambiguities: Ambiguity[];
  acceptanceCriteria: AcceptanceCriterion[];
  complexityEstimate: ComplexityEstimate;
  duplicateSignals: DuplicateSignal[];
  riskFactors: RiskFactorDetail[];
  testStrategy: {
    recommendedTypes: TestTypeRecommendation[];
    coverageMapping: CoverageMapping[];
    automationRecommendation: string;
  };
  dependencies: DependencyLink[];
}

// ── Data ────────────────────────────────────────────────────────────

export const requirementAnalyses: Record<string, RequirementAnalysis> = {
  feat1: {
    requirementId: 'REQ-101',
    completenessScore: 62,
    ambiguities: [
      { phrase: 'appropriate discount logic', issue: 'No specification of discount rules, thresholds, or calculation method', suggestion: 'Define discount tiers: 5% for orders >CHF 500, 10% for >CHF 1000, 15% for premium members', severity: 'high' },
      { phrase: 'handle edge cases gracefully', issue: 'Undefined which edge cases; no error handling strategy specified', suggestion: 'Enumerate edge cases: negative quantities, expired coupons, concurrent discount stacking, zero-value orders', severity: 'high' },
      { phrase: 'premium users', issue: 'No definition of premium tier membership criteria or validation', suggestion: 'Define premium as: users with active Wealth Management subscription (tier_id >= 3) verified via auth-gateway', severity: 'medium' },
      { phrase: 'real-time processing', issue: 'No latency SLA defined for checkout flow', suggestion: 'Specify: checkout response within 2000ms p95, payment confirmation within 5000ms p99', severity: 'medium' },
    ],
    acceptanceCriteria: [
      { id: 'AC-101-1', criterion: 'Discount is calculated correctly for all tier levels', testable: true, automatable: true },
      { id: 'AC-101-2', criterion: 'Checkout completes within SLA for premium users under load', testable: true, automatable: true },
      { id: 'AC-101-3', criterion: 'Invalid discount codes are rejected with clear error messages', testable: true, automatable: true },
      { id: 'AC-101-4', criterion: 'Concurrent discount stacking is prevented', testable: true, automatable: false },
      { id: 'AC-101-5', criterion: 'Audit trail logs all discount applications for compliance', testable: true, automatable: false },
      { id: 'AC-101-6', criterion: 'User experience is smooth and intuitive', testable: false, automatable: false },
    ],
    complexityEstimate: {
      storyPoints: 13,
      rationale: 'High complexity due to payment gateway integration, discount rule engine, premium tier validation, and compliance audit requirements. Historical data shows similar payment-path features averaging 11 story points.',
      similarRequirements: [
        { id: 'REQ-078', name: 'Loyalty points redemption at checkout', actualPoints: 11 },
        { id: 'REQ-045', name: 'Multi-currency payment processing', actualPoints: 15 },
        { id: 'REQ-091', name: 'Promotional coupon validation engine', actualPoints: 8 },
      ],
    },
    duplicateSignals: [
      { targetId: 'feat2', targetName: 'Real-time portfolio update', similarity: 34, overlapAreas: ['real-time processing', 'premium user validation'] },
      { targetId: 'feat3', targetName: 'KYC document verification flow', similarity: 18, overlapAreas: ['compliance audit trail'] },
    ],
    riskFactors: [
      { category: 'Technical Complexity', score: 82, explanation: 'Payment gateway timeout handling under concurrent load has caused 3 incidents in the past 6 months.', mitigation: 'Implement circuit breaker pattern with graduated timeouts and load testing before deployment.' },
      { category: 'Integration Dependency', score: 75, explanation: 'Depends on auth-gateway for premium tier validation and payment-service for transaction processing — both critical path.', mitigation: 'Add fallback authentication cache and payment retry queue.' },
      { category: 'Historical Defect Density', score: 68, explanation: 'Payment checkout path has 2.4x higher defect density than platform average based on 18 months of data.', mitigation: 'Allocate additional integration testing cycles and pair with senior engineer for code review.' },
      { category: 'Test Coverage Gap', score: 71, explanation: 'Current test coverage for discount edge cases is 34% — well below the 80% target for payment-critical paths.', mitigation: 'Generate comprehensive boundary test cases before development begins.' },
      { category: 'Timeline Pressure', score: 58, explanation: 'Sprint deadline is 2 weeks away with 13 story points estimated — tight but achievable with focused effort.', mitigation: 'Prioritize core discount logic first, defer audit trail to follow-up sprint if needed.' },
    ],
    testStrategy: {
      recommendedTypes: [
        { type: 'Unit', priority: 'critical', estimatedCases: 24, rationale: 'Discount calculation logic requires exhaustive boundary testing for all tier combinations.' },
        { type: 'Integration', priority: 'critical', estimatedCases: 12, rationale: 'Payment gateway + auth-gateway interaction must be validated under realistic conditions.' },
        { type: 'E2E', priority: 'high', estimatedCases: 8, rationale: 'Full checkout flow from cart to confirmation needs validation across user tiers.' },
        { type: 'Performance', priority: 'high', estimatedCases: 4, rationale: 'Checkout latency SLA (2000ms p95) must be verified under concurrent premium user load.' },
        { type: 'Security', priority: 'medium', estimatedCases: 6, rationale: 'Discount manipulation and payment injection vectors need penetration testing.' },
      ],
      coverageMapping: [
        { testSuiteId: 'TS-PAY-001', testSuiteName: 'Payment Service — Checkout Flow', partialCoverage: 45 },
        { testSuiteId: 'TS-AUTH-002', testSuiteName: 'Auth Gateway — Tier Validation', partialCoverage: 62 },
        { testSuiteId: 'TS-PAY-003', testSuiteName: 'Payment Service — Discount Engine', partialCoverage: 28 },
      ],
      automationRecommendation: 'Automate all unit and integration tests (36 cases). E2E tests should use Playwright with realistic user flows. Performance tests via k6 with 500 concurrent users. Manual security review recommended for payment injection scenarios.',
    },
    dependencies: [
      { entityType: 'service', entityId: 'svc-payment', entityName: 'payment-service', relationship: 'implements' },
      { entityType: 'service', entityId: 'svc-auth', entityName: 'auth-gateway', relationship: 'depends-on' },
      { entityType: 'pr', entityId: 'PR-4521', entityName: 'Gateway timeout optimization', relationship: 'related-to' },
      { entityType: 'incident', entityId: 'inc-checkout-001', entityName: 'Checkout failure for premium users', relationship: 'related-to' },
      { entityType: 'requirement', entityId: 'feat2', entityName: 'Real-time portfolio update', relationship: 'related-to' },
    ],
  },

  feat2: {
    requirementId: 'REQ-201',
    completenessScore: 74,
    ambiguities: [
      { phrase: 'real-time updates', issue: 'No definition of acceptable latency for "real-time" — could mean ms or seconds', suggestion: 'Define real-time as: portfolio value updates within 500ms of market data feed change', severity: 'high' },
      { phrase: 'handle market volatility', issue: 'No specification of throttling or circuit-breaking during high-frequency market events', suggestion: 'Implement 100ms debounce on updates, circuit breaker at >1000 updates/sec per user', severity: 'medium' },
      { phrase: 'notification preferences', issue: 'Notification channels and frequency not specified', suggestion: 'Support push, email, SMS with configurable thresholds: >1%, >5%, >10% portfolio change', severity: 'low' },
    ],
    acceptanceCriteria: [
      { id: 'AC-201-1', criterion: 'Portfolio value updates within 500ms of market data change', testable: true, automatable: true },
      { id: 'AC-201-2', criterion: 'WebSocket connection handles reconnection gracefully', testable: true, automatable: true },
      { id: 'AC-201-3', criterion: 'Notification triggers correctly for configured thresholds', testable: true, automatable: true },
      { id: 'AC-201-4', criterion: 'System remains stable during high-volatility market events', testable: true, automatable: true },
      { id: 'AC-201-5', criterion: 'Historical portfolio performance is accurately displayed', testable: true, automatable: false },
    ],
    complexityEstimate: {
      storyPoints: 11,
      rationale: 'WebSocket real-time infrastructure, market data feed integration, and notification engine add significant complexity. Similar features averaged 10 story points.',
      similarRequirements: [
        { id: 'REQ-067', name: 'Real-time FX rate dashboard', actualPoints: 9 },
        { id: 'REQ-082', name: 'Live trade execution feed', actualPoints: 12 },
      ],
    },
    duplicateSignals: [
      { targetId: 'feat1', targetName: 'Premium checkout with discount logic', similarity: 34, overlapAreas: ['real-time processing', 'premium user validation'] },
      { targetId: 'feat3', targetName: 'KYC document verification flow', similarity: 22, overlapAreas: ['notification system'] },
    ],
    riskFactors: [
      { category: 'Technical Complexity', score: 70, explanation: 'WebSocket infrastructure for real-time updates requires careful connection management and state synchronization.', mitigation: 'Use established WebSocket library with automatic reconnection and state recovery.' },
      { category: 'Integration Dependency', score: 65, explanation: 'Depends on external market data feed provider and notification-service for multi-channel delivery.', mitigation: 'Implement market data feed failover and notification queue for guaranteed delivery.' },
      { category: 'Historical Defect Density', score: 52, explanation: 'Portfolio engine has moderate defect density — 1.3x platform average, mostly in notification timing.', mitigation: 'Focus testing on notification trigger accuracy and timing edge cases.' },
      { category: 'Test Coverage Gap', score: 48, explanation: 'WebSocket connection management has 58% coverage — above minimum but below target for real-time systems.', mitigation: 'Add chaos testing for connection drops and reconnection scenarios.' },
      { category: 'Timeline Pressure', score: 42, explanation: 'Sprint timeline is comfortable at 11 story points with 3 weeks available.', mitigation: 'Standard sprint cadence should suffice.' },
    ],
    testStrategy: {
      recommendedTypes: [
        { type: 'Integration', priority: 'critical', estimatedCases: 14, rationale: 'WebSocket + market data feed integration requires extensive connection lifecycle testing.' },
        { type: 'Performance', priority: 'critical', estimatedCases: 6, rationale: '500ms latency SLA under 10,000 concurrent WebSocket connections must be validated.' },
        { type: 'Unit', priority: 'high', estimatedCases: 18, rationale: 'Portfolio calculation logic and notification threshold evaluation need thorough coverage.' },
        { type: 'E2E', priority: 'medium', estimatedCases: 5, rationale: 'User flow from portfolio view to notification receipt should be validated.' },
        { type: 'Security', priority: 'medium', estimatedCases: 4, rationale: 'WebSocket authentication and data access controls need verification.' },
      ],
      coverageMapping: [
        { testSuiteId: 'TS-PORT-001', testSuiteName: 'Portfolio Engine — Real-time Updates', partialCoverage: 58 },
        { testSuiteId: 'TS-NOTIF-001', testSuiteName: 'Notification Service — Delivery', partialCoverage: 71 },
      ],
      automationRecommendation: 'Automate integration and unit tests (32 cases). Performance tests should simulate 10,000 concurrent WebSocket connections with market data replay. E2E tests need browser WebSocket support via Playwright.',
    },
    dependencies: [
      { entityType: 'service', entityId: 'svc-portfolio', entityName: 'portfolio-engine', relationship: 'implements' },
      { entityType: 'service', entityId: 'svc-notification', entityName: 'notification-service', relationship: 'depends-on' },
      { entityType: 'pr', entityId: 'PR-4522', entityName: 'Notification batch optimization', relationship: 'related-to' },
      { entityType: 'incident', entityId: 'inc-portfolio-001', entityName: 'Portfolio notification delay', relationship: 'related-to' },
      { entityType: 'requirement', entityId: 'feat1', entityName: 'Premium checkout with discount logic', relationship: 'related-to' },
    ],
  },

  feat3: {
    requirementId: 'REQ-301',
    completenessScore: 81,
    ambiguities: [
      { phrase: 'supported document types', issue: 'List of acceptable document formats not exhaustive', suggestion: 'Specify: passport (PDF/JPG), national ID (PDF/JPG), utility bill (PDF, max 3 months old), bank statement (PDF)', severity: 'medium' },
      { phrase: 'verification timeout', issue: 'No maximum processing time defined for document verification', suggestion: 'Define: OCR extraction within 10s, identity verification within 30s, manual review queue after 60s', severity: 'low' },
    ],
    acceptanceCriteria: [
      { id: 'AC-301-1', criterion: 'Documents are extracted and classified with >95% accuracy', testable: true, automatable: true },
      { id: 'AC-301-2', criterion: 'Identity match confidence score is displayed to compliance officer', testable: true, automatable: true },
      { id: 'AC-301-3', criterion: 'Failed verifications are routed to manual review queue', testable: true, automatable: true },
      { id: 'AC-301-4', criterion: 'All verification attempts are logged for audit compliance', testable: true, automatable: false },
    ],
    complexityEstimate: {
      storyPoints: 8,
      rationale: 'Document classification and OCR extraction are well-understood patterns. Compliance audit trail adds moderate complexity. Similar features averaged 7 story points.',
      similarRequirements: [
        { id: 'REQ-055', name: 'Anti-money laundering document check', actualPoints: 9 },
        { id: 'REQ-072', name: 'Customer onboarding identity verification', actualPoints: 7 },
      ],
    },
    duplicateSignals: [
      { targetId: 'feat1', targetName: 'Premium checkout with discount logic', similarity: 18, overlapAreas: ['compliance audit trail'] },
      { targetId: 'feat2', targetName: 'Real-time portfolio update', similarity: 22, overlapAreas: ['notification system'] },
    ],
    riskFactors: [
      { category: 'Technical Complexity', score: 45, explanation: 'OCR and document classification are well-established patterns with mature libraries available.', mitigation: 'Use proven OCR engine (Tesseract/Azure) with pre-trained document classifiers.' },
      { category: 'Integration Dependency', score: 55, explanation: 'Depends on auth-gateway for RBAC policy and external KYC verification provider API.', mitigation: 'Implement KYC provider failover and cache recent verification results.' },
      { category: 'Historical Defect Density', score: 38, explanation: 'KYC service has low defect density — 0.7x platform average, well-tested domain.', mitigation: 'Maintain current testing standards.' },
      { category: 'Test Coverage Gap', score: 42, explanation: 'Document upload and OCR paths have 72% coverage — close to target.', mitigation: 'Add edge case tests for corrupted documents and unsupported formats.' },
      { category: 'Timeline Pressure', score: 30, explanation: 'Ample timeline with 8 story points and 3 weeks available.', mitigation: 'No special action needed.' },
    ],
    testStrategy: {
      recommendedTypes: [
        { type: 'Integration', priority: 'critical', estimatedCases: 10, rationale: 'OCR + KYC provider + auth-gateway integration needs comprehensive validation.' },
        { type: 'Unit', priority: 'high', estimatedCases: 16, rationale: 'Document classification logic and identity matching algorithms need thorough unit tests.' },
        { type: 'E2E', priority: 'high', estimatedCases: 6, rationale: 'Full verification flow from upload to compliance dashboard needs validation.' },
        { type: 'Security', priority: 'high', estimatedCases: 8, rationale: 'Document handling requires strict access controls and PII protection testing.' },
        { type: 'Performance', priority: 'low', estimatedCases: 3, rationale: 'Verify OCR processing meets 10s SLA under normal load.' },
      ],
      coverageMapping: [
        { testSuiteId: 'TS-KYC-001', testSuiteName: 'KYC Service — Document Processing', partialCoverage: 72 },
        { testSuiteId: 'TS-AUTH-003', testSuiteName: 'Auth Gateway — RBAC Enforcement', partialCoverage: 68 },
      ],
      automationRecommendation: 'Automate unit and integration tests (26 cases). E2E tests should use sample documents across all supported formats. Security tests require manual penetration testing for PII exposure vectors.',
    },
    dependencies: [
      { entityType: 'service', entityId: 'svc-kyc', entityName: 'kyc-service', relationship: 'implements' },
      { entityType: 'service', entityId: 'svc-auth', entityName: 'auth-gateway', relationship: 'depends-on' },
      { entityType: 'requirement', entityId: 'feat1', entityName: 'Premium checkout with discount logic', relationship: 'related-to' },
    ],
  },
};

export function getRequirementAnalysis(featureId: string): RequirementAnalysis | undefined {
  return requirementAnalyses[featureId];
}

/** Similarity matrix for duplicate detection: all-pairs between 3 requirements */
export const similarityMatrix = [
  { rowId: 'feat1', rowName: 'REQ-101: Premium checkout', cols: [{ targetId: 'feat1', score: 100 }, { targetId: 'feat2', score: 34 }, { targetId: 'feat3', score: 18 }] },
  { rowId: 'feat2', rowName: 'REQ-201: Portfolio update', cols: [{ targetId: 'feat1', score: 34 }, { targetId: 'feat2', score: 100 }, { targetId: 'feat3', score: 22 }] },
  { rowId: 'feat3', rowName: 'REQ-301: KYC verification', cols: [{ targetId: 'feat1', score: 18 }, { targetId: 'feat2', score: 22 }, { targetId: 'feat3', score: 100 }] },
];
