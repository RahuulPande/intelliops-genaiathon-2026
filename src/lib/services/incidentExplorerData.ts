// ============================================================================
// IntelliOps AI — Incident Explorer Data Service (L2 Interactive)
// Multi-incident mock data for Development Mode interactive simulation
// ============================================================================

import type { IncidentAnalysis } from './incidentIntelligence';

export interface IncidentRecord {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  service: string;
  detectedAt: string;
  status: 'Investigating' | 'Identified' | 'Resolved';
  impactedUsers: string;
  analysis: IncidentAnalysis;
}

export const incidents: IncidentRecord[] = [
  {
    id: 'inc1',
    title: 'Checkout failure for premium users',
    severity: 'Critical',
    service: 'Payment Service',
    detectedAt: '2026-03-25T09:14:00Z',
    status: 'Identified',
    impactedUsers: '~2,400 premium-tier users',
    analysis: {
      rootCause:
        'Timeout misconfiguration introduced in Payment Service (PR #482) — the default gateway timeout was reduced from 30s to 5s during a latency optimization pass, causing cascading failures under peak load for premium-tier checkout flows.',
      contributingFactors: [
        'Increased peak load during promotional event without corresponding scaling adjustment',
        'Missing retry and fallback mechanism for payment gateway timeout errors',
        'Premium user checkout path has additional validation steps increasing response time',
      ],
      evidence: [
        { type: 'pr', label: 'PR #482', detail: 'Timeout configuration reduced from 30s → 5s in payment-service/config.yaml' },
        { type: 'slack', label: '#payments-team', detail: 'Engineer flagged potential risk of timeout change 2 days before deploy' },
        { type: 'historical', label: 'INC-2847 (Feb 2025)', detail: 'Similar timeout-related failure pattern detected under high load conditions' },
        { type: 'log', label: 'payment-service logs', detail: '1,247 timeout errors in 15-min window correlating with checkout failures' },
      ],
      riskPattern:
        'Timeout configuration changes in payment-critical paths show a recurring failure pattern under high load — 3 similar incidents in the past 6 months, all correlated with config changes deployed without load testing.',
      recommendation: [
        'Restore timeout threshold to 30s and implement graduated timeout strategy',
        'Add circuit breaker with retry logic for payment gateway calls',
        'Deploy latency monitoring alert for payment paths exceeding p95 thresholds',
        'Require load test validation for any config change in payment-critical services',
      ],
      learningFeedback: {
        summary: 'This incident pattern has been captured and will actively improve the platform intelligence:',
        improvements: [
          'Release risk prediction models updated — timeout config changes in payment services now flagged as high-risk',
          'Test coverage recommendations enhanced — automated load test requirement added for payment path changes',
          'Knowledge base enriched — new pattern entry linking config changes to cascading timeout failures',
        ],
      },
      confidence: 94.7,
      analysisTime: '2.3 seconds',
    },
  },
  {
    id: 'inc2',
    title: 'Payment latency spike',
    severity: 'High',
    service: 'Gateway API',
    detectedAt: '2026-03-24T16:42:00Z',
    status: 'Investigating',
    impactedUsers: '~8,100 transactions affected',
    analysis: {
      rootCause:
        'Database connection pool exhaustion in Gateway API — the max pool size was set to 50 but concurrent transaction volume exceeded 200 during peak hours, causing connection wait times to spike above 12s.',
      contributingFactors: [
        'Connection pool size not scaled after Q1 traffic growth (+35% MoM)',
        'Stale connections not being recycled due to missing idle timeout configuration',
        'Third-party payment processor response times increased by 40% without alerting',
      ],
      evidence: [
        { type: 'pr', label: 'PR #519', detail: 'DB pool config unchanged since initial deployment — max_connections: 50' },
        { type: 'slack', label: '#platform-ops', detail: 'SRE noticed elevated connection wait times 30 min before user reports' },
        { type: 'historical', label: 'INC-3012 (Jan 2026)', detail: 'Similar pool exhaustion during Black Friday with lower traffic threshold' },
        { type: 'log', label: 'gateway-api logs', detail: '3,892 connection timeout entries in 45-min window, p99 latency at 14.2s' },
      ],
      riskPattern:
        'Database connection pool sizing has been a recurring bottleneck — 2 incidents in the past 4 months linked to static pool configuration without auto-scaling.',
      recommendation: [
        'Increase DB connection pool to 200 and enable dynamic pool sizing based on traffic',
        'Add auto-scaling policy for connection pools triggered by queue depth metrics',
        'Implement connection health checks and idle timeout recycling (30s)',
        'Set up proactive alerting when pool utilization exceeds 70%',
      ],
      learningFeedback: {
        summary: 'This incident pattern has been captured and will actively improve the platform intelligence:',
        improvements: [
          'Release risk prediction updated — DB config changes without pool scaling now trigger risk warnings',
          'Test coverage enhanced — load simulation now includes connection pool stress testing',
          'Knowledge base enriched — new runbook entry for connection pool exhaustion diagnosis and remediation',
        ],
      },
      confidence: 91.2,
      analysisTime: '3.1 seconds',
    },
  },
  {
    id: 'inc3',
    title: 'Login timeout issue',
    severity: 'Medium',
    service: 'Auth Service',
    detectedAt: '2026-03-23T11:08:00Z',
    status: 'Resolved',
    impactedUsers: '~1,150 login attempts failed',
    analysis: {
      rootCause:
        'Token validation delay under load caused by synchronous JWT verification hitting an expired JWKS cache — the auth service was fetching keys from the identity provider on every request instead of using the cached set.',
      contributingFactors: [
        'JWKS cache TTL reduced from 1 hour to 5 minutes during a security patch without performance review',
        'Identity provider rate-limited key fetches after 100 req/min, causing queued validations',
        'No fallback mechanism when JWKS endpoint becomes slow or rate-limited',
      ],
      evidence: [
        { type: 'pr', label: 'PR #497', detail: 'Security patch reduced JWKS cache TTL from 3600s to 300s in auth-service/config.ts' },
        { type: 'slack', label: '#security-team', detail: 'Security lead approved TTL change but flagged need for performance testing' },
        { type: 'historical', label: 'INC-2901 (Mar 2025)', detail: 'Similar auth latency spike when IdP had planned maintenance window' },
        { type: 'log', label: 'auth-service logs', detail: '847 JWKS fetch timeouts in 20-min window, avg token validation time rose to 8.4s' },
      ],
      riskPattern:
        'Authentication service cache configuration changes have caused 2 incidents in 12 months — both related to external dependency rate limits not accounted for in config changes.',
      recommendation: [
        'Implement JWKS key caching with stale-while-revalidate pattern (serve cached, refresh async)',
        'Add circuit breaker for JWKS endpoint with graceful fallback to last known good keyset',
        'Configure rate-limit aware retry with exponential backoff for identity provider calls',
        'Require performance impact assessment for any auth-service cache configuration change',
      ],
      learningFeedback: {
        summary: 'This incident pattern has been captured and will actively improve the platform intelligence:',
        improvements: [
          'Release risk prediction updated — auth-service cache TTL changes now require performance sign-off',
          'Test coverage enhanced — auth flow load tests now simulate IdP rate limiting scenarios',
          'Knowledge base enriched — new pattern entry for external dependency cache misconfiguration impacts',
        ],
      },
      confidence: 89.5,
      analysisTime: '1.8 seconds',
    },
  },
];

export function getIncidentById(id: string): IncidentRecord | undefined {
  return incidents.find((inc) => inc.id === id);
}
