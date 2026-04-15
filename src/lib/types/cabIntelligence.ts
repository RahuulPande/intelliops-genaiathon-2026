export interface CABChange {
  prId: string;
  title: string;
  author: string;
  riskScore: number;
  riskCategory: string;
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
  aiSummary: string;
  reviewStatus: 'approved' | 'pending' | 'changes_requested';
  testsCovering: number;
  testsPassRate: number;
}

export interface CABApproval {
  role: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy: string | null;
  approvedAt: string | null;
  comments: string | null;
}

export interface CABSubmissionPackage {
  id: string;
  releaseId: string;
  releaseName: string;
  generatedAt: string;
  generatedBy: string;

  releaseOverview: {
    targetEnvironment: string;
    scheduledDate: string;
    rollbackPlan: string;
    changeType: 'standard' | 'normal' | 'emergency';
    overallRiskScore: number;
    overallRiskRating: 'low' | 'medium' | 'high' | 'critical';
    recommendation: 'approve' | 'conditional' | 'reject';
  };

  changes: CABChange[];

  testEvidence: {
    totalTests: number;
    passed: number;
    failed: number;
    skipped: number;
    coveragePercentage: number;
    criticalPathsTested: boolean;
    regressionSuiteRun: boolean;
    performanceTestsRun: boolean;
    lastRunTimestamp: string;
  };

  riskAssessment: {
    aggregateRiskScore: number;
    highRiskChanges: number;
    securityImpactChanges: number;
    databaseChanges: boolean;
    infrastructureChanges: boolean;
    regulatoryImpact: {
      affectsRegulatedFlow: boolean;
      affectedRegulations: string[];
      complianceReviewRequired: boolean;
    };
    rollbackComplexity: 'simple' | 'moderate' | 'complex';
    estimatedDowntime: string;
    blastRadius: 'low' | 'medium' | 'high';
  };

  aiRecommendation: {
    decision: 'approve' | 'conditional' | 'reject';
    confidence: number;
    reasoning: string;
    conditions: string[];
    risks: string[];
  };

  approvals: CABApproval[];
}
