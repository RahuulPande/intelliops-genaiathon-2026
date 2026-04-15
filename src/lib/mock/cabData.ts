// ============================================================================
// IntelliOps AI — CAB Intelligence Mock Data
// Structured dataset powering the Change Advisory Board submission packages
// ============================================================================

import type { CABSubmissionPackage } from '@/lib/types/cabIntelligence';

export const cabPackages: CABSubmissionPackage[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // Package 1: Payment Service Release — Medium Risk, Approve
  // Matches rel-2026-03 from releaseData.ts
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'cab-2026-03',
    releaseId: 'rel-2026-03',
    releaseName: 'March 2026 Release — Payment Enhancements',
    generatedAt: '2026-03-18T10:00:00Z',
    generatedBy: 'IntelliOps CAB Automation',

    releaseOverview: {
      targetEnvironment: 'production',
      scheduledDate: '2026-03-20T14:30:00Z',
      rollbackPlan:
        'Automated rollback triggered if error rate exceeds 2% or latency >500ms. Payment service retains 5-minute transaction replay buffer.',
      changeType: 'normal',
      overallRiskScore: 58,
      overallRiskRating: 'medium',
      recommendation: 'approve',
    },

    changes: [
      {
        prId: 'PR-4521',
        title: 'Refactor payment gateway integration layer',
        author: 'Arjun Mehta',
        riskScore: 72,
        riskCategory: 'Core Payment Flow',
        filesChanged: 18,
        linesAdded: 1240,
        linesRemoved: 890,
        aiSummary:
          'Refactors the payment gateway abstraction layer to decouple vendor-specific logic from core transaction processing. Introduces retry-with-backoff strategy for transient failures, reducing error rate by an estimated 18%.',
        reviewStatus: 'approved',
        testsCovering: 142,
        testsPassRate: 0.98,
      },
      {
        prId: 'PR-4534',
        title: 'Update discount engine promotional logic',
        author: 'Priya Nair',
        riskScore: 55,
        riskCategory: 'Business Logic',
        filesChanged: 9,
        linesAdded: 520,
        linesRemoved: 310,
        aiSummary:
          'Extends the discount engine to support tiered promotional rules with temporal constraints. Changes are isolated to the discount calculation module with no direct payment pipeline dependencies.',
        reviewStatus: 'approved',
        testsCovering: 68,
        testsPassRate: 0.96,
      },
      {
        prId: 'PR-4538',
        title: 'Improve structured logging across payment service',
        author: 'Kenji Watanabe',
        riskScore: 18,
        riskCategory: 'Observability',
        filesChanged: 12,
        linesAdded: 340,
        linesRemoved: 200,
        aiSummary:
          'Standardises log output to JSON structured format and adds correlation ID propagation across payment service spans. Low-risk change with significant benefit for incident triage and audit trail completeness.',
        reviewStatus: 'approved',
        testsCovering: 24,
        testsPassRate: 1.0,
      },
      {
        prId: 'PR-4541',
        title: 'Bump dependency versions — payment-service',
        author: 'Yuki Tanaka',
        riskScore: 22,
        riskCategory: 'Dependencies',
        filesChanged: 3,
        linesAdded: 45,
        linesRemoved: 45,
        aiSummary:
          'Routine dependency update bumping axios from 1.6.2 to 1.7.4 and jest from 29.5 to 29.7. No breaking API changes detected; all existing tests pass against updated versions.',
        reviewStatus: 'approved',
        testsCovering: 11,
        testsPassRate: 1.0,
      },
    ],

    testEvidence: {
      totalTests: 245,
      passed: 240,
      failed: 3,
      skipped: 2,
      coveragePercentage: 87,
      criticalPathsTested: true,
      regressionSuiteRun: true,
      performanceTestsRun: false,
      lastRunTimestamp: '2026-03-18T08:45:00Z',
    },

    riskAssessment: {
      aggregateRiskScore: 58,
      highRiskChanges: 1,
      securityImpactChanges: 0,
      databaseChanges: false,
      infrastructureChanges: false,
      regulatoryImpact: {
        affectsRegulatedFlow: true,
        affectedRegulations: ['PCI-DSS'],
        complianceReviewRequired: false,
      },
      rollbackComplexity: 'simple',
      estimatedDowntime: '0 minutes (canary deployment)',
      blastRadius: 'medium',
    },

    aiRecommendation: {
      decision: 'approve',
      confidence: 0.88,
      reasoning:
        'The release presents a medium aggregate risk score of 58. The highest-risk change (PR-4521, gateway refactor) is well-tested with 98% pass rate across 142 covering tests and has been approved by three reviewers. PCI-DSS impact is limited to logging and retry behaviour with no cardholder data scope changes. Three minor test failures are isolated to edge-case promotional discount scenarios and do not affect the critical payment path. Canary deployment strategy further mitigates blast radius.',
      conditions: [],
      risks: [
        '3 failing tests in discount engine edge cases — monitor promotional transaction error rate post-deploy',
        'Performance tests not executed — watch p99 latency during canary phase',
        'PCI-DSS audit log coverage should be verified after logging changes are live',
      ],
    },

    approvals: [
      {
        role: 'Engineering Lead',
        status: 'approved',
        approvedBy: 'Arjun Mehta',
        approvedAt: '2026-03-18T11:30:00Z',
        comments: 'All technical concerns addressed. Gateway refactor is well-scoped.',
      },
      {
        role: 'QA Lead',
        status: 'approved',
        approvedBy: 'Fatima Al-Hassan',
        approvedAt: '2026-03-18T13:15:00Z',
        comments: 'Regression suite passed. 3 known failures are non-blocking edge cases.',
      },
      {
        role: 'Security',
        status: 'pending',
        approvedBy: null,
        approvedAt: null,
        comments: null,
      },
      {
        role: 'Release Manager',
        status: 'pending',
        approvedBy: null,
        approvedAt: null,
        comments: null,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Package 2: Portfolio Engine Release — High Risk, Conditional
  // Matches rel-2026-04 from releaseData.ts
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'cab-2026-04',
    releaseId: 'rel-2026-04',
    releaseName: 'April 2026 Release — Portfolio Updates',
    generatedAt: '2026-04-02T09:00:00Z',
    generatedBy: 'IntelliOps CAB Automation',

    releaseOverview: {
      targetEnvironment: 'production',
      scheduledDate: '2026-04-05T09:00:00Z',
      rollbackPlan:
        'Traffic switch reversed within 2 minutes. DB migration rollback script pre-validated in staging. Portfolio calculation consistency verified before blue-green cutover.',
      changeType: 'normal',
      overallRiskScore: 79,
      overallRiskRating: 'high',
      recommendation: 'conditional',
    },

    changes: [
      {
        prId: 'PR-4522',
        title: 'Portfolio calculation engine — algorithm rewrite',
        author: 'Hiroshi Yamamoto',
        riskScore: 85,
        riskCategory: 'Core Business Logic',
        filesChanged: 32,
        linesAdded: 1840,
        linesRemoved: 1120,
        aiSummary:
          'Rewrites the portfolio valuation engine to support real-time NAV calculation with sub-second latency targets. Introduces a new risk-weighted scoring model aligned with MiFID II best-execution reporting requirements.',
        reviewStatus: 'approved',
        testsCovering: 198,
        testsPassRate: 0.94,
      },
      {
        prId: 'PR-4556',
        title: 'Database schema migration — portfolio_positions table',
        author: 'Sanjay Krishnan',
        riskScore: 91,
        riskCategory: 'Database',
        filesChanged: 6,
        linesAdded: 320,
        linesRemoved: 80,
        aiSummary:
          'Adds three new indexed columns to portfolio_positions and migrates legacy instrument_type enum to a normalised reference table. Migration includes a zero-downtime dual-write strategy with a 72-hour cutover window.',
        reviewStatus: 'approved',
        testsCovering: 45,
        testsPassRate: 0.87,
      },
      {
        prId: 'PR-4558',
        title: 'Update authentication flow — portfolio service OAuth scopes',
        author: 'Elena Voronova',
        riskScore: 78,
        riskCategory: 'Authentication & Security',
        filesChanged: 14,
        linesAdded: 560,
        linesRemoved: 290,
        aiSummary:
          'Extends OAuth 2.0 scope definitions to include read:portfolio and write:portfolio fine-grained permissions. Changes affect token validation middleware shared with the auth-gateway, requiring coordinated deployment.',
        reviewStatus: 'changes_requested',
        testsCovering: 62,
        testsPassRate: 0.89,
      },
      {
        prId: 'PR-4562',
        title: 'API versioning — introduce v2 portfolio endpoints',
        author: 'Marcus Okonkwo',
        riskScore: 52,
        riskCategory: 'API Compatibility',
        filesChanged: 22,
        linesAdded: 890,
        linesRemoved: 120,
        aiSummary:
          'Introduces v2 API endpoints with backward-compatible response schemas while deprecating three v1 endpoints. Deprecation notices are surfaced via response headers with a 90-day sunset window.',
        reviewStatus: 'approved',
        testsCovering: 74,
        testsPassRate: 0.97,
      },
      {
        prId: 'PR-4565',
        title: 'Add FINMA regulatory reporting module',
        author: 'Lena Fischer',
        riskScore: 83,
        riskCategory: 'Regulatory Compliance',
        filesChanged: 19,
        linesAdded: 1100,
        linesRemoved: 45,
        aiSummary:
          'Implements automated generation of FINMA Circular 2023/1 compliant transaction reports with daily batch export to the regulatory data lake. Introduces new audit log retention policy of 10 years.',
        reviewStatus: 'approved',
        testsCovering: 88,
        testsPassRate: 0.92,
      },
      {
        prId: 'PR-4568',
        title: 'Infrastructure — add portfolio-engine horizontal pod autoscaling',
        author: 'Tomás García',
        riskScore: 68,
        riskCategory: 'Infrastructure',
        filesChanged: 8,
        linesAdded: 210,
        linesRemoved: 30,
        aiSummary:
          'Configures Kubernetes HPA for portfolio-engine pods with CPU and custom NAV calculation queue depth metrics. Minimum 3 replicas enforced during market hours to maintain SLA for real-time pricing.',
        reviewStatus: 'approved',
        testsCovering: 15,
        testsPassRate: 1.0,
      },
      {
        prId: 'PR-4571',
        title: 'Notification service — portfolio alert templates',
        author: 'Aisha Oduya',
        riskScore: 31,
        riskCategory: 'Notifications',
        filesChanged: 7,
        linesAdded: 280,
        linesRemoved: 95,
        aiSummary:
          'Adds portfolio rebalancing and threshold-breach notification templates for the notification-service. Changes are purely additive with no modification to existing notification dispatch logic.',
        reviewStatus: 'approved',
        testsCovering: 28,
        testsPassRate: 1.0,
      },
    ],

    testEvidence: {
      totalTests: 412,
      passed: 395,
      failed: 12,
      skipped: 5,
      coveragePercentage: 82,
      criticalPathsTested: true,
      regressionSuiteRun: true,
      performanceTestsRun: true,
      lastRunTimestamp: '2026-04-02T07:30:00Z',
    },

    riskAssessment: {
      aggregateRiskScore: 79,
      highRiskChanges: 3,
      securityImpactChanges: 2,
      databaseChanges: true,
      infrastructureChanges: true,
      regulatoryImpact: {
        affectsRegulatedFlow: true,
        affectedRegulations: ['FINMA Circular 2023/1', 'MiFID II'],
        complianceReviewRequired: true,
      },
      rollbackComplexity: 'complex',
      estimatedDowntime: '0 minutes (blue-green deployment)',
      blastRadius: 'high',
    },

    aiRecommendation: {
      decision: 'conditional',
      confidence: 0.74,
      reasoning:
        'The release carries a high aggregate risk score of 79 driven by three concurrent high-risk change vectors: a database schema migration (91), authentication scope changes with outstanding review requests (78), and a regulatory reporting module affecting FINMA Circular 2023/1 (83). Twelve test failures and incomplete performance validation for the portfolio calculation engine introduce uncertainty. Security team has flagged auth flow changes for additional review. Conditional approval is recommended pending resolution of the three blocking conditions.',
      conditions: [
        'Performance tests must pass for the portfolio calculation engine before cutover',
        'DB migration rollback script must be verified end-to-end in staging environment',
        'Security review of auth flow OAuth scope changes must be completed and approved',
      ],
      risks: [
        'DB migration dual-write window creates temporary consistency risk if cutover is delayed beyond 72 hours',
        'Auth scope changes share middleware with auth-gateway — coordinate deployment sequence carefully',
        'MiFID II best-execution reporting logic untested against edge-case instrument types',
        '12 failing tests in portfolio calculation regression suite require root cause investigation',
      ],
    },

    approvals: [
      {
        role: 'Engineering Lead',
        status: 'approved',
        approvedBy: 'Hiroshi Yamamoto',
        approvedAt: '2026-04-02T10:00:00Z',
        comments: 'Architecture reviewed. DB migration strategy is sound. Auth changes need security sign-off.',
      },
      {
        role: 'QA Lead',
        status: 'approved',
        approvedBy: 'Fatima Al-Hassan',
        approvedAt: '2026-04-02T11:45:00Z',
        comments: '12 test failures tracked in JIRA INTOPS-892. Performance suite must be re-run before go-live.',
      },
      {
        role: 'Security',
        status: 'rejected',
        approvedBy: 'Dmitri Volkov',
        approvedAt: '2026-04-02T14:20:00Z',
        comments:
          'Auth flow changes need additional review. OAuth scope expansion without updated token validation tests is not acceptable for a production release affecting regulated portfolio data.',
      },
      {
        role: 'Release Manager',
        status: 'pending',
        approvedBy: null,
        approvedAt: null,
        comments: null,
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // Package 3: KYC Service Release — Low Risk, Approve
  // Matches rel-2026-02 from releaseData.ts (using as a forward-looking fix)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'cab-2026-05',
    releaseId: 'rel-2026-02',
    releaseName: 'February 2026 Hotfix — KYC Fix',
    generatedAt: '2026-02-16T13:00:00Z',
    generatedBy: 'IntelliOps CAB Automation',

    releaseOverview: {
      targetEnvironment: 'production',
      scheduledDate: '2026-02-18T10:15:00Z',
      rollbackPlan:
        'Direct revert of KYC form validation and document upload changes. No database changes; rollback completes in under 5 minutes via standard deploy pipeline.',
      changeType: 'standard',
      overallRiskScore: 25,
      overallRiskRating: 'low',
      recommendation: 'approve',
    },

    changes: [
      {
        prId: 'PR-4523',
        title: 'Fix KYC form validation — address field edge cases',
        author: 'Sunita Reddy',
        riskScore: 28,
        riskCategory: 'Form Validation',
        filesChanged: 6,
        linesAdded: 215,
        linesRemoved: 140,
        aiSummary:
          'Corrects address field validation logic that incorrectly rejected valid international address formats containing non-ASCII characters. Fix addresses reported customer-facing onboarding failures affecting 340 users in APAC region.',
        reviewStatus: 'approved',
        testsCovering: 54,
        testsPassRate: 1.0,
      },
      {
        prId: 'PR-4527',
        title: 'Optimise document upload — presigned S3 URL strategy',
        author: 'Brendan Walsh',
        riskScore: 22,
        riskCategory: 'File Handling',
        filesChanged: 8,
        linesAdded: 185,
        linesRemoved: 112,
        aiSummary:
          'Replaces server-proxied document uploads with direct-to-S3 presigned URL strategy, reducing upload latency by 60% and eliminating a 5 MB file size restriction. Security model is equivalent; presigned URLs are scoped and time-limited.',
        reviewStatus: 'approved',
        testsCovering: 35,
        testsPassRate: 1.0,
      },
    ],

    testEvidence: {
      totalTests: 89,
      passed: 89,
      failed: 0,
      skipped: 0,
      coveragePercentage: 94,
      criticalPathsTested: true,
      regressionSuiteRun: true,
      performanceTestsRun: false,
      lastRunTimestamp: '2026-02-16T11:00:00Z',
    },

    riskAssessment: {
      aggregateRiskScore: 25,
      highRiskChanges: 0,
      securityImpactChanges: 0,
      databaseChanges: false,
      infrastructureChanges: false,
      regulatoryImpact: {
        affectsRegulatedFlow: false,
        affectedRegulations: [],
        complianceReviewRequired: false,
      },
      rollbackComplexity: 'simple',
      estimatedDowntime: '0 minutes (direct deploy with zero-downtime restart)',
      blastRadius: 'low',
    },

    aiRecommendation: {
      decision: 'approve',
      confidence: 0.96,
      reasoning:
        'Both changes are tightly scoped bug fixes with high test coverage (94%) and zero test failures. No database migrations, infrastructure changes, or regulated flow modifications are included. The document upload optimisation carries minimal security surface change — presigned URL scoping matches the existing server-proxy security model. All four approval roles have reviewed and approved without reservations.',
      conditions: [],
      risks: [
        'S3 presigned URL expiry window (15 minutes) should be monitored for large document uploads on slow connections',
      ],
    },

    approvals: [
      {
        role: 'Engineering Lead',
        status: 'approved',
        approvedBy: 'Marcus Okonkwo',
        approvedAt: '2026-02-16T14:00:00Z',
        comments: 'Clean fix. Well-tested. Good to go.',
      },
      {
        role: 'QA Lead',
        status: 'approved',
        approvedBy: 'Fatima Al-Hassan',
        approvedAt: '2026-02-16T14:30:00Z',
        comments: '100% pass rate. Full regression suite run. No concerns.',
      },
      {
        role: 'Security',
        status: 'approved',
        approvedBy: 'Dmitri Volkov',
        approvedAt: '2026-02-16T15:00:00Z',
        comments: 'Presigned URL approach reviewed. Time-limited and scope-restricted — acceptable.',
      },
      {
        role: 'Release Manager',
        status: 'approved',
        approvedBy: 'Clara Müller',
        approvedAt: '2026-02-16T15:45:00Z',
        comments: 'Deployment window confirmed. Change record raised in ITSM.',
      },
    ],
  },
];

export function getCABByReleaseId(id: string): CABSubmissionPackage | undefined {
  return cabPackages.find((p) => p.releaseId === id);
}
