// ── Central Demo Metrics ──────────────────────────────────
// Single source of truth for all demo-visible metrics.
// Used across: DemoLandingPage, showcase screens, pillar headers, TopStatsBar.

export const DEMO_METRICS = {
  defect: {
    matchesFound: 3247,
    matchesFoundLabel: '3,247',
    timeSaved: '680h',
    accuracy: '96%',
    accuracyNumeric: 0.96,
    dataHistory: '5 Years',
    resolutionBefore: '6+ hours',
    resolutionAfter: '< 45 min',
  },
  test: {
    releaseConfidence: '82%',
    releaseConfidenceNumeric: 0.82,
    flakyQuarantined: 5,
    coverageGaps: 3,
    failureClusters: 2,
    totalFailures: 12,
    prioritizedTests: 10,
    timeSavedPerCycle: '3.2 hours',
    timeSavedPerSprint: '2.1 hrs/sprint',
  },
  release: {
    aiHealthScore: 87.3,
    successRate: '98.2%',
    branchConsistency: '94%',
    costSavings: '$180K',
    recommendation: 'CONDITIONAL_GO' as const,
  },
  knowledge: {
    defectsAnalyzed: 1247,
    defectsAnalyzedLabel: '1,247',
    modules: 89,
    onboardingBefore: '5 weeks',
    onboardingAfter: '3 weeks',
    onboardingReduction: '40%',
    costPerHire: '$8K saved',
  },
  roi: {
    projectedSavingsPerYear: '~$89K',
    teamSize: 50,
  },
} as const;
