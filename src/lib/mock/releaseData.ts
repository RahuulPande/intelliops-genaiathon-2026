// ============================================================================
// IntelliOps AI — Release Intelligence Mock Data (L3 RELEASE)
// Structured dataset powering the interactive release explorer experience
// ============================================================================

export interface PreDeploymentCheck {
  name: string;
  status: 'passed' | 'failed' | 'pending';
  detail: string;
}

export interface ChangeMetrics {
  additions: number;
  deletions: number;
  files: number;
}

export interface Release {
  id: string;
  name: string;
  version: string;
  status: 'deployed' | 'in-progress' | 'planned' | 'rolled-back';
  deploymentDate: string;
  services: string[];
  includedPRs: string[];
  riskScore: number;
  deploymentStrategy: 'canary' | 'blue-green' | 'rolling' | 'direct';
  aiRecommendation: string;
  rollbackPlan: string;
  branchConflicts: number;
  testsPassed: number;
  testsFailed: number;
  changeSize: ChangeMetrics;
  preDeployChecks: PreDeploymentCheck[];
}

export const releases: Release[] = [
  {
    id: 'rel-2026-03',
    name: 'March 2026 Release — Payment Enhancements',
    version: 'v3.5.0',
    status: 'deployed',
    deploymentDate: '2026-03-20T14:30:00Z',
    services: ['payment-service', 'auth-gateway'],
    includedPRs: ['PR-4521'],
    riskScore: 72,
    deploymentStrategy: 'canary',
    aiRecommendation:
      'Canary deployment recommended due to payment service coupling. Gradual rollout to 5% → 25% → 50% → 100% user traffic over 4 hours. Monitor transaction error rates and latency metrics during each phase.',
    rollbackPlan:
      'Automated rollback triggered if error rate exceeds 2% or latency >500ms. Manual override available. Payment service retains 5-minute transaction replay buffer.',
    branchConflicts: 2,
    testsPassed: 487,
    testsFailed: 3,
    changeSize: { additions: 3421, deletions: 1856, files: 45 },
    preDeployChecks: [
      {
        name: 'Unit Tests',
        status: 'passed',
        detail: 'All 487 unit tests passed. 92% code coverage achieved.',
      },
      {
        name: 'Integration Tests',
        status: 'passed',
        detail: 'Payment + auth gateway integration suite completed successfully.',
      },
      {
        name: 'Security Scan',
        status: 'passed',
        detail: 'OWASP scanning complete. No critical vulnerabilities detected.',
      },
      {
        name: 'Performance Benchmark',
        status: 'passed',
        detail: 'Latency baseline: 180ms avg. Within SLA targets.',
      },
      {
        name: 'Code Review',
        status: 'passed',
        detail: '3 reviewers approved. 2 branch conflicts resolved.',
      },
      {
        name: 'Deployment Readiness',
        status: 'passed',
        detail: 'Canary rollout infrastructure validated. Monitoring dashboards ready.',
      },
    ],
  },
  {
    id: 'rel-2026-02',
    name: 'February 2026 Hotfix — KYC Fix',
    version: 'v3.4.2',
    status: 'rolled-back',
    deploymentDate: '2026-02-18T10:15:00Z',
    services: ['kyc-service'],
    includedPRs: ['PR-4523'],
    riskScore: 85,
    deploymentStrategy: 'direct',
    aiRecommendation:
      'CRITICAL: Direct rollout deployed without canary phase. KYC verification workflow blocking 12% of new user onboarding. Recommend canary for all future hotfixes.',
    rollbackPlan:
      'Rollback executed 47 minutes after deployment. RBAC cache corruption detected affecting session validation across secondary instances. Root cause: cache key format mismatch in v3.4.2.',
    branchConflicts: 4,
    testsPassed: 128,
    testsFailed: 8,
    changeSize: { additions: 512, deletions: 287, files: 18 },
    preDeployChecks: [
      {
        name: 'Unit Tests',
        status: 'passed',
        detail: '128 unit tests passed. RBAC cache tests marked as "skipped" in CI.',
      },
      {
        name: 'Integration Tests',
        status: 'failed',
        detail: 'KYC + RBAC integration test failed in local environment. Passed in CI (env mismatch).',
      },
      {
        name: 'Security Scan',
        status: 'passed',
        detail: 'Static analysis passed but RBAC session handling not covered.',
      },
      {
        name: 'Performance Benchmark',
        status: 'passed',
        detail: 'Local benchmark passed. Production cache contention not detected.',
      },
      {
        name: 'Code Review',
        status: 'pending',
        detail: '1 approval, 3 requested changes not addressed. Merged despite feedback.',
      },
      {
        name: 'Deployment Readiness',
        status: 'failed',
        detail: 'Rollback plan incomplete. Cache coherency validation skipped.',
      },
    ],
  },
  {
    id: 'rel-2026-04',
    name: 'April 2026 Release — Portfolio Updates',
    version: 'v3.6.0',
    status: 'planned',
    deploymentDate: '2026-04-05T09:00:00Z',
    services: ['portfolio-engine', 'notification-service'],
    includedPRs: ['PR-4522'],
    riskScore: 45,
    deploymentStrategy: 'blue-green',
    aiRecommendation:
      'Blue-green deployment suitable for portfolio engine changes. Low risk profile (45/100) supports standard traffic switch. Recommend 30-minute validation window on green environment before cutover.',
    rollbackPlan:
      'Traffic switch reversed within 2 minutes if anomalies detected. Portfolio calculation consistency verified before cutover. Notification queue backed up to S3 for zero message loss.',
    branchConflicts: 0,
    testsPassed: 612,
    testsFailed: 1,
    changeSize: { additions: 2847, deletions: 1023, files: 38 },
    preDeployChecks: [
      {
        name: 'Unit Tests',
        status: 'passed',
        detail: '612 unit tests passed. 95% code coverage. 1 flaky test in notification retry logic.',
      },
      {
        name: 'Integration Tests',
        status: 'passed',
        detail: 'Portfolio calculation + notification dispatch integration validated.',
      },
      {
        name: 'Security Scan',
        status: 'passed',
        detail: 'OWASP scanning complete. No vulnerabilities. Notification payload encryption verified.',
      },
      {
        name: 'Performance Benchmark',
        status: 'passed',
        detail: 'Portfolio calc latency: 240ms avg (baseline 220ms). Within tolerance.',
      },
      {
        name: 'Code Review',
        status: 'passed',
        detail: '4 approvals. All feedback addressed. 0 branch conflicts.',
      },
      {
        name: 'Deployment Readiness',
        status: 'pending',
        detail: 'Blue-green infrastructure provisioning in progress. Estimated ready 2026-04-02.',
      },
    ],
  },
];

export function getReleaseById(id: string): Release | undefined {
  return releases.find((r) => r.id === id);
}
