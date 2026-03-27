// ============================================================================
// IntelliOps AI — Build & Change Intelligence Mock Data (BUILD Layer)
// Structured dataset powering the interactive PR analysis experience
// AI Techniques: LLM (summaries), ML (risk scoring), RAG (similar changes), NLP (entity extraction)
// ============================================================================

// ─── Evidence ────────────────────────────────────────────────────────────────

export interface BuildEvidence {
  type: 'pr' | 'slack' | 'incident' | 'log' | 'jira' | 'commit';
  id: string;
  title: string;
  timestamp: string;
  relevance: number;
}

// ─── AI Technique Metadata ───────────────────────────────────────────────────

export interface AISummary {
  technique: 'LLM';
  output: string;
  confidence: number;
  reasoning: string;
  tokensUsed: number;
  model: string;
}

export interface RiskPrediction {
  technique: 'ML';
  model: string;
  prediction: number;
  features: string[];
  featureImportance: { feature: string; weight: number }[];
  accuracy: number;
  trainingData: string;
}

export interface SimilarChange {
  technique: 'RAG';
  prId: string;
  title: string;
  similarity: number;
  outcome: 'Success' | 'Reverted' | 'Incident';
  date: string;
  service: string;
}

export interface SimilarChangesResult {
  technique: 'RAG';
  retrievedCount: number;
  topMatches: SimilarChange[];
  indexSize: string;
  retrievalTime: string;
}

export interface FailurePrediction {
  technique: 'ML';
  probability: number;
  category: string;
  explanation: string;
  preventionSteps: string[];
  confidence: number;
}

export interface TestRecommendation {
  technique: 'LLM';
  id: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  type: string;
  description: string;
  rationale: string;
  estimatedTime: string;
}

export interface ImpactNode {
  id: string;
  name: string;
  type: 'service' | 'database' | 'api' | 'queue' | 'cache';
  impactLevel: 'direct' | 'indirect' | 'minimal';
  riskContribution: number;
}

export interface EntityExtraction {
  technique: 'NLP';
  entities: { text: string; type: string; confidence: number }[];
  classification: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  parser: string;
}

export interface LearningFeedback {
  summary: string;
  improvements: string[];
}

// ─── Pull Request Record ─────────────────────────────────────────────────────

export interface PullRequestRecord {
  id: string;
  title: string;
  author: string;
  service: string;
  branch: string;
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
  createdAt: string;
  status: 'Open' | 'Review' | 'Approved';
  complexity: 'Low' | 'Medium' | 'High';
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  summary: AISummary;
  riskPrediction: RiskPrediction;
  entityExtraction: EntityExtraction;
  impactGraph: ImpactNode[];
  similarChanges: SimilarChangesResult;
  failurePredictions: FailurePrediction[];
  testRecommendations: TestRecommendation[];
  evidence: BuildEvidence[];
  learningFeedback: LearningFeedback;
}

// ─── Mock Pull Requests ──────────────────────────────────────────────────────

export const mockPullRequests: PullRequestRecord[] = [
  {
    id: 'PR-1247',
    title: 'Refactor payment gateway timeout handling',
    author: 'Aisha Patel',
    service: 'payment-service',
    branch: 'feature/payment-timeout-refactor',
    filesChanged: 14,
    linesAdded: 342,
    linesRemoved: 187,
    createdAt: '2026-03-24T10:15:00Z',
    status: 'Review',
    complexity: 'High',
    riskLevel: 'Critical',
    summary: {
      technique: 'LLM',
      output: 'This PR refactors the payment gateway timeout handling logic across 14 files in the payment-service. The primary change replaces the static 5-second timeout with a graduated timeout strategy (5s → 15s → 30s) based on transaction type. It introduces a new CircuitBreaker class for payment gateway calls and adds retry logic with exponential backoff. The changes also include a new PaymentTimeoutConfig that can be adjusted per-environment without redeployment.',
      confidence: 0.93,
      reasoning: 'High confidence based on clear PR description, well-structured code changes, and consistent naming conventions. The circuit breaker pattern is well-documented in the codebase. Minor uncertainty around the interaction between the new retry logic and the existing rate limiter.',
      tokensUsed: 2847,
      model: 'Claude 3.5 Sonnet (simulated)',
    },
    riskPrediction: {
      technique: 'ML',
      model: 'GradientBoosted v2.1 (simulated)',
      prediction: 0.82,
      features: ['files_changed', 'lines_modified', 'service_criticality', 'change_complexity', 'author_experience', 'test_coverage', 'historical_failure_rate'],
      featureImportance: [
        { feature: 'service_criticality', weight: 0.31 },
        { feature: 'change_complexity', weight: 0.24 },
        { feature: 'historical_failure_rate', weight: 0.18 },
        { feature: 'files_changed', weight: 0.12 },
        { feature: 'lines_modified', weight: 0.08 },
        { feature: 'test_coverage', weight: 0.04 },
        { feature: 'author_experience', weight: 0.03 },
      ],
      accuracy: 0.89,
      trainingData: '18 months of PR merge history (2,847 PRs)',
    },
    entityExtraction: {
      technique: 'NLP',
      entities: [
        { text: 'payment-service', type: 'SERVICE', confidence: 0.99 },
        { text: 'CircuitBreaker', type: 'PATTERN', confidence: 0.95 },
        { text: 'timeout', type: 'RISK_FACTOR', confidence: 0.97 },
        { text: 'payment gateway', type: 'DEPENDENCY', confidence: 0.96 },
        { text: 'exponential backoff', type: 'PATTERN', confidence: 0.92 },
      ],
      classification: 'Infrastructure / Resilience',
      sentiment: 'neutral',
      parser: 'SpaCy v3.7 (simulated)',
    },
    impactGraph: [
      { id: 'payment-service', name: 'Payment Service', type: 'service', impactLevel: 'direct', riskContribution: 0.40 },
      { id: 'payment-gateway', name: 'Payment Gateway API', type: 'api', impactLevel: 'direct', riskContribution: 0.25 },
      { id: 'checkout-service', name: 'Checkout Service', type: 'service', impactLevel: 'indirect', riskContribution: 0.15 },
      { id: 'payments-db', name: 'Payments Database', type: 'database', impactLevel: 'indirect', riskContribution: 0.10 },
      { id: 'redis-cache', name: 'Session Cache', type: 'cache', impactLevel: 'minimal', riskContribution: 0.05 },
      { id: 'notification-queue', name: 'Notification Queue', type: 'queue', impactLevel: 'minimal', riskContribution: 0.05 },
    ],
    similarChanges: {
      technique: 'RAG',
      retrievedCount: 12,
      topMatches: [
        { technique: 'RAG', prId: 'PR-891', title: 'Add retry logic to payment processor', similarity: 0.87, outcome: 'Incident', date: '2025-11-03', service: 'payment-service' },
        { technique: 'RAG', prId: 'PR-1102', title: 'Circuit breaker for auth-gateway calls', similarity: 0.79, outcome: 'Success', date: '2026-01-18', service: 'auth-gateway' },
        { technique: 'RAG', prId: 'PR-743', title: 'Timeout config change for KYC provider', similarity: 0.72, outcome: 'Reverted', date: '2025-08-22', service: 'kyc-service' },
      ],
      indexSize: '3,200 PRs indexed',
      retrievalTime: '0.8s',
    },
    failurePredictions: [
      { technique: 'ML', probability: 0.34, category: 'Timeout Cascade', explanation: 'The graduated timeout strategy increases maximum wait time to 30s, which could trigger upstream service timeouts under high concurrency.', preventionSteps: ['Load test with 200+ concurrent transactions', 'Verify upstream service timeout > 30s', 'Add connection pool monitoring'], confidence: 0.88 },
      { technique: 'ML', probability: 0.22, category: 'Circuit Breaker Misfire', explanation: 'Circuit breaker threshold configuration needs tuning — default 50% error rate trigger may be too aggressive for normal payment decline patterns.', preventionSteps: ['Calibrate threshold against baseline decline rate (8-12%)', 'Add metric-based alerting for circuit state changes'], confidence: 0.82 },
      { technique: 'ML', probability: 0.11, category: 'Config Drift', explanation: 'Per-environment timeout config without centralized management could lead to divergence between staging and production values.', preventionSteps: ['Add config validation in CI pipeline', 'Create config diff report in deployment checklist'], confidence: 0.75 },
    ],
    testRecommendations: [
      { technique: 'LLM', id: 'tr-001', priority: 'Critical', type: 'Load Test', description: 'Run payment flow load test with 200+ concurrent premium-tier transactions under graduated timeout configuration', rationale: 'PR-891 (similar change) caused INC-3021 due to untested high-concurrency timeout behavior', estimatedTime: '45 min' },
      { technique: 'LLM', id: 'tr-002', priority: 'High', type: 'Integration Test', description: 'Validate circuit breaker state transitions with payment gateway mock returning mixed success/failure responses', rationale: 'Circuit breaker pattern is new to payment-service — no existing integration tests cover this path', estimatedTime: '30 min' },
      { technique: 'LLM', id: 'tr-003', priority: 'High', type: 'Chaos Test', description: 'Simulate payment gateway 100% failure to verify circuit breaker opens correctly and fallback path activates', rationale: 'Fallback behavior must be validated before production deployment of resilience patterns', estimatedTime: '20 min' },
      { technique: 'LLM', id: 'tr-004', priority: 'Medium', type: 'Config Validation', description: 'Verify PaymentTimeoutConfig loads correctly across dev, staging, and production environment configurations', rationale: 'Config-driven changes have caused 2 incidents in the past 6 months when env-specific values diverged', estimatedTime: '15 min' },
    ],
    evidence: [
      { type: 'incident', id: 'INC-3021', title: 'Checkout failure caused by timeout misconfiguration', timestamp: '2026-03-25T09:14:00Z', relevance: 0.94 },
      { type: 'pr', id: 'PR-891', title: 'Similar retry logic change caused production incident', timestamp: '2025-11-03T14:30:00Z', relevance: 0.87 },
      { type: 'slack', id: '#payments-team', title: 'Engineer flagged timeout risk before previous deploy', timestamp: '2026-03-23T11:00:00Z', relevance: 0.78 },
      { type: 'jira', id: 'PAY-2341', title: 'Payment timeout improvements — Epic', timestamp: '2026-03-15T09:00:00Z', relevance: 0.72 },
    ],
    learningFeedback: {
      summary: 'This PR analysis has been captured and will actively improve the platform intelligence:',
      improvements: [
        'Release risk model updated — timeout configuration changes in payment-critical services now weighted 2.4x higher',
        'Test strategy enhanced — circuit breaker patterns auto-trigger chaos test recommendations',
        'Knowledge base enriched — new pattern entry linking graduated timeout strategies to concurrency risk',
      ],
    },
  },
  {
    id: 'PR-1251',
    title: 'Add portfolio rebalancing notification system',
    author: 'Marcus Chen',
    service: 'portfolio-engine',
    branch: 'feature/rebalance-notifications',
    filesChanged: 8,
    linesAdded: 224,
    linesRemoved: 31,
    createdAt: '2026-03-25T08:30:00Z',
    status: 'Open',
    complexity: 'Medium',
    riskLevel: 'Medium',
    summary: {
      technique: 'LLM',
      output: 'This PR introduces a notification system for portfolio rebalancing events. It adds a new NotificationDispatcher service that listens to rebalancing events from the portfolio-engine and routes alerts via email, in-app, and SMS channels. The implementation uses a pub/sub pattern with RabbitMQ for event distribution. Changes are well-isolated to the notification layer with minimal impact on the core portfolio calculation logic.',
      confidence: 0.88,
      reasoning: 'Good confidence based on clear separation of concerns. The pub/sub pattern is well-established in the codebase. Moderate uncertainty around message queue retry behavior under high-volume rebalancing events and potential notification duplication.',
      tokensUsed: 2102,
      model: 'Claude 3.5 Sonnet (simulated)',
    },
    riskPrediction: {
      technique: 'ML',
      model: 'GradientBoosted v2.1 (simulated)',
      prediction: 0.48,
      features: ['files_changed', 'lines_modified', 'service_criticality', 'change_complexity', 'author_experience', 'test_coverage', 'historical_failure_rate'],
      featureImportance: [
        { feature: 'change_complexity', weight: 0.28 },
        { feature: 'service_criticality', weight: 0.22 },
        { feature: 'lines_modified', weight: 0.16 },
        { feature: 'test_coverage', weight: 0.14 },
        { feature: 'author_experience', weight: 0.10 },
        { feature: 'historical_failure_rate', weight: 0.06 },
        { feature: 'files_changed', weight: 0.04 },
      ],
      accuracy: 0.89,
      trainingData: '18 months of PR merge history (2,847 PRs)',
    },
    entityExtraction: {
      technique: 'NLP',
      entities: [
        { text: 'portfolio-engine', type: 'SERVICE', confidence: 0.98 },
        { text: 'NotificationDispatcher', type: 'COMPONENT', confidence: 0.94 },
        { text: 'RabbitMQ', type: 'DEPENDENCY', confidence: 0.97 },
        { text: 'rebalancing', type: 'DOMAIN_EVENT', confidence: 0.93 },
      ],
      classification: 'Feature / Notification System',
      sentiment: 'positive',
      parser: 'SpaCy v3.7 (simulated)',
    },
    impactGraph: [
      { id: 'portfolio-engine', name: 'Portfolio Engine', type: 'service', impactLevel: 'direct', riskContribution: 0.30 },
      { id: 'notification-queue', name: 'RabbitMQ Queue', type: 'queue', impactLevel: 'direct', riskContribution: 0.30 },
      { id: 'email-service', name: 'Email Service', type: 'service', impactLevel: 'indirect', riskContribution: 0.20 },
      { id: 'portfolio-db', name: 'Portfolio Database', type: 'database', impactLevel: 'minimal', riskContribution: 0.10 },
      { id: 'user-preferences', name: 'User Preferences API', type: 'api', impactLevel: 'minimal', riskContribution: 0.10 },
    ],
    similarChanges: {
      technique: 'RAG',
      retrievedCount: 8,
      topMatches: [
        { technique: 'RAG', prId: 'PR-1087', title: 'Add trade execution notifications', similarity: 0.83, outcome: 'Success', date: '2026-01-05', service: 'trading-service' },
        { technique: 'RAG', prId: 'PR-956', title: 'Implement compliance alert dispatcher', similarity: 0.71, outcome: 'Success', date: '2025-10-14', service: 'compliance-service' },
        { technique: 'RAG', prId: 'PR-812', title: 'RabbitMQ consumer for settlement events', similarity: 0.68, outcome: 'Success', date: '2025-09-02', service: 'settlement-service' },
      ],
      indexSize: '3,200 PRs indexed',
      retrievalTime: '0.6s',
    },
    failurePredictions: [
      { technique: 'ML', probability: 0.18, category: 'Message Duplication', explanation: 'RabbitMQ at-least-once delivery combined with rebalancing event bursts could cause duplicate notifications during high-volume periods.', preventionSteps: ['Add idempotency key to notification dispatch', 'Implement deduplication window (5 min)'], confidence: 0.81 },
      { technique: 'ML', probability: 0.09, category: 'Queue Backpressure', explanation: 'Large-scale rebalancing events (e.g., market corrections) could overwhelm the notification queue, causing delayed delivery.', preventionSteps: ['Set queue depth alerting threshold at 10,000 messages', 'Implement priority-based routing for critical notifications'], confidence: 0.73 },
    ],
    testRecommendations: [
      { technique: 'LLM', id: 'tr-005', priority: 'High', type: 'Integration Test', description: 'Validate end-to-end notification flow: rebalancing event → queue → dispatch → delivery confirmation', rationale: 'New pub/sub integration requires full path validation before production', estimatedTime: '25 min' },
      { technique: 'LLM', id: 'tr-006', priority: 'Medium', type: 'Load Test', description: 'Simulate 500 concurrent rebalancing events to validate queue throughput and notification deduplication', rationale: 'Market correction scenarios generate burst notification volumes', estimatedTime: '30 min' },
      { technique: 'LLM', id: 'tr-007', priority: 'Low', type: 'Unit Test', description: 'Verify notification channel routing logic (email/in-app/SMS) based on user preference configuration', rationale: 'Channel routing is new logic without existing test coverage', estimatedTime: '15 min' },
    ],
    evidence: [
      { type: 'jira', id: 'PORT-1892', title: 'Portfolio rebalancing notification system — Feature', timestamp: '2026-03-10T09:00:00Z', relevance: 0.91 },
      { type: 'pr', id: 'PR-1087', title: 'Trade execution notifications (similar pattern)', timestamp: '2026-01-05T16:20:00Z', relevance: 0.83 },
      { type: 'slack', id: '#portfolio-team', title: 'Discussion on notification volume estimates', timestamp: '2026-03-22T14:15:00Z', relevance: 0.70 },
    ],
    learningFeedback: {
      summary: 'This PR analysis contributes to continuous platform learning:',
      improvements: [
        'Release risk model refined — pub/sub feature additions now include queue backpressure risk factor',
        'Test recommendations improved — notification systems auto-include deduplication test scenarios',
        'Knowledge base updated — new pattern entry for event-driven notification architectures in banking',
      ],
    },
  },
  {
    id: 'PR-1253',
    title: 'Fix KYC document upload validation bypass',
    author: 'Priya Sharma',
    service: 'kyc-service',
    branch: 'hotfix/kyc-upload-validation',
    filesChanged: 3,
    linesAdded: 47,
    linesRemoved: 12,
    createdAt: '2026-03-25T11:45:00Z',
    status: 'Approved',
    complexity: 'Low',
    riskLevel: 'High',
    summary: {
      technique: 'LLM',
      output: 'This hotfix addresses a critical security gap in the KYC document upload flow where file type validation was bypassed when documents were uploaded via the mobile API endpoint. The fix adds server-side MIME type validation and file signature verification to the mobile upload handler, aligning it with the existing web upload validation. Despite the small change size, the security implications make this a high-priority merge.',
      confidence: 0.96,
      reasoning: 'Very high confidence due to clear, focused change addressing a known vulnerability. The fix mirrors existing validation patterns from the web upload handler. The small scope and targeted nature reduce integration risk while addressing a critical security gap.',
      tokensUsed: 1543,
      model: 'Claude 3.5 Sonnet (simulated)',
    },
    riskPrediction: {
      technique: 'ML',
      model: 'GradientBoosted v2.1 (simulated)',
      prediction: 0.61,
      features: ['files_changed', 'lines_modified', 'service_criticality', 'change_complexity', 'author_experience', 'test_coverage', 'historical_failure_rate'],
      featureImportance: [
        { feature: 'service_criticality', weight: 0.35 },
        { feature: 'historical_failure_rate', weight: 0.22 },
        { feature: 'change_complexity', weight: 0.15 },
        { feature: 'test_coverage', weight: 0.12 },
        { feature: 'author_experience', weight: 0.08 },
        { feature: 'files_changed', weight: 0.04 },
        { feature: 'lines_modified', weight: 0.04 },
      ],
      accuracy: 0.89,
      trainingData: '18 months of PR merge history (2,847 PRs)',
    },
    entityExtraction: {
      technique: 'NLP',
      entities: [
        { text: 'kyc-service', type: 'SERVICE', confidence: 0.99 },
        { text: 'MIME type validation', type: 'SECURITY_CONTROL', confidence: 0.96 },
        { text: 'mobile API', type: 'ENDPOINT', confidence: 0.94 },
        { text: 'file signature verification', type: 'SECURITY_CONTROL', confidence: 0.93 },
      ],
      classification: 'Security / Hotfix',
      sentiment: 'negative',
      parser: 'SpaCy v3.7 (simulated)',
    },
    impactGraph: [
      { id: 'kyc-service', name: 'KYC Service', type: 'service', impactLevel: 'direct', riskContribution: 0.50 },
      { id: 'kyc-mobile-api', name: 'KYC Mobile API', type: 'api', impactLevel: 'direct', riskContribution: 0.30 },
      { id: 'document-store', name: 'Document Storage', type: 'database', impactLevel: 'indirect', riskContribution: 0.15 },
      { id: 'compliance-service', name: 'Compliance Service', type: 'service', impactLevel: 'minimal', riskContribution: 0.05 },
    ],
    similarChanges: {
      technique: 'RAG',
      retrievedCount: 5,
      topMatches: [
        { technique: 'RAG', prId: 'PR-1198', title: 'Add file type validation to web upload', similarity: 0.91, outcome: 'Success', date: '2026-02-28', service: 'kyc-service' },
        { technique: 'RAG', prId: 'PR-674', title: 'Fix document validation bypass in onboarding', similarity: 0.56, outcome: 'Success', date: '2025-07-15', service: 'onboarding-service' },
      ],
      indexSize: '3,200 PRs indexed',
      retrievalTime: '0.5s',
    },
    failurePredictions: [
      { technique: 'ML', probability: 0.07, category: 'False Rejection', explanation: 'Strict MIME validation may reject legitimate documents with non-standard MIME types from certain mobile OS versions.', preventionSteps: ['Test with documents from iOS 17, Android 14, and Android 15', 'Add fallback to file extension check for known edge cases'], confidence: 0.79 },
    ],
    testRecommendations: [
      { technique: 'LLM', id: 'tr-008', priority: 'Critical', type: 'Security Test', description: 'Attempt document upload with spoofed MIME types (executable-as-PDF, script-as-image) via mobile API endpoint', rationale: 'Security fix must be validated against the exact attack vector that was discovered', estimatedTime: '20 min' },
      { technique: 'LLM', id: 'tr-009', priority: 'High', type: 'Regression Test', description: 'Validate legitimate document uploads (PDF, JPEG, PNG) still work correctly on both web and mobile endpoints', rationale: 'Validation changes must not break the happy path for real users', estimatedTime: '15 min' },
      { technique: 'LLM', id: 'tr-010', priority: 'Medium', type: 'Compatibility Test', description: 'Test document upload from iOS Safari, Android Chrome, and React Native mobile app', rationale: 'Mobile MIME type headers vary by OS and browser — must validate cross-platform', estimatedTime: '25 min' },
    ],
    evidence: [
      { type: 'jira', id: 'SEC-421', title: 'Critical: KYC upload validation bypass on mobile', timestamp: '2026-03-24T16:00:00Z', relevance: 0.97 },
      { type: 'pr', id: 'PR-1198', title: 'Web upload validation (pattern to follow)', timestamp: '2026-02-28T10:30:00Z', relevance: 0.91 },
      { type: 'slack', id: '#security-team', title: 'Vulnerability reported by pen testing team', timestamp: '2026-03-24T14:30:00Z', relevance: 0.95 },
      { type: 'log', id: 'kyc-mobile-logs', title: '23 suspicious upload attempts in past 48 hours', timestamp: '2026-03-25T08:00:00Z', relevance: 0.88 },
    ],
    learningFeedback: {
      summary: 'Security hotfix intelligence captured for platform improvement:',
      improvements: [
        'Release risk model updated — PRs touching upload/validation endpoints now auto-flagged for security review',
        'Test strategy enhanced — mobile API endpoints auto-include security penetration test recommendations',
        'Knowledge base enriched — new pattern: validation parity checks between web and mobile API endpoints',
      ],
    },
  },
];

// ─── Utility Functions ───────────────────────────────────────────────────────

export function getPullRequestById(id: string): PullRequestRecord | undefined {
  return mockPullRequests.find((pr) => pr.id === id);
}
