// ============================================================================
// IntelliOps AI — Mock AI Service Layer
// Simulates LLM/ML/RAG outputs using logic + templates
// ============================================================================

// ---------- Types ----------

export interface AIInsightItem {
  id: string;
  type: 'warning' | 'info' | 'success' | 'critical';
  icon: string;
  text: string;
  confidence: number;
  source: 'RAG' | 'ML' | 'LLM' | 'NLP';
}

export interface ReleaseRiskBreakdown {
  defects: number;
  codeChurn: number;
  mergeConflicts: number;
  infra: number;
}

export interface RecommendedAction {
  id: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  reason: string;
  impact: string;
}

export interface ReleaseTrendDataPoint {
  date: string;
  cycleTime: number;
  successRate: number;
  deployments: number;
  failureRate: number;
}

export interface PerformanceAnomaly {
  id: string;
  service: string;
  metric: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  detectedAt: string;
  rootCause: string;
  prediction: string;
}

export interface PerformanceTrendPoint {
  timestamp: string;
  responseTime: number;
  throughput: number;
  errorRate: number;
  cpuUsage: number;
}

// ---------- Release Insights ----------

export function generateReleaseInsights(): AIInsightItem[] {
  return [
    {
      id: 'ri-1',
      type: 'critical',
      icon: 'AlertTriangle',
      text: 'Release risk increased 34% due to spike in high-severity defects in the Payments module over the last 2 sprints.',
      confidence: 0.92,
      source: 'ML',
    },
    {
      id: 'ri-2',
      type: 'warning',
      icon: 'GitBranch',
      text: '3 failed deployments in the last cycle linked to unresolved merge conflicts in feature/auth-refresh branch.',
      confidence: 0.88,
      source: 'RAG',
    },
    {
      id: 'ri-3',
      type: 'warning',
      icon: 'Shield',
      text: 'Skipping regression tests on hotfix branches increases rollback probability by 2.4x based on historical patterns.',
      confidence: 0.95,
      source: 'ML',
    },
    {
      id: 'ri-4',
      type: 'info',
      icon: 'TrendingUp',
      text: 'Deployment success rate improved from 94.1% to 98.2% after adopting AI-driven readiness scoring last quarter.',
      confidence: 0.97,
      source: 'ML',
    },
    {
      id: 'ri-5',
      type: 'success',
      icon: 'CheckCircle',
      text: 'Current release candidate meets all 12 automated quality gates. Confidence score: 87.3/100.',
      confidence: 0.87,
      source: 'LLM',
    },
    {
      id: 'ri-6',
      type: 'warning',
      icon: 'Clock',
      text: 'Average cycle time increased 18% this sprint. Root cause: 4 critical defects reopened during UAT phase.',
      confidence: 0.91,
      source: 'RAG',
    },
  ];
}

// ---------- Release Risk Breakdown ----------

export function generateReleaseRiskBreakdown(): ReleaseRiskBreakdown {
  return {
    defects: 35,
    codeChurn: 25,
    mergeConflicts: 20,
    infra: 20,
  };
}

// ---------- Release Recommendations ----------

export function generateRecommendations(): RecommendedAction[] {
  return [
    {
      id: 'rec-1',
      priority: 'high',
      action: 'Delay release by 1 business day',
      reason: '4 critical defects remain open in the Payments module with no fix ETA',
      impact: 'Reduces post-deployment incident probability by 62%',
    },
    {
      id: 'rec-2',
      priority: 'high',
      action: 'Run full regression suite on staging',
      reason: 'Last 3 hotfixes skipped regression — pattern correlates with 2.4x rollback risk',
      impact: 'Catches 89% of integration-level defects before production',
    },
    {
      id: 'rec-3',
      priority: 'medium',
      action: 'Resolve merge conflicts in feature/auth-refresh',
      reason: '3 deployment failures traced to this branch in the last cycle',
      impact: 'Eliminates primary source of build failures',
    },
    {
      id: 'rec-4',
      priority: 'medium',
      action: 'Increase test coverage for Transaction Processing module',
      reason: 'Current coverage at 67% — below 80% threshold for critical modules',
      impact: 'Reduces defect escape rate by ~30% for this module',
    },
    {
      id: 'rec-5',
      priority: 'low',
      action: 'Schedule post-deployment monitoring window (2 hours)',
      reason: 'Release includes database migration — historical incidents peak within 90 min',
      impact: 'Enables immediate rollback if anomaly detected',
    },
  ];
}

// ---------- Release Trend Data ----------

export function generateReleaseTrendData(): ReleaseTrendDataPoint[] {
  const months = ['Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026'];
  return months.map((date, i) => ({
    date,
    cycleTime: Math.max(3, 12 - i * 1.2 + (Math.random() * 2 - 1)),
    successRate: Math.min(99.5, 91 + i * 1.3 + Math.random()),
    deployments: 14 + i * 3 + Math.floor(Math.random() * 4),
    failureRate: Math.max(0.5, 9 - i * 1.1 + (Math.random() * 1.5 - 0.5)),
  }));
}

// ---------- Test Insights ----------

export function generateTestInsights(): AIInsightItem[] {
  return [
    {
      id: 'ti-1',
      type: 'warning',
      icon: 'AlertTriangle',
      text: '22% of test cases are redundant — they cover identical code paths and can be consolidated to reduce suite execution time by ~35 minutes.',
      confidence: 0.89,
      source: 'ML',
    },
    {
      id: 'ti-2',
      type: 'info',
      icon: 'BarChart',
      text: '15% of tests have never failed in 18 months. Consider re-evaluating their value or converting to smoke tests.',
      confidence: 0.94,
      source: 'ML',
    },
    {
      id: 'ti-3',
      type: 'critical',
      icon: 'Shield',
      text: 'Critical payment processing flows have only 43% test coverage — below the 80% threshold for Tier-1 modules.',
      confidence: 0.96,
      source: 'RAG',
    },
    {
      id: 'ti-4',
      type: 'success',
      icon: 'TrendingUp',
      text: 'Test execution velocity improved 28% after removing flaky tests identified by AI pattern detection last month.',
      confidence: 0.91,
      source: 'ML',
    },
    {
      id: 'ti-5',
      type: 'warning',
      icon: 'Clock',
      text: 'Regression suite duration increased from 42min to 68min over 3 sprints. 80% of the increase is from 12 new UI tests with unstable selectors.',
      confidence: 0.87,
      source: 'NLP',
    },
    {
      id: 'ti-6',
      type: 'info',
      icon: 'Brain',
      text: 'RAG analysis of defect history suggests adding 8 new test scenarios for the Account Reconciliation module to close coverage gaps.',
      confidence: 0.93,
      source: 'RAG',
    },
  ];
}

// ---------- Performance Insights ----------

export function generatePerformanceInsights(): AIInsightItem[] {
  return [
    {
      id: 'pi-1',
      type: 'critical',
      icon: 'Zap',
      text: 'Latency spike detected on Payments API — p99 response time jumped from 180ms to 920ms in the last 30 minutes.',
      confidence: 0.97,
      source: 'ML',
    },
    {
      id: 'pi-2',
      type: 'warning',
      icon: 'Database',
      text: 'Root cause identified: DB connection pool saturation on payments-db-primary. Active connections at 94% capacity.',
      confidence: 0.93,
      source: 'RAG',
    },
    {
      id: 'pi-3',
      type: 'warning',
      icon: 'TrendingUp',
      text: 'ML prediction: Next release (v3.8.2) may increase average latency by 12% due to added encryption middleware.',
      confidence: 0.85,
      source: 'ML',
    },
    {
      id: 'pi-4',
      type: 'info',
      icon: 'Activity',
      text: 'Throughput anomaly: Transaction processing dropped 23% between 2:00-2:15 PM — correlates with batch job overlap on shared infrastructure.',
      confidence: 0.90,
      source: 'ML',
    },
    {
      id: 'pi-5',
      type: 'success',
      icon: 'CheckCircle',
      text: 'After connection pool optimization (recommended last cycle), Account Services API p95 latency improved by 41%.',
      confidence: 0.96,
      source: 'RAG',
    },
  ];
}

// ---------- Performance Anomalies ----------

export function generatePerformanceAnomalies(): PerformanceAnomaly[] {
  return [
    {
      id: 'pa-1',
      service: 'Payments API',
      metric: 'Response Time (p99)',
      severity: 'critical',
      description: 'Latency spike detected — p99 jumped from 180ms to 920ms',
      detectedAt: '2026-03-20T14:32:00Z',
      rootCause: 'DB connection pool saturation on payments-db-primary (94% capacity)',
      prediction: 'If unresolved, expect full service degradation within 2 hours',
    },
    {
      id: 'pa-2',
      service: 'Account Services',
      metric: 'Throughput',
      severity: 'warning',
      description: 'Transaction processing dropped 23% during batch job window',
      detectedAt: '2026-03-20T14:05:00Z',
      rootCause: 'Batch job overlap on shared infrastructure consuming 60% of I/O bandwidth',
      prediction: 'Pattern recurs daily 2:00-2:30 PM — schedule batch jobs off-peak to resolve',
    },
    {
      id: 'pa-3',
      service: 'Auth Gateway',
      metric: 'Error Rate',
      severity: 'warning',
      description: 'Token validation errors increased 340% in the last hour',
      detectedAt: '2026-03-20T13:48:00Z',
      rootCause: 'Certificate rotation on auth-provider-02 not propagated to 3 of 8 pods',
      prediction: 'Affected users will see intermittent 401 errors until pod refresh',
    },
  ];
}

// ---------- Performance Trend Data ----------

export function generatePerformanceTrendData(): PerformanceTrendPoint[] {
  const points: PerformanceTrendPoint[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 3600000);
    const isSpike = i >= 8 && i <= 10;
    points.push({
      timestamp: `${time.getHours().toString().padStart(2, '0')}:00`,
      responseTime: isSpike ? 450 + Math.random() * 500 : 120 + Math.random() * 80,
      throughput: isSpike ? 800 + Math.random() * 200 : 1400 + Math.random() * 300,
      errorRate: isSpike ? 2.5 + Math.random() * 3 : 0.1 + Math.random() * 0.5,
      cpuUsage: isSpike ? 78 + Math.random() * 15 : 35 + Math.random() * 20,
    });
  }
  return points;
}
