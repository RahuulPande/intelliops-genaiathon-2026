export interface ServiceProfile {
  id: string;
  name: string;
  displayName: string;
  criticality: 'critical' | 'high' | 'medium' | 'low';
  team: string;
  techStack: string[];
  healthScore: number;
  healthTrend: 'improving' | 'stable' | 'declining';
  lastDeployment: string;
  activeIncidents: number;
  openPRs: number;
  testPassRate: number;
  coveragePercentage: number;
  recentActivity: ServiceActivity[];
  riskTimeline: RiskDataPoint[];
  lifecycleSummary: LifecycleLayerSummary[];
}

export interface ServiceActivity {
  timestamp: string;
  event: string;
  layer: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface RiskDataPoint {
  date: string;
  score: number;
  event?: string;
}

export interface LifecycleLayerSummary {
  layer: string;
  label: string;
  metric: string;
  entity: string;
  entityLabel: string;
  sectionId: string;
  color: string;
}

// Generate 30-day risk timeline
function generateRiskTimeline(pattern: 'declining' | 'improving' | 'stable'): RiskDataPoint[] {
  const timeline: RiskDataPoint[] = [];
  const today = new Date('2026-03-24');

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    let score: number;
    if (pattern === 'declining') {
      // Trending downward with spike
      if (i <= 9) {
        score = 82 + (9 - i) * 1.5;
      } else if (i <= 15) {
        score = 92;
      } else {
        score = 72 + Math.random() * 8;
      }
    } else if (pattern === 'improving') {
      // Trending upward
      score = 60 + (30 - i) * 1;
    } else {
      // Stable with minor fluctuations
      score = 75 + (Math.random() - 0.5) * 10;
    }

    timeline.push({
      date: dateStr,
      score: Math.round(score),
      event:
        (pattern === 'declining' && i === 15 && 'INC-2024-001 detected') ||
        (pattern === 'declining' && i === 8 && 'Deployment: PR-4521') ||
        (pattern === 'improving' && i === 20 && 'Release v3.2.1') ||
        undefined,
    });
  }

  return timeline;
}

// Recent activity events for each service
function generateRecentActivity(serviceId: string): ServiceActivity[] {
  const baseDate = new Date('2026-03-24T14:30:00Z');

  const eventTemplates = {
    'payment-service': [
      { event: 'Deployment completed', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 1 },
      { event: 'INC-2024-001 observed high latency', layer: 'L5-OPERATE', severity: 'critical' as const, hoursAgo: 6 },
      { event: 'PR-4521 merged: timeout optimization', layer: 'L1-BUILD', severity: 'info' as const, hoursAgo: 8 },
      { event: 'Test suite: 93.3% pass rate', layer: 'L1-BUILD', severity: 'info' as const, hoursAgo: 12 },
      { event: 'Coverage threshold met (81.2%)', layer: 'L1-BUILD', severity: 'info' as const, hoursAgo: 14 },
      { event: 'Release readiness score: 0.78', layer: 'L2-RELEASE', severity: 'warning' as const, hoursAgo: 16 },
      { event: 'Connection pool exhaustion pattern detected', layer: 'L2-RELEASE', severity: 'critical' as const, hoursAgo: 20 },
      { event: 'Slack alert: #payment-alerts investigation', layer: 'L5-OPERATE', severity: 'warning' as const, hoursAgo: 22 },
      { event: 'Incident REQ-101 impact analyzed', layer: 'L3-LEARN', severity: 'info' as const, hoursAgo: 24 },
      { event: 'Knowledge base: timeout strategies updated', layer: 'L3-LEARN', severity: 'info' as const, hoursAgo: 28 },
    ],
    'portfolio-engine': [
      { event: 'Deployment completed', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 2 },
      { event: 'Portfolio analytics: response time stable', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 8 },
      { event: 'Test suite: 97.1% pass rate', layer: 'L1-BUILD', severity: 'info' as const, hoursAgo: 12 },
      { event: 'PR-4432 approved: bulk portfolio optimization', layer: 'L1-BUILD', severity: 'info' as const, hoursAgo: 14 },
      { event: 'Coverage improved to 86.7%', layer: 'L1-BUILD', severity: 'info' as const, hoursAgo: 16 },
      { event: 'Release readiness score: 0.92', layer: 'L2-RELEASE', severity: 'info' as const, hoursAgo: 18 },
      { event: 'Performance metrics nominal', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 20 },
      { event: 'Kafka pipeline healthy', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 24 },
      { event: 'Bulk operations: SLA 99.2% met', layer: 'L3-LEARN', severity: 'info' as const, hoursAgo: 26 },
      { event: 'Dashboard refresh cycle: normal', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 28 },
    ],
    'kyc-service': [
      { event: 'Compliance checks: all passing', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 3 },
      { event: 'Document processing: queue nominal', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 8 },
      { event: 'PR-4301 in review: ElasticSearch optimization', layer: 'L1-BUILD', severity: 'info' as const, hoursAgo: 12 },
      { event: 'Test suite: 89.5% pass rate', layer: 'L1-BUILD', severity: 'warning' as const, hoursAgo: 14 },
      { event: 'Coverage at 72.1% (below target)', layer: 'L1-BUILD', severity: 'warning' as const, hoursAgo: 16 },
      { event: 'Release readiness score: 0.68', layer: 'L2-RELEASE', severity: 'warning' as const, hoursAgo: 18 },
      { event: 'PR-4298: async verification pipeline approved', layer: 'L1-BUILD', severity: 'info' as const, hoursAgo: 20 },
      { event: 'Regulatory audit: policy checks active', layer: 'L5-OPERATE', severity: 'info' as const, hoursAgo: 22 },
      { event: 'Coverage improvement plan initiated', layer: 'L3-LEARN', severity: 'info' as const, hoursAgo: 24 },
      { event: 'ElasticSearch performance baseline recorded', layer: 'L3-LEARN', severity: 'info' as const, hoursAgo: 26 },
    ],
  };

  const events = eventTemplates[serviceId as keyof typeof eventTemplates] || [];

  return events.map((evt) => {
    const timestamp = new Date(baseDate);
    timestamp.setHours(timestamp.getHours() - evt.hoursAgo);
    return {
      timestamp: timestamp.toISOString(),
      event: evt.event,
      layer: evt.layer,
      severity: evt.severity,
    };
  });
}

// Lifecycle summary for each service
function generateLifecycleSummary(serviceId: string): LifecycleLayerSummary[] {
  const summaries: Record<string, LifecycleLayerSummary[]> = {
    'payment-service': [
      {
        layer: 'L0-PLAN',
        label: 'Requirement Intelligence',
        metric: 'Risk: 87',
        entity: 'REQ-101',
        entityLabel: 'Multi-currency transaction support',
        sectionId: 'plan-intelligence',
        color: 'teal',
      },
      {
        layer: 'L1-BUILD',
        label: 'Delivery Intelligence',
        metric: '93.3% test pass',
        entity: 'PR-4521',
        entityLabel: 'Timeout optimization + connection pooling',
        sectionId: 'delivery-intelligence',
        color: 'purple',
      },
      {
        layer: 'L2-RELEASE',
        label: 'Release Intelligence',
        metric: 'Risk Score: 0.78',
        entity: 'REL-v3.2.1',
        entityLabel: 'Production deployment readiness',
        sectionId: 'intelligent-test-quality',
        color: 'indigo',
      },
      {
        layer: 'L3-LEARN',
        label: 'Operations Intelligence',
        metric: '5 incidents resolved',
        entity: 'INC-2024-001',
        entityLabel: 'High latency pattern correlation',
        sectionId: 'service-health-intelligence',
        color: 'blue',
      },
      {
        layer: 'L4-OPERATE',
        label: 'Enterprise Intelligence',
        metric: '72 health score',
        entity: 'SVC-PAYMENT',
        entityLabel: 'Critical banking service',
        sectionId: 'business-intelligence',
        color: 'orange',
      },
      {
        layer: 'L5-ANALYTICS',
        label: 'Future: Cost & Efficiency',
        metric: 'Baseline set',
        entity: 'COST-FY26',
        entityLabel: 'Spend tracking activated',
        sectionId: 'business-intelligence',
        color: 'amber',
      },
    ],
    'portfolio-engine': [
      {
        layer: 'L0-PLAN',
        label: 'Requirement Intelligence',
        metric: 'Risk: 42',
        entity: 'REQ-102',
        entityLabel: 'Real-time portfolio analytics',
        sectionId: 'plan-intelligence',
        color: 'teal',
      },
      {
        layer: 'L1-BUILD',
        label: 'Delivery Intelligence',
        metric: '97.1% test pass',
        entity: 'PR-4432',
        entityLabel: 'Bulk portfolio optimization',
        sectionId: 'delivery-intelligence',
        color: 'purple',
      },
      {
        layer: 'L2-RELEASE',
        label: 'Release Intelligence',
        metric: 'Risk Score: 0.18',
        entity: 'REL-v3.2.0',
        entityLabel: 'Low-risk analytics release',
        sectionId: 'intelligent-test-quality',
        color: 'indigo',
      },
      {
        layer: 'L3-LEARN',
        label: 'Operations Intelligence',
        metric: '0 incidents',
        entity: 'INC-NONE',
        entityLabel: 'Stable service operation',
        sectionId: 'service-health-intelligence',
        color: 'blue',
      },
      {
        layer: 'L4-OPERATE',
        label: 'Enterprise Intelligence',
        metric: '88 health score',
        entity: 'SVC-PORTFOLIO',
        entityLabel: 'Wealth management engine',
        sectionId: 'business-intelligence',
        color: 'orange',
      },
      {
        layer: 'L5-ANALYTICS',
        label: 'Future: ROI & Insights',
        metric: 'In progress',
        entity: 'ROI-WEALTH',
        entityLabel: 'Operational efficiency metrics',
        sectionId: 'business-intelligence',
        color: 'amber',
      },
    ],
    'kyc-service': [
      {
        layer: 'L0-PLAN',
        label: 'Requirement Intelligence',
        metric: 'Risk: 65',
        entity: 'REQ-103',
        entityLabel: 'Async verification pipeline',
        sectionId: 'plan-intelligence',
        color: 'teal',
      },
      {
        layer: 'L1-BUILD',
        label: 'Delivery Intelligence',
        metric: '89.5% test pass',
        entity: 'PR-4301',
        entityLabel: 'ElasticSearch index optimization',
        sectionId: 'delivery-intelligence',
        color: 'purple',
      },
      {
        layer: 'L2-RELEASE',
        label: 'Release Intelligence',
        metric: 'Risk Score: 0.68',
        entity: 'REL-v3.1.9',
        entityLabel: 'Compliance-gated release',
        sectionId: 'intelligent-test-quality',
        color: 'indigo',
      },
      {
        layer: 'L3-LEARN',
        label: 'Operations Intelligence',
        metric: '0 incidents',
        entity: 'INC-NONE',
        entityLabel: 'Regulatory compliance maintained',
        sectionId: 'service-health-intelligence',
        color: 'blue',
      },
      {
        layer: 'L4-OPERATE',
        label: 'Enterprise Intelligence',
        metric: '64 health score',
        entity: 'SVC-KYC',
        entityLabel: 'Compliance & verification',
        sectionId: 'business-intelligence',
        color: 'orange',
      },
      {
        layer: 'L5-ANALYTICS',
        label: 'Future: Compliance Metrics',
        metric: 'Pending activation',
        entity: 'COMPLY-Q1',
        entityLabel: 'Audit trail & compliance reporting',
        sectionId: 'business-intelligence',
        color: 'amber',
      },
    ],
  };

  return summaries[serviceId] || [];
}

export const serviceProfiles: ServiceProfile[] = [
  {
    id: 'svc-payment',
    name: 'payment-service',
    displayName: 'Payment Service',
    criticality: 'critical',
    team: 'payments-core',
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis'],
    healthScore: 72,
    healthTrend: 'declining',
    lastDeployment: '2026-03-23T14:30:00Z',
    activeIncidents: 1,
    openPRs: 2,
    testPassRate: 93.3,
    coveragePercentage: 81.2,
    recentActivity: generateRecentActivity('payment-service'),
    riskTimeline: generateRiskTimeline('declining'),
    lifecycleSummary: generateLifecycleSummary('payment-service'),
  },
  {
    id: 'svc-portfolio',
    name: 'portfolio-engine',
    displayName: 'Portfolio Engine',
    criticality: 'high',
    team: 'wealth-management',
    techStack: ['Kotlin', 'Spring Boot', 'MongoDB', 'Kafka'],
    healthScore: 88,
    healthTrend: 'improving',
    lastDeployment: '2026-03-22T09:15:00Z',
    activeIncidents: 0,
    openPRs: 1,
    testPassRate: 97.1,
    coveragePercentage: 86.7,
    recentActivity: generateRecentActivity('portfolio-engine'),
    riskTimeline: generateRiskTimeline('improving'),
    lifecycleSummary: generateLifecycleSummary('portfolio-engine'),
  },
  {
    id: 'svc-kyc',
    name: 'kyc-service',
    displayName: 'KYC Service',
    criticality: 'high',
    team: 'compliance-tech',
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'ElasticSearch'],
    healthScore: 64,
    healthTrend: 'stable',
    lastDeployment: '2026-03-20T11:45:00Z',
    activeIncidents: 0,
    openPRs: 3,
    testPassRate: 89.5,
    coveragePercentage: 72.1,
    recentActivity: generateRecentActivity('kyc-service'),
    riskTimeline: generateRiskTimeline('stable'),
    lifecycleSummary: generateLifecycleSummary('kyc-service'),
  },
];

export function getServiceProfile(id: string): ServiceProfile | undefined {
  return serviceProfiles.find((service) => service.id === id);
}
