// ============================================================================
// IntelliOps AI — Requirement Intelligence Mock Data (PLAN Layer)
// Structured dataset powering the interactive requirement analysis experience
// ============================================================================

export interface RequirementGap {
  description: string;
  severity: 'Critical' | 'High' | 'Medium';
}

export interface DuplicateInsight {
  description: string;
  source: string;
  similarity: number;
}

export interface RiskFactor {
  factor: string;
  impact: 'High' | 'Medium' | 'Low';
  probability: number;
}

export interface TestCase {
  name: string;
  type: 'Boundary' | 'Integration' | 'Load' | 'Security' | 'Regression' | 'E2E';
  priority: 'P0' | 'P1' | 'P2';
}

export interface Dependency {
  name: string;
  type: 'Service' | 'API' | 'Database' | 'External';
  riskLevel: 'High' | 'Medium' | 'Low';
}

export interface FeatureRequirement {
  id: string;
  title: string;
  description: string;
  riskScore: number;
  complexity: 'High' | 'Medium' | 'Low';
  aiTags: string[];
  status: 'Analysis Complete' | 'In Review' | 'Needs Attention';

  requirementGaps: RequirementGap[];
  duplicateInsights: DuplicateInsight[];
  riskFactors: RiskFactor[];
  testStrategy: TestCase[];
  dependencies: Dependency[];

  lifecycleImpact: {
    testImpact: string;
    releaseImpact: string;
    operationsImpact: string;
    learningImpact: string;
  };
}

export const mockFeatures: FeatureRequirement[] = [
  {
    id: 'feat1',
    title: 'Premium checkout with discount logic',
    description:
      'Apply dynamic discounts based on user tier, promotional rules, and loyalty points during the checkout flow. Integrates with pricing engine and payment service.',
    riskScore: 87,
    complexity: 'High',
    aiTags: ['LLM', 'RAG', 'ML', 'NLP'],
    status: 'Needs Attention',

    requirementGaps: [
      { description: 'No failure handling defined for discount service outage during peak load', severity: 'Critical' },
      { description: 'Missing edge case for overlapping promotional and loyalty discounts', severity: 'High' },
      { description: 'No specification for discount audit trail or compliance logging', severity: 'Medium' },
      { description: 'Currency conversion rules absent for international premium users', severity: 'High' },
    ],
    duplicateInsights: [
      { description: 'Similar discount logic implemented in Order Service (2023)', source: 'order-service/pricing.ts', similarity: 78 },
      { description: 'Reuse pricing rules engine from existing cart module recommended', source: 'cart-service/rules-engine.ts', similarity: 65 },
      { description: 'Loyalty points calculation mirrors existing rewards module', source: 'rewards-api/points.ts', similarity: 72 },
    ],
    riskFactors: [
      { factor: 'Payment + pricing service coupling creates cascading failure risk', impact: 'High', probability: 0.73 },
      { factor: 'High load scenario risk during flash sales without circuit breaker', impact: 'High', probability: 0.68 },
      { factor: 'Discount logic complexity increases regression surface by ~40%', impact: 'Medium', probability: 0.55 },
      { factor: 'Third-party pricing API dependency with no SLA guarantee', impact: 'Medium', probability: 0.42 },
    ],
    testStrategy: [
      { name: 'Boundary discount validation (0%, 100%, negative)', type: 'Boundary', priority: 'P0' },
      { name: 'Concurrent checkout with same discount code', type: 'Integration', priority: 'P0' },
      { name: 'Load testing for peak traffic (10K+ concurrent)', type: 'Load', priority: 'P0' },
      { name: 'Overlapping discount conflict resolution', type: 'E2E', priority: 'P1' },
      { name: 'Discount service outage fallback behavior', type: 'Integration', priority: 'P1' },
      { name: 'Audit trail completeness verification', type: 'Regression', priority: 'P2' },
    ],
    dependencies: [
      { name: 'Payment Service', type: 'Service', riskLevel: 'High' },
      { name: 'Pricing Engine', type: 'Service', riskLevel: 'High' },
      { name: 'Order API', type: 'API', riskLevel: 'Medium' },
      { name: 'User Tier Database', type: 'Database', riskLevel: 'Low' },
      { name: 'Third-Party Pricing API', type: 'External', riskLevel: 'High' },
    ],

    lifecycleImpact: {
      testImpact: 'Requires 6 new test cases including load and boundary testing for discount paths',
      releaseImpact: 'High-risk release — payment coupling requires staged rollout with canary deployment',
      operationsImpact: 'New monitoring alerts needed for discount service health and pricing anomalies',
      learningImpact: 'Discount failure patterns will enrich knowledge base for future pricing features',
    },
  },
  {
    id: 'feat2',
    title: 'Real-time portfolio update',
    description:
      'Stream live market data to update portfolio valuations in real-time. Integrates with market data feeds, portfolio calculation engine, and notification service.',
    riskScore: 72,
    complexity: 'High',
    aiTags: ['ML', 'LLM', 'NLP'],
    status: 'In Review',

    requirementGaps: [
      { description: 'No specification for handling stale data when market feed disconnects', severity: 'Critical' },
      { description: 'Missing requirement for data reconciliation between real-time and batch updates', severity: 'High' },
      { description: 'Notification throttling rules not defined for rapid price movements', severity: 'Medium' },
    ],
    duplicateInsights: [
      { description: 'WebSocket streaming pattern exists in trade execution service', source: 'trade-service/ws-client.ts', similarity: 82 },
      { description: 'Portfolio calculation engine shares logic with end-of-day batch', source: 'batch-service/portfolio-calc.ts', similarity: 71 },
    ],
    riskFactors: [
      { factor: 'WebSocket connection stability under high market volatility', impact: 'High', probability: 0.61 },
      { factor: 'Data consistency between real-time and persisted portfolio state', impact: 'High', probability: 0.58 },
      { factor: 'Memory pressure from holding live state for 50K+ concurrent users', impact: 'Medium', probability: 0.45 },
    ],
    testStrategy: [
      { name: 'Market feed disconnection and reconnection handling', type: 'Integration', priority: 'P0' },
      { name: 'Data consistency check: real-time vs batch reconciliation', type: 'E2E', priority: 'P0' },
      { name: 'Load test: 50K concurrent portfolio streams', type: 'Load', priority: 'P0' },
      { name: 'Notification throttling under rapid price changes', type: 'Boundary', priority: 'P1' },
      { name: 'Stale data indicator display accuracy', type: 'Regression', priority: 'P2' },
    ],
    dependencies: [
      { name: 'Market Data Feed', type: 'External', riskLevel: 'High' },
      { name: 'Portfolio Calculation Engine', type: 'Service', riskLevel: 'Medium' },
      { name: 'Notification Service', type: 'Service', riskLevel: 'Low' },
      { name: 'Portfolio Database', type: 'Database', riskLevel: 'Medium' },
    ],

    lifecycleImpact: {
      testImpact: 'Requires real-time streaming test infrastructure and market data simulation',
      releaseImpact: 'Medium risk — gradual user migration recommended with feature flag',
      operationsImpact: 'WebSocket health monitoring and memory utilization alerts required',
      learningImpact: 'Streaming failure patterns will improve future real-time feature risk scoring',
    },
  },
  {
    id: 'feat3',
    title: 'KYC document verification flow',
    description:
      'Automated identity verification using document OCR, liveness checks, and regulatory compliance validation. Integrates with ID verification vendor and compliance database.',
    riskScore: 65,
    complexity: 'Medium',
    aiTags: ['RAG', 'NLP', 'ML'],
    status: 'Analysis Complete',

    requirementGaps: [
      { description: 'No specification for handling expired documents during verification', severity: 'High' },
      { description: 'Missing retry logic for vendor API timeout during OCR processing', severity: 'Medium' },
    ],
    duplicateInsights: [
      { description: 'OCR extraction pipeline exists in document processing module', source: 'doc-processor/ocr-pipeline.ts', similarity: 85 },
      { description: 'Compliance validation rules overlap with onboarding checks', source: 'onboarding-service/compliance.ts', similarity: 68 },
    ],
    riskFactors: [
      { factor: 'Regulatory compliance failure risk if vendor OCR accuracy drops below 98%', impact: 'High', probability: 0.35 },
      { factor: 'PII data handling requires strict encryption and audit logging', impact: 'Medium', probability: 0.28 },
      { factor: 'Third-party vendor SLA uncertainty for liveness check API', impact: 'Medium', probability: 0.40 },
    ],
    testStrategy: [
      { name: 'OCR accuracy validation across document types', type: 'E2E', priority: 'P0' },
      { name: 'Vendor API timeout and retry behavior', type: 'Integration', priority: 'P0' },
      { name: 'PII encryption verification in transit and at rest', type: 'Security', priority: 'P0' },
      { name: 'Expired document rejection flow', type: 'Boundary', priority: 'P1' },
      { name: 'Compliance rule validation completeness', type: 'Regression', priority: 'P1' },
    ],
    dependencies: [
      { name: 'ID Verification Vendor', type: 'External', riskLevel: 'High' },
      { name: 'Compliance Database', type: 'Database', riskLevel: 'Medium' },
      { name: 'Document Storage (S3)', type: 'Service', riskLevel: 'Low' },
      { name: 'Audit Logging Service', type: 'Service', riskLevel: 'Low' },
    ],

    lifecycleImpact: {
      testImpact: 'Security testing and compliance validation are mandatory before release',
      releaseImpact: 'Low-medium risk — feature flagged rollout with compliance team sign-off',
      operationsImpact: 'Vendor health monitoring and OCR accuracy tracking dashboards needed',
      learningImpact: 'Document verification patterns will build compliance knowledge base',
    },
  },
];

export function getFeatureById(id: string): FeatureRequirement | undefined {
  return mockFeatures.find((f) => f.id === id);
}
