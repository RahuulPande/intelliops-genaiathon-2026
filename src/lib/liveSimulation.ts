// ============================================================================
// IntelliOps AI — Live Simulation Engine
// Generates fluctuating metrics and realistic events across all SDLC layers
// ============================================================================

export interface SimulationState {
  isActive: boolean;
  metrics: {
    activeServices: number;          // fluctuates 148-155
    incidentsPreventedToday: number; // fluctuates 45-55
    avgResponseTime: number;         // fluctuates 180-240ms
    defectMatchAccuracy: number;     // fluctuates 0.94-0.97
    releaseRiskScore: number;        // fluctuates 0.20-0.35
    knowledgeBaseEntries: number;    // slowly increases
  };
  recentEvents: SimulationEvent[];
}

export interface SimulationEvent {
  id: string;
  timestamp: string;
  type: 'defect_matched' | 'risk_scored' | 'incident_detected' | 'knowledge_updated' | 'release_assessed';
  layer: string; // L0-L5
  message: string;
  severity: 'info' | 'warning' | 'success';
}

// Event message pool across all layers — 25+ realistic enterprise scenarios
const EVENT_MESSAGES: Record<string, Record<string, string[]>> = {
  defect_matched: {
    L0: [
      'REQ-485: High-complexity requirement detected similar to completed REQ-421',
      'REQ-612: Payment logic requirement matches 3 historical patterns',
      'REQ-338: Duplicate requirement consolidated from REQ-301',
    ],
    L1: [
      'PR-4521: Defect pattern matched to 5 historical incidents',
      'PR-4588: Code change correlates with previous ledger refactors',
      'PR-4493: Authentication logic matches secure coding baseline',
    ],
    L2: [
      'Test suite TS-PAY-002: Failure pattern recognized from incident history',
      'TS-PORT-001: Load test bottleneck matches database indexing issue',
      'TS-KYC-001: Security gap aligned with previous compliance review',
    ],
    L3: [
      'Release v3.4.1: Risk factors matched against 18 months of release data',
      'Release v3.3.9: Deployment pattern indicates 78% success likelihood',
      'Release v3.4.0-hf1: Hotfix scope matched to similar emergency fixes',
    ],
    L4: [
      'INC-2024-001: Root cause analysis matched to PR-4521 changes',
      'INC-2024-002: Performance degradation pattern identified from baseline',
      'INC-2024-003: Error cascade traced to recent deployment',
    ],
    L5: [
      'LEARN-001: New defect pattern added to knowledge base (2,147 entries)',
      'LEARN-002: Machine learning model correlation strength: 0.89',
      'LEARN-003: Historical incident comparison identified 3 similar cases',
    ],
  },
  risk_scored: {
    L0: [
      'REQ-485: Risk score calculated at 0.68 (high complexity + new patterns)',
      'REQ-612: Requirement risk assessment: MEDIUM (missing validation specs)',
      'REQ-338: Consolidated requirement reduces overall risk by 12%',
    ],
    L1: [
      'PR-4521: Change complexity score: 0.72 (847 lines, 12 critical files)',
      'PR-4588: Code quality score: 0.89 (test coverage: 94.3%)',
      'PR-4493: Security assessment: LOW RISK (passed OWASP validation)',
    ],
    L2: [
      'Test coverage: 94.3% (TS-PAY-002) — exceeds baseline 90%',
      'TS-PORT-001: Performance regression detected (p99 latency: 4.2s vs 1.5s SLA)',
      'TS-KYC-001: Compliance gap assessment: 3 findings (all remediated)',
    ],
    L3: [
      'Release v3.4.1: Readiness score 0.94 — APPROVED for deployment',
      'Release v3.3.9: Risk escalated from 0.34 to 0.71 (test failures)',
      'Release v3.4.0-hf1: Hotfix risk assessment: 0.12 (minimal scope)',
    ],
    L4: [
      'INC-2024-001: Impact severity CRITICAL (2.3% error rate vs 0.1% baseline)',
      'INC-2024-002: Service degradation MEDIUM (SLA breach: 180% above normal)',
      'INC-2024-003: Blast radius calculated at 3 dependent services',
    ],
    L5: [
      'Model accuracy improved: 87.2% → 91.4% (18 months training data)',
      'Predictive risk confidence: 0.93 (high confidence in next 5 releases)',
      'Knowledge base correlation strength: 0.87 with 8 prior incidents',
    ],
  },
  incident_detected: {
    L0: [
      'Requirement gap detected in REQ-485: Missing edge case handling',
      'REQ-612: Regulatory compliance risk flagged for review',
      'REQ-338: Dependency conflict found with existing REQ-299',
    ],
    L1: [
      'Code quality regression: Cyclomatic complexity exceeds threshold (PR-4521)',
      'PR-4588: Security scan flagged potential race condition',
      'PR-4493: Breaking API change detected affecting 4 downstream services',
    ],
    L2: [
      'Test anomaly: TS-PORT-001 timeout rate 12% (expected <2%)',
      'TS-KYC-001: Security scan found 3 low-severity OWASP violations',
      'TS-PAY-002: Load test failed at 500 concurrent users (capacity issue)',
    ],
    L3: [
      'Release readiness gate failed: 2 critical test suites incomplete',
      'Release v3.3.9: Pre-deployment check detected memory leak',
      'Release v3.4.0-hf1: Conflict detected with v3.3.9 scheduled deployment',
    ],
    L4: [
      'Production incident: Payment service error rate 2.3% (SLA breach)',
      'Service degradation: Portfolio engine p99 latency 4.2s (SLA: 1.5s)',
      'System alert: KYC service experiencing 500-level errors (scope: 3 regions)',
    ],
    L5: [
      'Learning pattern identified: Payment retries cause race conditions',
      'Defect correlation: Edge case handling failures span 5 services',
      'Knowledge update: New attack vector identified from incident postmortem',
    ],
  },
  knowledge_updated: {
    L0: [
      'Knowledge base updated: Added 5 new requirement anti-patterns',
      'Learning loop: Test strategy templates refined (12 new test cases)',
      'Knowledge base entry KB-4821: Regulatory compliance checklist added',
    ],
    L1: [
      'Knowledge base updated: Code review guidelines expanded (8 new rules)',
      'Learning: Refactoring patterns documented from PR-4588 analysis',
      'KB-4822: Best practices for concurrent payment processing added',
    ],
    L2: [
      'Knowledge base updated: Test automation templates (3 new suites)',
      'Learning: Performance testing thresholds refined from load test data',
      'KB-4823: Security testing playbook v2.1 released',
    ],
    L3: [
      'Knowledge base updated: Deployment runbooks (2 new release patterns)',
      'Learning: Release readiness criteria refined (accuracy: +4.2%)',
      'KB-4824: Hotfix procedure updated with new safeguards',
    ],
    L4: [
      'Knowledge base updated: Incident response playbooks (5 new patterns)',
      'Learning: Root cause analysis templates improved (faster resolution)',
      'KB-4825: Service health baselines recalibrated from 3 months data',
    ],
    L5: [
      'Knowledge base updated: ML model artifacts (version 4.2)',
      'Learning: Defect prediction accuracy improved 4.2% (19K training cases)',
      'KB-4826: Historical incident library expanded to 2,147 entries',
    ],
  },
  release_assessed: {
    L0: [
      'Release planning: v3.5.0 requirement scope locked (142 requirements)',
      'Release assessment: Feature gate decisions made for 18 modules',
      'Release readiness: 3 high-risk requirements escalated for review',
    ],
    L1: [
      'Build assessment: v3.4.1 all green gates passed (12/12 quality checks)',
      'Merge decision: 47 PRs approved, 3 flagged for manual review',
      'Build artifact: v3.4.1 signed and staged for release validation',
    ],
    L2: [
      'Test assessment: v3.4.1 coverage 96.2% (exceeds 94% baseline)',
      'Release gate: Performance tests passed (p99 latency: 1.2s vs 1.5s SLA)',
      'Security assessment: All OWASP findings resolved, ready for release',
    ],
    L3: [
      'Release approved: v3.4.1 authorized for 2pm UTC deployment',
      'Deployment plan: Blue-green strategy with 15% traffic ramp-up',
      'Rollback ready: Previous version v3.4.0 standing by',
    ],
    L4: [
      'Deployment completed: v3.4.1 live in 3/5 regions (95% traffic)',
      'Health check: All services operating normally, error rate 0.08%',
      'Monitoring alert: Release baseline established for incident correlation',
    ],
    L5: [
      'Post-release analysis: Defect rates 18% lower than predicted baseline',
      'Learning: Release v3.4.1 risk model accuracy: 94.1% (validates model)',
      'Knowledge: Success patterns from v3.4.1 release added to playbook',
    ],
  },
};

// ============================================================================
// Metric Fluctuation Logic
// ============================================================================

/**
 * Fluctuates a metric within min/max bounds
 * Adds realistic volatility with small random changes
 */
export function fluctuateMetric(current: number, min: number, max: number, volatility: number = 0.02): number {
  const range = max - min;
  const change = (Math.random() - 0.5) * range * volatility;
  let newValue = current + change;

  // Clamp to bounds
  newValue = Math.max(min, Math.min(max, newValue));

  // Round to appropriate precision
  return Math.round(newValue * 100) / 100;
}

/**
 * Generates the next realistic event from the event message pool
 */
export function generateNextEvent(): SimulationEvent {
  const layers: Array<'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'> = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5'];
  const eventTypes: Array<'defect_matched' | 'risk_scored' | 'incident_detected' | 'knowledge_updated' | 'release_assessed'> = [
    'defect_matched',
    'risk_scored',
    'incident_detected',
    'knowledge_updated',
    'release_assessed',
  ];

  // Randomly select event type and layer
  const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const layer = layers[Math.floor(Math.random() * layers.length)];

  // Get message pool for this type/layer combination
  const messages = EVENT_MESSAGES[type][layer] || ['Event generated'];
  const message = messages[Math.floor(Math.random() * messages.length)];

  // Determine severity based on type
  let severity: 'info' | 'warning' | 'success';
  if (type === 'defect_matched' || type === 'knowledge_updated') {
    severity = 'info';
  } else if (type === 'incident_detected') {
    severity = Math.random() > 0.6 ? 'warning' : 'info';
  } else if (type === 'risk_scored') {
    severity = Math.random() > 0.7 ? 'warning' : 'info';
  } else {
    severity = Math.random() > 0.5 ? 'success' : 'info';
  }

  return {
    id: `evt-sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    type,
    layer,
    message,
    severity,
  };
}

/**
 * Initializes a simulation state with starting metrics
 */
export function initializeSimulationState(): SimulationState {
  return {
    isActive: false,
    metrics: {
      activeServices: 150,
      incidentsPreventedToday: 50,
      avgResponseTime: 210,
      defectMatchAccuracy: 0.955,
      releaseRiskScore: 0.27,
      knowledgeBaseEntries: 2147,
    },
    recentEvents: [],
  };
}

/**
 * Updates metrics and generates new events
 * Call this every 2-3 seconds for realistic fluctuation
 */
export function updateSimulationState(current: SimulationState): SimulationState {
  // Fluctuate each metric
  const updatedMetrics = {
    activeServices: fluctuateMetric(current.metrics.activeServices, 148, 155, 0.01),
    incidentsPreventedToday: fluctuateMetric(current.metrics.incidentsPreventedToday, 45, 55, 0.02),
    avgResponseTime: fluctuateMetric(current.metrics.avgResponseTime, 180, 240, 0.03),
    defectMatchAccuracy: fluctuateMetric(current.metrics.defectMatchAccuracy, 0.94, 0.97, 0.005),
    releaseRiskScore: fluctuateMetric(current.metrics.releaseRiskScore, 0.20, 0.35, 0.02),
    // Knowledge base entries slowly increase (every 5-10 updates)
    knowledgeBaseEntries:
      Math.random() > 0.8
        ? current.metrics.knowledgeBaseEntries + 1
        : current.metrics.knowledgeBaseEntries,
  };

  // Generate new event (approximately every 4-8 seconds when combined with metrics update)
  const shouldGenerateEvent = Math.random() > 0.7;
  const newEvents = shouldGenerateEvent
    ? [generateNextEvent(), ...current.recentEvents.slice(0, 9)]
    : current.recentEvents;

  return {
    ...current,
    metrics: updatedMetrics,
    recentEvents: newEvents,
  };
}
