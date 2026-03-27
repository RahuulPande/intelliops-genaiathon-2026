// ============================================================================
// IntelliOps AI — Activity Feed Mock Data
// Real-time activity events across all 6 SDLC layers with timestamps and navigation
// ============================================================================

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type:
    | 'pr_analyzed'
    | 'incident_detected'
    | 'risk_updated'
    | 'learning_generated'
    | 'test_completed'
    | 'release_assessed'
    | 'requirement_flagged'
    | 'model_retrained';
  layer: 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  entityId: string;
  entityType: string;
  service: string;
  read: boolean;
  actionable: boolean;
  targetSection?: string; // section ID for navigation
}

// Helper function to calculate timestamps (hours ago from now)
function hoursAgo(hours: number): string {
  const date = new Date();
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

// L0 — Plan Intelligence Events (requirement_flagged)
const l0Events: ActivityEvent[] = [
  {
    id: 'evt-l0-001',
    timestamp: hoursAgo(23.5),
    type: 'requirement_flagged',
    layer: 'L0',
    title: 'High-Risk Requirement Detected',
    description:
      'REQ-101 "Multi-currency support" flagged with 3 critical gaps in schema definition',
    severity: 'critical',
    entityId: 'REQ-101',
    entityType: 'requirement',
    service: 'payment-service',
    read: false,
    actionable: true,
    targetSection: 'plan-intelligence',
  },
  {
    id: 'evt-l0-002',
    timestamp: hoursAgo(18.2),
    type: 'requirement_flagged',
    layer: 'L0',
    title: 'Duplicate Requirement Found',
    description:
      'REQ-201 shares 89% similarity with existing REQ-150 — consolidation recommended',
    severity: 'warning',
    entityId: 'REQ-201',
    entityType: 'requirement',
    service: 'portfolio-engine',
    read: true,
    actionable: true,
    targetSection: 'plan-intelligence',
  },
  {
    id: 'evt-l0-003',
    timestamp: hoursAgo(5.7),
    type: 'requirement_flagged',
    layer: 'L0',
    title: 'Test Strategy Generated',
    description:
      'Automated test strategy created for REQ-301: 12 test cases (3 P0, 5 P1, 4 P2)',
    severity: 'info',
    entityId: 'REQ-301',
    entityType: 'requirement',
    service: 'kyc-service',
    read: false,
    actionable: true,
    targetSection: 'plan-intelligence',
  },
];

// L1 — Build Intelligence Events (pr_analyzed)
const l1Events: ActivityEvent[] = [
  {
    id: 'evt-l1-001',
    timestamp: hoursAgo(22.1),
    type: 'pr_analyzed',
    layer: 'L1',
    title: 'PR Analysis Complete',
    description:
      'PR-4521 "Add payment retry logic" analyzed: 847 lines changed, complexity: Medium, risk score: 0.62',
    severity: 'warning',
    entityId: 'PR-4521',
    entityType: 'pull_request',
    service: 'payment-service',
    read: false,
    actionable: true,
    targetSection: 'build-intelligence',
  },
  {
    id: 'evt-l1-002',
    timestamp: hoursAgo(14.5),
    type: 'pr_analyzed',
    layer: 'L1',
    title: 'Low-Risk Merge Approved',
    description:
      'PR-4522 "Update auth docs" merged. Risk score: 0.18, coverage impact: +2.3%',
    severity: 'info',
    entityId: 'PR-4522',
    entityType: 'pull_request',
    service: 'auth-gateway',
    read: true,
    actionable: false,
    targetSection: 'build-intelligence',
  },
  {
    id: 'evt-l1-003',
    timestamp: hoursAgo(3.4),
    type: 'pr_analyzed',
    layer: 'L1',
    title: 'High-Risk PR Detected',
    description:
      'PR-4523 "Refactor core ledger logic" needs attention: 12 critical files touched, 0.78 risk score',
    severity: 'critical',
    entityId: 'PR-4523',
    entityType: 'pull_request',
    service: 'ledger-engine',
    read: false,
    actionable: true,
    targetSection: 'build-intelligence',
  },
];

// L2 — Test Intelligence Events (test_completed)
const l2Events: ActivityEvent[] = [
  {
    id: 'evt-l2-001',
    timestamp: hoursAgo(21.3),
    type: 'test_completed',
    layer: 'L2',
    title: 'Integration Tests Passed',
    description: 'Test suite TS-PAY-001: 247 tests passed, 0 failed, 94.3% coverage',
    severity: 'info',
    entityId: 'TS-PAY-001',
    entityType: 'test_suite',
    service: 'payment-service',
    read: false,
    actionable: false,
    targetSection: 'test-quality-intelligence',
  },
  {
    id: 'evt-l2-002',
    timestamp: hoursAgo(12.8),
    type: 'test_completed',
    layer: 'L2',
    title: 'Load Test Failed',
    description:
      'Test suite TS-PORT-001: Failed under 500 concurrent users (p95 latency: 8.2s, timeout rate: 12%)',
    severity: 'critical',
    entityId: 'TS-PORT-001',
    entityType: 'test_suite',
    service: 'portfolio-engine',
    read: true,
    actionable: true,
    targetSection: 'test-quality-intelligence',
  },
  {
    id: 'evt-l2-003',
    timestamp: hoursAgo(2.6),
    type: 'test_completed',
    layer: 'L2',
    title: 'Security Scan Complete',
    description:
      'Test suite TS-KYC-001: OWASP scan passed, 3 low-severity issues noted for review',
    severity: 'warning',
    entityId: 'TS-KYC-001',
    entityType: 'test_suite',
    service: 'kyc-service',
    read: false,
    actionable: true,
    targetSection: 'test-quality-intelligence',
  },
];

// L3 — Release Intelligence Events (release_assessed, risk_updated)
const l3Events: ActivityEvent[] = [
  {
    id: 'evt-l3-001',
    timestamp: hoursAgo(20.5),
    type: 'release_assessed',
    layer: 'L3',
    title: 'Release Readiness: GO',
    description:
      'v3.4.1 assessed: All gates passed, deployment authorized for 2pm UTC',
    severity: 'info',
    entityId: 'rel-v3.4.1',
    entityType: 'release',
    service: 'platform',
    read: false,
    actionable: true,
    targetSection: 'release-intelligence',
  },
  {
    id: 'evt-l3-002',
    timestamp: hoursAgo(11.2),
    type: 'risk_updated',
    layer: 'L3',
    title: 'Deployment Risk Alert',
    description:
      'v3.3.9: Risk score increased from 0.34 to 0.71 due to unresolved load test failures',
    severity: 'critical',
    entityId: 'rel-v3.3.9',
    entityType: 'release',
    service: 'platform',
    read: true,
    actionable: true,
    targetSection: 'release-intelligence',
  },
  {
    id: 'evt-l3-003',
    timestamp: hoursAgo(1.9),
    type: 'release_assessed',
    layer: 'L3',
    title: 'Hotfix Approved',
    description:
      'v3.4.0-hf1 expedited release approved: Payment service edge case fix (1 commit, verified by lead)',
    severity: 'warning',
    entityId: 'rel-v3.4.0-hf1',
    entityType: 'release',
    service: 'payment-service',
    read: false,
    actionable: false,
    targetSection: 'release-intelligence',
  },
];

// L4 — Operate Intelligence Events (incident_detected)
const l4Events: ActivityEvent[] = [
  {
    id: 'evt-l4-001',
    timestamp: hoursAgo(19.7),
    type: 'incident_detected',
    layer: 'L4',
    title: 'Elevated Error Rate Detected',
    description:
      'INC-2024-001: Payment service errors spiked to 2.3% (baseline 0.1%) — correlation: PR-4521',
    severity: 'critical',
    entityId: 'INC-2024-001',
    entityType: 'incident',
    service: 'payment-service',
    read: false,
    actionable: true,
    targetSection: 'service-health-intelligence',
  },
  {
    id: 'evt-l4-002',
    timestamp: hoursAgo(9.4),
    type: 'incident_detected',
    layer: 'L4',
    title: 'Degraded Response Times',
    description:
      'INC-2024-002: Portfolio engine p99 latency 4.2s (SLA: 1.5s) — root cause: unindexed query on ledger_transactions',
    severity: 'warning',
    entityId: 'INC-2024-002',
    entityType: 'incident',
    service: 'portfolio-engine',
    read: false,
    actionable: true,
    targetSection: 'service-health-intelligence',
  },
  {
    id: 'evt-l4-003',
    timestamp: hoursAgo(0.5),
    type: 'incident_detected',
    layer: 'L4',
    title: 'Incident Resolved',
    description:
      'INC-2024-001 resolved: Rollback of PR-4521 completed, error rate normalized to 0.09%',
    severity: 'info',
    entityId: 'INC-2024-001',
    entityType: 'incident',
    service: 'payment-service',
    read: false,
    actionable: false,
    targetSection: 'service-health-intelligence',
  },
];

// L5 — Learn Intelligence Events (learning_generated, model_retrained)
const l5Events: ActivityEvent[] = [
  {
    id: 'evt-l5-001',
    timestamp: hoursAgo(17.8),
    type: 'learning_generated',
    layer: 'L5',
    title: 'Defect Pattern Identified',
    description:
      'New pattern: Payment retries cause race conditions in concurrent environments — added to knowledge base',
    severity: 'warning',
    entityId: 'LEARN-001',
    entityType: 'learning',
    service: 'payment-service',
    read: false,
    actionable: true,
    targetSection: 'learn-intelligence',
  },
  {
    id: 'evt-l5-002',
    timestamp: hoursAgo(8.3),
    type: 'model_retrained',
    layer: 'L5',
    title: 'Release Risk Model Updated',
    description:
      'ML model retrained on 18 months of release history: accuracy improved from 87.2% to 91.4%',
    severity: 'info',
    entityId: 'MODEL-001',
    entityType: 'model',
    service: 'platform',
    read: true,
    actionable: false,
    targetSection: 'learn-intelligence',
  },
  {
    id: 'evt-l5-003',
    timestamp: hoursAgo(0.1),
    type: 'learning_generated',
    layer: 'L5',
    title: 'Test Coverage Recommendation',
    description:
      'Analysis: Ledger refactors (PR-4523 class) require increased integration test depth — 15% coverage boost recommended',
    severity: 'info',
    entityId: 'LEARN-002',
    entityType: 'learning',
    service: 'ledger-engine',
    read: false,
    actionable: true,
    targetSection: 'learn-intelligence',
  },
];

// Combine all events
export const allActivityEvents: ActivityEvent[] = [
  ...l0Events,
  ...l1Events,
  ...l2Events,
  ...l3Events,
  ...l4Events,
  ...l5Events,
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getUnreadCount(): number {
  return allActivityEvents.filter((e) => !e.read).length;
}

export function getEventsByLayer(layer: string): ActivityEvent[] {
  return allActivityEvents.filter((e) => e.layer === layer);
}

export function getEventsBySeverity(severity: string): ActivityEvent[] {
  return allActivityEvents.filter((e) => e.severity === severity);
}

export function getRecentEvents(count: number = 5): ActivityEvent[] {
  return allActivityEvents.slice(0, count);
}

export function markEventAsRead(eventId: string): ActivityEvent | null {
  const event = allActivityEvents.find((e) => e.id === eventId);
  if (event) {
    event.read = true;
    return event;
  }
  return null;
}

export function markAllEventsAsRead(): void {
  allActivityEvents.forEach((e) => {
    e.read = true;
  });
}

export function getEventsBySectionId(sectionId: string): ActivityEvent[] {
  return allActivityEvents.filter((e) => e.targetSection === sectionId);
}
