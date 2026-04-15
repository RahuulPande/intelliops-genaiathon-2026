export interface TraceabilityGap {
  type: 'no_requirement' | 'no_tests' | 'partial_test_coverage' |
        'untested_acceptance_criteria' | 'no_deployment' | 'no_review';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
  affectedEntity: { layer: string; id: string; title: string };
}

export interface TraceabilityChain {
  id: string;

  requirement: {
    id: string;
    title: string;
    source: 'jira' | 'manual' | 'imported';
    acceptanceCriteria: string[];
    riskScore: number;
    status: 'draft' | 'approved' | 'in_progress' | 'done';
  } | null;

  pullRequests: {
    id: string;
    title: string;
    riskScore: number;
    filesChanged: number;
    status: 'open' | 'merged' | 'closed';
    linkedToRequirement: boolean;
    coverageOfAcceptanceCriteria: number;
  }[];

  testCoverage: {
    totalTests: number;
    passingTests: number;
    coveragePercentage: number;
    missingScenarios: string[];
    status: 'full' | 'partial' | 'none';
  } | null;

  deployment: {
    releaseId: string;
    releaseName: string;
    deployedAt: string;
    environment: string;
    status: 'deployed' | 'pending' | 'failed';
  } | null;

  chainCompleteness: number;
  gaps: TraceabilityGap[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface TraceabilitySummary {
  totalChains: number;
  fullyTraceable: number;
  partiallyTraceable: number;
  untraceable: number;
  overallHealth: number;
  criticalGaps: TraceabilityGap[];
  gapDistribution: {
    noRequirement: number;
    noTests: number;
    partialTests: number;
    noDeployment: number;
  };
}
