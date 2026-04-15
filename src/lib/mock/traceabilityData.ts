import type { TraceabilityChain, TraceabilityGap, TraceabilitySummary } from '@/lib/types/traceability';

export const traceabilityChains: TraceabilityChain[] = [
  // chain-001: Premium checkout — fully traceable, low risk
  {
    id: 'chain-001',
    requirement: {
      id: 'feat-001',
      title: 'Premium checkout with discount logic',
      source: 'jira',
      acceptanceCriteria: [
        'Discount codes apply correctly at checkout',
        'Premium tier users receive automatic discount',
        'Failed payments surface actionable error messages',
        'Checkout flow completes in under 3 seconds',
      ],
      riskScore: 0.28,
      status: 'done',
    },
    pullRequests: [
      {
        id: 'PR-1201',
        title: 'feat(checkout): add premium discount logic to payment-service',
        riskScore: 0.22,
        filesChanged: 14,
        status: 'merged',
        linkedToRequirement: true,
        coverageOfAcceptanceCriteria: 1.0,
      },
    ],
    testCoverage: {
      totalTests: 12,
      passingTests: 12,
      coveragePercentage: 97,
      missingScenarios: [],
      status: 'full',
    },
    deployment: {
      releaseId: 'rel-v2.4.1',
      releaseName: 'v2.4.1 — Payment Service Enhancements',
      deployedAt: '2025-11-20T14:00:00Z',
      environment: 'production',
      status: 'deployed',
    },
    chainCompleteness: 1.0,
    gaps: [],
    riskLevel: 'low',
  },

  // chain-002: Portfolio update — partial test coverage, medium risk
  {
    id: 'chain-002',
    requirement: {
      id: 'feat-002',
      title: 'Real-time portfolio position update',
      source: 'jira',
      acceptanceCriteria: [
        'Portfolio reflects position changes within 500 ms',
        'Multi-currency positions render accurately',
        'Historical P&L chart updates on data refresh',
      ],
      riskScore: 0.51,
      status: 'done',
    },
    pullRequests: [
      {
        id: 'PR-1205',
        title: 'feat(portfolio): real-time position websocket integration',
        riskScore: 0.48,
        filesChanged: 22,
        status: 'merged',
        linkedToRequirement: true,
        coverageOfAcceptanceCriteria: 0.67,
      },
    ],
    testCoverage: {
      totalTests: 10,
      passingTests: 8,
      coveragePercentage: 78,
      missingScenarios: [
        'Multi-currency edge case for JPY/USD pair',
        'Historical P&L chart data-refresh boundary condition',
      ],
      status: 'partial',
    },
    deployment: {
      releaseId: 'rel-v2.4.1',
      releaseName: 'v2.4.1 — Payment Service Enhancements',
      deployedAt: '2025-11-20T14:00:00Z',
      environment: 'production',
      status: 'deployed',
    },
    chainCompleteness: 0.85,
    gaps: [
      {
        type: 'partial_test_coverage',
        severity: 'medium',
        description: '2 of 10 tests are failing. Multi-currency and P&L refresh scenarios are untested.',
        recommendation: 'Add test cases for JPY/USD conversion boundary and P&L chart data-refresh trigger.',
        affectedEntity: {
          layer: 'Test Coverage',
          id: 'PR-1205',
          title: 'Real-time portfolio position update — test suite',
        },
      },
    ],
    riskLevel: 'medium',
  },

  // chain-003: KYC verification — two PRs, fully traceable, low risk
  {
    id: 'chain-003',
    requirement: {
      id: 'feat-003',
      title: 'KYC document verification flow',
      source: 'jira',
      acceptanceCriteria: [
        'ID document upload supports PDF and JPEG',
        'Automated face-match check completes within 10 seconds',
        'Compliance audit log captures every verification event',
        'Rejected submissions surface a human-readable reason code',
      ],
      riskScore: 0.33,
      status: 'done',
    },
    pullRequests: [
      {
        id: 'PR-1210',
        title: 'feat(kyc): document upload and face-match integration',
        riskScore: 0.31,
        filesChanged: 18,
        status: 'merged',
        linkedToRequirement: true,
        coverageOfAcceptanceCriteria: 0.75,
      },
      {
        id: 'PR-1211',
        title: 'feat(kyc): compliance audit log and rejection reason codes',
        riskScore: 0.24,
        filesChanged: 9,
        status: 'merged',
        linkedToRequirement: true,
        coverageOfAcceptanceCriteria: 1.0,
      },
    ],
    testCoverage: {
      totalTests: 15,
      passingTests: 15,
      coveragePercentage: 96,
      missingScenarios: [],
      status: 'full',
    },
    deployment: {
      releaseId: 'rel-v3.0.0',
      releaseName: 'v3.0.0 — KYC & Auth Gateway Overhaul',
      deployedAt: '2025-12-10T09:00:00Z',
      environment: 'production',
      status: 'deployed',
    },
    chainCompleteness: 1.0,
    gaps: [],
    riskLevel: 'low',
  },

  // chain-004: Auth gateway refactor — fully traceable, low risk
  {
    id: 'chain-004',
    requirement: {
      id: 'feat-004',
      title: 'Auth gateway token refresh refactor',
      source: 'jira',
      acceptanceCriteria: [
        'Silent token refresh triggered 60 seconds before expiry',
        'Concurrent refresh requests are de-duplicated',
        'Refresh failure logs structured error to Splunk',
      ],
      riskScore: 0.29,
      status: 'done',
    },
    pullRequests: [
      {
        id: 'PR-1215',
        title: 'refactor(auth-gateway): silent token refresh de-duplication',
        riskScore: 0.27,
        filesChanged: 11,
        status: 'merged',
        linkedToRequirement: true,
        coverageOfAcceptanceCriteria: 1.0,
      },
    ],
    testCoverage: {
      totalTests: 6,
      passingTests: 6,
      coveragePercentage: 94,
      missingScenarios: [],
      status: 'full',
    },
    deployment: {
      releaseId: 'rel-v3.0.0',
      releaseName: 'v3.0.0 — KYC & Auth Gateway Overhaul',
      deployedAt: '2025-12-10T09:00:00Z',
      environment: 'production',
      status: 'deployed',
    },
    chainCompleteness: 1.0,
    gaps: [],
    riskLevel: 'low',
  },

  // chain-005: No requirement linked — orphan PR, high risk
  {
    id: 'chain-005',
    requirement: null,
    pullRequests: [
      {
        id: 'PR-1220',
        title: 'fix(payment-service): hotfix — null pointer in discount validator',
        riskScore: 0.62,
        filesChanged: 5,
        status: 'merged',
        linkedToRequirement: false,
        coverageOfAcceptanceCriteria: 0,
      },
    ],
    testCoverage: {
      totalTests: 4,
      passingTests: 4,
      coveragePercentage: 61,
      missingScenarios: [
        'No acceptance criteria to verify against — orphan PR',
      ],
      status: 'partial',
    },
    deployment: {
      releaseId: 'rel-v2.4.1',
      releaseName: 'v2.4.1 — Payment Service Enhancements',
      deployedAt: '2025-11-20T14:00:00Z',
      environment: 'production',
      status: 'deployed',
    },
    chainCompleteness: 0.4,
    gaps: [
      {
        type: 'no_requirement',
        severity: 'high',
        description: 'PR merged without linked requirement. Compliance risk.',
        recommendation:
          'Retroactively link PR-1220 to a JIRA story or create a new requirement record to satisfy audit trail obligations.',
        affectedEntity: {
          layer: 'Requirement',
          id: 'PR-1220',
          title: 'Hotfix — null pointer in discount validator',
        },
      },
    ],
    riskLevel: 'high',
  },

  // chain-006: No requirement + no tests — critical risk
  {
    id: 'chain-006',
    requirement: null,
    pullRequests: [
      {
        id: 'PR-1225',
        title: 'chore(portfolio-engine): bump dependency versions and update configs',
        riskScore: 0.71,
        filesChanged: 8,
        status: 'merged',
        linkedToRequirement: false,
        coverageOfAcceptanceCriteria: 0,
      },
    ],
    testCoverage: null,
    deployment: {
      releaseId: 'rel-v2.4.1',
      releaseName: 'v2.4.1 — Payment Service Enhancements',
      deployedAt: '2025-11-20T14:00:00Z',
      environment: 'production',
      status: 'deployed',
    },
    chainCompleteness: 0.2,
    gaps: [
      {
        type: 'no_requirement',
        severity: 'high',
        description: 'PR merged without linked requirement. Compliance risk.',
        recommendation:
          'Create a JIRA story capturing the intent of this dependency bump and link it retroactively to PR-1225.',
        affectedEntity: {
          layer: 'Requirement',
          id: 'PR-1225',
          title: 'Dependency version bump — portfolio-engine',
        },
      },
      {
        type: 'no_tests',
        severity: 'critical',
        description: 'No test coverage for production code change.',
        recommendation:
          'Add regression tests covering dependency surface area — particularly serialization and API contract behaviour.',
        affectedEntity: {
          layer: 'Test Coverage',
          id: 'PR-1225',
          title: 'Dependency version bump — portfolio-engine (no tests)',
        },
      },
    ],
    riskLevel: 'critical',
  },

  // chain-007: No requirement, tests pass, legacy release — high risk
  {
    id: 'chain-007',
    requirement: null,
    pullRequests: [
      {
        id: 'PR-1230',
        title: 'perf(kyc-service): optimize document OCR pre-processing pipeline',
        riskScore: 0.58,
        filesChanged: 7,
        status: 'merged',
        linkedToRequirement: false,
        coverageOfAcceptanceCriteria: 0,
      },
    ],
    testCoverage: {
      totalTests: 3,
      passingTests: 3,
      coveragePercentage: 55,
      missingScenarios: [
        'No acceptance criteria to validate against — requirement traceability missing',
      ],
      status: 'partial',
    },
    deployment: {
      releaseId: 'rel-v1.8.2',
      releaseName: 'v1.8.2 — Legacy KYC Pipeline Patch',
      deployedAt: '2025-08-14T10:30:00Z',
      environment: 'production',
      status: 'deployed',
    },
    chainCompleteness: 0.4,
    gaps: [
      {
        type: 'no_requirement',
        severity: 'high',
        description: 'PR merged without linked requirement. Compliance risk.',
        recommendation:
          'Backfill a performance requirement story in JIRA and link PR-1230 to establish an audit-compliant traceability record.',
        affectedEntity: {
          layer: 'Requirement',
          id: 'PR-1230',
          title: 'KYC OCR pre-processing optimisation',
        },
      },
    ],
    riskLevel: 'high',
  },

  // chain-008: Requirement exists, no tests, pending deploy — critical
  {
    id: 'chain-008',
    requirement: {
      id: 'feat-005',
      title: 'Adaptive rate limiter for payment-service API',
      source: 'jira',
      acceptanceCriteria: [
        'Rate limit thresholds configurable per client tier',
        'Throttled requests return HTTP 429 with Retry-After header',
        'Rate limit events emitted to monitoring pipeline',
      ],
      riskScore: 0.72,
      status: 'in_progress',
    },
    pullRequests: [
      {
        id: 'PR-1235',
        title: 'feat(payment-service): adaptive rate limiter implementation',
        riskScore: 0.68,
        filesChanged: 19,
        status: 'merged',
        linkedToRequirement: true,
        coverageOfAcceptanceCriteria: 0.33,
      },
    ],
    testCoverage: null,
    deployment: null,
    chainCompleteness: 0.3,
    gaps: [
      {
        type: 'no_tests',
        severity: 'critical',
        description: 'Requirement has no test coverage.',
        recommendation:
          'Write unit and integration tests covering all three acceptance criteria before scheduling this change for production deployment.',
        affectedEntity: {
          layer: 'Test Coverage',
          id: 'feat-005',
          title: 'Adaptive rate limiter — no test suite',
        },
      },
    ],
    riskLevel: 'critical',
  },

  // chain-009: Requirement exists, no tests, not deployed — critical
  {
    id: 'chain-009',
    requirement: {
      id: 'feat-006',
      title: 'Immutable audit logging for compliance events',
      source: 'jira',
      acceptanceCriteria: [
        'All compliance events written to append-only log store',
        'Log entries include actor, timestamp, and event hash',
        'Export API returns logs in GDPR-compliant redacted format',
      ],
      riskScore: 0.81,
      status: 'in_progress',
    },
    pullRequests: [
      {
        id: 'PR-1240',
        title: 'feat(audit-logging): immutable event log writer and export API',
        riskScore: 0.77,
        filesChanged: 26,
        status: 'merged',
        linkedToRequirement: true,
        coverageOfAcceptanceCriteria: 0.33,
      },
    ],
    testCoverage: null,
    deployment: null,
    chainCompleteness: 0.25,
    gaps: [
      {
        type: 'no_tests',
        severity: 'critical',
        description: 'Requirement has no test coverage.',
        recommendation:
          'Add integration tests validating append-only behaviour, log entry schema, and GDPR-redacted export output before any staging deployment.',
        affectedEntity: {
          layer: 'Test Coverage',
          id: 'feat-006',
          title: 'Audit logging — no test suite',
        },
      },
    ],
    riskLevel: 'critical',
  },

  // chain-010: Requirement + tests pass, but pre-deploy review was skipped — high risk
  {
    id: 'chain-010',
    requirement: {
      id: 'feat-007',
      title: 'Distributed cache layer for portfolio-engine read path',
      source: 'jira',
      acceptanceCriteria: [
        'Cache hit rate above 85% under normal load',
        'Stale data TTL configurable per entity type',
        'Cache bypass header honoured for real-time reads',
      ],
      riskScore: 0.61,
      status: 'done',
    },
    pullRequests: [
      {
        id: 'PR-1245',
        title: 'feat(portfolio-engine): Redis cache layer for read path optimisation',
        riskScore: 0.59,
        filesChanged: 21,
        status: 'merged',
        linkedToRequirement: true,
        coverageOfAcceptanceCriteria: 0.67,
      },
    ],
    testCoverage: {
      totalTests: 5,
      passingTests: 5,
      coveragePercentage: 72,
      missingScenarios: [
        'Cache bypass header not covered under concurrent load conditions',
      ],
      status: 'partial',
    },
    deployment: {
      releaseId: 'rel-v1.8.2',
      releaseName: 'v1.8.2 — Legacy KYC Pipeline Patch',
      deployedAt: '2025-08-14T10:30:00Z',
      environment: 'production',
      status: 'deployed',
    },
    chainCompleteness: 0.6,
    gaps: [
      {
        type: 'no_review',
        severity: 'high',
        description: 'Pre-deployment test verification was skipped.',
        recommendation:
          'Enforce pre-deployment gate in the release pipeline to require a green test run report before tagging any production release.',
        affectedEntity: {
          layer: 'Deployment',
          id: 'rel-v1.8.2',
          title: 'v1.8.2 — cache layer shipped without pre-deploy test sign-off',
        },
      },
    ],
    riskLevel: 'high',
  },
];

// ---------------------------------------------------------------------------
// Derived exports
// ---------------------------------------------------------------------------

export function getTraceabilityGaps(): TraceabilityGap[] {
  const severityOrder: Record<TraceabilityGap['severity'], number> = {
    critical: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  return traceabilityChains
    .flatMap((chain) => chain.gaps)
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
}

export function getTraceabilitySummary(): TraceabilitySummary {
  const total = traceabilityChains.length;

  const fullyTraceable = traceabilityChains.filter(
    (c) => c.chainCompleteness >= 0.99,
  ).length;

  const partiallyTraceable = traceabilityChains.filter(
    (c) => c.chainCompleteness >= 0.2 && c.chainCompleteness < 0.99,
  ).length;

  const untraceable = traceabilityChains.filter(
    (c) => c.chainCompleteness < 0.2,
  ).length;

  const overallHealth =
    traceabilityChains.reduce((sum, c) => sum + c.chainCompleteness, 0) / total;

  const allGaps = getTraceabilityGaps();
  const criticalGaps = allGaps.filter((g) => g.severity === 'critical');

  const gapDistribution = {
    noRequirement: allGaps.filter((g) => g.type === 'no_requirement').length,
    noTests: allGaps.filter((g) => g.type === 'no_tests').length,
    partialTests: allGaps.filter(
      (g) => g.type === 'partial_test_coverage' || g.type === 'untested_acceptance_criteria',
    ).length,
    noDeployment: allGaps.filter((g) => g.type === 'no_deployment').length,
  };

  return {
    totalChains: total,
    fullyTraceable,
    partiallyTraceable,
    untraceable,
    overallHealth: Math.round(overallHealth * 100) / 100,
    criticalGaps,
    gapDistribution,
  };
}
