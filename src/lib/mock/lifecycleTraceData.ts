// ── Lifecycle Trace Data ─────────────────────────────────────────────
// Mock data for the Lifecycle Trace Visualization.
// Shows the journey of an entity through all 6 SDLC layers with
// chronological events and feedback loop insights.

import { SDLCLayer } from '@/lib/entityRegistry';

export interface TraceNode {
  /** SDLC layer: L0-PLAN, L1-BUILD, etc. */
  layer: SDLCLayer;
  /** Entity ID: REQ-101, PR-4521, etc. */
  entityId: string;
  /** Human-readable entity label */
  entityLabel: string;
  /** Metric display: "Risk: 87", "Coverage: 92%", etc. */
  metric: string;
  /** Node status: active, resolved, or learning */
  status: 'active' | 'resolved' | 'learning';
  /** Section ID for navigation on click */
  sectionId: string;
}

export interface TraceEvent {
  /** Date label: "Mar 1", "Mar 15", etc. */
  date: string;
  /** ISO 8601 timestamp for sorting */
  timestamp: string;
  /** Event description */
  description: string;
  /** SDLC layer of this event */
  layer: SDLCLayer;
  /** AI technique used: "ML", "LLM+RAG", "NLP", etc. (optional) */
  technique?: string;
}

export interface LifecycleTrace {
  /** Service ID for lookup */
  serviceId: string;
  /** Service display name */
  serviceName: string;
  /** Trace title: the journey/feature name */
  title: string;
  /** Nodes: one per layer (6 total) */
  nodes: TraceNode[];
  /** Chronological events */
  events: TraceEvent[];
  /** Learning loop feedback points */
  feedbackLoopText: string[];
}

// ── Payment Service Trace: "Checkout Flow Journey" ────────────────

const paymentTrace: LifecycleTrace = {
  serviceId: 'svc-payment',
  serviceName: 'payment-service',
  title: 'Checkout Flow Journey',
  nodes: [
    {
      layer: 'L0-PLAN',
      entityId: 'REQ-101',
      entityLabel: 'Multi-currency checkout support',
      metric: 'Risk: 78',
      status: 'resolved',
      sectionId: 'plan-intelligence',
    },
    {
      layer: 'L1-BUILD',
      entityId: 'PR-4521',
      entityLabel: 'Gateway timeout optimization',
      metric: 'Coverage: 89%',
      status: 'active',
      sectionId: 'build-intelligence',
    },
    {
      layer: 'L2-TEST',
      entityId: 'TS-PAY-001',
      entityLabel: 'Payment flow end-to-end suite',
      metric: 'Pass Rate: 94%',
      status: 'resolved',
      sectionId: 'test-quality-intelligence',
    },
    {
      layer: 'L3-RELEASE',
      entityId: 'REL-2026-03',
      entityLabel: 'v3.2.1 production release',
      metric: 'Readiness: 91%',
      status: 'resolved',
      sectionId: 'release-intelligence',
    },
    {
      layer: 'L4-OPERATE',
      entityId: 'INC-2024-001',
      entityLabel: 'Checkout failure (premium users)',
      metric: 'Severity: Critical',
      status: 'resolved',
      sectionId: 'service-health-intelligence',
    },
    {
      layer: 'L5-LEARN',
      entityId: 'LEARN-001',
      entityLabel: 'Timeout pattern insights',
      metric: 'Confidence: 94%',
      status: 'learning',
      sectionId: 'learn-intelligence',
    },
  ],
  events: [
    {
      date: 'Mar 1',
      timestamp: '2026-03-01T08:00:00Z',
      description: 'Requirement REQ-101 created: multi-currency checkout support',
      layer: 'L0-PLAN',
      technique: 'NLP',
    },
    {
      date: 'Mar 2',
      timestamp: '2026-03-02T10:30:00Z',
      description: 'Risk assessment: payment timeout patterns identified in historical data',
      layer: 'L0-PLAN',
      technique: 'ML',
    },
    {
      date: 'Mar 4',
      timestamp: '2026-03-04T14:15:00Z',
      description: 'PR-4521 submitted: gateway timeout reduced from 30s to 5s',
      layer: 'L1-BUILD',
      technique: 'NLP',
    },
    {
      date: 'Mar 5',
      timestamp: '2026-03-05T09:00:00Z',
      description: 'Risk flagged: timeout change touches 12 files across payment-service',
      layer: 'L1-BUILD',
      technique: 'ML',
    },
    {
      date: 'Mar 6',
      timestamp: '2026-03-06T11:45:00Z',
      description: 'Test suite execution: TS-PAY-001 identifies gap in premium discount edge cases',
      layer: 'L2-TEST',
      technique: 'RAG',
    },
    {
      date: 'Mar 7',
      timestamp: '2026-03-07T16:20:00Z',
      description: 'Release readiness: v3.2.1 passes deployment checklist with 91% readiness',
      layer: 'L3-RELEASE',
      technique: 'ML',
    },
    {
      date: 'Mar 8',
      timestamp: '2026-03-08T02:30:00Z',
      description: 'INCIDENT: ~2,400 premium users unable to checkout due to cascading timeouts',
      layer: 'L4-OPERATE',
      technique: 'NLP',
    },
    {
      date: 'Mar 9',
      timestamp: '2026-03-09T13:00:00Z',
      description: 'Root cause analysis: timeout logic mismatch with downstream queue consumer',
      layer: 'L4-OPERATE',
      technique: 'LLM+RAG',
    },
    {
      date: 'Mar 10',
      timestamp: '2026-03-10T10:15:00Z',
      description: 'Learning: 3 similar timeout patterns found in 6-month history. Knowledge base updated.',
      layer: 'L5-LEARN',
      technique: 'RAG',
    },
  ],
  feedbackLoopText: [
    'Risk model updated: timeout patterns now weighted 2x in payment service scope',
    'Test strategy: premium discount flows added to critical path test suite',
    'Knowledge base: connection pool sizing guidelines documented for team reference',
  ],
};

// ── Portfolio Service Trace: "Notification Pipeline Journey" ──────

const portfolioTrace: LifecycleTrace = {
  serviceId: 'svc-portfolio',
  serviceName: 'portfolio-engine',
  title: 'Notification Pipeline Journey',
  nodes: [
    {
      layer: 'L0-PLAN',
      entityId: 'REQ-301',
      entityLabel: 'Real-time market alert notifications',
      metric: 'Risk: 64',
      status: 'resolved',
      sectionId: 'plan-intelligence',
    },
    {
      layer: 'L1-BUILD',
      entityId: 'PR-4522',
      entityLabel: 'Notification batch optimization',
      metric: 'Coverage: 85%',
      status: 'active',
      sectionId: 'build-intelligence',
    },
    {
      layer: 'L2-TEST',
      entityId: 'TS-PORT-001',
      entityLabel: 'Queue consumer integration tests',
      metric: 'Pass Rate: 97%',
      status: 'resolved',
      sectionId: 'test-quality-intelligence',
    },
    {
      layer: 'L3-RELEASE',
      entityId: 'REL-2026-02',
      entityLabel: 'v3.1.0 staged release',
      metric: 'Readiness: 88%',
      status: 'resolved',
      sectionId: 'release-intelligence',
    },
    {
      layer: 'L4-OPERATE',
      entityId: 'INC-PORT-001',
      entityLabel: 'Notification delivery lag spike',
      metric: 'Severity: High',
      status: 'resolved',
      sectionId: 'service-health-intelligence',
    },
    {
      layer: 'L5-LEARN',
      entityId: 'LEARN-002',
      entityLabel: 'Queue consumer lag patterns',
      metric: 'Confidence: 87%',
      status: 'learning',
      sectionId: 'learn-intelligence',
    },
  ],
  events: [
    {
      date: 'Feb 28',
      timestamp: '2026-02-28T09:00:00Z',
      description: 'Requirement REQ-301 analyzed: real-time alert system for portfolio changes',
      layer: 'L0-PLAN',
      technique: 'NLP',
    },
    {
      date: 'Mar 1',
      timestamp: '2026-03-01T14:30:00Z',
      description: 'PR-4522 created: batch size optimization for message queue',
      layer: 'L1-BUILD',
      technique: 'NLP',
    },
    {
      date: 'Mar 2',
      timestamp: '2026-03-02T10:00:00Z',
      description: 'Risk assessment: critical change to notification batching logic',
      layer: 'L1-BUILD',
      technique: 'ML',
    },
    {
      date: 'Mar 4',
      timestamp: '2026-03-04T15:45:00Z',
      description: 'Test execution: TS-PORT-001 validates queue consumer behavior',
      layer: 'L2-TEST',
      technique: 'RAG',
    },
    {
      date: 'Mar 5',
      timestamp: '2026-03-05T11:20:00Z',
      description: 'Release gate passed: v3.1.0 approved for production deployment',
      layer: 'L3-RELEASE',
      technique: 'ML',
    },
    {
      date: 'Mar 6',
      timestamp: '2026-03-06T03:15:00Z',
      description: 'Incident: schema migration caused notification consumer lag (12s → 45s)',
      layer: 'L4-OPERATE',
      technique: 'NLP',
    },
    {
      date: 'Mar 7',
      timestamp: '2026-03-07T09:30:00Z',
      description: 'Analysis: Kafka consumer offset tracking affected by schema change',
      layer: 'L4-OPERATE',
      technique: 'LLM+RAG',
    },
    {
      date: 'Mar 8',
      timestamp: '2026-03-08T13:00:00Z',
      description: 'Learning: schema migration patterns documented. Pre-check added to CI pipeline.',
      layer: 'L5-LEARN',
      technique: 'RAG',
    },
  ],
  feedbackLoopText: [
    'Queue consumer lag thresholds adjusted: baseline 8s, alert at 25s (was 15s)',
    'CI pipeline: schema migration pre-validation step added to release checks',
  ],
};

// ── Auth Service Trace: "MFA Token Validation Journey" ────────────

const authTrace: LifecycleTrace = {
  serviceId: 'svc-auth',
  serviceName: 'auth-gateway',
  title: 'MFA Token Validation Journey',
  nodes: [
    {
      layer: 'L0-PLAN',
      entityId: 'REQ-201',
      entityLabel: 'RBAC cache consistency improvements',
      metric: 'Risk: 52',
      status: 'resolved',
      sectionId: 'plan-intelligence',
    },
    {
      layer: 'L1-BUILD',
      entityId: 'PR-4523',
      entityLabel: 'MFA token validation refactor',
      metric: 'Coverage: 91%',
      status: 'active',
      sectionId: 'build-intelligence',
    },
    {
      layer: 'L2-TEST',
      entityId: 'TS-AUTH-001',
      entityLabel: 'RBAC and MFA integration tests',
      metric: 'Pass Rate: 98%',
      status: 'resolved',
      sectionId: 'test-quality-intelligence',
    },
    {
      layer: 'L3-RELEASE',
      entityId: 'REL-2026-04',
      entityLabel: 'v3.3.0 security release',
      metric: 'Readiness: 96%',
      status: 'resolved',
      sectionId: 'release-intelligence',
    },
    {
      layer: 'L4-OPERATE',
      entityId: 'NO-INC',
      entityLabel: 'No incidents detected',
      metric: 'Health: Stable',
      status: 'resolved',
      sectionId: 'service-health-intelligence',
    },
    {
      layer: 'L5-LEARN',
      entityId: 'LEARN-003',
      entityLabel: 'RBAC cache TTL best practices',
      metric: 'Confidence: 92%',
      status: 'learning',
      sectionId: 'learn-intelligence',
    },
  ],
  events: [
    {
      date: 'Feb 27',
      timestamp: '2026-02-27T10:00:00Z',
      description: 'Requirement REQ-201: improve RBAC cache consistency across services',
      layer: 'L0-PLAN',
      technique: 'NLP',
    },
    {
      date: 'Mar 1',
      timestamp: '2026-03-01T11:00:00Z',
      description: 'PR-4523 created: refactored MFA validation logic across 12 files',
      layer: 'L1-BUILD',
      technique: 'NLP',
    },
    {
      date: 'Mar 2',
      timestamp: '2026-03-02T14:15:00Z',
      description: 'Risk assessment: medium risk due to scope of changes in security-critical code',
      layer: 'L1-BUILD',
      technique: 'ML',
    },
    {
      date: 'Mar 4',
      timestamp: '2026-03-04T09:45:00Z',
      description: 'Test execution: TS-AUTH-001 validates RBAC behavior with MFA edge cases',
      layer: 'L2-TEST',
      technique: 'RAG',
    },
    {
      date: 'Mar 5',
      timestamp: '2026-03-05T16:30:00Z',
      description: 'Security review complete: v3.3.0 approved with high readiness score',
      layer: 'L3-RELEASE',
      technique: 'ML',
    },
    {
      date: 'Mar 9',
      timestamp: '2026-03-09T08:00:00Z',
      description: 'Post-deployment: zero authentication incidents in first 72 hours',
      layer: 'L4-OPERATE',
      technique: 'NLP',
    },
  ],
  feedbackLoopText: ['RBAC cache TTL best practices documented in platform runbook for all teams'],
};

// ── Trace Registry ──────────────────────────────────────────────────

export const lifecycleTraces: LifecycleTrace[] = [paymentTrace, portfolioTrace, authTrace];

/**
 * Get a lifecycle trace for a service by ID.
 * @param serviceId - Service ID (e.g., 'svc-payment')
 * @returns The trace, or undefined if not found
 */
export function getTraceForService(serviceId: string): LifecycleTrace | undefined {
  return lifecycleTraces.find(t => t.serviceId === serviceId);
}

/**
 * Get all lifecycle traces.
 * @returns Array of all traces
 */
export function getAllTraces(): LifecycleTrace[] {
  return lifecycleTraces;
}
